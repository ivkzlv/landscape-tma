export type UserRole = "admin" | "user";

export interface Session {
  role: UserRole;
  displayName: string;
  avatar: string;
}

interface MockUser {
  username: string;
  password: string;
  role: UserRole;
  displayName: string;
  avatar: string;
}

const MOCK_USERS: MockUser[] = [
  { username: "admin", password: "admin", role: "admin", displayName: "Ivan Kozlov",     avatar: "IK" },
  { username: "user",  password: "user",  role: "user",  displayName: "Aleksey Voronov", avatar: "AV" },
];

export function authenticate(username: string, password: string): Session | null {
  const found = MOCK_USERS.find(
    (u) =>
      u.username.toLowerCase() === username.trim().toLowerCase() &&
      u.password === password
  );
  if (!found) return null;
  return { role: found.role, displayName: found.displayName, avatar: found.avatar };
}

export const DEMO_CREDENTIALS = [
  { label: "Исполнитель (admin)", username: "admin", password: "admin", role: "admin" as UserRole },
  { label: "Клиент (user)",       username: "user",  password: "user",  role: "user"  as UserRole },
];
