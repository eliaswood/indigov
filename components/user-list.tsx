"use client"
import { gql, useQuery } from "@apollo/client"
import { ApolloProvider } from "@apollo/client"
import { client } from "@/lib/apollo-client"
import { Loader2 } from "lucide-react"

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
      posts {
        id
        title
      }
    }
  }
`

function UserListContent() {
  const { loading, error, data } = useQuery(GET_USERS)

  if (loading)
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    )

  if (error) return <div className="bg-red-50 text-red-500 p-4 rounded-md">Error: {error.message}</div>

  return (
    <div className="space-y-4">
      {data?.users.map((user: any) => (
        <div key={user.id} className="border border-gray-200 p-4 rounded-md">
          <h3 className="font-medium">{user.name}</h3>
          <p className="text-gray-500 text-sm">{user.email}</p>
          {user.posts.length > 0 && (
            <div className="mt-2">
              <p className="text-xs font-medium text-gray-500 uppercase">Posts</p>
              <ul className="mt-1 space-y-1">
                {user.posts.map((post: any) => (
                  <li key={post.id} className="text-sm">
                    {post.title}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export function UserList() {
  return (
    <ApolloProvider client={client}>
      <UserListContent />
    </ApolloProvider>
  )
}

