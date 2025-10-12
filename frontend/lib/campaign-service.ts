import { apiClient } from './api'
import { CreateCampaignDto, ApproveCampaignDto, JoinCampaignDto, Campaign } from './types'

export class CampaignService {

  static async createCampaign(campaignData: CreateCampaignDto) {
    try {
      const response = await apiClient.post('/campaing/createCampaing', campaignData)
      return response
    } catch (error: any) {
      console.error('Create campaign error:', error)
      return {
        error: {
          message: error.response?.data?.message || error.message || 'Campaign creation failed'
        }
      }
    }
  }

  static async getAllCampaigns(): Promise<{ data?: Campaign[], error?: any }> {
    try {
      const response = await apiClient.get<Campaign[]>('/campaing/allCampaings')
      return { data: response.data }
    } catch (error: any) {
      console.error('Get campaigns error:', error)
      return {
        error: {
          message: error.response?.data?.message || error.message || 'Failed to fetch campaigns'
        }
      }
    }
  }

  static async getCampaignById(id: string): Promise<{ data?: Campaign, error?: any }> {
    try {
      const response = await apiClient.get<Campaign>(`/campaing/${id}`)
      return { data: response.data }
    } catch (error: any) {
      console.error('Get campaign by ID error:', error)
      return {
        error: {
          message: error.response?.data?.message || error.message || 'Failed to fetch campaign'
        }
      }
    }
  }

  static async approveCampaign(approvalData: ApproveCampaignDto) {
    try {
      const response = await apiClient.put('/campaing/approveCampaing', approvalData)
      return response
    } catch (error: any) {
      console.error('Approve campaign error:', error)
      return {
        error: {
          message: error.response?.data?.message || error.message || 'Campaign approval failed'
        }
      }
    }
  }

  static async joinCampaign(joinData: JoinCampaignDto) {
    try {
      const response = await apiClient.put('/campaing/joinCampaing', joinData)
      return response
    } catch (error: any) {
      console.error('Join campaign error:', error)
      return {
        error: {
          message: error.response?.data?.message || error.message || 'Failed to join campaign'
        }
      }
    }
  }
}
