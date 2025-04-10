export function Button({ type = "button", onClick, children, className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition ${className}`}
    >
      {children}
    </button>
  );
}