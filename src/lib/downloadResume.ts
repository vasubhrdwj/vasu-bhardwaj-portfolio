import { assetUrl } from '@/lib/assets';

const RESUME_PATH = 'resume.pdf';
const RESUME_FILENAME = 'VasuBhardwaj_Resume.pdf';

/** Trigger a resume download; opens in a new tab if the file is missing. */
export function downloadResume(): void {
  const url = assetUrl(RESUME_PATH);

  const link = document.createElement('a');
  link.href = url;
  link.download = RESUME_FILENAME;
  link.rel = 'noopener';
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
