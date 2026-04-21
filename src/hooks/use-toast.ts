import { toast as sonnerToast } from "sonner";

type ToastInput = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
};

export function useToast() {
  return {
    toast: ({ title, description, variant }: ToastInput) => {
      if (variant === "destructive") {
        sonnerToast.error(title || "Error", { description });
      } else {
        sonnerToast(title || "", { description });
      }
    },
  };
}

export const toast = (input: ToastInput) => {
  if (input.variant === "destructive") {
    sonnerToast.error(input.title || "Error", { description: input.description });
  } else {
    sonnerToast(input.title || "", { description: input.description });
  }
};
