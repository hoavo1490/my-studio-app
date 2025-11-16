import { getCurrentUser } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileForm } from "./profile-form";

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) return null;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <ProfileForm user={user} />
      </CardContent>
    </Card>
  );
}
