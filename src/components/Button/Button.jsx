import React, { useState } from 'react'

const Button = React.forwardRef(({
    className = '',
    variant = 'primary',
    size = 'default',
    disabled = false,
    loading = false,
    children,
    ...props
}, ref) => {
    const [isClicked, setIsClicked] = useState(false);

    const baseStyles = `
    relative inline-flex items-center justify-center rounded-md text-sm font-medium
    transform transition-transform duration-200 ease-in-out
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
    disabled:opacity-50 disabled:pointer-events-none cursor-pointer
  `;
    const variantStyles = {
        primary: 'bg-orange-600 text-white hover:bg-orange-700',
        secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-300',
        danger: 'bg-red-600 text-white hover:bg-red-700',
        success: 'bg-green-600 text-white hover:bg-green-700',
        warning: 'bg-yellow-600 text-white hover:bg-yellow-700',
        ghost: 'hover:bg-gray-100 text-gray-700',
        outline: 'border border-gray-300 bg-transparent hover:bg-gray-50',
        black: 'border bg-[#000000]! text-white rounded-full! font-[500] text-[16px] border-gray-300 bg-transparent hover:bg-gray-50',

    }

    const sizeStyles = {
        sm: 'h-8 px-3 text-xs',
        default: 'h-10 px-4 py-2 text-sm tracking-wider font-medium',
        lg: 'h-11 px-8',
        icon: 'h-10 w-10',
    }
    const handleClick = (e) => {
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 300);
        if (props.onClick) props.onClick(e);
    };
    return (
        <button
            className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${isClicked ? 'scale-95' : 'scale-100'} ${className}`}
            ref={ref}
            disabled={disabled || loading}
            {...props}
            onClick={handleClick}
        >
            {loading && (
                <svg
                    className="mr-2 h-4 w-4 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
            )}
            {children}
        </button>
    )
})

Button.displayName = 'Button'

export default Button
