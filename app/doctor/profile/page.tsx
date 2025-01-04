"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DoctorProfile() {
  const [doctorData, setDoctorData] = useState({
    name: "",
    specialty: "",
    yearsOfExperience: "",
    email: "",
    profilePicture: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDoctorInfo = async () => {
      try {
        const doctorId = localStorage.getItem("doctorId");
        if (!doctorId) {
          setError("Doctor ID not found in localStorage.");
          return;
        }

        const response = await fetch("http://localhost:8080/api/doctor/getinfo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ doctorId }), // Send doctorId in the request body
        });

        // Check if response is okay
        if (!response.ok) {
          const text = await response.text(); // Get the response as text for debugging
          console.error("Error Response:", text); // Log the error response
          setError("Failed to fetch doctor information.");
          return;
        }

        // If response is okay, try parsing JSON
        const data = await response.json();
        setDoctorData({
          name: data.name || "N/A",
          specialty: data.specialty || "N/A",
          yearsOfExperience: `${data.yearsOfExperience || 0} years`,
          email: data.email || "N/A",
          profilePicture: data.profilePicture || "",
        });
      } catch (error) {
        setError("Something went wrong while fetching doctor data.");
        console.error("Error fetching doctor info:", error);
      }
    };

    fetchDoctorInfo();
  }, []);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 mt-20">
        <p className="text-red-500 text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Doctor's Profile</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            {doctorData.profilePicture ? (
              <Image
                src={doctorData.profilePicture}
                alt={doctorData.name}
                width={200}
                height={200}
                className="rounded-full mx-auto"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center text-white">
                No Image
              </div>
            )}
          </div>
          <div className="md:w-2/3">
            <h2 className="text-xl font-semibold mb-2">{doctorData.name}</h2>
            <p className="text-gray-600 mb-2">
              <strong>Specialty:</strong> {doctorData.specialty}
            </p>
            <p className="mb-2">
              <strong>Experience:</strong> {doctorData.yearsOfExperience}
            </p>
            <p className="mb-4">
              <strong>Email:</strong> {doctorData.email}
            </p>
            <Link href="/doctor/prescriptions">
              <Button>View Prescriptions</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
