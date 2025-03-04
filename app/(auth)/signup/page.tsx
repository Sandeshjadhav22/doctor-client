"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DoctorSignUp() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    profilePicture: null as File | null,
    name: "",
    specialty: "",
    email: "",
    phoneNumber: "",
    yearsOfExperience: "",
    password: "",
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, profilePicture: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const formDataToSend = new FormData();

      if (formData.profilePicture) {
        formDataToSend.append("profilePicture", formData.profilePicture);
      }
      formDataToSend.append("name", formData.name);
      formDataToSend.append("specialty", formData.specialty);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phoneNumber", formData.phoneNumber);
      formDataToSend.append("yearsOfExperience", formData.yearsOfExperience);
      formDataToSend.append("password", formData.password);

      const response = await fetch("http://localhost:8080/api/doctor/signup", {
        method: "POST",
        credentials: "include",
        body: formDataToSend,
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Failed to signup");
        return;
      }

      const data = await response.json();
      const doctorId = data.doctor.id;
      const token = data.token;

      localStorage.setItem("doctorId", doctorId);
      localStorage.setItem("authToken", token);

      setSuccess("Signup successful");
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 mt-8">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Doctor Sign Up</CardTitle>
          <CardDescription>
            Create your patient account to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="profilePicture">Profile Picture</Label>
              <div className="flex items-center space-x-4">
                <div className="relative w-32 h-32">
                  <input
                    type="file"
                    id="profilePicture"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="w-full h-full rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Profile preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm text-gray-500">
                  Click to upload or drag and drop
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialty">Specialty</Label>
              <Textarea
                id="specialty"
                name="specialty"
                value={formData.specialty}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="yearsOfExperience">years Of Experience</Label>
              <Input
                id="yearsOfExperience"
                name="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>

            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link
            href="/signin"
            className="text-sm text-blue-600 hover:underline"
          >
            Already have an account? Sign in
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
