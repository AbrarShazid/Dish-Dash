
import { providerService } from "@/services/provider.service";
import { ErrorState } from "@/components/layout/ErrorState";
import { ManageRestaurantClient } from "@/components/modules/providerDashboard/manageRestaurant/manageRestaurant";

export default async function ManageRestaurantPage() {
  const { data: profile, error } = await providerService.getProviderProfile();

  if (error) {
    return <ErrorState message={error.message} />;
  }

  return <ManageRestaurantClient initialData={profile} />;
}
