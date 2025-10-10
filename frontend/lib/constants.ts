export const APP_CONFIG = {
  name: "Tracky",
  description: "Blockchain-powered platform for community-driven environmental actions with transparent tracking and volunteer recognition.",
  url: "https://tracky.app",
  github: "https://github.com/tracky/frontend",
  creator: "@tracky",
} as const

export const ROUTES = {
  HOME: "/",
  CAMPAIGNS: "/campaigns",
  CAMPAIGN_DETAIL: "/campaigns/[id]",
  CAMPAIGN_CREATE: "/campaigns/create",
  TRACKING: "/tracking",
  COMMUNITY: "/community",
  DISCUSSION: "/community/discussions/[id]",
  PROFILE: "/profile",
  REWARDS: "/rewards",
  AUDITING: "/auditing",
  REPORTS: "/reports",
  LOGIN: "/login",
  GET_STARTED: "/get-started",
} as const

export const CAMPAIGN_CATEGORIES = {
  CLEANUP: "cleanup",
  REFORESTATION: "reforestation",
  RESTORATION: "restoration",
  EDUCATION: "education",
  CONSERVATION: "conservation",
  RENEWABLE: "renewable",
} as const

export const CAMPAIGN_STATUS = {
  ACTIVE: "active",
  UPCOMING: "upcoming", 
  COMPLETED: "completed",
  CANCELLED: "cancelled",
} as const

export const BADGE_RARITY = {
  COMMON: "common",
  RARE: "rare",
  EPIC: "epic",
  LEGENDARY: "legendary",
} as const

export const DISCUSSION_CATEGORIES = {
  ORGANIZATION: "organization",
  IMPACT: "impact",
  TECHNOLOGY: "technology",
  RESOURCES: "resources",
  SUCCESS_STORIES: "success-stories",
  HELP: "help",
} as const

export const TRANSACTION_TYPES = {
  VOLUNTEER_REGISTRATION: "volunteer_registration",
  IMPACT_VERIFICATION: "impact_verification",
  TOKEN_DISTRIBUTION: "token_distribution",
  RESOURCE_AUDIT: "resource_audit",
} as const

export const ACTIVITY_TYPES = {
  CAMPAIGN_JOIN: "campaign_join",
  BADGE_EARNED: "badge_earned",
  IMPACT_VERIFIED: "impact_verified",
  CAMPAIGN_COMPLETE: "campaign_complete",
} as const

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  CAMPAIGNS_PAGE_SIZE: 12,
  DISCUSSIONS_PAGE_SIZE: 10,
  TRANSACTIONS_PAGE_SIZE: 20,
} as const

export const TIMEFRAMES = {
  "24h": "24 Hours",
  "7d": "7 Days",
  "30d": "30 Days",
  "90d": "90 Days",
} as const

export const SORT_OPTIONS = {
  RECENT: "recent",
  POPULAR: "popular",
  ANSWERED: "answered",
  UNANSWERED: "unanswered",
} as const