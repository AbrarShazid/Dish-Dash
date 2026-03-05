"use client";

import { useState } from "react";
import { ProviderProfile } from "@/types";
import { RestaurantStatusCard } from "./restaurantStatusCard";
import { RestaurantInfoForm } from "./infoForm";

interface ManageRestaurantClientProps {
  initialData: ProviderProfile;
}

export function ManageRestaurantClient({
  initialData,
}: ManageRestaurantClientProps) {
  const [profile, setProfile] = useState(initialData);

  return (
    <div className="space-y-6 md:mx-6 mx-4">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Manage Restaurant
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Update your restaurant information and settings
        </p>
      </div>

      {/* Quick Status Card - Always visible at top */}
      <RestaurantStatusCard
        profile={profile}
        onStatusChange={(isOpen) => setProfile((prev) => ({ ...prev, isOpen }))}
      />

      <RestaurantInfoForm 
        profile={profile}
        onUpdate={(updatedData: any) =>
          setProfile((prev) => ({ ...prev, ...updatedData }))
        }
      />
    </div>
  );
}
