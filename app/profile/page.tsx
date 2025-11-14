"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, User, Mail, Phone, MapPin, CreditCard } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Mock user data - in a real app this would come from an API
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    address: "123 Main St, Apt 4B, New York, NY 10001",
    joinDate: "January 15, 2023",
    loyaltyPoints: 1250,
  });
  
  const [formData, setFormData] = useState({ ...userData });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = () => {
    // Validation
    let valid = true;
    const newErrors = { 
      name: "", 
      email: "", 
      phone: "", 
      address: "",
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    };
    
    if (!formData.name) {
      newErrors.name = "Name is required";
      valid = false;
    }
    
    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
      valid = false;
    }
    
    if (!formData.phone) {
      newErrors.phone = "Phone is required";
      valid = false;
    }
    
    if (!formData.address) {
      newErrors.address = "Address is required";
      valid = false;
    }
    
    if (!valid) {
      setErrors(newErrors);
      return;
    }
    
    // Save data (in a real app this would be an API call)
    setUserData(formData);
    setIsEditing(false);
  };

  const handleChangePassword = () => {
    // Validation
    let valid = true;
    const newErrors = { 
      name: "", 
      email: "", 
      phone: "", 
      address: "",
      currentPassword: "", 
      newPassword: "", 
      confirmNewPassword: "" 
    };
    
    if (!passwordData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
      valid = false;
    }
    
    if (!passwordData.newPassword) {
      newErrors.newPassword = "New password is required";
      valid = false;
    } else if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
      valid = false;
    }
    
    if (!passwordData.confirmNewPassword) {
      newErrors.confirmNewPassword = "Please confirm your new password";
      valid = false;
    } else if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      newErrors.confirmNewPassword = "Passwords do not match";
      valid = false;
    }
    
    if (!valid) {
      setErrors(newErrors);
      return;
    }
    
    // Save password (in a real app this would be an API call)
    console.log("Password changed successfully");
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  };

  const handleLogout = () => {
    // In a real app, this would clear the user session
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-emerald-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">My Profile</h1>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="border-emerald-600 text-emerald-700 hover:bg-emerald-50"
          >
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="rounded-3xl border-emerald-100">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="mx-auto h-20 w-20 rounded-full bg-emerald-600 grid place-items-center text-white font-bold text-2xl mb-3">
                    {userData.name.charAt(0)}
                  </div>
                  <h2 className="text-xl font-semibold">{userData.name}</h2>
                  <p className="text-slate-600 text-sm">{userData.email}</p>
                  <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                    <span>Member since {userData.joinDate}</span>
                  </div>
                </div>
                
                <nav className="space-y-1">
                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`w-full text-left px-4 py-3 rounded-xl flex items-center ${
                      activeTab === "profile" 
                        ? "bg-emerald-100 text-emerald-800 font-medium" 
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <User className="h-5 w-5 mr-3" />
                    Profile Information
                  </button>
                  <button
                    onClick={() => setActiveTab("password")}
                    className={`w-full text-left px-4 py-3 rounded-xl flex items-center ${
                      activeTab === "password" 
                        ? "bg-emerald-100 text-emerald-800 font-medium" 
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <CreditCard className="h-5 w-5 mr-3" />
                    Change Password
                  </button>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className={`w-full text-left px-4 py-3 rounded-xl flex items-center ${
                      activeTab === "orders" 
                        ? "bg-emerald-100 text-emerald-800 font-medium" 
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <CreditCard className="h-5 w-5 mr-3" />
                    Order History
                  </button>
                  <button
                    onClick={() => setActiveTab("loyalty")}
                    className={`w-full text-left px-4 py-3 rounded-xl flex items-center ${
                      activeTab === "loyalty" 
                        ? "bg-emerald-100 text-emerald-800 font-medium" 
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <CreditCard className="h-5 w-5 mr-3" />
                    Loyalty Points
                  </button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "profile" && (
              <Card className="rounded-3xl border-emerald-100">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Profile Information</CardTitle>
                  <Button 
                    onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                    className="bg-emerald-700 hover:bg-emerald-800"
                  >
                    {isEditing ? "Save Changes" : "Edit Profile"}
                  </Button>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-300 ${
                              errors.name ? "border-red-500" : "border-slate-200"
                            }`}
                          />
                          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-300 ${
                              errors.email ? "border-red-500" : "border-slate-200"
                            }`}
                          />
                          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                        </div>
                        
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-300 ${
                              errors.phone ? "border-red-500" : "border-slate-200"
                            }`}
                          />
                          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                        </div>
                        
                        <div>
                          <label htmlFor="address" className="block text-sm font-medium text-slate-700 mb-1">
                            Delivery Address
                          </label>
                          <textarea
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            rows={3}
                            className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-300 ${
                              errors.address ? "border-red-500" : "border-slate-200"
                            }`}
                          />
                          {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setIsEditing(false);
                            setFormData({ ...userData }); // Reset form data
                          }}
                          className="mr-3 border-slate-300 hover:bg-slate-50"
                        >
                          Cancel
                        </Button>
                        <Button 
                          onClick={handleSaveProfile}
                          className="bg-emerald-700 hover:bg-emerald-800"
                        >
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-sm font-medium text-slate-500">Full Name</h3>
                          <p className="mt-1 text-slate-800">{userData.name}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-slate-500">Email Address</h3>
                          <p className="mt-1 text-slate-800">{userData.email}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-slate-500">Phone Number</h3>
                          <p className="mt-1 text-slate-800">{userData.phone}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-slate-500">Delivery Address</h3>
                          <p className="mt-1 text-slate-800">{userData.address}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-slate-500">Member Since</h3>
                          <p className="mt-1 text-slate-800">{userData.joinDate}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-slate-500">Loyalty Points</h3>
                          <p className="mt-1 text-slate-800">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                              {userData.loyaltyPoints} points
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
            
            {activeTab === "password" && (
              <Card className="rounded-3xl border-emerald-100">
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="max-w-md space-y-6">
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-slate-700 mb-1">
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="currentPassword"
                          name="currentPassword"
                          value={passwordData.currentPassword}
                          onChange={handlePasswordChange}
                          className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-300 ${
                            errors.currentPassword ? "border-red-500" : "border-slate-200"
                          }`}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5 text-slate-500" />
                          ) : (
                            <Eye className="h-5 w-5 text-slate-500" />
                          )}
                        </button>
                      </div>
                      {errors.currentPassword && <p className="mt-1 text-sm text-red-600">{errors.currentPassword}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-slate-700 mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-300 ${
                          errors.newPassword ? "border-red-500" : "border-slate-200"
                        }`}
                      />
                      {errors.newPassword && <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-slate-700 mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        id="confirmNewPassword"
                        name="confirmNewPassword"
                        value={passwordData.confirmNewPassword}
                        onChange={handlePasswordChange}
                        className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-300 ${
                          errors.confirmNewPassword ? "border-red-500" : "border-slate-200"
                        }`}
                      />
                      {errors.confirmNewPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmNewPassword}</p>}
                    </div>
                    
                    <div className="flex justify-end">
                      <Button 
                        onClick={handleChangePassword}
                        className="bg-emerald-700 hover:bg-emerald-800"
                      >
                        Update Password
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {activeTab === "orders" && (
              <Card className="rounded-3xl border-emerald-100">
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <div className="mx-auto h-16 w-16 rounded-full bg-emerald-100 grid place-items-center text-emerald-600 mb-4">
                      <CreditCard className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-medium text-slate-800 mb-1">No orders yet</h3>
                    <p className="text-slate-600 mb-6">Your order history will appear here once you place an order.</p>
                    <Button asChild className="bg-emerald-700 hover:bg-emerald-800">
                      <Link href="/">Start Ordering</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {activeTab === "loyalty" && (
              <Card className="rounded-3xl border-emerald-100">
                <CardHeader>
                  <CardTitle>Loyalty Points</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-emerald-100 text-emerald-600 mb-4">
                      <span className="text-2xl font-bold">{userData.loyaltyPoints}</span>
                    </div>
                    <h3 className="text-lg font-medium text-slate-800 mb-2">Loyalty Points</h3>
                    <p className="text-slate-600 max-w-md mx-auto mb-6">
                      Earn points with every purchase and redeem them for discounts on future orders.
                    </p>
                    <div className="bg-emerald-50 rounded-2xl p-6 max-w-md mx-auto text-left">
                      <h4 className="font-medium text-slate-800 mb-3">How it works:</h4>
                      <ul className="space-y-2 text-sm text-slate-600">
                        <li className="flex items-start">
                          <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 mt-2 mr-3"></span>
                          <span>Earn 1 point for every $1 spent</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 mt-2 mr-3"></span>
                          <span>100 points = $5 off your next order</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 mt-2 mr-3"></span>
                          <span>Special rewards for loyal customers</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}