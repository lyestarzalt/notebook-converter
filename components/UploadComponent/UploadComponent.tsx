import { useState, useEffect } from 'react';
import { Dropzone } from '@mantine/dropzone';
import { Group, Text } from '@mantine/core';
import { IconUpload, IconX, IconFile } from '@tabler/icons-react';

interface UploadComponentProps {
  onFileProcessed: (code: string) => void;
}

export function UploadComponent({ onFileProcessed }: UploadComponentProps) {
  const [files, setFiles] = useState<File[]>([]);

  const handleDrop = (droppedFiles: File[]) => {
    setFiles(droppedFiles);
  };

  useEffect(() => {
    if (files.length > 0) {
      const file = files[0];
      const fileReader = new FileReader();

      fileReader.onload = () => {
        const content = fileReader.result as string;
        const notebookJson = JSON.parse(content);

        // Extract Python code from notebook cells
        const pythonCode = notebookJson.cells
          .filter((cell: any) => cell.cell_type === 'code')
          .map((cell: any) => cell.source.join(''))
          .join('\n\n');

        // Pass the extracted code to the parent component
        onFileProcessed(pythonCode);
      };

      fileReader.readAsText(file);
    }
  }, [files, onFileProcessed]);

  return (
    <div>
      <Dropzone onDrop={handleDrop} accept={{ 'application/x-ipynb+json': ['.ipynb'] }}>
        <Group justify="center" gap="xl" mih={200} style={{ pointerEvents: 'none' }}>
          <Dropzone.Accept>
            <IconUpload size={50} stroke={1.5} />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX size={50} stroke={1.5} />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconFile size={50} stroke={1.5} />
          </Dropzone.Idle>
          <div>
            <Text size="xl" inline>
              Drag your `.ipynb` file here or click to upload
            </Text>
            <Text size="sm" c="dimmed" inline mt={7}>
              Only Jupyter Notebook files (.ipynb) are accepted
            </Text>
          </div>
        </Group>
      </Dropzone>
    </div>
  );
}
