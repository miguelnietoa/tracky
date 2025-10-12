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
