const siteMetadata = {
  title: "BNM app",
  author: "Tails Azimuth",
  headerTitle: "BNM Travel",
  description: "A blog created with Next.js and Tailwind.css",
  language: "en-us",
  theme: "system",
  siteUrl: "https://zulaa-admin.vercel.app",
  siteRepo: "https://github.com/zulaa0808/zulaa-admin",
  siteLogo: "/static/images/logo.png",
  image: "/static/images/avatar.png",
  socialBanner: "/static/images/twitter-card.png",
  email: "address@yoursite.com",
  github: "https://github.com",
  twitter: "https://twitter.com/Twitter",
  facebook: "https://facebook.com",
  youtube: "https://youtube.com",
  linkedin: "https://www.linkedin.com",
  locale: "en-US",
  analytics: {
    plausibleDataDomain: "",
    simpleAnalytics: false,
    umamiWebsiteId: "",
    googleAnalyticsId: "",
    posthogAnalyticsId: "",
  },
  newsletter: {
    provider: "buttondown",
  },
  comment: {
    provider: "giscus",
    giscusConfig: {
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: "pathname",
      reactions: "1",
      metadata: "0",

      theme: "light",

      inputPosition: "bottom",

      lang: "en",

      darkTheme: "transparent_dark",

      themeURL: "",
    },
    utterancesConfig: {
      repo: process.env.NEXT_PUBLIC_UTTERANCES_REPO,
      issueTerm: "",
      label: "",

      theme: "",

      darkTheme: "",
    },
    disqusConfig: {
      shortname: process.env.NEXT_PUBLIC_DISQUS_SHORTNAME,
    },
  },
};

export default siteMetadata;
