export default function Button({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={
        "inline-flex items-center gap-2 px-4 py-2 rounded-md font-medium shadow-sm bg-primary text-white hover:brightness-95 " +
        className
      }
    >
      {children}
    </button>
  );
}
