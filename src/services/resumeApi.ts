import { ResumeData } from '../types/resume';
import { generateResumePdfDocument } from '../utils/pdfGenerator';

/**
 * Service to submit resume JSON to POST /resume/generate and trigger browser download
 */

export interface GeneratePdfOptions {
  apiUrl?: string;
  fallbackToClient?: boolean;
}

export async function submitResumeForPdf(
  resumeData: ResumeData, 
  options: GeneratePdfOptions = {}
): Promise<{ success: boolean; filename: string; source: 'server' | 'client' }> {
  const endpoint = options.apiUrl?.trim() || '/resume/generate';
  const cleanName = (resumeData.full_name || 'Resume')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '') || 'resume';
  const filename = `${cleanName}_resume.pdf`;

  try {
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

    const contentType = response.headers.get('content-type');
    // As per specification: Backend returns application/pdf
    const blob = await response.blob();
    
    // Trigger direct browser download
    downloadPdfBlob(blob, filename);

    return { success: true, filename, source: 'server' };
  } catch (error: any) {
    // If external or mock server is unreachable, and fallback is allowed:
    if (options.fallbackToClient !== false) {
      console.warn(`[resumeApi] Remote endpoint ${endpoint} failed (${error.message}). Falling back to local PDF rendering engine.`);
      const pdfBytes = await generateResumePdfDocument(resumeData);
      // Convert Uint8Array to ArrayBuffer for Blob
      const buffer = pdfBytes.buffer.slice(pdfBytes.byteOffset, pdfBytes.byteOffset + pdfBytes.byteLength) as ArrayBuffer;
      const clientBlob = new Blob([buffer], { type: 'application/pdf' });
      downloadPdfBlob(clientBlob, filename);
      return { success: true, filename, source: 'client' };
    }
    throw error;
  }
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
