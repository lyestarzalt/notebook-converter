import { useState } from 'react';
import { UploadComponent } from '@components/UploadComponent/UploadComponent';
import { DownloadButtonComponent } from '@components/DownloadButtonComponent/DownloadButtonComponent';

export default function HomePage() {
  const [pythonCode, setPythonCode] = useState<string | null>(null);

  const handleFileProcessed = (code: string) => {
    setPythonCode(code);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <UploadComponent onFileProcessed={handleFileProcessed} />
      {pythonCode && (
        <>
          <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', backgroundColor: '#f4f4f4', padding: '10px', borderRadius: '4px', marginTop: '20px' }}>
            {pythonCode}
          </pre>
          <DownloadButtonComponent pythonCode={pythonCode} fileName="converted_file.ipynb" />
        </>
      )}
    </div>
  );
}
