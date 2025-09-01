# Overview

Jay Shree Mahakal Finance (JSMF) is a comprehensive loan management platform built as a modern full-stack web application. The system facilitates loan applications for various financial products including home loans, car loans, business loans, and education loans. It features a public-facing website for loan applications, an admin dashboard for application management, and a DSA (Direct Selling Agent) partner portal for business partnerships.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Styling**: Tailwind CSS with CSS variables for theming support
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state and API management
- **Forms**: React Hook Form with Zod validation

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Authentication**: JWT-based authentication with bcrypt for password hashing
- **API Design**: RESTful API with structured error handling and logging middleware
- **Development**: Hot module replacement with Vite dev server integration

## Data Storage Solutions
- **Primary Database**: PostgreSQL hosted on Neon (serverless PostgreSQL)
- **Schema Management**: Drizzle Kit for database migrations and schema management
- **Connection Pooling**: Neon serverless connection pooling with WebSocket support

## Authentication and Authorization
- **Admin Authentication**: Username/password login with JWT tokens
- **DSA Partner Authentication**: Email/password login with separate JWT tokens
- **Session Management**: JWT tokens with 24-hour expiration
- **Password Security**: bcrypt hashing with salt rounds

## Key Features
- **Multi-step Loan Applications**: Progressive form collection with validation
- **EMI Calculator**: Real-time loan calculation with interactive sliders
- **Admin Dashboard**: Comprehensive loan application management and DSA partner oversight
- **DSA Partner Portal**: Registration, KYC management, and partner dashboard
- **Responsive Design**: Mobile-first approach with Tailwind CSS breakpoints

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling
- **@neondatabase/serverless**: Official Neon client for serverless environments

## UI and Styling
- **Radix UI**: Comprehensive suite of accessible React components
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Lucide React**: Icon library for consistent iconography

## Development and Build Tools
- **Vite**: Modern build tool with hot module replacement
- **TypeScript**: Type safety across the entire application
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Tailwind CSS integration

## Third-party Libraries
- **TanStack React Query**: Server state management and caching
- **React Hook Form**: Form management with validation
- **Zod**: Schema validation for forms and API data
- **date-fns**: Date manipulation and formatting utilities
- **Wouter**: Lightweight routing solution for React