import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Activity, Shield, Brain, Calendar } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">MEDIRA</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#security" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Security
            </Link>
            <Link href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">Healthcare Infrastructure for the Future</h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
            Securely manage medical records, unlock AI-powered diagnostics, and give patients control of their data with
            blockchain technology.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="border border-border rounded-lg p-6 bg-card hover:border-primary transition-colors">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Blockchain Security</h3>
            <p className="text-sm text-muted-foreground">
              Immutable audit trails and patient-controlled access via smart contracts on Polygon.
            </p>
          </div>

          <div className="border border-border rounded-lg p-6 bg-card hover:border-primary transition-colors">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">AI Diagnostics</h3>
            <p className="text-sm text-muted-foreground">
              Advanced medical analysis powered by Together AI and Llama 3 models.
            </p>
          </div>

          <div className="border border-border rounded-lg p-6 bg-card hover:border-primary transition-colors">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Activity className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Medical Records</h3>
            <p className="text-sm text-muted-foreground">
              End-to-end encrypted storage with AES-256-GCM encryption for HIPAA compliance.
            </p>
          </div>

          <div className="border border-border rounded-lg p-6 bg-card hover:border-primary transition-colors">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Appointments</h3>
            <p className="text-sm text-muted-foreground">
              Seamless scheduling and coordination between patients and healthcare providers.
            </p>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">HIPAA Compliant by Design</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Built with security and privacy at the core. Every access is logged on the blockchain, creating an
              immutable audit trail that puts patients in control.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div>
                <h3 className="font-semibold mb-2">End-to-End Encryption</h3>
                <p className="text-sm text-muted-foreground">All medical data encrypted at rest with AES-256-GCM</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Patient Control</h3>
                <p className="text-sm text-muted-foreground">Blockchain-based access grants managed by patients</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Audit Trails</h3>
                <p className="text-sm text-muted-foreground">Immutable logs of every data access on Polygon</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center border border-border rounded-2xl p-12 bg-card">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Healthcare?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join MEDIRA today and experience the future of medical record management.
          </p>
          <Link href="/register">
            <Button size="lg">Create Your Account</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Activity className="h-6 w-6 text-primary" />
              <span className="font-semibold">MEDIRA</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                Terms
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
