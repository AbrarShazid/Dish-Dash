export interface mealItem {
  id: string;
  name: string;
  description?: string;
  isAvailable: boolean;
  price: string;
  image?: string;
  categoryName?: string;
  providerName?:string
}
