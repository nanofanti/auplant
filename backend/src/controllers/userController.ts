import type { Request, Response } from "express";

const fakeUsers = [
  { id: 1, name: "Marco" },
  { id: 2, name: "Annie" },
  { id: 3, name: "Stefania" },
];

export const getUserById = (req: Request, res: Response) => {
  const user = fakeUsers.find(
    (fakeUser) => fakeUser.id === Number(req.params.id),
  );
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "404: User not found" });
  }
};

export const getUsers = (req: Request, res: Response) => {
  res.json(fakeUsers);
};
