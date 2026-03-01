import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchUsers } from "../services/userService";
import type { User } from "../types/User";

const mockUser: User = {
  id: 1,
  name: "Leanne Graham",
  username: "Bret",
  email: "Sincere@april.biz",
  phone: "1-770-736-8031 x56442",
  website: "hildegard.org",
  company: { name: "Romaguera-Crona", catchPhrase: "Multi-layered", bs: "harness" },
  address: { street: "Kulas Light", suite: "Apt. 556", city: "Gwenborough", zipcode: "92998-3874" },
};

describe("userService", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("fetches users successfully", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => [mockUser],
    } as Response);

    const users = await fetchUsers();
    expect(users).toEqual([mockUser]);
    expect(globalThis.fetch).toHaveBeenCalledWith("https://jsonplaceholder.typicode.com/users");
  });

  it("throws an error on non-ok response", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    } as Response);

    await expect(fetchUsers()).rejects.toThrow("Failed to fetch users: 500 Internal Server Error");
  });

  it("propagates network errors", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValueOnce(new Error("Network error"));

    await expect(fetchUsers()).rejects.toThrow("Network error");
  });
});
