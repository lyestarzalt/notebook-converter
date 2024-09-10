"use client"; // This ensures that the component is a Client Component

import {useState} from 'react';
import { Dropzone } from '@mantine/dropzone';
import { Group, Text, Button, Input } from '@mantine/core';
import { IconUpload, IconX, IconFile } from '@tabler/icons-react';

export function UploadComponent() {
  const [files, setFiles] = useState<File[]>([]);
  const [githubUrl, setGithubUrl] = useState('');

  const handleDrop = (droppedFiles: File[]) => {
    setFiles(droppedFiles);
    // Process the dropped files (send to FastAPI or other backend)
  };

  const handleSubmit = () => {
    // Handle form submission, either files or GitHub URL
    if (files.length) {
      console.log('Submitting files:', files);
      // Send files to backend (FastAPI)
    }
    if (githubUrl) {
      console.log('Submitting GitHub URL:', githubUrl);
      // Send GitHub URL to backend (FastAPI)
    }
  };

  return (
    <div>
      {/* Dropzone for File Upload */}
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

      {/* Input for GitHub URL */}
      <Input
        placeholder="Enter GitHub Repo URL"
        value={githubUrl}
        onChange={(e) => setGithubUrl(e.currentTarget.value)}
        mt="md"
      />

      {/* Submit Button */}
      <Group justify="center" mt="md">
        <Button onClick={handleSubmit}>Submit</Button>
      </Group>
    </div>
  );
}
