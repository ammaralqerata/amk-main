"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "@/i18n/navigation";
import { pageTransition } from "@/lib/motion";
import type { ReactNode } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  // The page the visitor lands on shows straight away (no waiting for JS to fade it in);
  // later client-side navigations still cross-fade.
  const [landingPath] = useState(pathname);
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={pageTransition}
        initial={pathname === landingPath ? false : "hidden"}
        animate="visible"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
