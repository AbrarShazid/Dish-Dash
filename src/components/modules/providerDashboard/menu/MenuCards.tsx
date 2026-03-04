"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Edit, MoreVertical, Trash2, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface MenuCardsProps {
  items: any[];
  categories: any[];
  onEdit: (item: any) => void;
  onDelete: (itemId: string) => Promise<void>;
  onToggleAvailability: (
    itemId: string,
    currentStatus: boolean,
  ) => Promise<void>;
}

export function MenuCards({
  items,
  categories,
  onEdit,
  onDelete,
  onToggleAvailability,
}: MenuCardsProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const getCategoryName = (categoryId: string) => {
    return categories.find((c) => c.id === categoryId)?.name || "Unknown";
  };

  const handleToggleAvailability = async (item: any) => {
    setLoadingId(item.id);
    try {
      await onToggleAvailability(item.id, item.isAvailable);
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    setLoadingId(deleteId);
    try {
      await onDelete(deleteId);
    } finally {
      setLoadingId(null);
      setDeleteId(null);
    }
  };

  return (
    <>
      <div className="space-y-3 lg:hidden">
        {items.map((item) => (
          <Card
            key={item.id}
            className="p-4 border shadow-sm bg-white dark:bg-gray-900"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {item.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {getCategoryName(item.categoryId)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger
                    asChild
                    className="hover:bg-gray-100 dark:hover:bg-gray-900"
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={loadingId === item.id}
                    >
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="bg-gray-50 dark:bg-gray-800"
                  >
                    <DropdownMenuItem onClick={() => onEdit(item)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Link
                        href={`/meals/${item.id}`}
                        className="cursor-pointer"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => handleToggleAvailability(item)}
                    >
                      {item.isAvailable ? (
                        <>
                          <EyeOff className="w-4 h-4 mr-2" />
                          Unavailable
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4 mr-2" />
                          Available
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setDeleteId(item.id)}
                      className="text-red-600 focus:text-red-600"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {item.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                {item.description}
              </p>
            )}

            <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100 dark:border-gray-800">
              <div>
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  ${Number(item.price).toFixed(2)}
                </span>
              </div>
              <div>
                {item.isAvailable ? (
                  <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-0">
                    Available
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="border-gray-300 text-gray-600"
                  >
                    Unavailable
                  </Badge>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="bg-gray-50 dark:bg-gray-800">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Menu Item</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this item? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600"
              disabled={loadingId === deleteId}
            >
              {loadingId === deleteId ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
