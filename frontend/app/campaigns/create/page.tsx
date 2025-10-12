"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, MapPin, Target, Users, Leaf, ArrowLeft, Loader2, AlertCircle, Plus, X } from "lucide-react"
import Link from "next/link"
import { CampaignService } from "@/lib/campaign-service"
import { CampaignFormData, FormErrors, CreateCampaignDto, CampaignStatus } from "@/lib/types"
import { AuthManager } from "@/lib/auth-manager"
import {
  validateCampaignName,
  validateDescription,
  validateCountry,
  validateCity,
  validateAddress,
  validateTotalParticipants,
  validateGoal,
  validateDate,
  validateDateRange,
  validateImageUrl
} from "@/lib/validation"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function CreateCampaignPage() {
  const router = useRouter()
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()

  const [formData, setFormData] = useState<CampaignFormData>({
    name: '',
    description: '',
    country: '',
    city: '',
    address: '',
    totalParticipants: 10,
    goal: '',
    startDate: '',
    endDate: '',
    imageUrl: ''
  })

  const [campaignStatus, setCampaignStatus] = useState<CampaignStatus | null>(null)

  const updateFormData = (field: keyof CampaignFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {}

    const nameError = validateCampaignName(formData.name)
    if (nameError) newErrors.name = nameError

    const descriptionError = validateDescription(formData.description)
    if (descriptionError) newErrors.description = descriptionError

    const countryError = validateCountry(formData.country)
    if (countryError) newErrors.country = countryError

    const cityError = validateCity(formData.city)
    if (cityError) newErrors.city = cityError

    const addressError = validateAddress(formData.address)
    if (addressError) newErrors.address = addressError

    const participantsError = validateTotalParticipants(formData.totalParticipants)
    if (participantsError) newErrors.totalParticipants = participantsError

    const goalError = validateGoal(formData.goal)
    if (goalError) newErrors.goal = goalError

    const startDateError = validateDate(formData.startDate, 'Start date')
    if (startDateError) newErrors.startDate = startDateError

    const endDateError = validateDate(formData.endDate, 'End date')
    if (endDateError) newErrors.endDate = endDateError

    const dateRangeError = validateDateRange(formData.startDate, formData.endDate)
    if (dateRangeError) newErrors.dateRange = dateRangeError

    const imageUrlError = validateImageUrl(formData.imageUrl)
    if (imageUrlError) newErrors.imageUrl = imageUrlError

    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Get current user
    const currentUser = AuthManager.getUser()
    if (!currentUser) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "Please log in to create a campaign"
      })
      router.push('/login')
      return
    }

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
      const createCampaignData: CreateCampaignDto = {
        createdUserId: currentUser.id,
        name: formData.name,
        description: formData.description,
        country: formData.country,
        city: formData.city,
        address: formData.address,
        totalParticipants: formData.totalParticipants,
        goal: formData.goal,
        startDate: formData.startDate,
        endDate: formData.endDate,
        imageUrl: formData.imageUrl
      }

      const response = await CampaignService.createCampaign(createCampaignData)

      if (response.error) {
        toast({
          variant: "destructive",
          title: "Campaign Creation Failed",
          description: response.error.message || "An error occurred while creating the campaign"
        })
      } else {
        setCampaignStatus(CampaignStatus.CREATED)
        toast({
          title: "Campaign Created Successfully!",
          description: "Your campaign has been created and is awaiting approval from an organizer."
        })

        // Redirect to campaigns page after a delay
        setTimeout(() => {
          router.push('/campaigns')
        }, 3000)
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Campaign Creation Failed",
        description: "An unexpected error occurred. Please try again."
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <Link href="/" className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Leaf className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">Tracky</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/campaigns" className="text-sm font-medium text-tracky-primary">
                Campaigns
              </Link>
              <Link
                href="/tracking"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Tracking
              </Link>
              <Link
                href="/community"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Community
              </Link>
              <Link
                href="/profile"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Profile
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
              <Button size="sm" className="bg-tracky-primary hover:bg-tracky-primary/90">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/campaigns">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Campaigns
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Create New Campaign</h1>
            <p className="text-muted-foreground mt-2">
              Set up a transparent environmental campaign with verifiable impact tracking
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Provide the essential details about your environmental campaign</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Campaign Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Beach Cleanup Initiative"
                    className={`text-base ${errors.name ? 'border-red-500' : ''}`}
                    value={formData.name}
                    onChange={(e) => updateFormData('name', e.target.value)}
                  />
                  {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your campaign's purpose, activities, and expected outcomes..."
                    className={`min-h-32 text-base ${errors.description ? 'border-red-500' : ''}`}
                    value={formData.description}
                    onChange={(e) => updateFormData('description', e.target.value)}
                  />
                  {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      placeholder="e.g., Brazil"
                      className={`${errors.country ? 'border-red-500' : ''}`}
                      value={formData.country}
                      onChange={(e) => updateFormData('country', e.target.value)}
                    />
                    {errors.country && <p className="text-sm text-red-500">{errors.country}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      placeholder="e.g., São Paulo"
                      className={`${errors.city ? 'border-red-500' : ''}`}
                      value={formData.city}
                      onChange={(e) => updateFormData('city', e.target.value)}
                    />
                    {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="address"
                      placeholder="e.g., Av. Paulista, 1578"
                      className={`pl-10 ${errors.address ? 'border-red-500' : ''}`}
                      value={formData.address}
                      onChange={(e) => updateFormData('address', e.target.value)}
                    />
                  </div>
                  {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="goal">Campaign Goal</Label>
                  <Textarea
                    id="goal"
                    placeholder="e.g., Reforestation of 1000 trees to restore local ecosystem"
                    className={`min-h-20 ${errors.goal ? 'border-red-500' : ''}`}
                    value={formData.goal}
                    onChange={(e) => updateFormData('goal', e.target.value)}
                  />
                  {errors.goal && <p className="text-sm text-red-500">{errors.goal}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Campaign Image URL</Label>
                  <Input
                    id="imageUrl"
                    placeholder="https://example.com/campaign-image.jpg"
                    className={`${errors.imageUrl ? 'border-red-500' : ''}`}
                    value={formData.imageUrl}
                    onChange={(e) => updateFormData('imageUrl', e.target.value)}
                  />
                  {errors.imageUrl && <p className="text-sm text-red-500">{errors.imageUrl}</p>}
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Campaign Timeline</CardTitle>
                <CardDescription>Set the duration for your environmental campaign</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="startDate"
                        type="date"
                        className={`pl-10 ${errors.startDate ? 'border-red-500' : ''}`}
                        value={formData.startDate}
                        onChange={(e) => {
                          updateFormData('startDate', e.target.value)
                          if (e.target.value) {
                            setStartDate(new Date(e.target.value))
                          }
                        }}
                      />
                    </div>
                    {errors.startDate && <p className="text-sm text-red-500">{errors.startDate}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="endDate"
                        type="date"
                        className={`pl-10 ${errors.endDate ? 'border-red-500' : ''}`}
                        value={formData.endDate}
                        onChange={(e) => {
                          updateFormData('endDate', e.target.value)
                          if (e.target.value) {
                            setEndDate(new Date(e.target.value))
                          }
                        }}
                      />
                    </div>
                    {errors.endDate && <p className="text-sm text-red-500">{errors.endDate}</p>}
                  </div>
                </div>
                {errors.dateRange && (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{errors.dateRange}</AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Participation Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Participation Settings</CardTitle>
                <CardDescription>Configure how volunteers can join and participate in your campaign</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="maxParticipants">Maximum Participants</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="maxParticipants"
                      type="number"
                      placeholder="100"
                      className={`pl-10 ${errors.totalParticipants ? 'border-red-500' : ''}`}
                      value={formData.totalParticipants}
                      onChange={(e) => updateFormData('totalParticipants', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  {errors.totalParticipants && <p className="text-sm text-red-500">{errors.totalParticipants}</p>}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Campaign Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <Target className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm">Campaign preview will appear here</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Campaign Title</h3>
                  <p className="text-sm text-muted-foreground">Your campaign description will appear here...</p>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline">Category</Badge>
                  <Badge variant="outline" className="bg-tracky-secondary/10 text-tracky-secondary">
                    Active
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Blockchain Features */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Blockchain Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-tracky-secondary rounded-full"></div>
                  <span className="text-sm">Immutable impact tracking</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-tracky-secondary rounded-full"></div>
                  <span className="text-sm">Transparent resource allocation</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-tracky-secondary rounded-full"></div>
                  <span className="text-sm">Automated token rewards</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-tracky-secondary rounded-full"></div>
                  <span className="text-sm">Verifiable impact certificates</span>
                </div>
              </CardContent>
            </Card>

            {/* Status Display */}
            {campaignStatus === CampaignStatus.CREATED && (
              <Alert className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Campaign created successfully! It's now awaiting approval from an organizer. Once approved, users will be able to join your campaign.
                </AlertDescription>
              </Alert>
            )}

            {/* Actions */}
            <div className="space-y-3">
              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-tracky-primary hover:bg-tracky-primary/90 text-white"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Campaign...
                  </>
                ) : (
                  'Create Campaign'
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  )
}
