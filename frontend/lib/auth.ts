import { apiClient, ApiResponse } from './api'
import { CreateUserDto, CreateUserResponse, LoginDto, LoginResponse } from './types'

export class AuthService {
  static async createUser(userData: CreateUserDto): Promise<ApiResponse<CreateUserResponse>> {
    return apiClient.post<CreateUserResponse>('/auth/createUser', userData)
  }

  static async loginUser(loginData: LoginDto): Promise<ApiResponse<LoginResponse>> {
    return apiClient.post<LoginResponse>('/auth/loginUser', loginData)
  }
}
