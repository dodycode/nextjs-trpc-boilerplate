"use client";

import type { ReactNode } from "react";
import type React from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./alert-dialog";
import { Button } from "./button";

interface ConfirmationOptions {
  title: string;
  description: string | ReactNode;
  variant?: "primary" | "destructive";
  onConfirm: () => Promise<void>;
  confirmText?: string;
  cancelText?: string;
  onCancel?: () => void;
  timer?: number;
}

interface ConfirmationContextType {
  confirm: (options: ConfirmationOptions) => Promise<void>;
}

const ConfirmationContext = createContext<ConfirmationContextType | undefined>(
  undefined,
);

export const useConfirm = () => {
  const context = useContext(ConfirmationContext);
  if (!context) {
    throw new Error("useConfirm must be used within a ConfirmationProvider");
  }
  return context.confirm;
};

export const ConfirmationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [options, setOptions] = useState<ConfirmationOptions | null>(null);
  const [loading, setLoading] = useState(false);

  const confirm = useCallback((options: ConfirmationOptions) => {
    return new Promise<void>((resolve, reject) => {
      setOptions({
        ...options,
        onConfirm: async () => {
          setLoading(true);
          try {
            await options.onConfirm();
            resolve();
          } catch (error) {
            reject(error as Error);
          } finally {
            setLoading(false);
            setOptions(null);
          }
        },
        onCancel: () => {
          setOptions(null);
          setLoading(false);
          options?.onCancel?.();
        },
      });
    });
  }, []);

  const handleClose = useCallback(() => {
    if (!loading) {
      setOptions(null);
    }
  }, [loading]);

  return (
    <ConfirmationContext.Provider value={{ confirm }}>
      {children}
      <ConfirmationDialog
        options={options}
        onClose={handleClose}
        loading={loading}
      />
    </ConfirmationContext.Provider>
  );
};

const ConfirmationDialog: React.FC<{
  options: ConfirmationOptions | null;
  onClose: () => void;
  loading: boolean;
}> = ({ options, onClose, loading }) => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    if (options?.timer) {
      setTimeLeft(options.timer);
      const interval = setInterval(() => {
        setTimeLeft((prevTime) =>
          prevTime !== null && prevTime > 0 ? prevTime - 1 : 0,
        );
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [options]);

  if (!options) return null;

  const {
    title,
    description,
    variant = "primary",
    onConfirm,
    confirmText = "Confirm",
    cancelText = "Cancel",
    onCancel,
  } = options;

  const handleConfirm = () => {
    if (timeLeft === 0 || timeLeft === null) {
      void onConfirm();
    }
  };

  return (
    <AlertDialog open={!!options} onOpenChange={onClose}>
      <AlertDialogContent
        onEscapeKeyDown={onCancel}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div>{description}</div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            variant="outline"
            disabled={loading}
            onClick={onCancel}
            autoFocus={false}
          >
            {cancelText}
          </Button>

          <Button
            variant={variant}
            onClick={handleConfirm}
            isLoading={loading}
            disabled={timeLeft !== null && timeLeft > 0}
          >
            {timeLeft !== null && timeLeft > 0
              ? `${confirmText} (${timeLeft}s)`
              : confirmText}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
