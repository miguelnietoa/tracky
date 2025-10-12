'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Leaf, Mail, Lock, Eye, User, Loader2, Shield } from "lucide-react"
import Link from "next/link"
import { AuthService } from "@/lib/auth"
import {
  IndividualFormData,
  OrganizerFormData,
  FormErrors,
  CreateUserDto
} from "@/lib/types"
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateName,
  validateWallet,
  validateRequiredField
} from "@/lib/validation"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function GetStartedPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("individual")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState<{[key: string]: boolean}>({})
  const [errors, setErrors] = useState<FormErrors>({})

  const [individualForm, setIndividualForm] = useState<IndividualFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    wallet: '',
    terms: false,
    newsletter: false
  })

  const [organizerForm, setOrganizerForm] = useState<OrganizerFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    wallet: '',
    terms: false,
    newsletter: false
  })

  const togglePasswordVisibility = (field: string) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }))
  }

  const validateForm = (formData: any, formType: string): FormErrors => {
    const formErrors: FormErrors = {}

    if (formType === 'individual' || formType === 'organizer') {
      // Individual and Organizer form validation (both have same structure)
      const nameError = validateName(formData.firstName, 'First name')
      if (nameError) formErrors.firstName = nameError

      const lastNameError = validateName(formData.lastName, 'Last name')
      if (lastNameError) formErrors.lastName = lastNameError

      const emailError = validateEmail(formData.email)
      if (emailError) formErrors.email = emailError

      const walletError = validateWallet(formData.wallet)
      if (walletError) formErrors.wallet = walletError

      const passwordError = validatePassword(formData.password)
      if (passwordError) formErrors.password = passwordError

      const confirmPasswordError = validateConfirmPassword(formData.password, formData.confirmPassword)
      if (confirmPasswordError) formErrors.confirmPassword = confirmPasswordError

      if (!formData.terms) formErrors.terms = 'You must accept the terms of service'
    }

    return formErrors
  }

  const mapFormDataToCreateUserDto = (formData: any, formType: string): CreateUserDto => {
    // Both individual and organizer have the same structure
    return {
      name: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      wallet: formData.wallet,
      password: formData.password,
      confirmPassword: formData.confirmPassword
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    let currentForm: any
    let formType: string

    if (activeTab === 'individual') {
      currentForm = individualForm
      formType = 'individual'
    } else {
      currentForm = organizerForm
      formType = 'organizer'
    }

    // Validate form
    const formErrors = validateForm(currentForm, formType)
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
      const createUserData = mapFormDataToCreateUserDto(currentForm, formType)
      const response = await AuthService.createUser(createUserData)

      if (response.error) {
        toast({
          variant: "destructive",
          title: "Registration Failed",
          description: response.error.message || "An error occurred during registration"
        })
      } else {
        toast({
          title: "Registration Successful",
          description: "Your account has been created successfully!"
        })

        // Redirect to login page after successful registration
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: "An unexpected error occurred. Please try again."
      })
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <>
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
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
            <CardTitle className="text-2xl font-bold">Get Started</CardTitle>
            <CardDescription>
              Join Tracky to start tracking environmental impact and making a difference
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="individual" className="text-xs">
                    <User className="h-4 w-4 mr-1" />
                    Individual
                  </TabsTrigger>
                  <TabsTrigger value="organizer" className="text-xs">
                    <Shield className="h-4 w-4 mr-1" />
                    Organizer
                  </TabsTrigger>
                </TabsList>

              <TabsContent value="individual" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="Enter your first name"
                      className={`pl-10 ${errors.firstName ? 'border-red-500' : ''}`}
                      value={individualForm.firstName}
                      onChange={(e) => setIndividualForm({...individualForm, firstName: e.target.value})}
                    />
                  </div>
                  {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Enter your last name"
                      className={`pl-10 ${errors.lastName ? 'border-red-500' : ''}`}
                      value={individualForm.lastName}
                      onChange={(e) => setIndividualForm({...individualForm, lastName: e.target.value})}
                    />
                  </div>
                  {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                      value={individualForm.email}
                      onChange={(e) => setIndividualForm({...individualForm, email: e.target.value})}
                    />
                  </div>
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="wallet">Wallet Address</Label>
                  <div className="relative">
                    <div className="absolute left-3 top-3 h-4 w-4 text-muted-foreground font-mono text-xs">
                      0x
                    </div>
                    <Input
                      id="wallet"
                      type="text"
                      placeholder="Enter your Ethereum wallet address"
                      className={`pl-8 ${errors.wallet ? 'border-red-500' : ''}`}
                      value={individualForm.wallet}
                      onChange={(e) => setIndividualForm({...individualForm, wallet: e.target.value})}
                    />
                  </div>
                  {errors.wallet && <p className="text-sm text-red-500">{errors.wallet}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword.password ? "text" : "password"}
                      placeholder="Create a password"
                      className={`pl-10 pr-10 ${errors.password ? 'border-red-500' : ''}`}
                      value={individualForm.password}
                      onChange={(e) => setIndividualForm({...individualForm, password: e.target.value})}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => togglePasswordVisibility('password')}
                    >
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                  {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showPassword.confirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      className={`pl-10 pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                      value={individualForm.confirmPassword}
                      onChange={(e) => setIndividualForm({...individualForm, confirmPassword: e.target.value})}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => togglePasswordVisibility('confirmPassword')}
                    >
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                  {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="terms"
                    className={`h-4 w-4 rounded border-gray-300 ${errors.terms ? 'border-red-500' : ''}`}
                    checked={individualForm.terms}
                    onChange={(e) => setIndividualForm({...individualForm, terms: e.target.checked})}
                  />
                  <Label htmlFor="terms" className="text-sm text-muted-foreground">
                    I agree to the{" "}
                    <Link href="/terms" className="text-tracky-primary hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-tracky-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
                {errors.terms && <p className="text-sm text-red-500">{errors.terms}</p>}

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="newsletter"
                    className="h-4 w-4 rounded border-gray-300"
                    checked={individualForm.newsletter}
                    onChange={(e) => setIndividualForm({...individualForm, newsletter: e.target.checked})}
                  />
                  <Label htmlFor="newsletter" className="text-sm text-muted-foreground">
                    Subscribe to our newsletter for environmental impact updates
                  </Label>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-tracky-primary hover:bg-tracky-primary/90"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </Button>
              </TabsContent>

              <TabsContent value="organizer" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="organizerFirstName">First Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="organizerFirstName"
                      type="text"
                      placeholder="Enter your first name"
                      className={`pl-10 ${errors.firstName ? 'border-red-500' : ''}`}
                      value={organizerForm.firstName}
                      onChange={(e) => setOrganizerForm({...organizerForm, firstName: e.target.value})}
                    />
                  </div>
                  {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organizerLastName">Last Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="organizerLastName"
                      type="text"
                      placeholder="Enter your last name"
                      className={`pl-10 ${errors.lastName ? 'border-red-500' : ''}`}
                      value={organizerForm.lastName}
                      onChange={(e) => setOrganizerForm({...organizerForm, lastName: e.target.value})}
                    />
                  </div>
                  {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organizerEmail">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="organizerEmail"
                      type="email"
                      placeholder="Enter your organizer email"
                      className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                      value={organizerForm.email}
                      onChange={(e) => setOrganizerForm({...organizerForm, email: e.target.value})}
                    />
                  </div>
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organizerWallet">Wallet Address</Label>
                  <div className="relative">
                    <div className="absolute left-3 top-3 h-4 w-4 text-muted-foreground font-mono text-xs">
                      0x
                    </div>
                    <Input
                      id="organizerWallet"
                      type="text"
                      placeholder="Enter your Ethereum wallet address"
                      className={`pl-8 ${errors.wallet ? 'border-red-500' : ''}`}
                      value={organizerForm.wallet}
                      onChange={(e) => setOrganizerForm({...organizerForm, wallet: e.target.value})}
                    />
                  </div>
                  {errors.wallet && <p className="text-sm text-red-500">{errors.wallet}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organizerPassword">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="organizerPassword"
                      type={showPassword.organizerPassword ? "text" : "password"}
                      placeholder="Create a password"
                      className={`pl-10 pr-10 ${errors.password ? 'border-red-500' : ''}`}
                      value={organizerForm.password}
                      onChange={(e) => setOrganizerForm({...organizerForm, password: e.target.value})}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => togglePasswordVisibility('organizerPassword')}
                    >
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                  {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organizerConfirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="organizerConfirmPassword"
                      type={showPassword.organizerConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      className={`pl-10 pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                      value={organizerForm.confirmPassword}
                      onChange={(e) => setOrganizerForm({...organizerForm, confirmPassword: e.target.value})}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => togglePasswordVisibility('organizerConfirmPassword')}
                    >
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                  {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="organizerTerms"
                    className={`h-4 w-4 rounded border-gray-300 ${errors.terms ? 'border-red-500' : ''}`}
                    checked={organizerForm.terms}
                    onChange={(e) => setOrganizerForm({...organizerForm, terms: e.target.checked})}
                  />
                  <Label htmlFor="organizerTerms" className="text-sm text-muted-foreground">
                    I agree to the{" "}
                    <Link href="/terms" className="text-tracky-primary hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-tracky-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
                {errors.terms && <p className="text-sm text-red-500">{errors.terms}</p>}

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="organizerNewsletter"
                    className="h-4 w-4 rounded border-gray-300"
                    checked={organizerForm.newsletter}
                    onChange={(e) => setOrganizerForm({...organizerForm, newsletter: e.target.checked})}
                  />
                  <Label htmlFor="organizerNewsletter" className="text-sm text-muted-foreground">
                    Subscribe to our newsletter for environmental impact updates
                  </Label>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-tracky-primary hover:bg-tracky-primary/90"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Organizer Account...
                    </>
                  ) : (
                    'Create Organizer Account'
                  )}
                </Button>
              </TabsContent>




              </Tabs>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          By creating an account, you're joining a global movement for transparent environmental action.
        </p>
      </div>
      </div>
      <Toaster />
    </>
  )
}
