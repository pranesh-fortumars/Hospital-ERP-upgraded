import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type HRDashboardProps = {
  activeSection?: string | null
}

const OVERVIEW_METRICS = [
  { label: "Total Staff", value: "248", description: "Active employees" },
  { label: "Present Today", value: "235", description: "94.8% attendance" },
  { label: "Payroll Status", value: "Processed", description: "Last month" },
]

const STAFF_SEGMENTS = [
  {
    label: "Medical Staff",
    description: "Doctors, Nurses, Technicians",
    value: "145",
    accent: "text-blue-600",
  },
  {
    label: "Administrative Staff",
    description: "Receptionists, Managers",
    value: "58",
    accent: "text-green-600",
  },
  {
    label: "Support Staff",
    description: "Cleaners, Maintenance",
    value: "45",
    accent: "text-purple-600",
  },
]

export default function HRDashboard({ activeSection = null }: HRDashboardProps) {
  const shouldShow = (sectionId: string) => !activeSection || activeSection === sectionId

  return (
    <div className="space-y-8">
      {shouldShow("hr-overview") && (
        <section id="hr-overview" className="space-y-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">HR Management</h2>
            <p className="text-gray-600 mt-2">Manage staff and human resources</p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {OVERVIEW_METRICS.map((metric) => (
              <Card key={metric.label}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">{metric.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <p className="text-xs text-gray-600 mt-1">{metric.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {shouldShow("hr-staff") && (
        <section id="hr-staff">
          <Card>
            <CardHeader>
              <CardTitle>Staff Management</CardTitle>
              <CardDescription>Department-wise staff distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {STAFF_SEGMENTS.map((segment) => (
                  <div
                    key={segment.label}
                    className="flex items-center justify-between rounded-lg bg-gray-50 p-4"
                  >
                    <div>
                      <p className="font-medium">{segment.label}</p>
                      <p className="text-sm text-gray-600">{segment.description}</p>
                    </div>
                    <span className={`text-2xl font-bold ${segment.accent}`}>{segment.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      )}
    </div>
  )
}
