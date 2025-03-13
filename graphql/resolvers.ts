import { comparePasswords, generateToken, hashPassword, getUserFromRequest } from "@/lib/auth";

export const resolvers = {
  Query: {
    users: async (_parent: any, _args: any, context: any) => {
      return context.prisma.user.findMany()
    },
    user: async (_parent: any, args: { id: string }, context: any) => {
      const user = await context.prisma.user.findUnique({
        where: { id: args.id },
      })
      console.log(user)
      return user
    },
    constituents: async (_parent: any, _args: any, context: any) => {
      return context.prisma.constituents.findMany()
    },
    constituent: async (_parent: any, args: { id: string }, context: any) => {
      return context.prisma.constituents.findUnique({
        where: { id: args.id },
      })
    },
    me: async (_parent: any, _args: any, context: any) => {
      const user = context.user;
      if (!user) return null;
      
      return context.prisma.user.findUnique({
        where: { id: user.id },
      });
    },
  },
  Mutation: {
    login: async (_parent: any, args: { email: string; password: string }, context: any) => {
      // Find user by email
      const user = await context.prisma.user.findUnique({
        where: { email: args.email },
      });

      if (!user) {
        throw new Error('User not found');
      }

      // Verify password
      const isPasswordValid = await comparePasswords(args.password, user.password);

      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }
      
      // Generate JWT token
      const token = generateToken(user);
      
      return {
        token,
        user,
      };
    },
    createUser: async (_parent: any, args: { email: string; name?: string; username: string; password: string; figureType?: string }, context: any) => {
      // Check if user with this email already exists
      const existingUserByEmail = await context.prisma.user.findUnique({
        where: { email: args.email },
      });
      
      // Check if user with this username already exists
      const existingUserByUsername = await context.prisma.user.findUnique({
        where: { username: args.username },
      });
      
      // Hash the password before storing
      const hashedPassword = await hashPassword(args.password);
      
      // If a user with this email exists, update their data
      if (existingUserByEmail) {
        return context.prisma.user.update({
          where: { email: args.email },
          data: {
            name: args.name,
            username: args.username,
            password: hashedPassword,
            figureType: args.figureType,
          },
        });
      }
      
      // If a user with this username exists, update their data
      if (existingUserByUsername) {
        return context.prisma.user.update({
          where: { username: args.username },
          data: {
            email: args.email,
            name: args.name,
            password: hashedPassword,
            figureType: args.figureType,
          },
        });
      }
      
      // Otherwise, create a new user
      return context.prisma.user.create({
        data: {
          email: args.email,
          name: args.name,
          username: args.username,
          password: hashedPassword,
          figureType: args.figureType,
        },
      });
    },
    createConstituent: async (_parent: any, args: { 
      name: string;
      email: string;
      phone: string;
      address?: string;
      city?: string;
      state?: string;
      zip?: string;
      county?: string;
      partyAffiliation?: string;
      isActive?: boolean;
      isVoter?: boolean;
      approvalRating?: number;
      representedById?: string;
    }, context: any) => {
      // Check authentication
      const user = context.user;
      if (!user) {
        throw new Error('Authentication required');
      }
      
      // If representedById is not provided, use the current user's ID
      const representedById = args.representedById || user.id;
      
      return context.prisma.constituents.create({
        data: {
          name: args.name,
          email: args.email,
          phone: args.phone,
          address: args.address,
          city: args.city,
          state: args.state,
          zip: args.zip,
          county: args.county,
          partyAffiliation: args.partyAffiliation,
          isActive: args.isActive !== undefined ? args.isActive : true,
          isVoter: args.isVoter !== undefined ? args.isVoter : true,
          approvalRating: args.approvalRating,
          representedById,
        },
      })
    },
    updateConstituent: async (_parent: any, args: { 
      id: string;
      name?: string;
      email?: string;
      phone?: string;
      address?: string;
      city?: string;
      state?: string;
      zip?: string;
      county?: string;
      partyAffiliation?: string;
      isActive?: boolean;
      isVoter?: boolean;
      approvalRating?: number;
      representedById?: string;
    }, context: any) => {
      // Check authentication
      const user = context.user;
      if (!user) {
        throw new Error('Authentication required');
      }
      
      const { id, ...data } = args;
      return context.prisma.constituents.update({
        where: { id },
        data,
      })
    },
  },
  User: {
    constituents: async (parent: { id: string }, _args: any, context: any) => {
      return context.prisma.constituents.findMany({
        where: { representedById: parent.id },
      })
    },
  },
  Constituents: {
    representedBy: async (parent: { representedById?: string }, _args: any, context: any) => {
      if (!parent.representedById) return null;
      return context.prisma.user.findUnique({
        where: { id: parent.representedById },
      })
    },
  },
}

