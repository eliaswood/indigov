import type { Metadata } from 'next'
import './globals.css'
import { ApolloWrapper } from '@/components/apollo-provider'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/theme-provider'

export const metadata: Metadata = {
  title: 'Indigov - Constituent Management',
  description: 'A platform for managing constituents and communications',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ApolloWrapper>
            {children}
            <Toaster />
          </ApolloWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
