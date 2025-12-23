import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="px-3 py-1.5 border rounded-lg text-sm
                 bg-white dark:bg-slate-800
                 text-slate-900 dark:text-slate-100"
    >
      {dark ? "☀ Light" : "🌙 Dark"}
    </button>
  );
}
