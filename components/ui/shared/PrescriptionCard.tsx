import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

interface Prescription {
  _id: string;
  patient: {
    _id: string;
    name: string;
    email: string;
  };
  currentIllnessHistory: string;
  status: string;
  createdAt: string;
  prescription?: {
    careToBeTaken?: string;
    medicines?: Array<{
      name: string;
      dosage: string;
      duration: string;
      timing: string;
    }>;
    lastUpdated?: string;
  };
}

export function PrescriptionCard({ prescription }: { prescription: Prescription }) {
  const formattedDate = new Date(prescription.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{prescription.patient.name}</span>
          <Badge variant={prescription.status === 'pending' ? 'secondary' : 'default'}>
            {prescription.status}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 mb-2">Consultation Date: {formattedDate}</p>
        <p className="font-semibold mb-1">Current Illness:</p>
        <p className="mb-4 text-red-600">{prescription.currentIllnessHistory}</p>
        {prescription.prescription && prescription.prescription.careToBeTaken && (
          <>
            <p className="font-semibold mb-1">Care to be Taken:</p>
            <p className="mb-4">{prescription.prescription.careToBeTaken}</p>
          </>
        )}
        {prescription.prescription && prescription.prescription.medicines && prescription.prescription.medicines.length > 0 && (
          <>
            <p className="font-semibold mb-1">Medicines:</p>
            <ul className="list-disc pl-5">
              {prescription.prescription.medicines.map((medicine, index) => (
                <li key={index}>
                  {medicine.name} - {medicine.dosage}, {medicine.duration}, {medicine.timing}
                </li>
              ))}
            </ul>
          </>
        )}
      </CardContent>
      <CardFooter>
        <Link href={`/doctor/prescriptions/${prescription._id}`}>
          <Button variant="outline">
            {prescription.status === 'pending' ? 'Prescribe' : 'Edit'}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

