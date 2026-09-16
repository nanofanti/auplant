import type { UserRole } from "./UserRole";

export type User = {
  id: number;
  name: string;
  email: string;
  roles: UserRole[];
};
