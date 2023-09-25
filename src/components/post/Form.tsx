"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Post, Prisma } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FunctionComponent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Editor from "../common/Editor";
import { Label } from "../ui/label";

const formSchema = z.object({
  title: z
    .string({
      required_error: "Гарчиг оруулна уу",
    })
    .max(50),

  price: z.string(), // Change to string since it will be parsed to number
  category: z.string(),
  description: z.string(),
  published: z.boolean(),
});

interface BlogFormProps {
  post?: Post | null;
}

const BlogForm: FunctionComponent<BlogFormProps> = ({ post }) => {
  const router = useRouter();

  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [body, setBody] = useState(post?.body || "");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post?.title,
      price: post?.price.toString() || "0", // Convert to string for input
      category: post?.category || "",
      description: post?.description || "",
      published: post?.published || false,
    },
  });

  useEffect(() => {
    if (!infoMessage) return;

    const timeout = setTimeout(() => {
      setInfoMessage(null);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [infoMessage]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Convert 'price' to a number
    const price = parseFloat(values.price);

    // Ensure 'price' is a valid number
    if (isNaN(price)) {
      setInfoMessage("Price must be a valid number.");
      return;
    }

    const finalValues = {
      ...values,
      publishedAt: values.published ? new Date() : null,
      body,
      price: price,
      category: values.category,
      coverImage: "https://unsplash.com/photos/-27u_GzlAFw",
    };

    if (post) {
      // Update
      fetch(`/api/user/post/${post.id}`, {
        method: "PUT",
        body: JSON.stringify(finalValues),
      })
        .then(() => {
          setInfoMessage("Амжилттай хадгаллаа");
        })
        .catch((error) => {
          setInfoMessage(error.message);
        });
    } else {
      // Create
      fetch("/api/user/post", {
        method: "POST",
        body: JSON.stringify(finalValues),
      })
        .then((res) => res.json())
        .then(({ post, error }) => {
          setInfoMessage("Амжилттай хадгаллаа");

          if (error) {
            throw new Error(error.message);
          }

          router.push(`/user/post/edit/${post?.id}`);
        })
        .catch((error) => {
          setInfoMessage(error.message);
        });
    }
  }

  function onDelete() {
    if (post) {
      if (confirm("Та устгахыг хүсч байна уу?"))
        fetch(`/api/user/post/${post.id}`, { method: "DELETE" })
          .then(() => router.push("/user/profile"))
          .catch((error) => setInfoMessage(error.message));
    }
  }

  return (
    <>
      <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-3xl md:leading-14">
        {post ? "Блог засах" : "Блог бичих"}
      </h1>
      {infoMessage && (
        <div className="py-4 text-md text-sky-400">{infoMessage}</div>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Гарчиг</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  Гарчиг ойлгомжтой, товч, тодорхой байх хэрэгтэй.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="picture">Зураг</Label>
            <Input id="picture" type="file" />
            {post?.coverImage && (
              <Image
                src={post?.coverImage}
                alt={post?.title}
                width={200}
                height={200}
              />
            )}
          </div>

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Газрын нэр оруулна уу</FormLabel>
                <FormControl>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    id="category"
                    {...field}
                  >
                    <option value={""}>---Газрын нэрс---</option>
                    <option value={"terelj"}> Terelj</option>
                    <option value={"Buir lake"}> Buir Lake</option>
                    <option value={"Ulgii city"}> Ulgii city</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Хураангуй</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    inputMode="numeric"
                    pattern="[1-10]*"
                  />
                </FormControl>
                <FormDescription>vne zaawal orno</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="published"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Нийтлэх эсэх</FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Editor body={body} setBody={setBody} />
          <div>
            <Button
              onClick={onDelete}
              className="float-left"
              type="button"
              variant={"destructive"}
            >
              Устгах
            </Button>
            <Button className="float-right" type="submit">
              Хадгалах
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default BlogForm;
