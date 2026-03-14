'use client';

interface CertificateViewerProps {
  pdfUrl: string;
}

export default function CertificateViewer({ pdfUrl }: CertificateViewerProps) {
  return (
    <iframe
      src={pdfUrl}
      className="w-full h-full border-0"
      title="Certificate PDF"
      style={{ minHeight: '100%' }}
    />
  );
}
