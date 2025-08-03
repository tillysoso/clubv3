"use client"

import type React from "react"

import { StarLoading } from "./star-loading"
import { CheckCircle, AlertCircle, X } from "lucide-react"

interface FormLoadingProps {
  isLoading?: boolean
  isSuccess?: boolean
  isError?: boolean
  loadingMessage?: string
  successMessage?: string
  errorMessage?: string
  className?: string
}

export function FormLoading({
  isLoading = false,
  isSuccess = false,
  isError = false,
  loadingMessage = "Processing...",
  successMessage = "Success!",
  errorMessage = "Something went wrong",
  className = "",
}: FormLoadingProps) {
  if (isLoading) {
    return (
      <div className={`flex items-center justify-center space-x-3 py-4 ${className}`}>
        <StarLoading size="sm" variant="minimal" message="" />
        <span className="font-space-grotesk text-sm text-gray-600 animate-pulse">{loadingMessage}</span>
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div className={`flex items-center justify-center space-x-3 py-4 ${className}`}>
        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
          <CheckCircle className="w-4 h-4 text-green-600" />
        </div>
        <span className="font-space-grotesk text-sm text-green-600 font-medium">{successMessage}</span>
      </div>
    )
  }

  if (isError) {
    return (
      <div className={`flex items-center justify-center space-x-3 py-4 ${className}`}>
        <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center animate-pulse">
          <AlertCircle className="w-4 h-4 text-red-600" />
        </div>
        <span className="font-space-grotesk text-sm text-red-600 font-medium">{errorMessage}</span>
      </div>
    )
  }

  return null
}

interface ValidationStarProps {
  isValid?: boolean
  isInvalid?: boolean
  message?: string
}

export function ValidationStar({ isValid, isInvalid, message }: ValidationStarProps) {
  if (isValid) {
    return (
      <div className="flex items-center space-x-2 mt-1">
        <div className="w-4 h-4 text-green-500 animate-pulse">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
        {message && <span className="text-xs text-green-600 font-space-grotesk">{message}</span>}
      </div>
    )
  }

  if (isInvalid) {
    return (
      <div className="flex items-center space-x-2 mt-1">
        <div className="w-4 h-4 text-red-500 animate-bounce">
          <X className="w-4 h-4" />
        </div>
        {message && <span className="text-xs text-red-600 font-space-grotesk">{message}</span>}
      </div>
    )
  }

  return null
}

export function SubmitButtonWithLoading({
  children,
  isLoading = false,
  disabled = false,
  className = "",
  ...props
}: {
  children: React.ReactNode
  isLoading?: boolean
  disabled?: boolean
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={`relative flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium transition-all duration-300 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {isLoading ? (
        <>
          <StarLoading size="sm" variant="minimal" message="" />
          <span className="animate-pulse">Processing...</span>
        </>
      ) : (
        children
      )}
    </button>
  )
}
