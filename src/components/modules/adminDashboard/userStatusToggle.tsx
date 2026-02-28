// components/dashboard/admin/UserStatusToggle.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Ban, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { updateUserStatus } from "@/actions/user.action";
import { useRouter } from "next/navigation";

interface UserStatusToggleProps {
  userId: string;
  currentStatus: string;
}

export function UserStatusToggle({
  userId,
  currentStatus,
}: UserStatusToggleProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const isActive = currentStatus === "ACTIVATE";

  const handleStatusChange = async () => {
    setIsLoading(true);
    const newStatus = isActive ? "SUSPEND" : "ACTIVATE";

    try {
      const { error } = await updateUserStatus(userId, newStatus);

      if (error) {
        toast.error(error.message || "Failed to update user status");
      } else {
        toast.success(
          `User ${newStatus === "ACTIVATE" ? "activated" : "suspended"} successfully`,
        );

        router.refresh();
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
      setShowDialog(false);
    }
  };

  return (
    <>
      <Button
        variant={isActive ? "destructive" : "default"}
        size="sm"
        onClick={() => setShowDialog(true)}
        disabled={isLoading}
        className={
          isActive
            ? "bg-red-500 hover:bg-red-600 text-white"
            : "bg-green-500 hover:bg-green-600 text-white"
        }
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : isActive ? (
          <>
            <Ban className="w-4 h-4 mr-2" />
            Suspend
          </>
        ) : (
          <>
            <CheckCircle className="w-4 h-4 mr-2" />
            Activate
          </>
        )}
      </Button>

      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {isActive ? "Suspend User" : "Activate User"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {isActive
                ? "This user will no longer be able to access the platform. They can be reactivated later."
                : "This user will regain access to the platform with their previous permissions."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleStatusChange}
              className={
                isActive
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600"
              }
            >
              {isActive ? "Suspend" : "Activate"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
