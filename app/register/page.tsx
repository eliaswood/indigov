"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { gql, useMutation } from "@apollo/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($email: String!, $name: String, $username: String!, $password: String!, $figureType: FigureType) {
    createUser(email: $email, name: $name, username: $username, password: $password, figureType: $figureType) {
      id
      email
      username
    }
  }
`

export default function RegisterPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    figureType: ""
  })
  const [error, setError] = useState("")

  const [createUser, { loading }] = useMutation(CREATE_USER_MUTATION, {
    onCompleted: () => {
      // Show success toast
      toast({
        title: "Registration Successful",
        description: "Your account has been created. Please log in.",
      })
      
      // Redirect to login page
      router.push("/login")
    },
    onError: (error) => {
      setError(error.message)
    }
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFigureTypeChange = (value: string) => {
    setFormData(prev => ({ ...prev, figureType: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }
    
    try {
      await createUser({
        variables: {
          email: formData.email,
          name: formData.name,
          username: formData.username,
          password: formData.password,
          figureType: formData.figureType || undefined
        }
      })
    } catch (err) {
      // Error is handled in onError callback
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Create an Account</CardTitle>
          <CardDescription>
            Register to manage your constituents
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="johndoe"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="figureType">Position Type</Label>
              <Select onValueChange={handleFigureTypeChange} value={formData.figureType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CONGRESS">Congress</SelectItem>
                  <SelectItem value="SENATE">Senate</SelectItem>
                  <SelectItem value="HOUSE">House</SelectItem>
                  <SelectItem value="STATE_SENATE">State Senate</SelectItem>
                  <SelectItem value="STATE_HOUSE">State House</SelectItem>
                  <SelectItem value="GOVERNOR">Governor</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Register"}
            </Button>
            <p className="text-sm text-center text-gray-500 mt-4">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-500 hover:text-blue-700">
                Login
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
} 