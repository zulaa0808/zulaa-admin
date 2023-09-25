"use client";

import { FunctionComponent } from "react";
import Giscus from "@giscus/react";

interface CommentProps {}

const Comment: FunctionComponent<CommentProps> = () => {
  return (
    <Giscus
      id="comments"
      repo="zulaa0808/zulaa-admin"
      repoId="R_kgDOKQj2qA"
      category="Announcements"
      categoryId="DIC_kwDOKQj2qM4CZRLB"
      mapping="pathname"
      term="Welcome to @giscus/react component!"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="light"
      lang="en"
      loading="lazy"
    />
  );
};

export default Comment;
