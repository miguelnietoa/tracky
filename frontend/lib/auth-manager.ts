import { LoginResponse } from './types'

export class AuthManager {
  private static readonly TOKEN_KEY = 'tracky_token'
  private static readonly USER_KEY = 'tracky_user'

  // Get token from storage (checks both localStorage and sessionStorage)
  static getToken(): string | null {
    if (typeof window === 'undefined') return null

    return localStorage.getItem(this.TOKEN_KEY) || sessionStorage.getItem(this.TOKEN_KEY)
  }

  // Get user data from storage
  static getUser(): LoginResponse['user'] | null {
    if (typeof window === 'undefined') return null

    const userStr = localStorage.getItem(this.USER_KEY) || sessionStorage.getItem(this.USER_KEY)
    if (!userStr) return null

    try {
      return JSON.parse(userStr)
    } catch {
      return null
    }
  }

  // Alias for getCurrentUser (used in campaign creation)
  static getCurrentUser(): LoginResponse['user'] | null {
    return this.getUser()
  }

  // Check if user is authenticated
  static isAuthenticated(): boolean {
    return !!this.getToken()
  }

  // Store authentication data
  static setAuth(data: LoginResponse, rememberMe: boolean = false): void {
    if (typeof window === 'undefined') return

    const storage = rememberMe ? localStorage : sessionStorage

    storage.setItem(this.TOKEN_KEY, data.access_token)
    if (data.user) {
      storage.setItem(this.USER_KEY, JSON.stringify(data.user))
    }
  }

  // Clear authentication data
  static clearAuth(): void {
    if (typeof window === 'undefined') return

    localStorage.removeItem(this.TOKEN_KEY)
    localStorage.removeItem(this.USER_KEY)
    sessionStorage.removeItem(this.TOKEN_KEY)
    sessionStorage.removeItem(this.USER_KEY)
  }

  // Get authorization header for API requests
  static getAuthHeader(): { Authorization: string } | {} {
    const token = this.getToken()
    return token ? { Authorization: `Bearer ${token}` } : {}
  }

  // Logout and redirect
  static logout(redirectTo: string = '/login'): void {
    this.clearAuth()
    if (typeof window !== 'undefined') {
      window.location.href = redirectTo
    }
  }
}
