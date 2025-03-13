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

## Approach to Project  
Using v0.dev, I created a loose boilerplate for this app that I could expand upon.  

I chose the technologies listed above for a couple of reasons:  
1. React, GraphQL, and Postgres are within my comfort zone and offer decent scalability—granted, that wasn’t entirely necessary.  
2. Next.js is something I’ve been trying to learn more about for a current side project, and this seemed like another opportunity to expand my skills. In addition, I believe the recruiter mentioned it was part of your tech stack already, but I might be mistaken.  

I approached this from the politician's perspective rather than the constituent's, as far as the project goes. For example, a better UX for the constituent would be to first enter only their email, check if it matches existing data, and then update any necessary information, rather than having to re-enter everything. Additionally, the app doesn’t provide functionality for constituents to see others in their party or connect with them. While that could raise privacy concerns, such issues could be mitigated with an approval system.  

## Trade-offs  

- **Postgres**: Could become a challenge down the road if the schema changes rapidly. However, it provides the necessary relationships for a one-to-many structure.  
  I also didn’t account for situations where a constituent might attend events for various politicians and the implications that would have on the schema. There would likely need to be join tables in addition to an events table to accommodate these nuances.  

- **GraphQL**: While GraphQL is great for handling complexity, for many of these simple queries, it might introduce unnecessary overhead and slow things down. It also requires more setup compared to simple REST calls.  

- **Next.js**: While Next.js has many advantages, especially for server-side rendering, it requires additional effort to set up. Given the size of this project, it may be overkill.  