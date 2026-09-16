import type { PlantSitter } from "../types/PlantSitter";

export const plantSitters: PlantSitter[] = [
  {
    id: 1,
    userId: 1,
    city: "Heidelberg",
    experience: 2,
    pricePerDay: 15,
    available: true,
  },
  {
    id: 2,
    userId: 2,
    city: "Heidelberg",
    experience: 3,
    pricePerDay: 15,
    available: false,
  },
  {
    id: 3,
    userId: 3,
    city: "Düsseldorf",
    experience: 1,
    pricePerDay: 10,
    available: true,
  },
  {
    id: 4,
    userId: 4,
    city: "Mannheim",
    experience: 5,
    pricePerDay: 20,
    available: true,
  },
];
