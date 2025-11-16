import { getCurrentUser } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function SettingsPage() {
  const user = await getCurrentUser();
  if (!user) return null;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-[var(--text-secondary)]">Email</p>
          <p className="text-lg font-medium">{user.email}</p>
        </div>
        <form action="/api/auth/logout" method="post">
          <Button variant="outline">Sign out</Button>
        </form>
      </CardContent>
    </Card>
  );
}
