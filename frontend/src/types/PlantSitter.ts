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
  averageRating: number;
  reviewCount: number;
};

export type SitterProfileResponse = {
  data: PlantSitter;
};

export type SitterResponse = {
  data: PlantSitter[];
};

export type CreateSitterData = {
  location: string;
  bio: string;
  experience: string;
  pricePerDay: number;
  availability: boolean;
  services: string[];
};

export type CreatedSitterProfile = {
  _id: string;
  userId: string;
  location: string;
  bio: string;
  experience: string;
  pricePerDay: number;
  availability: boolean;
  services: string[];
};

export type CreateSitterResponse = {
  message: string;
  data: CreatedSitterProfile;
};

export type UpdateSitterData = {
  location: string;
  bio: string;
  experience: string;
  pricePerDay: number;
  availability: boolean;
  services: string[];
};
