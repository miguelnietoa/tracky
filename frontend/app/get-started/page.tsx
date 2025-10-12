'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Leaf, Mail, Lock, Eye, User, Building2, Users, Loader2 } from "lucide-react"
import Link from "next/link"
import { AuthService } from "@/lib/auth"
import {
  IndividualFormData,
  OrganizationFormData,
  CommunityFormData,
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

  const [organizationForm, setOrganizationForm] = useState<OrganizationFormData>({
    orgName: '',
    contactName: '',
    orgEmail: '',
    orgPassword: '',
    confirmPassword: '',
    wallet: '',
    terms: false,
    newsletter: false
  })

  const [communityForm, setCommunityForm] = useState<CommunityFormData>({
    communityName: '',
    leaderName: '',
    communityEmail: '',
    communityPassword: '',
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

    if (formType === 'individual') {
      // Individual form validation
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
    } else if (formType === 'organization') {
      // Organization form validation
      const orgNameError = validateRequiredField(formData.orgName, 'Organization name')
      if (orgNameError) formErrors.orgName = orgNameError

      const contactNameError = validateName(formData.contactName, 'Contact name')
      if (contactNameError) formErrors.contactName = contactNameError

      const emailError = validateEmail(formData.orgEmail)
      if (emailError) formErrors.orgEmail = emailError

      const walletError = validateWallet(formData.wallet)
      if (walletError) formErrors.wallet = walletError

      const passwordError = validatePassword(formData.orgPassword)
      if (passwordError) formErrors.orgPassword = passwordError

      const confirmPasswordError = validateConfirmPassword(formData.orgPassword, formData.confirmPassword)
      if (confirmPasswordError) formErrors.confirmPassword = confirmPasswordError

      if (!formData.terms) formErrors.terms = 'You must accept the terms of service'
    } else if (formType === 'community') {
      // Community form validation
      const communityNameError = validateRequiredField(formData.communityName, 'Community name')
      if (communityNameError) formErrors.communityName = communityNameError

      const leaderNameError = validateName(formData.leaderName, 'Leader name')
      if (leaderNameError) formErrors.leaderName = leaderNameError

      const emailError = validateEmail(formData.communityEmail)
      if (emailError) formErrors.communityEmail = emailError

      const walletError = validateWallet(formData.wallet)
      if (walletError) formErrors.wallet = walletError

      const passwordError = validatePassword(formData.communityPassword)
      if (passwordError) formErrors.communityPassword = passwordError

      const confirmPasswordError = validateConfirmPassword(formData.communityPassword, formData.confirmPassword)
      if (confirmPasswordError) formErrors.confirmPassword = confirmPasswordError

      if (!formData.terms) formErrors.terms = 'You must accept the terms of service'
    }

    return formErrors
  }

  const mapFormDataToCreateUserDto = (formData: any, formType: string): CreateUserDto => {
    if (formType === 'individual') {
      return {
        name: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        wallet: formData.wallet,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      }
    } else if (formType === 'organization') {
      return {
        name: formData.contactName.split(' ')[0] || formData.contactName,
        lastName: formData.contactName.split(' ').slice(1).join(' ') || formData.orgName,
        email: formData.orgEmail,
        wallet: formData.wallet,
        password: formData.orgPassword,
        confirmPassword: formData.confirmPassword
      }
    } else { // community
      return {
        name: formData.leaderName.split(' ')[0] || formData.leaderName,
        lastName: formData.leaderName.split(' ').slice(1).join(' ') || formData.communityName,
        email: formData.communityEmail,
        wallet: formData.wallet,
        password: formData.communityPassword,
        confirmPassword: formData.confirmPassword
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    let currentForm: any
    let formType: string

    if (activeTab === 'individual') {
      currentForm = individualForm
      formType = 'individual'
    } else if (activeTab === 'organization') {
      currentForm = organizationForm
      formType = 'organization'
    } else {
      currentForm = communityForm
      formType = 'community'
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
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="individual" className="text-xs">
                    <User className="h-4 w-4 mr-1" />
                    Individual
                  </TabsTrigger>
                  <TabsTrigger value="organization" className="text-xs">
                    <Building2 className="h-4 w-4 mr-1" />
                    Organization
                  </TabsTrigger>
                  <TabsTrigger value="community" className="text-xs">
                    <Users className="h-4 w-4 mr-1" />
                    Community
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

              <TabsContent value="organization" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="orgName">Organization Name</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="orgName"
                      type="text"
                      placeholder="Enter organization name"
                      className={`pl-10 ${errors.orgName ? 'border-red-500' : ''}`}
                      value={organizationForm.orgName}
                      onChange={(e) => setOrganizationForm({...organizationForm, orgName: e.target.value})}
                    />
                  </div>
                  {errors.orgName && <p className="text-sm text-red-500">{errors.orgName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactName">Contact Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="contactName"
                      type="text"
                      placeholder="Enter contact person name"
                      className={`pl-10 ${errors.contactName ? 'border-red-500' : ''}`}
                      value={organizationForm.contactName}
                      onChange={(e) => setOrganizationForm({...organizationForm, contactName: e.target.value})}
                    />
                  </div>
                  {errors.contactName && <p className="text-sm text-red-500">{errors.contactName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="orgEmail">Organization Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="orgEmail"
                      type="email"
                      placeholder="Enter organization email"
                      className={`pl-10 ${errors.orgEmail ? 'border-red-500' : ''}`}
                      value={organizationForm.orgEmail}
                      onChange={(e) => setOrganizationForm({...organizationForm, orgEmail: e.target.value})}
                    />
                  </div>
                  {errors.orgEmail && <p className="text-sm text-red-500">{errors.orgEmail}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="orgWallet">Wallet Address</Label>
                  <div className="relative">
                    <div className="absolute left-3 top-3 h-4 w-4 text-muted-foreground font-mono text-xs">
                      0x
                    </div>
                    <Input
                      id="orgWallet"
                      type="text"
                      placeholder="Enter organization's Ethereum wallet address"
                      className={`pl-8 ${errors.wallet ? 'border-red-500' : ''}`}
                      value={organizationForm.wallet}
                      onChange={(e) => setOrganizationForm({...organizationForm, wallet: e.target.value})}
                    />
                  </div>
                  {errors.wallet && <p className="text-sm text-red-500">{errors.wallet}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="orgPassword">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="orgPassword"
                      type={showPassword.orgPassword ? "text" : "password"}
                      placeholder="Create a password"
                      className={`pl-10 pr-10 ${errors.orgPassword ? 'border-red-500' : ''}`}
                      value={organizationForm.orgPassword}
                      onChange={(e) => setOrganizationForm({...organizationForm, orgPassword: e.target.value})}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => togglePasswordVisibility('orgPassword')}
                    >
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                  {errors.orgPassword && <p className="text-sm text-red-500">{errors.orgPassword}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="orgConfirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="orgConfirmPassword"
                      type={showPassword.orgConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      className={`pl-10 pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                      value={organizationForm.confirmPassword}
                      onChange={(e) => setOrganizationForm({...organizationForm, confirmPassword: e.target.value})}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => togglePasswordVisibility('orgConfirmPassword')}
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
                    checked={organizationForm.terms}
                    onChange={(e) => setOrganizationForm({...organizationForm, terms: e.target.checked})}
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
                    checked={organizationForm.newsletter}
                    onChange={(e) => setOrganizationForm({...organizationForm, newsletter: e.target.checked})}
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

              <TabsContent value="community" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="communityName">Community Name</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="communityName"
                      type="text"
                      placeholder="Enter community name"
                      className={`pl-10 ${errors.communityName ? 'border-red-500' : ''}`}
                      value={communityForm.communityName}
                      onChange={(e) => setCommunityForm({...communityForm, communityName: e.target.value})}
                    />
                  </div>
                  {errors.communityName && <p className="text-sm text-red-500">{errors.communityName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="leaderName">Community Leader</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="leaderName"
                      type="text"
                      placeholder="Enter leader name"
                      className={`pl-10 ${errors.leaderName ? 'border-red-500' : ''}`}
                      value={communityForm.leaderName}
                      onChange={(e) => setCommunityForm({...communityForm, leaderName: e.target.value})}
                    />
                  </div>
                  {errors.leaderName && <p className="text-sm text-red-500">{errors.leaderName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="communityEmail">Community Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="communityEmail"
                      type="email"
                      placeholder="Enter community email"
                      className={`pl-10 ${errors.communityEmail ? 'border-red-500' : ''}`}
                      value={communityForm.communityEmail}
                      onChange={(e) => setCommunityForm({...communityForm, communityEmail: e.target.value})}
                    />
                  </div>
                  {errors.communityEmail && <p className="text-sm text-red-500">{errors.communityEmail}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="communityWallet">Wallet Address</Label>
                  <div className="relative">
                    <div className="absolute left-3 top-3 h-4 w-4 text-muted-foreground font-mono text-xs">
                      0x
                    </div>
                    <Input
                      id="communityWallet"
                      type="text"
                      placeholder="Enter community's Ethereum wallet address"
                      className={`pl-8 ${errors.wallet ? 'border-red-500' : ''}`}
                      value={communityForm.wallet}
                      onChange={(e) => setCommunityForm({...communityForm, wallet: e.target.value})}
                    />
                  </div>
                  {errors.wallet && <p className="text-sm text-red-500">{errors.wallet}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="communityPassword">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="communityPassword"
                      type={showPassword.communityPassword ? "text" : "password"}
                      placeholder="Create a password"
                      className={`pl-10 pr-10 ${errors.communityPassword ? 'border-red-500' : ''}`}
                      value={communityForm.communityPassword}
                      onChange={(e) => setCommunityForm({...communityForm, communityPassword: e.target.value})}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => togglePasswordVisibility('communityPassword')}
                    >
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                  {errors.communityPassword && <p className="text-sm text-red-500">{errors.communityPassword}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="communityConfirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="communityConfirmPassword"
                      type={showPassword.communityConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      className={`pl-10 pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                      value={communityForm.confirmPassword}
                      onChange={(e) => setCommunityForm({...communityForm, confirmPassword: e.target.value})}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => togglePasswordVisibility('communityConfirmPassword')}
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
                    checked={communityForm.terms}
                    onChange={(e) => setCommunityForm({...communityForm, terms: e.target.checked})}
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
                    checked={communityForm.newsletter}
                    onChange={(e) => setCommunityForm({...communityForm, newsletter: e.target.checked})}
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
