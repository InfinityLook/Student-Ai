"use client";

import React from "react";
import KairoAvatar from "@/components/KairoAvatar";
import NotificationSystem from "@/components/NotificationSystem";
import { useStore } from "@/store/useStore";
import { getLevelInfo } from "@/lib/gamification";

const NAV_ITEMS = [
  { id: "home", icon: "🏠", label: "Domů" },
  { id: "menu", icon: "🗂️", label: "Menu" },
  { id: "shop", icon: "🛍️", label: "Obchod" },
  { id: "profile", icon: "⚙️", label: "
