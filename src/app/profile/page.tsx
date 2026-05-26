import { AppShell } from "@/components/layout/app-shell";
import { ProfilePanel } from "@/components/profile/profile-panel";
import { currentUser, profileHighlights } from "@/lib/data";

export default function ProfilePage() {
  return (
    <AppShell user={currentUser}>
      <ProfilePanel user={currentUser} highlights={profileHighlights} />
    </AppShell>
  );
}
