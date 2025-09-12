# Centro de Estética Lucy Lara - Website

## Overview

This is a comprehensive beauty salon website for Centro de Estética Lucy Lara, a beauty center located in Madrid, Spain. The application is a full-stack web solution built with React frontend and Express backend, featuring service booking, product catalog, and customer management functionality.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom design system using burgundy (#8b2154) and teal (#a4d6d1) brand colors
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Routing**: Wouter for client-side routing
- **State Management**: React Context for cart functionality, React Query for server state
- **Animations**: Framer Motion for smooth transitions and animations
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: Express sessions with PostgreSQL storage
- **Email Service**: SendGrid for transactional emails
- **Development**: tsx for TypeScript execution in development

### Design System
- **Primary Color**: Burgundy (#8b2154) - main brand color
- **Secondary Color**: Teal (#a4d6d1) - accent color
- **Typography**: Inter for body text, Playfair Display for headings, Montserrat for UI elements
- **Component Library**: Custom-themed shadcn/ui components
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## Key Components

### Service Management
- **Facial Treatments**: Multiple treatment types with detailed descriptions and pricing
- **Micropigmentation**: Eyebrows, eyeliner, and lip treatments
- **Hair Removal**: Electric depilation, SHR photodepilation, and wax treatments
- **Body Treatments**: Relaxing and therapeutic massages
- **Other Services**: Lash lifting, hydrolinfa, acupuncture

### Product Catalog
- **Skincare Products**: Comprehensive range including creams, serums, cleansers, and sunscreens
- **Shopping Cart**: Full e-commerce functionality with cart management
- **Product Details**: Individual product pages with detailed information

### Booking System
- **Online Reservations**: Contact form integration for appointment requests
- **Service Selection**: Dropdown with all available treatments
- **Email Notifications**: Automated emails to salon and customers
- **Google Forms Integration**: Setup documentation for external form integration

### Customer Experience
- **Responsive Design**: Optimized for mobile and desktop
- **WhatsApp Integration**: Direct contact button
- **Chatbot**: AI-powered customer service assistant
- **Testimonials**: Customer review section
- **Image Gallery**: Showcase of facilities and treatments

## Data Flow

1. **User Navigation**: Client-side routing with Wouter handles page transitions
2. **Service Browsing**: Static service data rendered with React components
3. **Product Shopping**: Cart state managed through React Context
4. **Booking Requests**: Form submissions sent to Express backend
5. **Email Processing**: SendGrid handles email notifications
6. **Data Persistence**: Booking data stored in PostgreSQL via Drizzle ORM

## External Dependencies

### Core Framework Dependencies
- React ecosystem (React, React DOM, React Query)
- Express.js with TypeScript support
- Drizzle ORM with PostgreSQL driver (@neondatabase/serverless)

### UI and Styling
- Tailwind CSS for styling
- Radix UI primitives for accessible components
- Framer Motion for animations
- Lucide React for icons

### Development Tools
- Vite for build tooling
- TypeScript for type safety
- ESBuild for production builds

### Third-party Services
- SendGrid for email delivery
- Google Analytics (optional, configured via environment variables)
- WhatsApp Business integration

### Database
- PostgreSQL as primary database
- Drizzle Kit for database migrations
- Connection pooling via Neon serverless driver

## Deployment Strategy

### Build Process
1. **Development**: `npm run dev` - runs both frontend and backend in development mode
2. **Production Build**: 
   - Frontend: Vite builds static assets to `dist/public`
   - Backend: ESBuild bundles server code to `dist/index.js`
3. **Database**: Drizzle migrations manage schema changes

### Environment Configuration
- **Replit Deployment**: Configured for Replit's autoscale deployment
- **Port Configuration**: Server runs on port 5000, exposed on port 80
- **Database**: PostgreSQL 16 module enabled in Replit environment
- **Build Command**: `npm run build`
- **Start Command**: `npm run start`

### Production Considerations
- Static asset serving through Express in production
- Environment variables for sensitive configuration
- Session persistence through PostgreSQL
- Email service configuration via SendGrid API keys

## Changelog

```
Changelog:
- June 23, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```