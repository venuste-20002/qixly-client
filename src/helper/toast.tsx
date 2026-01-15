import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ToastType = "default" | "success" | "error" | "info" | "warning";

export const showToast = (message: string, type: ToastType = "default") => {
  toast(message, {
    type,
  });
};
