import { ResumeData } from '../types/resume';

/**
 * Service to submit resume JSON to POST /resume/generate and trigger browser download
 */

export interface GeneratePdfOptions {
  apiUrl?: string;
}

export async function submitResumeForPdf(
  resumeData: ResumeData, 
  options: GeneratePdfOptions = {}
): Promise<{ success: boolean; filename: string; source: 'server' }> {
  const endpoint = options.apiUrl?.trim() || '/resume/generate';
  const cleanName = (resumeData.full_name || 'Resume')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '') || 'resume';
  const filename = `${cleanName}_resume.pdf`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/pdf',
    },
    body: JSON.stringify(resumeData),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown server error');
    throw new Error(`Server returned ${response.status}: ${errorText || response.statusText}`);
  }

  const blob = await response.blob();

  downloadPdfBlob(blob, filename);

  return { success: true, filename, source: 'server' };
}

/**
 * Triggers native browser download dialog from a Blob
 */
export function downloadPdfBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  // Clean up object URL after short delay
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
