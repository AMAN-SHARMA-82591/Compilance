import { Button } from "@mui/material";
import React from "react";

function PageHeader({
  title,
  buttonTitle,
  submitBtnTitle,
  onClick,
  onSubmit,
  children,
}) {
  return (
    <header>
      <div className="page-header">
        <h1>{title && title}</h1>
        <div>
          {onClick && (
            <Button
              onClick={onClick}
              variant="contained"
              style={{ margin: "0px 5px" }}
            >
              {buttonTitle ? buttonTitle : "Button"}
            </Button>
          )}
          {onSubmit && (
            <Button
              onClick={onSubmit}
              variant="contained"
              style={{ margin: "0px 5px" }}
            >
              {submitBtnTitle ? submitBtnTitle : "Button"}
            </Button>
          )}
        </div>
      </div>
      {children && children}
    </header>
  );
}

export default PageHeader;
