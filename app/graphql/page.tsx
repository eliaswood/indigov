"use client"

import { useEffect } from "react"

export default function GraphQLPlayground() {
  useEffect(() => {
    import("@apollo/sandbox").then(({ ApolloSandbox }) => {
      new ApolloSandbox({
        target: "#sandbox",
        initialEndpoint: "/api/graphql",
      })
    })
  }, [])

  return (
    <div style={{ height: "100vh" }}>
      <div id="sandbox" style={{ height: "100%" }} />
    </div>
  )
}

