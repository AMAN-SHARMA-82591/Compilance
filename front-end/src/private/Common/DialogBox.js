import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";

const ConfirmDialogBox = ({ open, text, onClose, onSubmit, submitBtnText }) => {
  return (
    <Dialog open={open} keepMounted={true} onClose={() => onClose()}>
      <DialogContent sx={{ padding: 4 }}>
        <Typography>{text && text}</Typography>
      </DialogContent>
      <DialogActions sx={{ padding: "20px 32px" }}>
        <Button variant="outlined" size="small" onClick={() => onClose()}>
          Cancel
        </Button>
        <Button
          color="primary"
          variant="contained"
          size="small"
          onClick={() => onSubmit()}
        >
          {submitBtnText && submitBtnText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { ConfirmDialogBox };
