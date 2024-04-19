import { FileObject } from "../types/FileObject";
import { Type } from "../types/FileObject";

type ParsedFile = {
  commentMain: string;
  paragraphs: FileObject[];
};

export const checkFile = async (file: File): Promise<ParsedFile> => {
  return new Promise<ParsedFile>((resolve, reject) => {
    try {
      const reader = new FileReader();

      reader.onload = () => {
        if (file.name.endsWith(".txt")) {
          const contents = reader.result?.toString().split("\n");
          if (contents) {
            const objectsArray = contents.map((item, index) => ({
              id: index,
              type: Type.DEFAULT,
              comment: "",
              text: item,
            }));
            resolve({ commentMain: "", paragraphs: objectsArray });
          } else {
            reject("Error reading the file");
          }
        }
        if (file.name.endsWith(".json")) {
          const json = JSON.parse(reader.result!.toString());
          resolve({ commentMain: json.comment, paragraphs: json.paragraphs });
        }
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsText(file);
    } catch (error) {
      reject(error);
    }
  });
};

export const saveFile = (paragraphs: FileObject[], comment: string) => {
  const a = document.createElement("a");
  const data = {
    paragraphs: paragraphs,
    comment: comment,
  };
  const file = new Blob([JSON.stringify(data)], {
    type: "application/json",
  });
  a.href = URL.createObjectURL(file);
  a.download = "res.json";
  a.click();
};
