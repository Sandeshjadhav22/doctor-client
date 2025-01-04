'use client'

import { useState, useEffect } from 'react'
// import { PrescriptionCard } from '@/components/PrescriptionCard'
import { Button } from "@/components/ui/button"
import { PrescriptionCard } from '@/components/ui/shared/PrescriptionCard';

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

export default function PrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      const doctorId = localStorage.getItem('doctorId');
      // const doctorId = "67782b17b5458e80c5b8bbd2"
      
      try {
        const response = await fetch(`http://localhost:8080/api/doctor/consultations/${doctorId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch prescriptions');
        }
        const data = await response.json();
        console.log("data", data);
        setPrescriptions(data);
      } catch (err) {
        setError('Failed to load prescriptions. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrescriptions();
  }, []);
  console.log("prescriptions", prescriptions);
  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading prescriptions...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-red-500">{error}</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Prescriptions</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {prescriptions.map((prescription) => (
          <PrescriptionCard key={prescription._id} prescription={prescription} />
        ))}
      </div>
    </div>
  )
}

