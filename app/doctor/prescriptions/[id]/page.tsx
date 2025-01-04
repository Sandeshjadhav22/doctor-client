"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { log } from "console";

// In a real application, this data would come from an API or database
const consultationData = {
  id: 1,
  patientName: "John Doe",
  date: "2023-06-01",
  status: "Pending",
  careToBeTaken: "",
  medicines: "",
};

interface PrescriptionData {
  _id: string;
  patientName: string;
  careToBeTaken: string;
  medicines: string;
  date: string;
  status: string;
}

export default function PrescriptionForm({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [prescriptionData, setPrescriptionData] = useState<PrescriptionData | null>(null);
  const [formData, setFormData] = useState({
    careToBeTaken: "",
    medicines: "",
  });


  //test
  useEffect(() => {
    const fetchPrescription = async () => {
      //  const doctorId = "67782b17b5458e80c5b8bbd2"
      const doctorId = localStorage.getItem('doctorId');
      try {
        const response = await fetch(`http://localhost:8080/api/doctor/consultations/${doctorId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch prescription');
        }
        const data = await response.json();
        setPrescriptionData(data);
        setFormData({
          careToBeTaken: data.careToBeTaken || "",
          medicines: data.medicines || "",
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrescription();
  }, [resolvedParams.id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8080/api/doctor/prescription/${resolvedParams.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save prescription");
      }

      const data = await response.json();
      console.log("data", data);
    } catch (error) {}

    console.log("Saving prescription:", formData);

    await generatePDF(formData);

    router.push("/");
  };

  const generatePDF = async (data: typeof formData) => {
    console.log("Generating PDF:", data);
    alert("PDF generated and saved successfully!");
  };

  const sendToPatient = async () => {
    console.log("Sending prescription to patient");
    alert("Prescription sent to patient successfully!");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            Prescription for {prescriptionData?.patientName}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="careToBeTaken">
                Care to be taken (mandatory)
              </Label>
              <Textarea
                id="careToBeTaken"
                name="careToBeTaken"
                value={formData.careToBeTaken}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="medicines">Medicines</Label>
              <Textarea
                id="medicines"
                name="medicines"
                value={formData.medicines}
                onChange={handleInputChange}
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handleSubmit}>Save Prescription</Button>
          <Button onClick={sendToPatient} variant="outline">
            Send to Patient
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
