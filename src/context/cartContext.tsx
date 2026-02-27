"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export interface CartItem {
  mealId: string;
  mealName: string;
  price: number;
  quantity: number;
  imageUrl?: string | null;
  providerId: string;
  providerName: string;
}

interface CartContextType {
  items: CartItem[];

  providerId: string | null;
  providerName: string | null;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (mealId: string) => void;
  updateQuantity: (mealId: string, quantity: number) => void;

  clearCart: () => void;
  getCartTotal: () => number;
  getItemCount: () => number;
  getCheckoutData: () => {
    providerId: string;
    items: { mealId: string; quantity: number }[];
  } | null;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [providerId, setProviderId] = useState<string | null>(null);
  const [providerName, setProviderName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("dishdash-cart");
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        setItems(parsed.items || []);

        setProviderId(parsed.providerId || null);
        setProviderName(parsed.providerName || null);
      }
    } catch (error) {
      console.error("Failed to load cart:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(
        "dishdash-cart",
        JSON.stringify({
          items,

          providerId,
          providerName,
        }),
      );
    }
  }, [items, providerId, providerName, isLoading]);

  const addItem = (newItem: Omit<CartItem, "quantity">) => {
    const existingItem = items.find((item) => item.mealId === newItem.mealId);

    if (existingItem) {
      toast.error(
        `${newItem.mealName} is already in your cart. You can update quantity in cart page.`,
      );
      return;
    }
    if (items.length === 0) {
      setProviderId(newItem.providerId);
      setProviderName(newItem.providerName);
    }
    // Check if trying to add from different provider
    else if (providerId !== newItem.providerId) {
      toast.error(
        `You already have items from ${providerName}. Please clear cart to order from ${newItem.providerName}.`,
        {
          action: {
            label: "Clear Cart",
            onClick: () => clearCart(),
          },
          duration: 6000,
        },
      );
      return;
    }

    // Add new item with quantity 1
    setItems((current) => [
      ...current,
      {
        ...newItem,
        quantity: 1,
        price: Number(newItem.price),
      },
    ]);

    toast.success(`${newItem.mealName} added to cart`);
  };

  const removeItem = (mealId: string) => {
    setItems((current) => {
      const newItems = current.filter((item) => item.mealId !== mealId);

      // If cart becomes empty, clear provider info and address
      if (newItems.length === 0) {
        setProviderId(null);
        setProviderName(null);
      }

      return newItems;
    });
    toast.success("Item removed from cart");
  };

  const updateQuantity = (mealId: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(mealId);
      return;
    }

    setItems((current) =>
      current.map((item) =>
        item.mealId === mealId ? { ...item, quantity } : item,
      ),
    );
  };

  const clearCart = () => {
    setItems([]);
    setProviderId(null);
    setProviderName(null);
    toast.success("Cart cleared");
  };

  const getCartTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  const getCheckoutData = () => {
    if (items.length === 0 || !providerId) return null;

    return {
      providerId,
      items: items.map(({ mealId, quantity }) => ({
        mealId,
        quantity,
      })),
    };
  };

  return (
    <CartContext.Provider
      value={{
        items,
        providerId,
        providerName,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getCartTotal,
        getItemCount,
        getCheckoutData,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
