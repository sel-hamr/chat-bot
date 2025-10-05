"use client";

import { BotMessageSquare } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FileInput } from "@/components/ui/file-input";
import { useChatBotForm } from "@/hooks/use-chatbot-form";

export function ChatBotForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    form,
    file,
    fileInputRef,
    acceptAttribute,
    fileRequirementsLabel,
    formatFileSize,
    applyFile,
    handleRemoveFile,
    handleSubmit,
    isSubmitting,
  } = useChatBotForm();

  return (
    <Form {...form}>
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6"
          noValidate
        >
          <div className="flex flex-col items-center gap-2">
            <a
              href="/"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <BotMessageSquare className="size-10" />
              </div>
              <span className="sr-only">Chatbot-Ai</span>
            </a>
            <h1 className="text-xl font-bold">Welcome to Chatbot-Ai</h1>
            <div className="text-center text-sm">
              Need a chatbot for your website? Fill out the form below to create
              your own AI-powered assistant.
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="m@example.com"
                      autoComplete="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website URL</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="url"
                      placeholder="https://example.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter your username"
                      autoComplete="name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel>Upload file</FormLabel>
                  <FormControl>
                    <FileInput
                      ref={(element) => {
                        fileInputRef.current = element;
                        field.ref(element);
                      }}
                      field={field}
                      accept={acceptAttribute}
                      requirementsLabel={fileRequirementsLabel}
                      file={file}
                      formatFileSize={formatFileSize}
                      onFileSelected={applyFile}
                      onFileRemove={handleRemoveFile}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Create Your Chat-Bot"}
            </Button>
          </div>
        </form>
        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </Form>
  );
}
