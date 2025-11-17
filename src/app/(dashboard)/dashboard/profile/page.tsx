import { getCurrentUser } from "@/lib/auth";
import { ProfileForm } from "./profile-form";

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) return null;
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.35em] text-[var(--text-secondary)]">Profile</p>
        <h1 className="text-3xl font-semibold">Studio identity</h1>
        <p className="text-sm text-[var(--text-secondary)]">Update your name, bio, and theme.</p>
      </div>
      <div className="rounded-3xl border border-[var(--card-border)]/80 px-6 py-6">
        <ProfileForm user={user} />
      </div>
    </div>
  );
}
