export interface Provider {
  providerId: string;
  restaurantName: string;
  description: string;
  image: string | null;
  isOpen: boolean;
  createdAt: string;
  restauranOwner: string;
  totalOrderServed: number;
  totalItem: number;
}
