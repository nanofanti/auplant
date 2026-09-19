export type CreateCareRequestData = {
  location: string;
  startDate: string;
  endDate: string;
  numberOfPlants: number;
  description: string;
  photos: string[];
  offeredPrice: number;
};

export type CreatedCareRequest = {
  _id: string;
  ownerId: string;
  location: string;
  startDate: string;
  endDate: string;
  numberOfPlants: number;
  description: string;
  photos: string[];
  offeredPrice: number;
  status: "open" | "closed";
};

export type CreateCareRequestResponse = {
  message: string;
  data: CreatedCareRequest;
};
