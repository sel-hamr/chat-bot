import { useCallback, useRef, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createChatbotAction } from "@/lib/action";
import { toast } from "sonner";

const MAX_FILE_SIZE_MB = 3;
const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024;
const ACCEPTED_FILE_MIME_TYPES = new Set(["application/pdf"]);
const ACCEPTED_FILE_EXTENSIONS = new Set([".pdf"]);

const fileSchema = z
  .custom<File | undefined>(
    (value) => value === undefined || value instanceof File,
    {
      message: "Unsupported file type. Upload a PDF.",
    }
  )
  .refine((file) => (file ? file.size <= MAX_FILE_SIZE : true), {
    message: `File must be smaller than ${MAX_FILE_SIZE_MB}MB.`,
  })
  .refine((file) => (file ? ACCEPTED_FILE_MIME_TYPES.has(file.type) : true), {
    message: "Unsupported file type. Upload a PDF.",
  });

const formSchema = z.object({
  email: z.string().email({ message: "Please provide a valid email." }),
  url: z.string().url({ message: "Please provide a valid URL." }),
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." })
    .max(32, { message: "Username must be at most 32 characters." }),
  file: fileSchema,
});

export type ChatBotFormValues = z.infer<typeof formSchema>;

const DEFAULT_VALUES: ChatBotFormValues = {
  email: "",
  url: "",
  username: "",
  file: undefined as unknown as File,
};

const ACCEPT_ATTRIBUTE = Array.from(ACCEPTED_FILE_EXTENSIONS).join(",");
const FILE_REQUIREMENTS_LABEL = `PDF only (max ${MAX_FILE_SIZE_MB}MB)`;

const formatKilobytes = (bytes: number) => `${(bytes / 1024).toFixed(1)} KB`;

const buildFormData = (values: ChatBotFormValues) => {
  const payload = new FormData();
  payload.append("email", values.email);
  payload.append("url", values.url);
  payload.append("username", values.username);
  if (values.file) payload.append("file", values.file);
  return payload;
};

export const useChatBotForm = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<ChatBotFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onBlur",
  });

  const { setValue, clearErrors, setError, watch, reset } = form;

  const fileValue = watch("file");
  const file = fileValue instanceof File ? fileValue : undefined;

  const applyFile = useCallback(
    (nextFile: File | null) => {
      if (!nextFile) {
        setValue("file", undefined as unknown as File, {
          shouldDirty: true,
          shouldTouch: true,
          shouldValidate: true,
        });
        clearErrors("file");
        return;
      }

      if (nextFile.size > MAX_FILE_SIZE) {
        setError("file", {
          type: "manual",
          message: `File must be smaller than ${MAX_FILE_SIZE_MB}MB.`,
        });
        return;
      }

      if (!ACCEPTED_FILE_MIME_TYPES.has(nextFile.type)) {
        setError("file", {
          type: "manual",
          message: "Unsupported file type. Upload a PDF.",
        });
        return;
      }

      clearErrors("file");
      setValue("file", nextFile as unknown as File, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    },
    [clearErrors, setError, setValue]
  );

  const handleRemoveFile = useCallback(() => {
    applyFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [applyFile]);

  const handleSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const payload = buildFormData(values);
      const result = await createChatbotAction(payload);
      if (!result.ok) {
        toast.error("Failed to create chatbot.", {
          description: result.error || "Please try again later.",
          duration: 8000,
        });
      }
      toast.success("Chatbot created successfully!", {
        description: "You will receive an email with further instructions.",
        duration: 8000,
      });

      reset(DEFAULT_VALUES);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    });
  });

  return {
    form,
    file,
    fileInputRef,
    acceptAttribute: ACCEPT_ATTRIBUTE,
    fileRequirementsLabel: FILE_REQUIREMENTS_LABEL,
    formatFileSize: formatKilobytes,
    applyFile,
    handleRemoveFile,
    handleSubmit,
    isSubmitting: form.formState.isSubmitting,
    isPending,
    isLoading: form.formState.isSubmitting || isPending,
  };
};
