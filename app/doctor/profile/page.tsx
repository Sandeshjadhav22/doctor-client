import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// In a real application, this data would come from an API or database
const doctorData = {
  name: "Dr. Jane Smith",
  specialty: "Cardiologist",
  experience: "15 years",
  education: "MD from Harvard Medical School",
  bio: "Dr. Jane Smith is a board-certified cardiologist with over 15 years of experience in treating various heart conditions. She is known for her patient-centered approach and expertise in preventive cardiology.",
  imageUrl: "/placeholder.svg?height=200&width=200",
};

export default function DoctorProfile() {
  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Doctor's Profile</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <Image
              src={doctorData.imageUrl}
              alt={doctorData.name}
              width={200}
              height={200}
              className="rounded-full mx-auto"
            />
          </div>
          <div className="md:w-2/3">
            <h2 className="text-xl font-semibold mb-2">{doctorData.name}</h2>
            <p className="text-gray-600 mb-4">{doctorData.specialty}</p>
            <p className="mb-2">
              <strong>Experience:</strong> {doctorData.experience}
            </p>
            <p className="mb-2">
              <strong>Education:</strong> {doctorData.education}
            </p>
            <p className="mb-4">{doctorData.bio}</p>
            <Link href="/doctor/prescriptions">
              <Button>View Prescriptions</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
