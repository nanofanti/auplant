export type CareRequestStatus = "open" | "closed";

export type CareRequestPhoto = {
  url: string;
  publicId: string;
};

export type CreatedCareRequest = {
  _id: string;
  ownerId: string;
  location: string;
  startDate: string;
  endDate: string;
  numberOfPlants: number;
  description: string;
  photos: CareRequestPhoto[];
  offeredPrice: number;
  status: CareRequestStatus;
};

export type CreateCareRequestResponse = {
  message: string;
  data: CreatedCareRequest;
};

export type CareRequestOwner = {
  _id: string;
  name: string;
  profileImage?: string;
};

export type CareRequest = {
  _id: string;
  ownerId: CareRequestOwner;
  location: string;
  startDate: string;
  endDate: string;
  numberOfPlants: number;
  description: string;
  photos: CareRequestPhoto[];
  offeredPrice: number;
  status: CareRequestStatus;
};

export type CareRequestsResponse = {
  data: CareRequest[];
};

export type UpdateCareRequestData = {
  location?: string;
  startDate?: string;
  endDate?: string;
  numberOfPlants?: number;
  description?: string;
  offeredPrice?: number;
  status?: CareRequestStatus;
  removedPhotoPublicIds?: string[];
};

export type CareRequestResponse = {
  data: CareRequest;
};
