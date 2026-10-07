export interface Blog {
  slug: string;
  title: string;
  description: string;
  content: string;
  date: string;
}

export const blogs: Blog[] = [
  {
    slug: "how-to-create-a-professional-resume",
    title: "How to Create a Professional Resume",
    description:
      "A practical guide to creating a professional and effective resume.",
    content: `
Write your blog content here.

You can add multiple paragraphs here.

This content will be displayed on the individual blog page.
    `,
    date: "2026-10-07",
  },

  {
    slug: "common-resume-mistakes",
    title: "Common Resume Mistakes",
    description:
      "Learn about common mistakes that can reduce the effectiveness of a resume.",
    content: `
Write your blog content here.

Add your complete article content here.
    `,
    date: "2026-10-08",
  },
];
