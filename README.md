# LandLedger - Premium Ghana Real Estate Investment Platform

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)

## Overview

LandLedger is a revolutionary platform that democratizes access to premium Ghana real estate investment through innovative technology, transparent processes, and regulatory compliance. The platform enables both local and diaspora investors to participate in tokenized property investments with transparent returns and seamless access.

## 🌟 Key Features

- **Tokenized Real Estate Investment** - Invest in premium Ghana properties through digital tokens
- **Regulatory Compliance** - SEC regulated platform ensuring investor protection
- **Transparent Returns** - Clear visibility into investment performance and returns
- **Global Access** - Available to investors worldwide, including the Ghanaian diaspora
- **Professional Management** - Expert property management and investment oversight
- **Waitlist System** - Join the exclusive waitlist for early access to investment opportunities
- **Talent Pool** - Connect with real estate professionals and investment experts
- **Blog & Press** - Stay informed with industry insights and company updates

## 🏗️ Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library

### Backend & CMS
- **Sanity CMS** - Headless content management system
- **Next.js API Routes** - Backend API endpoints
- **TypeForm Integration** - Lead generation and forms

### Analytics & Integrations
- **Google Analytics 4** - Website analytics
- **Facebook Pixel** - Conversion tracking
- **Brevo** - Email marketing and automation
- **Make** - Workflow automation

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Sanity account (for CMS)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd landledger-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Fill in your environment variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `SANITY_API_TOKEN`
   - `NEXT_PUBLIC_GA4_MEASUREMENT_ID`
   - `NEXT_PUBLIC_FACEBOOK_PIXEL_ID`
   - `BREVO_API_KEY`
   - `TYPEFORM_ACCESS_TOKEN`

4. **Set up Sanity CMS**
   ```bash
   npm run setup:sanity
   ```

5. **Set up waitlist system**
   ```bash
   npm run setup:waitlist
   ```

### Development

```bash
# Start development server
npm run dev

# Start Sanity Studio
npm run sanity:studio

# Build for production
npm run build

# Start production server
npm start
```

### Sanity CMS Management

```bash
# Validate Sanity configuration
npm run sanity:validate

# Deploy Sanity Studio
npm run sanity:deploy-studio

# Backup Sanity data
npm run sanity:backup

# Rollback Sanity deployment
npm run sanity:rollback
```

## 📁 Project Structure

```
landledger-main/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── blog/              # Blog pages
│   └── studio/            # Sanity Studio
├── components/             # React components
│   ├── sections/          # Page sections
│   └── ui/                # Reusable UI components
├── lib/                    # Utility libraries
│   ├── integrations/      # Third-party integrations
│   └── sanity.ts          # Sanity client
├── public/                 # Static assets
├── scripts/                # Setup and deployment scripts
└── styles/                 # Global styles
```

## 🎨 Design System

LandLedger features a sophisticated design system built with:
- **Custom Color Palette** - Professional real estate aesthetic
- **Typography** - Newsreader font for headings, Inter for body text
- **Component Library** - Consistent UI components with Radix UI primitives
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Animations** - Smooth micro-interactions with Framer Motion

## 🔧 Configuration

### Tailwind CSS
Custom configuration in `tailwind.config.ts` with extended color palette and animations.

### Sanity
Content models and schemas defined in `sanity.config.ts` and `lib/sanity-schemas.ts`.

### TypeForm
Integration configuration in `lib/typeform-config.ts` for lead generation forms.

## 📱 Features

### Core Sections
- **Hero** - Main landing section with value proposition
- **Pain Points** - Addresses investor challenges
- **How It Works** - Investment process explanation
- **Waitlist** - Early access registration
- **Talent Pool** - Professional network
- **About** - Company mission and vision
- **Trust** - Regulatory compliance and credibility
- **Roadmap** - Future development plans
- **Blog** - Industry insights and updates
- **Press** - Media coverage and announcements
- **Contact** - Get in touch with the team

### Interactive Elements
- **Exit Intent Popup** - Lead capture optimization
- **Scroll Progress** - Visual navigation indicator
- **Animated Counters** - Dynamic statistics display
- **Magnetic Buttons** - Enhanced user interaction
- **Newsletter Signup** - Email list building

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main branch

### Manual Deployment
```bash
npm run build
npm start
```

## 📊 Analytics & Tracking

- **Google Analytics 4** - User behavior and conversion tracking
- **Facebook Pixel** - Social media conversion optimization
- **Custom Events** - Platform-specific user interactions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software. All rights reserved.

## 📞 Support

For support and inquiries:
- Email: [Contact through the website]
- Website: [LandLedger Platform]
- Blog: [Industry insights and updates]

## 🔮 Roadmap

- [ ] Mobile app development
- [ ] Advanced portfolio management
- [ ] Real-time market data integration
- [ ] Automated investment recommendations
- [ ] Enhanced regulatory compliance features
- [ ] Multi-language support
- [ ] Advanced analytics dashboard

---

**Built with ❤️ for the Ghana real estate investment community**
