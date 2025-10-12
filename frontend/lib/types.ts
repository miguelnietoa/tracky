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

// Form validation errors
export interface FormErrors {
  [key: string]: string
}
