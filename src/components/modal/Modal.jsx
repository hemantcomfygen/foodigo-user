import React, { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import Button from '../Button/Button'

const Modal = ({
  isOpen = false,
  onClose,
  title,
  children,
  size = 'default',
  showCloseButton = true,
  className,
  onSubmit,
  showActionButton = true,
  loading = false,
  disabled = false,
  ...props
}) => {
  const [isAnimating, setIsAnimating] = useState(false)

  const sizeClasses = {
    sm: 'max-w-md',
    default: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-7xl',
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setTimeout(() => setIsAnimating(true), 10)
    } else {
      document.body.style.overflow = 'unset'
      setIsAnimating(false)
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 transition-opacity duration-300 "
    >
      <div
        className={`relative overflow-hidden w-full bg-white rounded-xl shadow-lg flex flex-col ${sizeClasses[size]} ${className}
          transform transition-all duration-500 ease-out 
          ${isAnimating ? 'translate-y-0 opacity-100' : '-translate-y-80 opacity-0'}
          max-h-[80vh] overflow-y-auto`}  
        {...props}
      >
        {(title || showCloseButton) && (
          <div className="flex-shrink-0 flex items-center justify-between border-b border-[#0000001A] px-6 py-4">
            {title && <h2 className="text-lg font-semibold text-gray-900">{title}</h2>}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            )}
          </div>
        )}

        {/* Scrollable content area */}
        <div className="flex-1  px-6 py-4">
          {children}
        </div>

        {showActionButton && (
          <div className="flex-shrink-0 flex justify-end gap-3 px-6 py-4 border-t border-[#0000001A] rounded-b-xl bg-white">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={disabled}
              
            >
              Cancel
            </Button>
            <Button
              loading={loading}
              onClick={onSubmit}
              disabled={disabled}
              className="!btn-primary"
            >
              Submit
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Modal
