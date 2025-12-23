export default function Footer() {
  return (
    <footer className="border-t bg-white dark:bg-slate-900 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-4 text-sm text-slate-500 dark:text-slate-400 flex justify-between">
        <span>© {new Date().getFullYear()} EventEase</span>
        <span>Built for learning 🚀</span>
      </div>
    </footer>
  );
}
