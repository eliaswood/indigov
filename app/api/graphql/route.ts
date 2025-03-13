import { ApolloServer } from "@apollo/server"
import { startServerAndCreateNextHandler } from "@as-integrations/next"
import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { typeDefs } from "@/graphql/schema"
import { resolvers } from "@/graphql/resolvers"
import { getUserFromRequest } from "@/lib/auth"

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => {
    // Get user from request if authenticated
    const user = getUserFromRequest(req);
    
    return { 
      prisma,
      user, 
    }
  },
})

export { handler as GET, handler as POST }

