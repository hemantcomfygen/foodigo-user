import React from "react";
import { clsx } from "clsx";
import { Calendar as CalendarIcon, Check } from "lucide-react";

const Input = React.forwardRef(
  (
    {
      className,
      type = "text",
      label,
      error,
      helperText,
      disabled = false,
      required = false,
      maxlength,
      autofocus,
      ...props
    },
    ref
  ) => {
    const inputId = React.useId();
    const inputRef = React.useRef(null);

    // merge forwarded ref
    React.useImperativeHandle(ref, () => inputRef.current);

    if (type === "date") {
      return (
        <div className="w-full">
          {label && (
            <label
              htmlFor={inputId}
              className="block text-sm font-medium text-[#1E293B] mb-2"
            >
              {label}{" "}
              {required && (
                <span className="text-red-500 text-sm font-medium">*</span>
              )}
            </label>
          )}
          <div className="relative">
            <input
              id={inputId}
              ref={inputRef}
              type="date"
              disabled={disabled}
              className={clsx(
                "flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 pr-10 text-sm text-gray-700 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 disabled:cursor-not-allowed disabled:opacity-50",
                "appearance-none",
                " [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0",
                " [&::-ms-clear]:hidden [&::-ms-expand]:hidden",
                error && "border-red-500 focus:ring-red-500",
                className
              )}
              {...props}
            />
            <button
              type="button"
              onClick={() => inputRef.current?.showPicker?.()}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-primary-500"
              disabled={disabled}
            >
              <CalendarIcon className="h-5 w-5" />
            </button>
          </div>
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
          {helperText && !error && (
            <p className="mt-1 text-sm text-gray-500">{helperText}</p>
          )}
        </div>
      );
    }

    /** ✅ TEXTAREA INPUT */
    if (type === "textarea") {
      return (
        <div className="w-full">
          {label && (
            <label
              htmlFor={inputId}
              className="block text-sm font-medium text-[#1E293B] mb-2"
            >
              {label}{" "}
              {required && (
                <span className="text-red-500 text-sm font-medium">*</span>
              )}
            </label>
          )}
          <textarea
            id={inputId}
            ref={inputRef}
            disabled={disabled}
            maxLength={maxlength}
            rows={4} // default rows
            className={clsx(
              "flex w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm text-gray-700 placeholder:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50",
              "focus:border-primary-500 focus:ring-1 focus:ring-primary-500",
              error && "border-red-500 focus:ring-red-500",
              className
            )}
            {...props}
          />
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
          {helperText && !error && (
            <p className="mt-1 text-sm text-gray-500">{helperText}</p>
          )}
        </div>
      );
    }


    if (type === "checkbox") {
      return (
        <div className="flex items-start space-x-2">
          <div className="relative flex items-center">
            <input
              id={inputId}
              ref={inputRef}
              type="checkbox"
              disabled={disabled}
              className={clsx(
                "peer h-5 w-5 shrink-0 rounded border border-gray-300 text-primary-600 focus:ring-primary-500 disabled:cursor-not-allowed disabled:opacity-50",
                error && "border-red-500 focus:ring-red-500",
                className
              )}
              {...props}
            />
            {/* Custom check icon */}
            <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-white peer-checked:bg-primary-600 peer-checked:border-primary-600 rounded">
              <Check className="h-4 w-4" />
            </span>
          </div>
          {label && (
            <label
              htmlFor={inputId}
              className="text-sm font-medium text-[#1E293B] cursor-pointer"
            >
              {label}{" "}
              {required && (
                <span className="text-red-500 text-sm font-medium">*</span>
              )}
            </label>
          )}
          {error && <p className="ml-2 text-sm text-red-600">{error}</p>}
        </div>
      );
    }

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-[#1E293B] mb-2"
          >
            {label}{" "}
            {required && (
              <span className="text-red-500 text-sm font-medium">*</span>
            )}
          </label>
        )}
        <input
          id={inputId}
          type={type}
          ref={ref}
          disabled={disabled}
          maxLength={maxlength}
          autoFocus={autofocus}
          className={clsx(
            "flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 focus:ring focus:ring-green-500 text-sm text-gray-700 placeholder:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50  focus:border-sky-500 focus:outline focus:outline-[#5ea000]",
            error && "border-red-500 focus:ring-red-500",
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
