'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Mail, Lock, Eye, Leaf, Loader2 } from "lucide-react"
import Link from "next/link"
import { AuthService } from "@/lib/auth"
import { AuthManager } from "@/lib/auth-manager"
import { LoginFormData, FormErrors } from "@/lib/types"
import { validateEmail, validateLoginPassword } from "@/lib/validation"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})

  const [loginForm, setLoginForm] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false
  })

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev)
  }

  const validateForm = (): FormErrors => {
    const formErrors: FormErrors = {}

    const emailError = validateEmail(loginForm.email)
    if (emailError) formErrors.email = emailError

    const passwordError = validateLoginPassword(loginForm.password)
    if (passwordError) formErrors.password = passwordError

    return formErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    const formErrors = validateForm()
    setErrors(formErrors)

    if (Object.keys(formErrors).length > 0) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fix the errors in the form"
      })
      return
    }

    setIsLoading(true)

    try {
      const loginData = {
        email: loginForm.email,
        password: loginForm.password
      }

      const response = await AuthService.loginUser(loginData)
      console.log('Login response:', response)

      if (response.error) {
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: response.error.message || "Invalid email or password"
        })
      } else if (response.data) {
        // Store the token and user data using AuthManager
        AuthManager.setAuth(response.data, loginForm.rememberMe)

        toast({
          title: "Login Successful",
          description: response.data.user ? `Welcome back, ${response.data.user.name}!` : "Login successful!"
        })

        // Redirect to dashboard or home page after successful login
        setTimeout(() => {
          router.push('/tracking') // or wherever you want to redirect after login
        }, 1500)
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "An unexpected error occurred. Please try again."
      })
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Leaf className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">Tracky</span>
          </Link>
        </div>

        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
            <CardDescription>
              Sign in to your account to continue tracking environmental impact
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                  />
                </div>
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className={`pl-10 pr-10 ${errors.password ? 'border-red-500' : ''}`}
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={togglePasswordVisibility}
                  >
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 rounded border-gray-300"
                    checked={loginForm.rememberMe}
                    onChange={(e) => setLoginForm({...loginForm, rememberMe: e.target.checked})}
                  />
                  <Label htmlFor="remember" className="text-sm text-muted-foreground">
                    Remember me
                  </Label>
                </div>
                <Link
                  href="/forgot-password"
                  className="text-sm text-tracky-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-tracky-primary hover:bg-tracky-primary/90"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="w-full">
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </Button>
              <Button variant="outline" className="w-full">
                <svg className="mr-2 h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.219-5.068 1.219-5.068s-.31-.608-.31-1.506c0-1.411.819-2.463 1.738-2.463.82 0 1.214.615 1.214 1.353 0 .824-.523 2.056-.793 3.195-.226.955.48 1.733 1.421 1.733 1.705 0 3.014-1.797 3.014-4.393 0-2.296-1.65-3.902-4.012-3.902-2.737 0-4.344 2.053-4.344 4.174 0 .825.317 1.71.713 2.191.078.095.089.179.066.276-.072.301-.234.957-.267 1.092-.043.182-.145.221-.336.133-1.249-.582-2.03-2.408-2.03-3.874 0-3.025 2.199-5.803 6.337-5.803 3.326 0 5.913 2.369 5.913 5.535 0 3.305-2.084 5.962-4.977 5.962-.973 0-1.888-.506-2.199-1.109l-.598 2.281c-.217.836-.801 1.881-1.198 2.522.9.279 1.854.427 2.847.427 6.619 0 11.985-5.367 11.985-11.987C24.001 5.367 18.636.001 12.017.001z" />
                </svg>
                GitHub
              </Button>
            </div>

            <div className="text-center">
              <span className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  href="/get-started"
                  className="text-tracky-primary hover:underline font-medium"
                >
                  Sign up
                </Link>
              </span>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          By signing in, you agree to our{" "}
          <Link href="/terms" className="underline hover:text-foreground">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline hover:text-foreground">
            Privacy Policy
          </Link>
        </p>
      </div>
      <Toaster />
    </div>
  )
}
