import React from "react";
import clsx from "clsx";
import { FieldErrors, UseFormRegister } from "react-hook-form";

import styles from "./Input.module.css";

type TextAreaType = {
  rows: number;
  cols: number;
};

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  id: string;
  type?: string;
  textArea?: TextAreaType;
  height?: number;
  errors?: FieldErrors;
  disabled?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>;
  forwardRef?: React.Ref<HTMLInputElement | HTMLTextAreaElement | null>;
}

export const Input = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement | null,
  InputProps
>(
  (
    { label, id, type, textArea, height, errors, disabled, register, ...props },
    ref
  ) => {
    return (
      <div className={styles.container}>
        {label && <label htmlFor={id}>{label}</label>}
        {!textArea ? (
          <input
            id={id}
            type={type}
            autoComplete={id}
            disabled={disabled}
            className={clsx(`
                    ${styles.input}
                    ${disabled && styles.inputDisabled}
                    ${errors && styles.inputError}
                `)}
            {...(register ? register(id) : {})}
            {...props}
            ref={ref as React.Ref<HTMLInputElement>}
          />
        ) : (
          <textarea
            id={id}
            autoComplete={id}
            disabled={disabled}
            className={clsx(`
                  ${styles.input}
                  ${disabled && styles.inputDisabled}
                  ${errors && styles.inputError}
              `)}
            {...(register ? register(id) : {})}
            {...props}
            defaultValue={props.defaultValue}
            ref={ref as React.Ref<HTMLTextAreaElement>}
            style={{ height: height + "px" }}
          ></textarea>
        )}
        <div className={styles.inputWrapper}></div>
      </div>
    );
  }
);
