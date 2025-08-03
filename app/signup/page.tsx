"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { FormLoading, ValidationStar, SubmitButtonWithLoading } from "@/components/ui/form-loading"

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const [validation, setValidation] = useState({
    name: undefined as boolean | undefined,
    email: undefined as boolean | undefined,
    password: undefined as boolean | undefined,
    confirmPassword: undefined as boolean | undefined,
  })

  const validateName = (name: string) => {
    return name.trim().length >= 2
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password: string) => {
    return password.length >= 8 && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)
  }

  const validateConfirmPassword = (password: string, confirmPassword: string) => {
    return password === confirmPassword && password.length > 0
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    const newFormData = { ...formData, [field]: value }
    setFormData(newFormData)

    if (field === "name" && typeof value === "string") {
      setValidation((prev) => ({ ...prev, name: validateName(value) }))
    } else if (field === "email" && typeof value === "string") {
      setValidation((prev) => ({ ...prev, email: validateEmail(value) }))
    } else if (field === "password" && typeof value === "string") {
      setValidation((prev) => ({
        ...prev,
        password: validatePassword(value),
        confirmPassword: validateConfirmPassword(value, newFormData.confirmPassword),
      }))
    } else if (field === "confirmPassword" && typeof value === "string") {
      setValidation((prev) => ({
        ...prev,
        confirmPassword: validateConfirmPassword(newFormData.password, value),
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsError(false)
    setIsSuccess(false)
    setErrorMessage("")

    const nameValid = validateName(formData.name)
    const emailValid = validateEmail(formData.email)
    const passwordValid = validatePassword(formData.password)
    const confirmPasswordValid = validateConfirmPassword(formData.password, formData.confirmPassword)

    setValidation({
      name: nameValid,
      email: emailValid,
      password: passwordValid,
      confirmPassword: confirmPasswordValid,
    })

    if (!nameValid || !emailValid || !passwordValid || !confirmPasswordValid || !formData.agreeToTerms) {
      setIsError(true)
      setErrorMessage("Please complete all fields correctly and agree to the terms")
      return
    }

    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 3000))

      if (Math.random() > 0.2) {
        setIsSuccess(true)
        setTimeout(() => {
          console.log("Account created successfully!")
        }, 2000)
      } else {
        throw new Error("Email already exists")
      }
    } catch (error) {
      setIsError(true)
      setErrorMessage("This email is already registered. Please try a different email.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-majestic-primary flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md glass-card">
        <CardHeader className="text-center pb-8">
          <CardTitle className="text-h3">Join Majestic Tarot</CardTitle>
          <CardDescription className="text-p text-majestic-text/70">
            Create your account and start your spiritual journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="name" className="text-p">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
                className={`sleek-input ${
                  validation.name === false
                    ? "border-majestic-accent-red focus:border-majestic-accent-red"
                    : validation.name === true
                      ? "border-majestic-hover focus:border-majestic-hover"
                      : ""
                }`}
              />
              <ValidationStar
                isValid={validation.name === true}
                isInvalid={validation.name === false}
                message={
                  validation.name === false
                    ? "Name must be at least 2 characters"
                    : validation.name === true
                      ? "Name looks good!"
                      : undefined
                }
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="email" className="text-p">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
                className={`sleek-input ${
                  validation.email === false
                    ? "border-majestic-accent-red focus:border-majestic-accent-red"
                    : validation.email === true
                      ? "border-majestic-hover focus:border-majestic-hover"
                      : ""
                }`}
              />
              <ValidationStar
                isValid={validation.email === true}
                isInvalid={validation.email === false}
                message={
                  validation.email === false
                    ? "Please enter a valid email address"
                    : validation.email === true
                      ? "Email looks good!"
                      : undefined
                }
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="password" className="text-p">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                required
                className={`sleek-input ${
                  validation.password === false
                    ? "border-majestic-accent-red focus:border-majestic-accent-red"
                    : validation.password === true
                      ? "border-majestic-hover focus:border-majestic-hover"
                      : ""
                }`}
              />
              <ValidationStar
                isValid={validation.password === true}
                isInvalid={validation.password === false}
                message={
                  validation.password === false
                    ? "Password must be 8+ chars with uppercase, lowercase, and number"
                    : validation.password === true
                      ? "Strong password!"
                      : undefined
                }
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="confirmPassword" className="text-p">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                required
                className={`sleek-input ${
                  validation.confirmPassword === false
                    ? "border-majestic-accent-red focus:border-majestic-accent-red"
                    : validation.confirmPassword === true
                      ? "border-majestic-hover focus:border-majestic-hover"
                      : ""
                }`}
              />
              <ValidationStar
                isValid={validation.confirmPassword === true}
                isInvalid={validation.confirmPassword === false}
                message={
                  validation.confirmPassword === false
                    ? "Passwords don't match"
                    : validation.confirmPassword === true
                      ? "Passwords match!"
                      : undefined
                }
              />
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="terms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                className="mt-1"
              />
              <Label htmlFor="terms" className="text-p text-majestic-text/80 leading-relaxed">
                I agree to the{" "}
                <Link href="/terms" className="text-majestic-hover hover:text-majestic-accent-purple transition-colors">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-majestic-hover hover:text-majestic-accent-purple transition-colors"
                >
                  Privacy Policy
                </Link>
              </Label>
            </div>

            <SubmitButtonWithLoading
              type="submit"
              isLoading={isLoading}
              disabled={!formData.agreeToTerms}
              className="w-full btn-primary text-p rounded-xl py-3"
            >
              Create Account
            </SubmitButtonWithLoading>

            <FormLoading
              isLoading={isLoading}
              isSuccess={isSuccess}
              isError={isError}
              loadingMessage="Creating your mystical account..."
              successMessage="Welcome to Majestic Tarot! Setting up your profile..."
              errorMessage={errorMessage}
            />
          </form>

          <div className="mt-8 text-center">
            <p className="text-p text-majestic-text/70">
              Already have an account?{" "}
              <Link href="/signin" className="text-majestic-hover hover:text-majestic-accent-purple transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
