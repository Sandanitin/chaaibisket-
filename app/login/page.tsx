"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get('returnUrl') || '/profile';
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    let valid = true;
    const newErrors = { email: "", password: "" };
    
    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
      valid = false;
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }
    
    if (!valid) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    
    // Simulate login API call
    setTimeout(() => {
      setIsLoading(false);
      // Save user data to localStorage to indicate logged in state
      localStorage.setItem('user', JSON.stringify({ 
        email: formData.email,
        name: formData.email.split('@')[0] // Simple name extraction
      }));
      router.push(returnUrl); // Redirect to returnUrl or profile page after login
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-emerald-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md rounded-3xl shadow-xl border-emerald-100">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-emerald-600 grid place-items-center text-white font-bold text-2xl">CB</div>
          </div>
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <p className="text-slate-600 text-sm">Sign in to your Chai Bisket account</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-300 ${errors.email ? "border-red-500" : "border-slate-200"}`}
                placeholder="your@email.com"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p id="email-error" className="text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-300 ${errors.password ? "border-red-500" : "border-slate-200"}`}
                  placeholder="••••••••"
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "password-error" : undefined}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-slate-500" />
                  ) : (
                    <Eye className="h-5 w-5 text-slate-500" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p id="password-error" className="text-sm text-red-600">{errors.password}</p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <label htmlFor="remember" className="ml-2 block text-sm">Remember me</label>
              </div>
              <Link href="#" className="text-sm text-emerald-600 hover:text-emerald-700">
                Forgot password?
              </Link>
            </div>
            <Button 
              type="submit" 
              className="w-full bg-emerald-700 hover:bg-emerald-800"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm">
            <span className="text-slate-600">Don't have an account? </span>
            <Link href="/signup" className="text-emerald-600 hover:text-emerald-700 font-medium">
              Sign up
            </Link>
          </div>
          
          <div className="mt-4 text-center text-sm">
            <Link href="/" className="text-emerald-600 hover:text-emerald-700 font-medium">
              ← Back to Home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}