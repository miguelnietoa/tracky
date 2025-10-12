'use client'

import { useState, useEffect } from 'react'
import { AuthManager } from '@/lib/auth-manager'
import { LoginResponse } from '@/lib/types'

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<LoginResponse['user'] | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = AuthManager.isAuthenticated()
      const userData = AuthManager.getUser()

      setIsAuthenticated(authenticated)
      setUser(userData)
      setIsLoading(false)
    }

    checkAuth()

    // Listen for storage changes (for cross-tab synchronization)
    const handleStorageChange = () => {
      checkAuth()
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const logout = () => {
    AuthManager.logout()
    setIsAuthenticated(false)
    setUser(null)
  }

  return {
    isAuthenticated,
    user,
    isLoading,
    logout
  }
}
