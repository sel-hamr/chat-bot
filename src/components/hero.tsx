import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PAGES_PATH } from "@/lib/constants";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const HeroSection = () => {
  return (
    <div className="text-center max-w-3xl relative z-10">
      <Badge
        variant="secondary"
        className="rounded-full py-1 border-border"
        asChild
      >
        <Link href="#">
          Just released v1.0.0 <ArrowUpRight className="ml-1 size-4" />
        </Link>
      </Badge>
      <h1 className="mt-6 z-20 relative text-4xl sm:text-5xl md:text-6xl lg:text-7xl md:leading-[1.2] font-semibold tracking-tighter inline-block bg-[radial-gradient(61.17%_178.53%_at_38.83%_-13.54%,#3B3B3B_0%,#888787_12.61%,#FFFFFF_50%,#888787_80%,#3B3B3B_100%)] bg-clip-text text-transparent">
        Build Your Own Chat-Bot Easily For Your Website
      </h1>
      <p className="mt-6 md:text-lg">
        Create a custom chat-bot for your website with ease using our intuitive
        platform and powerful AI technology. No coding required.
      </p>
      <div className="mt-12 flex items-center justify-center gap-4 z-20 relative">
        <Link href={PAGES_PATH.CREATE_CHATBOT} className="cursor-pointer">
          <Button size="lg" className="rounded-full text-base">
            Get Started <ArrowUpRight className="size-5" />
          </Button>
        </Link>
        <Button
          variant="secondary"
          size="lg"
          className="rounded-full text-base shadow-none cursor-pointer"
        >
          Contact Us
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
