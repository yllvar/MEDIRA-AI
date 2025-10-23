"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Brain, Sparkles, AlertCircle, TrendingUp, FileText, Loader2 } from "lucide-react"
import { DoctorNav } from "@/components/doctor-nav"

export default function AIDiagnosticsPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const handleAnalyze = async () => {
    setIsAnalyzing(true)
    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsAnalyzing(false)
    setShowResults(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <DoctorNav />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Brain className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">AI Diagnostics</h1>
            <Badge variant="default" className="bg-gradient-to-r from-blue-500 to-purple-500">
              <Sparkles className="h-3 w-3 mr-1" />
              Powered by Llama 3
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Advanced medical analysis using AI to support diagnostic decision-making
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Input Form */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Patient Information</CardTitle>
              <CardDescription>Enter patient data for AI analysis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Patient Demographics */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input id="age" type="number" placeholder="45" defaultValue="45" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Input id="gender" placeholder="Male" defaultValue="Male" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bloodType">Blood Type</Label>
                  <Input id="bloodType" placeholder="O+" defaultValue="O+" />
                </div>
              </div>

              {/* Symptoms */}
              <div className="space-y-2">
                <Label htmlFor="symptoms">Symptoms</Label>
                <Textarea
                  id="symptoms"
                  placeholder="Enter patient symptoms..."
                  rows={3}
                  defaultValue="Persistent headaches, dizziness, occasional chest discomfort"
                />
              </div>

              {/* Vital Signs */}
              <div>
                <Label className="mb-3 block">Vital Signs</Label>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bp" className="text-sm text-muted-foreground">
                      Blood Pressure
                    </Label>
                    <Input id="bp" placeholder="120/80" defaultValue="142/88" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hr" className="text-sm text-muted-foreground">
                      Heart Rate (bpm)
                    </Label>
                    <Input id="hr" type="number" placeholder="72" defaultValue="78" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="temp" className="text-sm text-muted-foreground">
                      Temperature (°F)
                    </Label>
                    <Input id="temp" type="number" placeholder="98.6" defaultValue="98.4" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight" className="text-sm text-muted-foreground">
                      Weight (lbs)
                    </Label>
                    <Input id="weight" type="number" placeholder="185" defaultValue="185" />
                  </div>
                </div>
              </div>

              {/* Medical History */}
              <div className="space-y-2">
                <Label htmlFor="history">Medical History</Label>
                <Textarea
                  id="history"
                  placeholder="Previous conditions, surgeries, family history..."
                  rows={3}
                  defaultValue="Family history of cardiovascular disease. Father had MI at age 62."
                />
              </div>

              {/* Lab Results */}
              <div className="space-y-2">
                <Label htmlFor="labs">Recent Lab Results (Optional)</Label>
                <Textarea
                  id="labs"
                  placeholder="Enter lab values..."
                  rows={2}
                  defaultValue="Total Cholesterol: 215 mg/dL, LDL: 145 mg/dL, HDL: 42 mg/dL"
                />
              </div>

              <Button onClick={handleAnalyze} disabled={isAnalyzing} className="w-full" size="lg">
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing with AI...
                  </>
                ) : (
                  <>
                    <Brain className="h-4 w-4 mr-2" />
                    Analyze with AI
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* AI Insights Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                AI Insights
              </CardTitle>
              <CardDescription>Real-time analysis capabilities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <Brain className="h-4 w-4 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Pattern Recognition</p>
                      <p className="text-xs text-muted-foreground">Identifies disease patterns</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-8 w-8 rounded-full bg-purple-500/10 flex items-center justify-center">
                      <TrendingUp className="h-4 w-4 text-purple-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Risk Assessment</p>
                      <p className="text-xs text-muted-foreground">Calculates probability scores</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center">
                      <FileText className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Treatment Plans</p>
                      <p className="text-xs text-muted-foreground">Evidence-based recommendations</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <p className="text-xs text-muted-foreground">
                      AI analysis is a clinical decision support tool and should not replace professional medical
                      judgment.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analysis Results */}
        {showResults && (
          <div className="mt-6 space-y-6">
            {/* Overall Analysis */}
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    AI Analysis Complete
                  </CardTitle>
                  <Badge variant="default" className="bg-orange-500">
                    Moderate Urgency
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">
                  Based on the patient's symptoms and vital signs, there are several potential conditions to consider.
                  The elevated blood pressure (142/88 mmHg) combined with reported symptoms of headaches, dizziness, and
                  chest discomfort suggests cardiovascular involvement that requires attention. The patient's family
                  history of cardiovascular disease and elevated cholesterol levels further support this assessment.
                </p>
              </CardContent>
            </Card>

            {/* Possible Conditions */}
            <Card>
              <CardHeader>
                <CardTitle>Possible Conditions</CardTitle>
                <CardDescription>Ranked by probability based on AI analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      condition: "Hypertension (Stage 1)",
                      probability: "High (75-85%)",
                      reasoning:
                        "Blood pressure readings consistently above 130/80 mmHg, combined with patient age and symptoms, strongly indicate Stage 1 hypertension.",
                      color: "red",
                    },
                    {
                      condition: "White Coat Syndrome",
                      probability: "Moderate (30-40%)",
                      reasoning:
                        "Elevated readings in clinical settings could be stress-related. Home monitoring recommended for confirmation.",
                      color: "orange",
                    },
                    {
                      condition: "Secondary Hypertension",
                      probability: "Low (10-15%)",
                      reasoning:
                        "Less common but should be ruled out through additional testing, especially given patient's age.",
                      color: "yellow",
                    },
                  ].map((item, i) => (
                    <div key={i} className="border border-border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{item.condition}</h3>
                          <Badge
                            variant="outline"
                            className={`mt-1 ${
                              item.color === "red"
                                ? "border-red-500 text-red-500"
                                : item.color === "orange"
                                  ? "border-orange-500 text-orange-500"
                                  : "border-yellow-500 text-yellow-500"
                            }`}
                          >
                            {item.probability}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.reasoning}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Recommended Next Steps</CardTitle>
                <CardDescription>AI-generated clinical recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    "Schedule 24-hour ambulatory blood pressure monitoring",
                    "Order comprehensive metabolic panel and lipid profile",
                    "Recommend lifestyle modifications: reduce sodium intake, increase physical activity",
                    "Consider starting ACE inhibitor or ARB if readings remain elevated",
                    "Follow-up appointment in 2-4 weeks to reassess",
                  ].map((rec, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 border border-border rounded-lg">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-primary">{i + 1}</span>
                      </div>
                      <p className="text-sm">{rec}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Disclaimer */}
            <Card className="border-orange-500/20 bg-orange-500/5">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold mb-1">Medical Disclaimer</p>
                    <p className="text-sm text-muted-foreground">
                      This AI-generated analysis is for informational purposes only and should not replace professional
                      medical judgment. Always consult with a qualified healthcare provider for diagnosis and treatment
                      decisions. The AI system is designed to support, not replace, clinical decision-making.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
