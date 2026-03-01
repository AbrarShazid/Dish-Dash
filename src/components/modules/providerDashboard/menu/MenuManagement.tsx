// components/modules/provider/menu/MenuManagement.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { MenuTable } from "./MenuTable";
import { MenuCards } from "./MenuCards";
import { AddEditItemModal } from "./AddEditItemModal";

interface Data {
  id: string;
  name: string;
  description?: string;
  price: number;
  categoryId: string;
  categoryName: string;
  imageUrl?: string | null;
  isAvailable: boolean;
  isDeleted: boolean;
  createdAt: Date;
}
interface categoryData {
  id: string;
  name: string;
  createdAt: Date;
}

export function MenuManagement({
  menuItems,
  categoryData,
}: {
  menuItems: Data[];
  categoryData: categoryData[];
}) {
  const [items, setItems] = useState(menuItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const handleAdd = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleToggleAvailability = (itemId: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, isAvailable: !item.isAvailable } : item,
      ),
    );
  };

  const handleSoftDelete = (itemId: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, isDeleted: true } : item,
      ),
    );
  };

  const handleSave = (itemData: any) => {
    if (editingItem) {
      // Edit existing
      setItems((prev) =>
        prev.map((item) =>
          item.id === editingItem.id ? { ...item, ...itemData } : item,
        ),
      );
    } else {
      // Add new
      const newItem = {
        id: Date.now().toString(),
        ...itemData,
        isDeleted: false,
        createdAt: new Date().toISOString(),
      };
      setItems((prev) => [newItem, ...prev]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 md:mx-6 mx-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Menu Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage your restaurant's menu items
          </p>
        </div>
        <Button onClick={handleAdd} className="w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Add New Item
        </Button>
      </div>

      {/* Active Items Section */}
      {items.length > 0 ? (
        <>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            All {items.length} items
          </h2>

          <MenuTable
            items={items}
            categories={categoryData}
            onEdit={handleEdit}
            onToggleAvailability={handleToggleAvailability}
            onDelete={handleSoftDelete}
          />

          <MenuCards
            items={items}
            categories={categoryData}
            onEdit={handleEdit}
            onToggleAvailability={handleToggleAvailability}
            onDelete={handleSoftDelete}
          />
        </>
      ) : (
        <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
          <p className="text-gray-500 dark:text-gray-400">No items</p>
          <Button variant="link" onClick={handleAdd} className="mt-2">
            Add your first item
          </Button>
        </div>
      )}

      {/* Add/Edit Modal */}
      <AddEditItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        categories={categoryData}
        editingItem={editingItem}
      />
    </div>
  );
}
