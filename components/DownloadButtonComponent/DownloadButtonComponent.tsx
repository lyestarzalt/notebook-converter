import { Button } from '@mantine/core';
import { IconDownload } from '@tabler/icons-react';

interface DownloadButtonComponentProps {
  pythonCode: string;
  fileName: string;
}

export function DownloadButtonComponent({ pythonCode, fileName }: DownloadButtonComponentProps) {
  const handleDownload = () => {
    const blob = new Blob([pythonCode], { type: 'text/x-python' });
    const downloadUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = fileName.replace('.ipynb', '.py');
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <Button onClick={handleDownload} leftSection={<IconDownload size={16} />}>
      Download
    </Button>
  );
}
