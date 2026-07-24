import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SettingsModule() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage system configurations and profile preferences.</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your account details and profile information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Display Name</Label>
              <Input id="name" defaultValue="Admin" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue="admin@coexport.id" />
            </div>
            <div className="pt-2">
              <Button>Save Changes</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Integrations</CardTitle>
            <CardDescription>Configure webhook URLs for external automation (e.g. N8N).</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="webhook-rfq">RFQ Webhook URL (Sales Workflow)</Label>
              <Input id="webhook-rfq" defaultValue="https://n8n.example.com/webhook/rfq" />
              <p className="text-xs text-gray-500">This URL will be triggered when a new buyer submits an RFQ.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="webhook-supplier">Supplier App Webhook URL</Label>
              <Input id="webhook-supplier" placeholder="https://..." />
            </div>
            <div className="pt-2">
              <Button variant="secondary">Update Integrations</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
