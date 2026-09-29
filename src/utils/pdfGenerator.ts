import { PDFDocument, StandardFonts, rgb, PDFPage } from 'pdf-lib';
import { ResumeData, ReorderableSection } from '../types/resume';

/**
 * Generates a clean, ATS-compliant, executive A4 PDF resume matching the exact section order.
 */
export async function generateResumePdfDocument(data: ResumeData): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // A4 dimensions in points
  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const margin = 42;
  const contentWidth = pageWidth - margin * 2;

  let currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin;

  // Colors: Sophisticated Silver / Charcoal palette
  const colorPrimary = rgb(0.12, 0.12, 0.14);    // #1F1F24 Charcoal
  const colorSecondary = rgb(0.38, 0.38, 0.42);  // #61616B Dark Grey
  const colorMuted = rgb(0.55, 0.55, 0.58);      // #8C8C94 Muted Silver-Grey
  const colorBorder = rgb(0.82, 0.82, 0.84);     // #D1D1D6 Light Silver Border

  // Helper to check page boundary and create new page if needed
  const ensureSpace = (neededHeight: number) => {
    if (y - neededHeight < margin + 20) {
      currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }
  };

  // Helper to wrap text into lines fitting within a specified width
  const wrapText = (text: string, font: typeof fontRegular, size: number, maxWidth: number): string[] => {
    if (!text) return [];
    const words = text.split(/\s+/);
    const lines: string[] = [];
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const width = font.widthOfTextAtSize(testLine, size);
      if (width <= maxWidth) {
        currentLine = testLine;
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    }
    if (currentLine) lines.push(currentLine);
    return lines;
  };

  // --- 1. HEADER (Fixed at top) ---
  // Candidate Full Name
  const fullName = (data.full_name || 'Your Name').trim();
  const nameSize = 20;
  ensureSpace(45);
  currentPage.drawText(fullName, {
    x: margin,
    y: y - nameSize,
    size: nameSize,
    font: fontBold,
    color: colorPrimary,
  });
  y -= (nameSize + 8);

  // Contact line & Social Links
  const contactParts: string[] = [];
  if (data.contact?.email) contactParts.push(data.contact.email);
  if (data.contact?.phone) contactParts.push(data.contact.phone);
  if (data.contact?.location) contactParts.push(data.contact.location);
  if (data.social_links?.linkedin) contactParts.push(data.social_links.linkedin.replace(/^https?:\/\/(www\.)?/, ''));
  if (data.social_links?.github) contactParts.push(data.social_links.github.replace(/^https?:\/\/(www\.)?/, ''));
  if (data.social_links?.portfolio) contactParts.push(data.social_links.portfolio.replace(/^https?:\/\/(www\.)?/, ''));

  if (contactParts.length > 0) {
    const contactLine = contactParts.join('   |   ');
    const contactLines = wrapText(contactLine, fontRegular, 8.5, contentWidth);
    for (const line of contactLines) {
      ensureSpace(12);
      currentPage.drawText(line, {
        x: margin,
        y: y - 8.5,
        size: 8.5,
        font: fontRegular,
        color: colorSecondary,
      });
      y -= 12;
    }
  }

  // Horizontal silver hairline rule
  y -= 4;
  currentPage.drawLine({
    start: { x: margin, y },
    end: { x: pageWidth - margin, y },
    thickness: 0.8,
    color: colorBorder,
  });
  y -= 16;

  // --- Section Heading Drawer ---
  const renderSectionHeader = (title: string) => {
    ensureSpace(28);
    currentPage.drawText(title.toUpperCase(), {
      x: margin,
      y: y - 10,
      size: 10,
      font: fontBold,
      color: colorPrimary,
    });
    y -= 14;
    currentPage.drawLine({
      start: { x: margin, y },
      end: { x: pageWidth - margin, y },
      thickness: 0.5,
      color: colorBorder,
    });
    y -= 10;
  };

  // --- Renderers for Each Section ---

  const renderSummary = () => {
    if (!data.summary?.trim()) return;
    renderSectionHeader('Professional Summary');
    const lines = wrapText(data.summary.trim(), fontRegular, 9, contentWidth);
    for (const line of lines) {
      ensureSpace(13);
      currentPage.drawText(line, {
        x: margin,
        y: y - 9,
        size: 9,
        font: fontRegular,
        color: colorPrimary,
      });
      y -= 13;
    }
    y -= 8;
  };

  const renderSkills = () => {
    const { languages = [], frameworks = [], databases = [], tools = [] } = data.skills || {};
    const hasAnySkill = languages.length > 0 || frameworks.length > 0 || databases.length > 0 || tools.length > 0;
    if (!hasAnySkill) return;

    renderSectionHeader('Technical Skills');
    const categories: [string, string[]][] = [
      ['Languages', languages],
      ['Frameworks & Libraries', frameworks],
      ['Databases & Storage', databases],
      ['Tools & Technologies', tools],
    ];

    for (const [catName, list] of categories) {
      if (list && list.length > 0) {
        const catLabel = `${catName}: `;
        const labelWidth = fontBold.widthOfTextAtSize(catLabel, 9);
        const skillText = list.join(', ');
        const lines = wrapText(skillText, fontRegular, 9, contentWidth - labelWidth - 6);

        ensureSpace(13);
        currentPage.drawText(catLabel, {
          x: margin,
          y: y - 9,
          size: 9,
          font: fontBold,
          color: colorPrimary,
        });

        if (lines.length > 0) {
          currentPage.drawText(lines[0], {
            x: margin + labelWidth,
            y: y - 9,
            size: 9,
            font: fontRegular,
            color: colorSecondary,
          });
          y -= 13;

          for (let i = 1; i < lines.length; i++) {
            ensureSpace(13);
            currentPage.drawText(lines[i], {
              x: margin + labelWidth,
              y: y - 9,
              size: 9,
              font: fontRegular,
              color: colorSecondary,
            });
            y -= 13;
          }
        }
      }
    }
    y -= 8;
  };

  const renderExperience = () => {
    if (!data.experience || data.experience.length === 0) return;
    renderSectionHeader('Experience');

    for (const exp of data.experience) {
      if (!exp.role && !exp.company) continue;

      ensureSpace(15);
      // Role (Bold) and Dates (Right aligned)
      const roleText = exp.role || 'Role';
      currentPage.drawText(roleText, {
        x: margin,
        y: y - 9.5,
        size: 9.5,
        font: fontBold,
        color: colorPrimary,
      });

      const dateStr = [exp.start_date, exp.end_date].filter(Boolean).join(' - ');
      if (dateStr) {
        const dateWidth = fontRegular.widthOfTextAtSize(dateStr, 8.5);
        currentPage.drawText(dateStr, {
          x: pageWidth - margin - dateWidth,
          y: y - 9,
          size: 8.5,
          font: fontRegular,
          color: colorMuted,
        });
      }
      y -= 13;

      // Company and Location
      ensureSpace(13);
      const companyLocation = [exp.company, exp.location].filter(Boolean).join(' · ');
      if (companyLocation) {
        currentPage.drawText(companyLocation, {
          x: margin,
          y: y - 8.5,
          size: 8.5,
          font: fontOblique,
          color: colorSecondary,
        });
        y -= 12;
      }

      // Bullet points
      if (exp.description && exp.description.length > 0) {
        for (const bullet of exp.description) {
          if (!bullet.trim()) continue;
          const bulletLines = wrapText(bullet.trim(), fontRegular, 8.5, contentWidth - 14);
          for (let i = 0; i < bulletLines.length; i++) {
            ensureSpace(11.5);
            if (i === 0) {
              currentPage.drawText('•', {
                x: margin + 3,
                y: y - 8.5,
                size: 8.5,
                font: fontRegular,
                color: colorSecondary,
              });
            }
            currentPage.drawText(bulletLines[i], {
              x: margin + 12,
              y: y - 8.5,
              size: 8.5,
              font: fontRegular,
              color: colorPrimary,
            });
            y -= 11.5;
          }
        }
      }
      y -= 6;
    }
    y -= 4;
  };

  const renderProjects = () => {
    if (!data.projects || data.projects.length === 0) return;
    renderSectionHeader('Projects');

    for (const proj of data.projects) {
      if (!proj.name) continue;

      ensureSpace(15);
      const projName = proj.name;
      currentPage.drawText(projName, {
        x: margin,
        y: y - 9.5,
        size: 9.5,
        font: fontBold,
        color: colorPrimary,
      });

      if (proj.link) {
        const linkText = proj.link.replace(/^https?:\/\/(www\.)?/, '');
        const linkWidth = fontRegular.widthOfTextAtSize(linkText, 8);
        currentPage.drawText(linkText, {
          x: pageWidth - margin - linkWidth,
          y: y - 9,
          size: 8,
          font: fontRegular,
          color: colorSecondary,
        });
      }
      y -= 13;

      if (proj.technologies && proj.technologies.length > 0) {
        ensureSpace(12);
        const techStr = `Technologies: ${proj.technologies.join(', ')}`;
        const techLines = wrapText(techStr, fontOblique, 8, contentWidth);
        for (const line of techLines) {
          currentPage.drawText(line, {
            x: margin,
            y: y - 8,
            size: 8,
            font: fontOblique,
            color: colorSecondary,
          });
          y -= 11;
        }
      }

      if (proj.description) {
        const descLines = wrapText(proj.description, fontRegular, 8.5, contentWidth);
        for (const line of descLines) {
          ensureSpace(11.5);
          currentPage.drawText(line, {
            x: margin,
            y: y - 8.5,
            size: 8.5,
            font: fontRegular,
            color: colorPrimary,
          });
          y -= 11.5;
        }
      }
      y -= 6;
    }
    y -= 4;
  };

  const renderAchievements = () => {
    if (!data.achievements || data.achievements.length === 0) return;
    renderSectionHeader('Honors & Achievements');

    for (const ach of data.achievements) {
      if (!ach.title) continue;

      ensureSpace(15);
      currentPage.drawText(ach.title, {
        x: margin,
        y: y - 9.5,
        size: 9.5,
        font: fontBold,
        color: colorPrimary,
      });

      if (ach.date) {
        const dateWidth = fontRegular.widthOfTextAtSize(ach.date, 8.5);
        currentPage.drawText(ach.date, {
          x: pageWidth - margin - dateWidth,
          y: y - 9,
          size: 8.5,
          font: fontRegular,
          color: colorMuted,
        });
      }
      y -= 13;

      if (ach.description) {
        const descLines = wrapText(ach.description, fontRegular, 8.5, contentWidth);
        for (const line of descLines) {
          ensureSpace(11.5);
          currentPage.drawText(line, {
            x: margin,
            y: y - 8.5,
            size: 8.5,
            font: fontRegular,
            color: colorSecondary,
          });
          y -= 11.5;
        }
      }
      y -= 6;
    }
    y -= 4;
  };

  const renderEducation = () => {
    if (!data.education || data.education.length === 0) return;
    renderSectionHeader('Education');

    for (const edu of data.education) {
      if (!edu.institution && !edu.degree) continue;

      ensureSpace(15);
      const degreeStudy = [edu.degree, edu.field_of_study].filter(Boolean).join(' in ');
      currentPage.drawText(degreeStudy || edu.institution, {
        x: margin,
        y: y - 9.5,
        size: 9.5,
        font: fontBold,
        color: colorPrimary,
      });

      const dateStr = [edu.start_date, edu.end_date].filter(Boolean).join(' - ');
      if (dateStr) {
        const dateWidth = fontRegular.widthOfTextAtSize(dateStr, 8.5);
        currentPage.drawText(dateStr, {
          x: pageWidth - margin - dateWidth,
          y: y - 9,
          size: 8.5,
          font: fontRegular,
          color: colorMuted,
        });
      }
      y -= 13;

      ensureSpace(13);
      const subLineParts = [];
      if (edu.institution && degreeStudy) subLineParts.push(edu.institution);
      if (edu.grade) subLineParts.push(`Grade / CGPA: ${edu.grade}`);

      if (subLineParts.length > 0) {
        currentPage.drawText(subLineParts.join(' · '), {
          x: margin,
          y: y - 8.5,
          size: 8.5,
          font: fontRegular,
          color: colorSecondary,
        });
        y -= 12;
      }
      y -= 4;
    }
    y -= 4;
  };

  // --- Execute Dynamic Section Order ---
  const order = data.section_order || [
    'summary',
    'skills',
    'experience',
    'projects',
    'achievements',
    'education',
  ];

  for (const section of order) {
    switch (section) {
      case 'summary':
        renderSummary();
        break;
      case 'skills':
        renderSkills();
        break;
      case 'experience':
        renderExperience();
        break;
      case 'projects':
        renderProjects();
        break;
      case 'achievements':
        renderAchievements();
        break;
      case 'education':
        renderEducation();
        break;
      default:
        break;
    }
  }

  return await pdfDoc.save();
}
