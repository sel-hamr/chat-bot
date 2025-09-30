"use client";

import type { ChangeEvent, DragEvent, KeyboardEvent } from "react";
import { forwardRef, useCallback, useRef, useState } from "react";
import type { ControllerRenderProps } from "react-hook-form";
import { FileText, Upload, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type FileInputField = ControllerRenderProps<any, any>;

export interface FileInputProps {
  field: FileInputField;
  accept: string;
  requirementsLabel: string;
  file?: File;
  formatFileSize: (bytes: number) => string;
  onFileSelected: (file: File | null) => void;
  onFileRemove: () => void;
}

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  (
    {
      field,
      accept,
      requirementsLabel,
      file,
      formatFileSize,
      onFileSelected,
      onFileRemove,
    },
    forwardedRef
  ) => {
    const internalRef = useRef<HTMLInputElement | null>(null);
    const [isDragActive, setIsDragActive] = useState(false);

    const assignRefs = useCallback(
      (element: HTMLInputElement | null) => {
        internalRef.current = element;
        field.ref(element);
        if (typeof forwardedRef === "function") {
          forwardedRef(element);
        } else if (forwardedRef) {
          forwardedRef.current = element;
        }
      },
      [field, forwardedRef]
    );

    const resetInputValue = useCallback(() => {
      if (internalRef.current) {
        internalRef.current.value = "";
      }
    }, []);

    const openFileDialog = useCallback(() => {
      internalRef.current?.click();
    }, []);

    const handleChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        const nextFile = event.target.files?.[0] ?? null;
        onFileSelected(nextFile);
        event.target.value = "";
        setIsDragActive(false);
        field.onBlur();
      },
      [field, onFileSelected]
    );

    const handleDrop = useCallback(
      (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDragActive(false);

        const [nextFile] = Array.from(event.dataTransfer.files);
        onFileSelected(nextFile ?? null);
        resetInputValue();
        field.onBlur();
      },
      [field, onFileSelected, resetInputValue]
    );

    const handleDragEnter = useCallback((event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      setIsDragActive(true);
    }, []);

    const handleDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      event.dataTransfer.dropEffect = "copy";
      setIsDragActive(true);
    }, []);

    const handleDragLeave = useCallback((event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      const nextTarget = event.relatedTarget as Node | null;
      if (!nextTarget || !event.currentTarget.contains(nextTarget)) {
        setIsDragActive(false);
      }
    }, []);

    const handleKeyDown = useCallback(
      (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openFileDialog();
        }
      },
      [openFileDialog]
    );

    const handleRemove = useCallback(() => {
      onFileRemove();
      resetInputValue();
      setIsDragActive(false);
      field.onBlur();
    }, [field, onFileRemove, resetInputValue]);

    return (
      <div className="flex flex-col gap-2">
        <input
          ref={assignRefs}
          type="file"
          name={field.name}
          accept={accept}
          className="hidden"
          onBlur={field.onBlur}
          onChange={handleChange}
        />

        <div
          role="button"
          tabIndex={0}
          onClick={openFileDialog}
          onKeyDown={handleKeyDown}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "group relative flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-6 text-center transition",
            isDragActive
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-primary hover:bg-muted/50"
          )}
          aria-label="Drag and drop or browse files"
        >
          <Upload className="h-6 w-6 text-muted-foreground group-hover:text-primary" />
          <div className="text-sm">
            <span className="font-medium text-foreground">Click to browse</span>{" "}
            or drag &amp; drop
          </div>
          <p className="text-xs text-muted-foreground">{requirementsLabel}</p>
        </div>

        {file && (
          <div className="flex items-start justify-between rounded-md border bg-muted/40 p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-md border bg-background">
                <FileText className="h-6 w-6 text-muted-foreground" />
              </div>
              <div className="space-y-1">
                <p className="line-clamp-1 text-sm font-medium">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(file.size)}
                </p>
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleRemove}
              aria-label="Remove file"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    );
  }
);

FileInput.displayName = "FileInput";
