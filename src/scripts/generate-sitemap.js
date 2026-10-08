import fs from "fs";
import path from "path";
import { blogs } from "../src/data/blogs";

const baseUrl = "https://create-resumes.vercel.app";

const staticPages = [
  "/",
  "/about",
  "/blogs",
  "/faq",
  "/privacy",
  "/terms",
  "/contact",
];

const blogUrls = blogs.map(
  (blog) => `/blogs/${blog.slug}`
);

const urls = [
  ...staticPages,
  ...blogUrls.map((slug) => `/blogs/${slug}`),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${baseUrl}${url}</loc>
  </url>`
  )
  .join("\n")}
</urlset>
`;

const outputPath = path.join(process.cwd(), "public", "sitemap.xml");

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, sitemap);

console.log(`Sitemap generated with ${urls.length} URLs.`);
