"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

type CartItem = {
  productId: string;
  capacity: number;
  color: string;
  qty: number;
};

type FavouriteItem = {
  productId: string;
};

type AppContextType = {
  cartItems: CartItem[];
  favCollections: FavouriteItem[];

  addToCart: (
    productId: string,
    capacity: number,
    color: string,
  ) => void;

  removeFromCart: (
    productId: string,
    capacity: number,
    color: string,
  ) => void;

  addToCollection: (productId: string) => void;
  removeFromCollection: (productId: string) => void;
};

const AppContext = createContext<AppContextType | null>(
  null,
);

export const AppProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(
    [],
  );

  const [favCollections, setFavCollections] = useState<
    FavouriteItem[]
  >([]);

  const addToCart = (
    productId: string,
    capacity: number,
    color: string,
  ) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) =>
          item.productId === productId &&
          item.capacity === capacity &&
          item.color === color,
      );

      if (existing) {
        return prev.map((item) =>
          item.productId === productId &&
          item.capacity === capacity &&
          item.color === color
            ? { ...item, qty: item.qty + 1 }
            : item,
        );
      }

      return [
        ...prev,
        {
          productId,
          capacity,
          color,
          qty: 1,
        },
      ];
    });
  };

  const removeFromCart = (
    productId: string,
    capacity: number,
    color: string,
  ) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.productId === productId &&
            item.capacity === capacity &&
            item.color === color
          ),
      ),
    );
  };

  const addToCollection = (productId: string) => {
    setFavCollections((prev) => {
      const exists = prev.some(
        (item) => item.productId === productId,
      );

      if (exists) return prev;

      return [...prev, { productId }];
    });
  };

  const removeFromCollection = (
    productId: string,
  ) => {
    setFavCollections((prev) =>
      prev.filter(
        (item) => item.productId !== productId,
      ),
    );
  };

  return (
    <AppContext.Provider
      value={{
        cartItems,
        favCollections,

        addToCart,
        removeFromCart,

        addToCollection,
        removeFromCollection,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(
      "useAppContext must be used inside AppProvider",
    );
  }

  return context;
};