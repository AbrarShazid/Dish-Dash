
export interface ProviderProfile {
  id: string;
  userId: string;
  restaurantName: string;
  description: string | null;
  imageUrl: string | null;
  isOpen: boolean;
  createdAt: Date;
}