export const convertNotebookToPython = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      try {
        const content = fileReader.result as string;
        const notebookJson = JSON.parse(content);

        // Extract the Python code from the "cells" in the notebook
        const pythonCode = notebookJson.cells
          .filter((cell: any) => cell.cell_type === "code")
          .map((cell: any) => cell.source.join(""))
          .join("\n\n");

        resolve(pythonCode);
      } catch (error) {
        reject("Error parsing notebook file.");
      }
    };

    fileReader.onerror = () => reject("File could not be read.");
    fileReader.readAsText(file);
  });
};
