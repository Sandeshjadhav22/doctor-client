import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/ui/shared/Header";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to MediConnect for Doctors
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Streamline your practice and connect with patients effortlessly
          </p>
          <Link href="/doctor/profile">
            <Button size="lg">Go to Profile</Button>
          </Link>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle>Efficient Consultations</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Conduct online consultations with ease. Review patient history,
                prescribe medications, and follow up seamlessly.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Secure Patient Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Manage patient records securely. Access medical histories, track
                treatments, and maintain confidentiality.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Flexible Scheduling</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Set your availability and manage appointments effortlessly.
                Reduce no-shows and optimize your time.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold mb-2">Sign Up</h3>
              <p className="text-gray-600">Create your professional profile</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold mb-2">Set Availability</h3>
              <p className="text-gray-600">Define your consultation hours</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold mb-2">Receive Requests</h3>
              <p className="text-gray-600">
                Get notified of patient consultation requests
              </p>
            </div>
            <div>
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="font-semibold mb-2">Consult & Prescribe</h3>
              <p className="text-gray-600">
                Conduct consultations and provide care online
              </p>
            </div>
          </div>
        </section>

        <section className="bg-blue-50 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Why Choose MediConnect?
          </h2>
          <ul className="grid md:grid-cols-2 gap-4 list-disc list-inside">
            <li>Expand your patient reach beyond geographical limitations</li>
            <li>
              Reduce administrative overhead with our easy-to-use platform
            </li>
            <li>Secure and HIPAA-compliant communication with patients</li>
            <li>Integrated electronic health records for comprehensive care</li>
            <li>Flexible scheduling to balance your work and personal life</li>
            <li>Continuous support and training for optimal platform use</li>
          </ul>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Practice?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of healthcare professionals already using
            MediConnect.
          </p>
          <Link href="/signup">
            <Button size="lg">Get Started Now</Button>
          </Link>
        </section>
      </main>

      <footer className="bg-gray-100 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2023 MediConnect for Doctors. All rights reserved.</p>
          <div className="mt-4">
            <Link href="/terms" className="hover:underline">
              Terms of Service
            </Link>
            <span className="mx-2">|</span>
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
            <span className="mx-2">|</span>
            <Link href="/contact" className="hover:underline">
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
