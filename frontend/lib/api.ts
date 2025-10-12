import { AuthManager } from './auth-manager'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002'

export interface ApiError {
  message: string
  statusCode: number
  error?: string
}

export interface ApiResponse<T> {
  data?: T
  error?: ApiError
}

class ApiClient {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseURL}${endpoint}`

      const config: RequestInit = {
        headers: {
          'Content-Type': 'application/json',
          ...AuthManager.getAuthHeader(),
          ...options.headers,
        },
        ...options,
      }

      const response = await fetch(url, config)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))

        // If unauthorized, clear auth data
        if (response.status === 401) {
          AuthManager.clearAuth()
        }

        return {
          error: {
            message: errorData.message || 'An error occurred',
            statusCode: response.status,
            error: errorData.error,
          },
        }
      }

      const data = await response.json()
      return { data }
    } catch (error) {
      return {
        error: {
          message: error instanceof Error ? error.message : 'Network error',
          statusCode: 0,
        },
      }
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' })
  }

  async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async put<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }
}

export const apiClient = new ApiClient(API_BASE_URL)
