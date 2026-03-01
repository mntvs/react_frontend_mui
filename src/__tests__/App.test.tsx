import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import App from "../App";

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

describe("App", () => {
  beforeEach(() => {
    vi.mocked(fetchUsers).mockResolvedValue(mockUsers);
  });

  it("renders the app bar with title", async () => {
    render(<App />);
    expect(screen.getByText("Управление пользователями")).toBeInTheDocument();
    await waitFor(() => {
      expect(vi.mocked(fetchUsers)).toHaveBeenCalled();
    });
  });

  it("renders the users heading", async () => {
    render(<App />);
    expect(screen.getByText("Пользователи")).toBeInTheDocument();
    await waitFor(() => {
      expect(vi.mocked(fetchUsers)).toHaveBeenCalled();
    });
  });

  it("renders user data in the grid", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Leanne Graham")).toBeInTheDocument();
    });

    expect(screen.getByText("Bret")).toBeInTheDocument();
    expect(screen.getByText("Sincere@april.biz")).toBeInTheDocument();
  });

  it("shows error message on fetch failure", async () => {
    vi.mocked(fetchUsers).mockRejectedValueOnce(new Error("Network error"));

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Network error")).toBeInTheDocument();
    });
  });
});
