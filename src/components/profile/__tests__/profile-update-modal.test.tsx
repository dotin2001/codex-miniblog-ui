/* global describe, expect, it */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { currentUser, profileHighlights } from "@/lib/data";
import { ProfilePanel } from "@/components/profile/profile-panel";

describe("ProfilePanel update modal", () => {
  it("opens and closes the update profile modal", async () => {
    const user = userEvent.setup();

    render(<ProfilePanel user={currentUser} highlights={profileHighlights} />);

    await user.click(screen.getByRole("button", { name: /update profile/i }));

    expect(screen.getByRole("dialog", { name: /update profile/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toHaveValue(currentUser.name);
    expect(screen.getByLabelText(/email/i)).toHaveValue(currentUser.email);
    expect(screen.getByLabelText(/title/i)).toHaveValue(currentUser.title);

    await user.click(screen.getByRole("button", { name: /cancel/i }));

    expect(screen.queryByRole("dialog", { name: /update profile/i })).not.toBeInTheDocument();
  });

  it("closes the modal when escape is pressed", async () => {
    const user = userEvent.setup();

    render(<ProfilePanel user={currentUser} highlights={profileHighlights} />);

    await user.click(screen.getByRole("button", { name: /update profile/i }));
    await user.keyboard("{Escape}");

    expect(screen.queryByRole("dialog", { name: /update profile/i })).not.toBeInTheDocument();
  });
});
