import React from "react";
import "./index.scss";
import Button from "../button";

export interface ModalProps {
  isOpen: boolean;
  title: string;
  buttonLabel: string;
  onClose?: (event: React.MouseEvent<HTMLElement>) => void;
  OnAdd?: (event: React.MouseEvent<HTMLElement>) => void;
  children?: React.ReactNode;
}

const AddTask = ({ isOpen, onClose, OnAdd, buttonLabel,  title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <header className="modal-header">
          <h3>{title}</h3>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </header>
        <div className="modal-content">{children}</div>
        <footer className="modal-footer">
          <Button
            style={{ marginTop: "10px" }}
            label={buttonLabel}
            onClick={OnAdd}
            type="ADD"
          />{" "}
          <Button
            style={{ marginTop: "10px" }}
            label="Cancel"
            onClick={onClose}
            type="Cancel"
          />
        </footer>
      </div>
    </div>
  );
};

export default AddTask;
