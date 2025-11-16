import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { getCurrentSession } from "@/lib/auth";
import { LogoutButton } from "@/components/dashboard/logout-button";

export default function SettingsPage() {
  const user = getCurrentSession();
  if (!user) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-[var(--text-secondary)]">Settings</p>
        <h1 className="text-3xl font-semibold">Account</h1>
      </div>
      <Card>
        <CardContent className="space-y-3">
          <div>
            <p className="text-sm text-[var(--text-secondary)]">Email</p>
            <p className="text-lg font-medium">{user.email}</p>
          </div>
          <p className="text-sm text-[var(--text-secondary)]">
            Manage authentication basics. Use the logout button below to clear your current session.
          </p>
          <LogoutButton />
        </CardContent>
      </Card>
    </div>
  );
}
