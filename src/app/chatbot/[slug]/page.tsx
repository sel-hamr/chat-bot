import React from "react";
import { notFound } from "next/navigation";

import ChatBox from "@/components/chat";
import { checkUserExists } from "@/actions/check-user";
import UserNotFound from "@/components/user-not-found";

type ChatBotPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ userId?: string }>;
};

const ChatBotPage = async ({ params, searchParams }: ChatBotPageProps) => {
  const { slug } = await params;
  const userId = (await searchParams)?.userId ?? null;

  if (process.env.WEBHOOK_SECRET_KEY !== slug) {
    return notFound();
  }

  const exists = await checkUserExists(userId);
  if (!exists || !userId) {
    return <UserNotFound userId={userId} />;
  }

  return (
    <div
      className="min-h-screen"
      data-slug={slug}
      data-user-id={userId ?? undefined}
    >
      <ChatBox userId={userId} secretKey={slug} />
    </div>
  );
};

export default ChatBotPage;
