import { ChangeEvent, useState } from "react";
import { FileObject, Type } from "../../types/FileObject";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { checkFile, saveFile } from "../../utils/data";
import Paragraph from "../Paragraph/Paragraph";
import styles from "./Marking.module.css";

function Marking() {
  const [file, setFile] = useState(false);
  const [paragraphs, setParagraphs] = useState<FileObject[]>([]);
  const [mainComment, setMainComment] = useState("");

  const uploadFile = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const res = await checkFile(file);
      setParagraphs(res.paragraphs);
      setMainComment(res.commentMain);
      setFile(true);
    }
  };

  const onSaveFile = (event: { preventDefault: () => void }) => {
    event?.preventDefault();
    saveFile(paragraphs, mainComment);
  };

  const handleSaveReview = (
    data: { commentsParagraph: string; type: boolean },
    paragraphId: number
  ) => {
    const updatedParagraphs = paragraphs.map((p) =>
      p.id === paragraphId
        ? {
            ...p,
            comment: data.commentsParagraph,
            type: data.type ? Type.CORRECT : Type.INCORRECT,
          }
        : p
    );
    setParagraphs(updatedParagraphs);
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Разметка данных</h2>
      <div className={styles.container}>
        <div className={styles.marking}>
          {paragraphs.map((paragraph) => (
            <Paragraph
              key={paragraph.id}
              paragraph={paragraph}
              onSave={handleSaveReview}
            />
          ))}
        </div>
        <div className={styles.footer}>
          <Input
            id="Upload"
            type="file"
            label="Загрузить новый файл"
            onChange={(e: ChangeEvent<HTMLInputElement>) => uploadFile(e)}
          />
          <div className={styles.sendForm}>
            <Input
              id="Comment"
              label="Комментарий"
              textArea={{ rows: 5, cols: 5 }}
              height={100}
              disabled={!file}
              value={mainComment}
              onChange={(e) => setMainComment(e.target.value)}
            />
            <Button text="Сохранить" disabled={!file} onClick={onSaveFile} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Marking;
