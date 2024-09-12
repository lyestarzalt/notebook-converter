import Prism from 'prismjs';
import { useEffect } from 'react';
import { Box } from '@mantine/core';
import 'prismjs/themes/prism-tomorrow.css'; 
import 'prismjs/components/prism-python'; 

interface CodePreviewComponentProps {
  pythonCode: string;
  fileName: string;
}

export function CodePreviewComponent({ pythonCode }: CodePreviewComponentProps) {
  useEffect(() => {
    Prism.highlightAll(); // Highlight the code
  }, [pythonCode]);

  return (
    <Box>
      <pre>
        <code className="language-python">{pythonCode}</code>
      </pre>
    </Box>
  );
}
