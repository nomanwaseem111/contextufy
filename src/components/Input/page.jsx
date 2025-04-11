"use client";

export default function Input({
  id,
  label,
  type = "text",
  placeholder = "",
  disabled = false,
  className = "",
  error,
  description,
  labelClassName = "",
  inputClassName = "",
  ...props
}) {
  const isCheckbox = type === "checkbox";

  if (isCheckbox) {
    return (
      <div className={`flex items-start ${className}`}>
        <div className="flex items-center h-5">
          <input
            id={id}
            type="checkbox"
            disabled={disabled}
            className={`h-4 w-4 text-emerald-500 border-gray-300 rounded focus:ring-emerald-400 focus:ring-offset-0 ${inputClassName}`}
            {...props}
          />
        </div>
        <div className="ml-2 text-sm">
          {label && (
            <label htmlFor={id} className={`text-[#999999] ${labelClassName}`}>
              {label}
            </label>
          )}
          {description && <p className="text-gray-500">{description}</p>}
          {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full mb-4 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className={`block text-sm font-medium text-[#999999] mb-1 ${labelClassName}`}
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          w-full
          px-3
          py-2
          border
          ${error ? "border-red-500" : "border-gray-300"}
        rounded-[12px]
          focus:outline-none
          focus:ring-1
          ${
            error
              ? "focus:ring-red-500 focus:border-red-500"
              : "focus:ring-emerald-400 focus:border-emerald-400"
          }
          disabled:opacity-70
          disabled:bg-gray-100
          ${inputClassName}
        `}
        {...props}
      />
      {description && (
        <p className="mt-1 text-xs text-gray-500">{description}</p>
      )}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
