"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // biar aman, jangan render apapun yg tergantung theme
    return (
      <main className="wrapper min-h-screen flex-center flex-col">
        <h1 className="h1-bold">Loading...</h1>
      </main>
    );
  }

  return (
    <div>
      <h1 className="text-5xl text-center bg-indigo-400 text-white">
        Hello Nextstore
      </h1>

      <main className="wrapper min-h-screen flex-center flex-col gap-8">
        <h1 className="h1-bold">Tailwind v4 + Next.js 15</h1>
        <p className="h3-bold text-muted-foreground">
          Current theme: <span className="font-mono">{theme}</span>
        </p>

        <div className="rounded-lg border bg-card text-card-foreground shadow-md p-6 max-w-md w-full">
          <h2 className="h2-bold mb-4">Card Example</h2>
          <p className="text-sm text-muted-foreground">
            This card uses CSS variables from <code>:root</code> and{" "}
            <code>.dark</code> mode.
          </p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setTheme("light")}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white"
          >
            Light Mode
          </button>
          <button
            onClick={() => setTheme("dark")}
            className="px-4 py-2 rounded-lg bg-cyan-500 text-white"
          >
            Dark Mode
          </button>
          <button
            onClick={() => setTheme("system")}
            className="px-4 py-2 rounded-lg bg-pink-500 text-white"
          >
            System
          </button>
        </div>
      </main>
    </div>
  );
}
