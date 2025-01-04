'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

// In a real application, this data would come from an API or database
const consultationData = {
  id: 1,
  patientName: "John Doe",
  date: "2023-06-01",
  status: "Pending",
  careToBeTaken: "",
  medicines: ""
}

export default function PrescriptionForm({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    careToBeTaken: consultationData.careToBeTaken,
    medicines: consultationData.medicines
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, this would be an API call to save the prescription
    console.log('Saving prescription:', formData)
    
    // Generate PDF
    await generatePDF(formData)
    
    // Redirect back to prescriptions list
    router.push('/doctor/prescriptions')
  }

  const generatePDF = async (data: typeof formData) => {
    console.log('Generating PDF:', data)
    alert('PDF generated and saved successfully!')
  }

  const sendToPatient = async () => {
    console.log('Sending prescription to patient')
    alert('Prescription sent to patient successfully!')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Prescription for {consultationData.patientName}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="careToBeTaken">Care to be taken (mandatory)</Label>
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
          <Button onClick={sendToPatient} variant="outline">Send to Patient</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

