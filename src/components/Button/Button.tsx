import React from "react";
import clsx from "clsx";
import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  view?: "default" | "warning";
  disabled?: boolean;
  /** This property is applicable only when the 'view' prop is set to 'default'. */
  children?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ text, view = "default", type = "button", disabled, ...props }, ref) => {
    // const formCtx = useContext(formContext);
    // const disabled = formCtx.disabled || internalDisabled;

    return (
      <button
        className={clsx(`
        ${styles.button}
        ${view === "warning" && styles.warning}
        `)}
        ref={ref}
        type={type}
        disabled={disabled}
        {...props}
      >
        <div className={styles.content}>{text}</div>
      </button>
    );
  }
);
