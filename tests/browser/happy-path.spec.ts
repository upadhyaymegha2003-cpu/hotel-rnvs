import { expect, test } from "@playwright/test";

test("guest request arrives live and guest sees staff status update", async ({ browser }) => {
  const roomId = `9${Date.now().toString().slice(-5)}`;
  const guest = await browser.newPage();
  const staff = await browser.newPage();

  await staff.goto("/staff");
  await staff.getByPlaceholder("Username").fill("concierge");
  await staff.getByPlaceholder("Password").fill("concierge-demo");
  await staff.getByRole("button", { name: "Access Dashboard" }).click();
  await expect(staff.getByText("Active Room Desk Queue")).toBeVisible();

  const roomLink = await staff.evaluate(async (requestedRoomId) => {
    const response = await fetch("/api/room-links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roomId: requestedRoomId }),
    });
    if (!response.ok) throw new Error("Could not generate signed room link");
    return response.json();
  }, roomId);
  await guest.goto(roomLink.path);
  await guest.locator("#card-towels").click();
  await guest.locator("#btn-submit").click();
  await expect(guest.getByText("Request Sent")).toBeVisible();

  const roomCard = staff.getByText(roomId, { exact: true }).first();
  await expect(roomCard).toBeVisible();
  await roomCard
    .locator("xpath=ancestor::div[contains(@class, 'rounded-xl') and contains(@class, 'overflow-hidden')][1]")
    .getByRole("button", { name: "Acknowledge Desk" })
    .click();

  await expect(guest.getByText("Acknowledged", { exact: true })).toHaveClass(/text-\[#1C1917\]/);
});

test("room 204 QR scan simulation opens checked-in guest room", async ({ page }) => {
  await page.goto("/scan");
  await expect(page.getByAltText("QR code for room 204")).toBeVisible();
  await page.getByRole("button", { name: "Scan Demo QR For Room 204" }).click();
  await expect(page).toHaveURL(/\/room\/204/);
  await expect(page.getByText("Priya Sharma")).toBeVisible();
  await expect(page.getByText(/Room 204/).first()).toBeVisible();
});
