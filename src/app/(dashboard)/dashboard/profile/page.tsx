import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { getCurrentSession } from "@/lib/auth";
import { ProfileForm } from "@/components/dashboard/profile-form";

export default function ProfilePage() {
  const user = getCurrentSession();
  if (!user) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-[var(--text-secondary)]">Profile</p>
        <h1 className="text-3xl font-semibold">Studio Identity</h1>
      </div>
      <Card>
        <CardContent>
          <ProfileForm user={user} />
        </CardContent>
      </Card>
    </div>
  );
}
