"use client";

import { useState } from "react";
import { AmbientSound } from "@/components/ui/AmbientSound/AmbientSound";
import { ChatWidget } from "@/components/ui/ChatWidget";
import { useFloatingActionsVisibility } from "@/hooks/useFloatingActionsVisibility";
import { cn } from "@/utils";
import "./FloatingActions.scss";

export function FloatingActions() {
  const [chatOpen, setChatOpen] = useState(false);
  const visible = useFloatingActionsVisibility(chatOpen);

  return (
    <div className={cn("floating-actions", visible && "floating-actions_visible")}>
      <AmbientSound />
      <ChatWidget onOpenChange={setChatOpen} />
    </div>
  );
}
