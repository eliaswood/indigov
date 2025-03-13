# Indigov - Constituent Management Platform

A modern web application that helps elected officials manage their constituents effectively. Built with Next.js, GraphQL, Prisma, and PostgreSQL.

## Overview

The Indigov platform provides a comprehensive solution for elected officials to:

- Track and manage constituent information
- Record constituent interactions
- Filter and search constituent data
- Export constituent data for offline analysis
- Maintain robust data security and privacy

## Tech Stack

- **Frontend**: Next.js 15, React 18, Tailwind CSS, shadcn/ui components
- **API**: GraphQL with Apollo Server
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT-based authentication
- **UI Libraries**: Radix UI, Lucide React icons, React Hook Form

## Features

- **User Authentication**: Secure login and registration for elected officials
- **Dashboard**: Intuitive dashboard to view and manage constituent data
- **Constituent Management**: Add, edit, and delete constituent records
- **Data Export**: Export constituent data to CSV format
- **Responsive Design**: Works seamlessly across desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- PostgreSQL database
- npm or yarn package manager

### Environment Setup

1. Clone the repository
2. Create a `.env` file in the root directory with the following variables:

```
DATABASE_URL="postgresql://username:password@localhost:5432/indigov"
```

### Installation

```bash
# Install dependencies
npm install

# Run database migrations
npm run migrate

# Seed the database with sample data (optional)
npm run seed

# Start development server
npm run dev
```

The application will be available at http://localhost:3000

## Database Schema

### User Model
Represents elected officials using the platform.

### Constituents Model
Stores information about constituents, including:
- Basic contact information
- Address and location details
- Party affiliation
- Approval ratings
- Voter status

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run linting
- `npm run migrate` - Run Prisma migrations
- `npm run seed` - Seed database with sample data
- `npm run unseed` - Remove seeded data

## License

This project is privately licensed and not available for redistribution.

## Support

For issues or feature requests, please contact the development team. 