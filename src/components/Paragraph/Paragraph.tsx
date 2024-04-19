import { useState } from "react";
import { createReviewSchema } from "../../schema/review";
import { CreateReview } from "../../schema/review";
import { Type } from "../../types/FileObject";
import { MdModeEditOutline } from "react-icons/md";
import { IoIosExit } from "react-icons/io";

import styles from "./Paragraph.module.css";
import { Input } from "../Input/Input";
import clsx from "clsx";
import { Button } from "../Button/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import React from "react";

interface ParagraphProps {
  paragraph: {
    id: number;
    type: Type;
    comment: string;
    text: string;
  };
  onSave: (
    data: {
      commentsParagraph: string;
      type: boolean;
    },
    paragraphId: number
  ) => void;
}
// Failed attempt to memoize a component, developer needs more time
/*
  the second operand in react.memo...
  (prev, next) => {
    return (
      prev.paragraph.comment === next.paragraph.comment &&
      prev.paragraph.type === next.paragraph.type
    );
  }
*/
const Paragraph = React.memo(({ paragraph, onSave }: ParagraphProps) => {
  console.log("render paragraph");
  const [isIconClicked, setIsIconClicked] = useState(false);
  const [checked, setChecked] = useState(
    paragraph.type == Type.INCORRECT ? false : true
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    // reset,
  } = useForm<CreateReview>({
    resolver: zodResolver(createReviewSchema),
  });

  const handleIconClick = () => {
    setIsIconClicked(!isIconClicked);
  };

  function handleChange() {
    setChecked(!checked);
  }

  const saveReview: SubmitHandler<CreateReview> = async (data) => {
    onSave(
      {
        commentsParagraph: data.commentsParagraph || paragraph.comment,
        type: checked,
      },
      paragraph.id
    );
    setIsIconClicked(false);
    // reset();
  };

  return (
    <>
      <div
        className={clsx(`
        ${styles.container}
        ${paragraph.type === Type.CORRECT && styles.correct}
        ${paragraph.type === Type.INCORRECT && styles.incorrect}
        `)}
      >
        <div className={styles.icon} onClick={handleIconClick}>
          <MdModeEditOutline size={20} />
        </div>
        {paragraph.text}
        {isIconClicked && (
          <form
            onSubmit={handleSubmit(saveReview)}
            className={styles.reviewBlock}
          >
            <IoIosExit
              className={styles.exit}
              size={20}
              onClick={handleIconClick}
            />
            <label className={styles.checkboxContainer}>
              Корректен
              <input
                className={styles.checkbox}
                type="checkbox"
                checked={checked}
                onChange={handleChange}
              />
            </label>
            <Controller
              name="commentsParagraph"
              control={control}
              render={({ field }) => (
                <Input
                  id="commentsParagraph"
                  label="Комментарий"
                  defaultValue={paragraph.comment}
                  textArea={{ rows: 3, cols: 3 }}
                  height={60}
                  register={register}
                  errors={errors}
                  {...field}
                />
              )}
            />
            <Button text="Сохранить" type="submit" />
          </form>
        )}
      </div>
    </>
  );
});

export default Paragraph;
