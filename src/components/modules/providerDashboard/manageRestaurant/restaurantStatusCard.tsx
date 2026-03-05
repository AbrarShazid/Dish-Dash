"use client";

import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Clock, Store } from "lucide-react";
import { toast } from "sonner";
import { updateProviderProfile } from "@/actions/provider.action";

interface RestaurantStatusCardProps {
  profile: {
    restaurantName: string;
    isOpen: boolean;
  };
  onStatusChange: (isOpen: boolean) => void;
}

export function RestaurantStatusCard({
  profile,
  onStatusChange,
}: RestaurantStatusCardProps) {
  const handleToggle = async (checked: boolean) => {
    const toastId = toast.loading("Status Updating...");

    try {
      const { error } = await updateProviderProfile({ isOpen: checked });
      if (error) {
        toast.error(error.message, { id: toastId });
      } else {
        onStatusChange(checked);
        toast.success(`Restaurant is now ${checked ? "open" : "closed"}`, {
          id: toastId,
        });
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong!", { id: toastId });
    }
  };

  return (
    <Card className="p-6 bg-white dark:bg-gray-900 border-l-4 border-l-orange-500">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
            <Store className="w-6 h-6 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {profile.restaurantName}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Current Status:
              </span>
              <Badge variant={profile.isOpen ? "default" : "secondary"}>
                {profile.isOpen ? "Open for orders" : "Closed"}
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {profile.isOpen ? "Restaurant Open" : "Restaurant Closed"}
          </span>
          <Switch checked={profile.isOpen} onCheckedChange={handleToggle} />
        </div>
      </div>
    </Card>
  );
}
