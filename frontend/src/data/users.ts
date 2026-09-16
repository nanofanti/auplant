import type { User } from "../types/User";

export const users: User[] = [
  {
    id: 1,
    name: "Marco",
    email: "example@gmail.com",
    roles: ["owner", "sitter"],
  },
  {
    id: 2,
    name: "Annie",
    email: "example-annie@gmail.com",
    roles: ["sitter"],
  },
  {
    id: 3,
    name: "Jason",
    email: "example-jason@gmail.com",
    roles: ["owner", "sitter"],
  },
  {
    id: 4,
    name: "Laura",
    email: "example-laura@gmail.com",
    roles: ["sitter"],
  },
];
