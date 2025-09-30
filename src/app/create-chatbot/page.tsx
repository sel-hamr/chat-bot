import { ChatBotForm } from "@/components/create-chatbot";
import React from "react";

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
