import { useRef } from "react";

const OTPInput = ({
  length = 6,
  value = "",
  onChange,
  onComplete,
  error = "",
  disabled = false,
}) => {
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const digit = e.target.value.replace(/\D/g, "");
    if (!digit) return;

    const otpArray = value.split("");
    otpArray[index] = digit[0];
    const newOtp = otpArray.join("");

    onChange(newOtp);

    if (index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    if (newOtp.length === length && !newOtp.includes("")) {
      onComplete?.(newOtp);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const otpArray = value.split("");
      otpArray[index] = "";
      onChange(otpArray.join(""));

      if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);

    if (pasted.length === 0) return;

    onChange(pasted);
    if (pasted.length === length) {
      onComplete?.(pasted);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-2 sm:gap-3">
        {Array.from({ length }).map((_, index) => (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            disabled={disabled}
            value={value[index] || ""}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            className={`w-8 h-8 sm:w-12 sm:h-14 text-center text-lg font-semibold rounded-lg border
              ${error ? "border-red-500" : "border-gray-300"}
              focus:outline-none focus:ring-2 focus:ring-[#f37610]
              disabled:bg-gray-100`}
          />
        ))}
      </div>

      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};

export default OTPInput;
