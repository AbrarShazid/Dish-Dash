"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { toast } from "sonner";
import {  deleteMenuItem, updateMenuItem } from "@/actions/menu.action";

import Link from "next/link";
import { useRouter } from "next/navigation";



interface MenuTableProps {
  items: any[];
  categories: any[];
  onEdit: (item: any) => void;
}

export function MenuTable({ items, categories, onEdit }: MenuTableProps) {
  const router = useRouter()
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const getCategoryName = (categoryId: string) => {
    return categories.find((c) => c.id === categoryId)?.name || "Unknown";
  };

  const handleToggleAvailability = async (item: any) => {
    setLoadingId(item.id);
    try {
     const payload={ isAvailable: !item.isAvailable }
      const { error } = await updateMenuItem(item.id, payload);

      if (error) {
        toast.error(error.message);
      } else {
        toast.success(`Item ${item.isAvailable ? "unavailable" : "available"}`);
        
          router.refresh()
      }
    } catch (error) {
      toast.error("Failed to update availability");
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    setLoadingId(deleteId);
    try {
      const { error } = await deleteMenuItem(deleteId);

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Item deleted successfully");
        router.refresh();
      }
    } catch (error) {
      toast.error("Failed to delete item");
    } finally {
      setLoadingId(null);
      setDeleteId(null);
    }
  };

  return (
    <>
      <div className="rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden hidden md:block">
        <Table>
          <TableHeader className="bg-gray-50 dark:bg-gray-800/50  ">
            <TableRow className="hover:bg-gray-100 dark:hover:bg-gray-900">
              <TableHead>Item</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow
                key={item.id}
                className="hover:bg-gray-100 dark:hover:bg-gray-900"
              >
                <TableCell>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {item.name}
                  </div>
                  {item.description && (
                    <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-62">
                      {item.description}
                    </div>
                  )}
                </TableCell>
                <TableCell>{getCategoryName(item.categoryId)}</TableCell>
                <TableCell className="font-medium">${item.price}</TableCell>
                <TableCell>
                  {item.isAvailable ? (
                    <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-0">
                      Available
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="border-gray-300 text-gray-600 dark:border-gray-600 dark:text-gray-400"
                    >
                      Unavailable
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
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
                            Mark Unavailable
                          </>
                        ) : (
                          <>
                            <Eye className="w-4 h-4 mr-2" />
                            Mark Available
                          </>
                        )}
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => setDeleteId(item.id)}
                        className="font-semibold text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
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
