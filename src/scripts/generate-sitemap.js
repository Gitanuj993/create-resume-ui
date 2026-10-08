import fs from "fs";
import path from "path";

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

const blogSlugs = [
  "how-to-create-a-resume-with-no-work-experience",
  "resume-tips-for-students",
];

const urls = [
  ...staticPages,
  ...blogSlugs.map((slug) => `/blogs/${slug}`),
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
