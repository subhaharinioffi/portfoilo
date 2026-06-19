export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: ["GPTBot", "ClaudeBot", "Google-Extended", "Applebot-Extended"],
        allow: ["/llms.txt", "/bio.json", "/"],
      }
    ],
    sitemap: "https://subhaharinioffi.github.io/portfoilo/sitemap.xml",
  };
}
