'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// In a real application, this data would come from an API or database
const consultations = [
  { id: 1, patientName: "John Doe", date: "2023-06-01", status: "Pending" },
  { id: 2, patientName: "Jane Roe", date: "2023-06-02", status: "Prescribed" },
  { id: 3, patientName: "Bob Smith", date: "2023-06-03", status: "Pending" },
]

export default function PrescriptionsPage() {
  const [selectedConsultation, setSelectedConsultation] = useState<number | null>(null)

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Prescriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {consultations.map((consultation) => (
                <TableRow key={consultation.id}>
                  <TableCell>{consultation.patientName}</TableCell>
                  <TableCell>{consultation.date}</TableCell>
                  <TableCell>{consultation.status}</TableCell>
                  <TableCell>
                    <Link href={`/doctor/prescriptions/${consultation.id}`}>
                      <Button variant="outline" size="sm">
                        {consultation.status === "Pending" ? "Prescribe" : "Edit"}
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

