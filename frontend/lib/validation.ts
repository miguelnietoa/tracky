import { FormErrors } from './types'

export const validateEmail = (email: string): string | undefined => {
  if (!email) return 'Email is required'
  if (email.length < 8) return 'Email must be at least 8 characters'
  if (email.length > 50) return 'Email must be maximum 50 characters'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Invalid email format'
  return undefined
}

export const validatePassword = (password: string): string | undefined => {
  if (!password) return 'Password is required'
  if (password.length < 8) return 'Password must be at least 8 characters'
  if (password.length > 15) return 'Password must be maximum 15 characters'
  if (!/^(?=.*[a-zñ])(?=.*[A-ZÑ])(?=.*\d)(?=.*[@$!%*?&])[A-Za-zñÑ\d@$!%*?&]{8,15}$/.test(password)) {
    return 'Password must contain at least one lowercase letter, one uppercase letter, one number and one special character'
  }
  return undefined
}

export const validateConfirmPassword = (password: string, confirmPassword: string): string | undefined => {
  if (!confirmPassword) return 'Confirm password is required'
  if (password !== confirmPassword) return 'Passwords do not match'
  return undefined
}

export const validateName = (name: string, fieldName: string = 'Name'): string | undefined => {
  if (!name) return `${fieldName} is required`
  if (name.length < 3) return `${fieldName} must be at least 3 characters`
  if (name.length > 20) return `${fieldName} must be maximum 20 characters`
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/.test(name)) {
    return `${fieldName} can only contain letters and spaces`
  }
  return undefined
}

export const validateWallet = (wallet: string): string | undefined => {
  if (!wallet) return 'Wallet address is required'
  if (!/^0x[a-fA-F0-9]{40}$/.test(wallet)) {
    return 'Invalid Ethereum address format (must start with 0x followed by 40 hex characters)'
  }
  return undefined
}

export const validateRequiredField = (value: string, fieldName: string): string | undefined => {
  if (!value || value.trim() === '') return `${fieldName} is required`
  return undefined
}

export const validateLoginPassword = (password: string): string | undefined => {
  if (!password) return 'Password is required'
  return undefined
}

// Campaign validation functions
export const validateCampaignName = (name: string): string | undefined => {
  if (!name || name.trim() === '') return 'Campaign name is required'
  if (name.length < 5) return 'Campaign name must be at least 5 characters'
  if (name.length > 100) return 'Campaign name must be maximum 100 characters'
  return undefined
}

export const validateDescription = (description: string): string | undefined => {
  if (!description || description.trim() === '') return 'Description is required'
  if (description.length < 10) return 'Description must be at least 10 characters'
  if (description.length > 500) return 'Description must be maximum 500 characters'
  return undefined
}

export const validateCountry = (country: string): string | undefined => {
  if (!country || country.trim() === '') return 'Country is required'
  if (country.length < 2) return 'Country name must be at least 2 characters'
  if (country.length > 50) return 'Country name must be maximum 50 characters'
  return undefined
}

export const validateCity = (city: string): string | undefined => {
  if (!city || city.trim() === '') return 'City is required'
  if (city.length < 2) return 'City name must be at least 2 characters'
  if (city.length > 50) return 'City name must be maximum 50 characters'
  return undefined
}

export const validateAddress = (address: string): string | undefined => {
  if (!address || address.trim() === '') return 'Address is required'
  if (address.length < 5) return 'Address must be at least 5 characters'
  if (address.length > 200) return 'Address must be maximum 200 characters'
  return undefined
}

export const validateTotalParticipants = (totalParticipants: number): string | undefined => {
  if (!totalParticipants || totalParticipants <= 0) return 'Total participants must be a positive number'
  if (totalParticipants < 5) return 'Minimum 5 participants required'
  if (totalParticipants > 10000) return 'Maximum 10,000 participants allowed'
  return undefined
}

export const validateGoal = (goal: string): string | undefined => {
  if (!goal || goal.trim() === '') return 'Campaign goal is required'
  if (goal.length < 10) return 'Goal description must be at least 10 characters'
  if (goal.length > 300) return 'Goal description must be maximum 300 characters'
  return undefined
}

export const validateDate = (date: string, fieldName: string): string | undefined => {
  if (!date) return `${fieldName} is required`
  const dateObj = new Date(date)
  if (isNaN(dateObj.getTime())) return `Invalid ${fieldName.toLowerCase()}`
  return undefined
}

export const validateDateRange = (startDate: string, endDate: string): string | undefined => {
  if (!startDate || !endDate) return undefined // Let individual field validation handle empty dates

  const start = new Date(startDate)
  const end = new Date(endDate)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  if (start < today) return 'Start date cannot be in the past'
  if (end <= start) return 'End date must be after start date'

  const diffTime = Math.abs(end.getTime() - start.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays > 365) return 'Campaign cannot run for more than 1 year'

  return undefined
}

export const validateImageUrl = (url: string): string | undefined => {
  if (!url || url.trim() === '') return 'Image URL is required'

  try {
    new URL(url)
  } catch {
    return 'Invalid URL format'
  }

  // Check if it's a valid image URL (basic check)
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg']
  const urlObj = new URL(url)
  const pathLower = urlObj.pathname.toLowerCase()
  const hasValidExtension = imageExtensions.some(ext => pathLower.endsWith(`.${ext}`))

  if (!hasValidExtension && !url.includes('unsplash.com') && !url.includes('cloudinary.com') && !url.includes('imgur.com')) {
    return 'URL should point to a valid image file (jpg, jpeg, png, gif, webp, svg) or be from a supported image hosting service'
  }

  return undefined
}
