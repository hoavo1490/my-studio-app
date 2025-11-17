import { getCurrentUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { PasswordForm } from "./password-form";
import { DeleteAccount } from "./delete-account";

export default async function SettingsPage() {
  const user = await getCurrentUser();
  if (!user) return null;
  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.35em] text-[var(--text-secondary)]">Settings</p>
        <h1 className="text-3xl font-semibold">Account</h1>
        <p className="text-sm text-[var(--text-secondary)]">Manage access, passwords, and removal.</p>
      </div>
      <section className="space-y-4 rounded-3xl border border-[var(--card-border)]/80 px-6 py-6">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-[var(--text-secondary)]">Email</p>
          <p className="text-lg font-medium">{user.email}</p>
        </div>
        <form action="/api/auth/logout" method="post">
          <Button variant="outline">Sign out</Button>
        </form>
      </section>
      <section className="space-y-4 rounded-3xl border border-[var(--card-border)]/80 px-6 py-6">
        <p className="text-xs uppercase tracking-[0.35em] text-[var(--text-secondary)]">Password</p>
        <PasswordForm />
      </section>
      <section className="space-y-4 rounded-3xl border border-red-400/70 px-6 py-6">
        <p className="text-xs uppercase tracking-[0.35em] text-red-500">Danger zone</p>
        <DeleteAccount />
      </section>
    </div>
  );
}
