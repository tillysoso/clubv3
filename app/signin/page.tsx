"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"
import { FormLoading, ValidationStar, SubmitButtonWithLoading } from "@/components/ui/form-loading"

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [emailValid, setEmailValid] = useState<boolean | undefined>(undefined)
  const [passwordValid, setPasswordValid] = useState<boolean | undefined>(undefined)

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password: string) => {
    return password.length >= 6
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    if (value.length > 0) {
      setEmailValid(validateEmail(value))
    } else {
      setEmailValid(undefined)
    }
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPassword(value)
    if (value.length > 0) {
      setPasswordValid(validatePassword(value))
    } else {
      setPasswordValid(undefined)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsError(false)
    setIsSuccess(false)
    setErrorMessage("")

    const isEmailValid = validateEmail(email)
    const isPasswordValid = validatePassword(password)

    setEmailValid(isEmailValid)
    setPasswordValid(isPasswordValid)

    if (!isEmailValid || !isPasswordValid) {
      setIsError(true)
      setErrorMessage("Please check your email and password")
      return
    }

    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      if (Math.random() > 0.3) {
        setIsSuccess(true)
        setTimeout(() => {
          console.log("Redirecting to dashboard...")
        }, 1500)
      } else {
        throw new Error("Invalid credentials")
      }
    } catch (error) {
      setIsError(true)
      setErrorMessage("Invalid email or password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-majestic-primary flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md glass-card">
        <CardHeader className="text-center pb-8">
          <CardTitle className="text-h3">Welcome Back</CardTitle>
          <CardDescription className="text-p text-majestic-text/70">
            Sign in to your Majestic Tarot account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="email" className="text-p">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                required
                className={`sleek-input ${
                  emailValid === false
                    ? "border-majestic-accent-red focus:border-majestic-accent-red"
                    : emailValid === true
                      ? "border-majestic-hover focus:border-majestic-hover"
                      : ""
                }`}
              />
              <ValidationStar
                isValid={emailValid === true}
                isInvalid={emailValid === false}
                message={
                  emailValid === false
                    ? "Please enter a valid email address"
                    : emailValid === true
                      ? "Email looks good!"
                      : undefined
                }
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="password" className="text-p">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  className={`sleek-input pr-12 ${
                    passwordValid === false
                      ? "border-majestic-accent-red focus:border-majestic-accent-red"
                      : passwordValid === true
                        ? "border-majestic-hover focus:border-majestic-hover"
                        : ""
                  }`}
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-majestic-text/60 hover:text-majestic-text"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <ValidationStar
                isValid={passwordValid === true}
                isInvalid={passwordValid === false}
                message={
                  passwordValid === false
                    ? "Password must be at least 6 characters"
                    : passwordValid === true
                      ? "Password strength good!"
                      : undefined
                }
              />
            </div>

            <SubmitButtonWithLoading
              type="submit"
              isLoading={isLoading}
              className="w-full btn-primary text-p rounded-xl py-3"
            >
              Sign In
            </SubmitButtonWithLoading>

            <FormLoading
              isLoading={isLoading}
              isSuccess={isSuccess}
              isError={isError}
              loadingMessage="Authenticating your cosmic connection..."
              successMessage="Welcome back! Redirecting to your dashboard..."
              errorMessage={errorMessage}
            />
          </form>

          <div className="mt-8 text-center">
            <p className="text-p text-majestic-text/70">
              Don't have an account?{" "}
              <Link href="/signup" className="text-majestic-hover hover:text-majestic-accent-purple transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
