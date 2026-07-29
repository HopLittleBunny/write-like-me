"use client";

import { useEffect } from "react";

function restoreHashTarget() {
  const targetId = window.location.hash.slice(1);
  if (!targetId) {
    return;
  }

  const target = document.getElementById(decodeURIComponent(targetId));
  target?.scrollIntoView({ block: "start" });
}

export function HashAnchorRestorer() {
  useEffect(() => {
    const frame = window.requestAnimationFrame(restoreHashTarget);
    window.addEventListener("hashchange", restoreHashTarget);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", restoreHashTarget);
    };
  }, []);

  return null;
}
