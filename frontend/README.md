# Tracky Frontend

A Next.js-based frontend for Tracky, a blockchain-powered platform for transparent environmental impact tracking and community-driven action.

## 🌍 Overview

Tracky enables communities to create, participate in, and track environmental campaigns with full transparency through blockchain technology. The platform features real-time impact tracking, volunteer recognition, and verifiable results.

## 🏗️ Architecture

### Tech Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with CSS Variables
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React
- **Charts**: Recharts
- **Forms**: React Hook Form with Zod validation
- **Date Handling**: date-fns
- **Fonts**: Inter and Roboto (Google Fonts)

### Project Structure
```
├── app/                    # Next.js App Router pages
│   ├── [locale]/          # Internationalization support (prepared)
│   ├── auditing/          # Resource auditing pages
│   ├── campaigns/         # Campaign management
│   │   ├── [id]/         # Individual campaign details
│   │   └── create/       # Campaign creation
│   ├── community/         # Community hub and discussions
│   │   └── discussions/  # Discussion threads
│   ├── get-started/      # User registration
│   ├── login/            # Authentication
│   ├── profile/          # User profiles and achievements
│   ├── reports/          # Impact reporting
│   ├── rewards/          # Token and reward system
│   ├── tracking/         # Blockchain tracking dashboard
│   ├── globals.css       # Global styles and CSS variables
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Homepage
├── components/            # Reusable UI components
│   ├── theme-provider.tsx # Dark/light theme provider
│   └── ui/               # shadcn/ui components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
└── public/              # Static assets
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3b82f6) - Main brand color for CTAs and highlights
- **Secondary**: Green (#10b981) - Environmental theme, success states
- **Background**: Dynamic (light/dark mode support)
- **Text**: High contrast for accessibility

### Component Library
Built on shadcn/ui providing:
- Consistent design language
- Accessibility-first components
- Dark/light mode support
- Responsive design patterns

### Typography
- **Primary**: Inter font family
- **Secondary**: Roboto for specific use cases
- Responsive font scaling
- Proper heading hierarchy

## 📱 Features

### Core Pages

#### 1. Homepage (`/`)
- Hero section with value proposition
- Feature highlights
- Community statistics
- Call-to-action buttons

#### 2. Campaigns (`/campaigns`)
- Campaign discovery and filtering
- Search functionality
- Category-based organization
- Join/create campaign actions

#### 3. Campaign Creation (`/campaigns/create`)
- Multi-step form for campaign setup
- Impact metrics definition
- Timeline configuration
- Participant settings

#### 4. Tracking Dashboard (`/tracking`)
- Real-time blockchain data
- Impact analytics with charts
- Transaction history
- Network status monitoring

#### 5. Community Hub (`/community`)
- Discussion forums
- Knowledge sharing
- Trending topics
- User contributions

#### 6. User Profile (`/profile`)
- Achievement system
- Badge collection
- Token balance
- Activity history
- Leaderboards

#### 7. Authentication
- Login page (`/login`)
- Registration with multiple account types (`/get-started`)
- Social login options (Google, GitHub)

### Key Features

#### Blockchain Integration
- Real-time transaction tracking
- Impact verification
- Token distribution
- Network health monitoring

#### Gamification
- Achievement system
- Badge collection (Common, Rare, Epic, Legendary)
- Token rewards
- Global leaderboards

#### Community Features
- Discussion forums
- Knowledge sharing
- Peer support
- Expert contributions

#### Analytics & Reporting
- Environmental impact metrics
- Campaign performance
- User engagement tracking
- Resource allocation transparency

## 🔧 Development

### Setup
```bash
npm install
npm run dev
```

### Scripts
- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run start` - Production server
- `npm run lint` - ESLint

### Configuration
- **Next.js**: Configured for static exports with image optimization disabled
- **TypeScript**: Strict mode with build error ignoring for development
- **ESLint**: Configured but with build-time ignoring
- **Tailwind**: v4 with PostCSS integration

## 🎯 State Management

Currently uses React's built-in state management:
- `useState` for component state
- Props drilling for shared state
- No global state management library yet

### Recommended Improvements
- Add Zustand or Redux Toolkit for global state
- Implement React Query for server state
- Add context providers for auth state

## 🔄 Data Flow

### Mock Data
All pages currently use mock data for development:
- Campaign information
- User profiles
- Blockchain transactions
- Community discussions

### API Integration (Planned)
- RESTful API endpoints
- WebSocket for real-time updates
- Blockchain RPC integration
- File upload handling

## 📊 Performance

### Optimizations
- Next.js automatic code splitting
- Image optimization (disabled for static export)
- CSS variable-based theming
- Responsive design patterns

### Monitoring (Recommended)
- Vercel Analytics (already included)
- Performance monitoring
- Error tracking
- User behavior analytics

## 🌐 Internationalization

### Current Status
- Prepared folder structure (`app/[locale]/`)
- English-only content currently
- Ready for i18n implementation

### Implementation Plan
- Add next-intl or similar library
- Extract strings to translation files
- Support multiple languages
- RTL language support

## ♿ Accessibility

### Current Features
- Semantic HTML structure
- Proper ARIA labels
- Keyboard navigation support
- High contrast colors
- Screen reader compatibility

### Compliance
- WCAG 2.1 AA compliance target
- Color contrast ratios
- Focus management
- Alternative text for images

## 🔒 Security

### Current Measures
- TypeScript for type safety
- Input validation patterns
- Secure cookie handling (when implemented)
- XSS prevention through React

### Recommendations
- Add Content Security Policy
- Implement proper authentication
- Add rate limiting
- Secure API endpoints

## 🚀 Deployment

### Current Configuration
- Static export ready
- Vercel deployment optimized
- Environment variable support
- CDN-ready assets

### Environments
- Development: Local development server
- Staging: Preview deployments
- Production: Static site deployment

## 🐛 Known Issues

1. **TypeScript Errors**: Build errors ignored for development
2. **ESLint Issues**: Linting ignored during builds
3. **Missing Backend**: All data is mocked
4. **Authentication**: No real auth implementation
5. **Responsive Issues**: Some components need mobile optimization

## 🔮 Future Enhancements

### Short-term
1. Backend API integration
2. Real authentication system
3. Mobile responsiveness improvements
4. Performance optimizations

### Medium-term
1. Offline support (PWA)
2. Real-time notifications
3. Advanced filtering and search
4. Multi-language support

### Long-term
1. Mobile applications
2. Advanced analytics dashboard
3. AI-powered recommendations
4. Integration with IoT sensors

## 📚 Documentation

### Component Documentation
Each component includes:
- TypeScript interfaces
- Usage examples
- Props documentation
- Accessibility notes

### API Documentation (Planned)
- OpenAPI/Swagger specs
- Endpoint documentation
- Authentication guides
- Rate limiting info

## 🤝 Contributing

### Code Style
- TypeScript strict mode
- ESLint configuration
- Prettier formatting
- Consistent naming conventions

### Pull Request Process
1. Feature branches from main
2. Code review required
3. Tests must pass
4. Documentation updates

## 📄 License

[Insert license information]

## 📞 Support

[Insert support contact information]