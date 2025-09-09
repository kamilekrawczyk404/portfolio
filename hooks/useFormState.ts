import { useCallback, useEffect, useState, useTransition } from "react";

type FormState<T> =
  | {
      status: "idle";
    }
  | { status: "pending" }
  | { status: "error"; message: string }
  | { status: "success"; data?: T };

export const useFormState = <T extends unknown>() => {
  const [formState, setFormState] = useState<FormState<T>>({ status: "idle" });
  const [isPending, startTransition] = useTransition();

  const onError = useCallback((message: string) => {
    setFormState({ status: "error", message });
  }, []);

  const onSuccess = useCallback((data?: T) => {
    setFormState({ status: "success", data });
  }, []);

  useEffect(() => {
    if (isPending) {
      setFormState({ status: "pending" });
    }
  }, [isPending]);

  useEffect(() => {
    if (formState.status === "success") {
      setTimeout(() => {
        setFormState({ status: "idle" });
      }, 2000);
    }
  }, [formState]);

  console.log("is pending", isPending, formState);

  return {
    submit: startTransition,
    onError,
    onSuccess,
    isSuccess: formState.status === "success",
    isPending: formState.status === "pending",
  };
};
