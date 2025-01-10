import React, { CSSProperties } from "react";
import "./index.scss";

export interface ButtonProps {
  style: CSSProperties | undefined;
  label: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  type?: string;
}

const Button: React.FC<ButtonProps> = ({ style, label, onClick, type }) => {
  console.log("label ", label, "type", type);
  const buttonClass = type === "ADD" ? "button-add" : "button-cancel";
  console.log("buttonClass ", buttonClass);
  return (
    <button style={style} className={`button ${buttonClass}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
