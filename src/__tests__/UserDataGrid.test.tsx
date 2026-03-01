import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import UserDataGrid from "../components/UserDataGrid";

vi.mock("../services/userService", () => ({
  fetchUsers: vi.fn(),
}));

import { fetchUsers } from "../services/userService";

const mockUsers = [
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    phone: "1-770-736-8031",
    website: "hildegard.org",
    company: { name: "Romaguera-Crona", catchPhrase: "", bs: "" },
    address: { street: "Kulas Light", suite: "Apt. 556", city: "Gwenborough", zipcode: "92998" },
  },
];

describe("UserDataGrid", () => {
  beforeEach(() => {
    vi.mocked(fetchUsers).mockResolvedValue(mockUsers);
  });

  it("does not show detail panel when no row is selected", async () => {
    render(<UserDataGrid />);

    await waitFor(() => {
      expect(screen.getByText("Leanne Graham")).toBeInTheDocument();
    });

    expect(screen.queryByTestId("user-detail-panel")).not.toBeInTheDocument();
    expect(screen.queryByText("User Details")).not.toBeInTheDocument();
  });
});
