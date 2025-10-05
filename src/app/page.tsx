import HeroSection from "@/components/hero";
import { cn } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DIY Chatbot Platform - Home",
  description:
    "Build and deploy your own branded chatbot in minutes. Powered by modern workflows, Next.js, and MongoDB with a shadcn-inspired UI.",
};

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative ">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
        )}
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>

      <HeroSection />
    </div>
  );
}
