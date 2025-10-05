import { ChatBotForm } from "@/components/create-chatbot";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Create Chatbot",
  description:
    "Configure and deploy your custom chatbot. Set up user access, customize greetings, and connect to your workflow backend in minutes.",
};

const page = () => {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <ChatBotForm />
      </div>
    </div>
  );
};

export default page;
