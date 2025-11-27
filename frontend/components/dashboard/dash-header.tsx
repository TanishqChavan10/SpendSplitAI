"use client";

import React from "react";
import { ActionSearchBar } from "./action-search-bar";
import { ModeToggle } from "../modetoggle";
import NotificationPopover from "./notification-popover";
import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

interface DashHeaderProps {
  onSearch?: (query: string) => void;
}

function DashHeader({ onSearch }: DashHeaderProps) {
  const { resolvedTheme } = useTheme();

  return (
    <div className="flex flex-col w-full h-15 px-6 py-4">
      <div className="flex items-center justify-between w-full">
        <div className="flex-1 mr-4">
          <ActionSearchBar onSearch={onSearch} />
        </div>

        <div className="flex items-center gap-2">
          <NotificationPopover />
          <ModeToggle />
          <UserButton
            appearance={{
              baseTheme: resolvedTheme === "dark" ? dark : undefined,
              elements: {
                avatarBox: "w-9 h-9",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default DashHeader;
