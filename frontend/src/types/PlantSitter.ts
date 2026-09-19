export type SitterUser = {
  _id: string;
  name: string;
  profileImage?: string;
};

export type PlantSitter = {
  _id: string;
  userId: SitterUser;
  location: string;
  bio: string;
  experience: string;
  pricePerDay: number;
  availability: boolean;
  services: string[];
};

export type SitterResponse = {
  data: PlantSitter[];
};
