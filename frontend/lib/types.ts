// API Data Transfer Objects (matching backend DTOs)
export interface CreateUserDto {
  name: string
  lastName: string
  email: string
  wallet: string
  password: string
  confirmPassword: string
}

export interface LoginDto {
  email: string
  password: string
}

// Frontend form types
export interface LoginFormData {
  email: string
  password: string
  rememberMe: boolean
}
export interface IndividualFormData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  wallet: string
  terms: boolean
  newsletter: boolean
}



export interface OrganizerFormData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  wallet: string
  terms: boolean
  newsletter: boolean
}

export type RegistrationFormData = IndividualFormData | OrganizerFormData

// API Response types
export interface CreateUserResponse {
  id: string
  name: string
  lastName: string
  email: string
  wallet: string
  createdAt: string
}

export interface LoginResponse {
  access_token: string
  user?: {
    id: string
    name: string
    lastName: string
    email: string
    wallet: string
  }
}

// Campaign related types
export interface CreateCampaignDto {
  createdUserId: string
  name: string
  description: string
  country: string
  city: string
  address: string
  totalParticipants: number
  goal: string
  startDate: string
  endDate: string
  imageUrl: string
}

export interface ApproveCampaignDto {
  campaingId: string
  token: number
}

export interface JoinCampaignDto {
  campaingId: string
}

export enum CampaignStatus {
  CREATED = 'created',
  ACTIVE = 'active',
  INPROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  PENDING = 'pending',
}

export interface Campaign {
  id: string
  name: string
  description: string
  country: string
  city: string
  address: string
  currentParticipants: number
  totalParticipants: number
  goal: string
  startDate: string
  endDate: string
  imageUrl: string
  token: number
  campaignStatus: CampaignStatus
  createAt: string
  creator: {
    id: string
    name: string
    lastName: string
    email: string
  }
}

export interface CampaignFormData {
  name: string
  description: string
  country: string
  city: string
  address: string
  totalParticipants: number
  goal: string
  startDate: string
  endDate: string
  imageUrl: string
}

// Form validation errors
export interface FormErrors {
  [key: string]: string
}
