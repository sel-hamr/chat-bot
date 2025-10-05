"use client";
import { createChat } from "@n8n/chat";
import React, { useEffect } from "react";

type ChatBoxProps = {
  userId: string;
  secretKey: string;
};

const ChatBox = ({ userId, secretKey }: ChatBoxProps) => {
  const chatConfig = {
    webhookUrl: `${process.env.NEXT_PUBLIC_CREATE_CHATBOT_WEBHOOK_URL}/${secretKey}/chat`,
    target: "#n8n-chat",
    mode: "fullscreen",
    showWelcomeScreen: false,
    loadPreviousSession: false,
    theme: "dark",
    initialMessages: [
      "Hi there! 👋",
      "Ask me anything and I'll pass it along.",
    ],
    metadata: {
      source: "n8n-chatbot",
      version: "1.0.0",
      userId: userId,
    },
  } as any;
  useEffect(() => {
    createChat(chatConfig);

    const syncBackground = () => {
      const bg = getComputedStyle(document.documentElement).getPropertyValue(
        "--background"
      );
      document.documentElement.style.setProperty(
        "--chat--body--background",
        bg.trim()
      );
    };

    syncBackground();

    const observer = new MutationObserver(syncBackground);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);
  return <div id="n8n-chat" className="min-h-screen"></div>;
};

export default ChatBox;
