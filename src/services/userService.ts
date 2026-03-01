import type { User } from "../types/User";

const API_URL = "https://jsonplaceholder.typicode.com/users";

export async function fetchUsers(): Promise<User[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch users: ${response.status} ${response.statusText}`);
  }

  const data: User[] = await response.json();
  return data;
}
