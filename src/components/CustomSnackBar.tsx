import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export type SnackbarType = "success" | "error";

export interface CustomSnackbarProps {
  open: boolean;
  onClose: () => void;
  message: string;
  type: SnackbarType;
}

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({
  open,
  onClose,
  message,
  type,
}) => {
  const getIcon = (type: SnackbarType) => {
    switch (type) {
      case "success":
        return <CheckCircleIcon style={{ marginRight: 8, color: "white" }} />;
      case "error":
        return <ErrorIcon style={{ marginRight: 8, color: "white" }} />;
      default:
        return null;
    }
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        onClose={onClose}
         severity={type}
        icon={false} // We'll add our own icon
        sx={{ display: "flex", alignItems: "center" ,fontFamily:'poppins'}}
      > 
        {getIcon(type)}
        {message}
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={onClose}
          sx={{ marginLeft: "auto" }}
        >
        </IconButton>
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
