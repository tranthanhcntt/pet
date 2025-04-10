export function Textarea({ name, placeholder, value, onChange, required = false }) {
  return (
    <textarea
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}