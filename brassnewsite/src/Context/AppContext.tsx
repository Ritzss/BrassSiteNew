"use client";

import {
  createContext,
  useContext,
  useEffect,
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

const AppContext = createContext<AppContextType | null>(null);

const CART_STORAGE_KEY = "brass-cart";
const FAVOURITES_STORAGE_KEY = "brass-favourites";

export const AppProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [favCollections, setFavCollections] = useState<FavouriteItem[]>([]);

  // This prevents the initial empty state from overwriting
  // data that already exists in localStorage.
  const [storageHydrated, setStorageHydrated] = useState(false);

  // ---------------------------------------------------------
  // RESTORE LOCAL DATA
  // ---------------------------------------------------------

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      const savedFavourites = localStorage.getItem(
        FAVOURITES_STORAGE_KEY,
      );

      if (savedCart) {
        const parsedCart: unknown = JSON.parse(savedCart);

        if (Array.isArray(parsedCart)) {
          setCartItems(parsedCart);
        }
      }

      if (savedFavourites) {
        const parsedFavourites: unknown = JSON.parse(
          savedFavourites,
        );

        if (Array.isArray(parsedFavourites)) {
          setFavCollections(parsedFavourites);
        }
      }
    } catch (error) {
      console.error(
        "Failed to restore Brass app data:",
        error,
      );
    } finally {
      // Only after restoration is complete are we allowed
      // to start writing state back to localStorage.
      setStorageHydrated(true);
    }
  }, []);

  // ---------------------------------------------------------
  // SAVE CART
  // ---------------------------------------------------------

  useEffect(() => {
    // Don't save the initial [] before localStorage has
    // finished loading.
    if (!storageHydrated) {
      return;
    }

    try {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(cartItems),
      );
    } catch (error) {
      console.error(
        "Failed to save Brass cart:",
        error,
      );
    }
  }, [cartItems, storageHydrated]);

  // ---------------------------------------------------------
  // SAVE FAVOURITES
  // ---------------------------------------------------------

  useEffect(() => {
    if (!storageHydrated) {
      return;
    }

    try {
      localStorage.setItem(
        FAVOURITES_STORAGE_KEY,
        JSON.stringify(favCollections),
      );
    } catch (error) {
      console.error(
        "Failed to save Brass favourites:",
        error,
      );
    }
  }, [favCollections, storageHydrated]);

  // ---------------------------------------------------------
  // CART
  // ---------------------------------------------------------

  const addToCart = (
  productId: string,
  capacity: number,
  color: string,
) => {
  console.log("🔥 ADD TO CART CALLED", {
    productId,
    capacity,
    color,
  });

  setCartItems((prev) => {
    const existing = prev.find(
      (item) =>
        item.productId === productId &&
        item.capacity === capacity &&
        item.color === color,
    );

    const updatedCart = existing
      ? prev.map((item) =>
          item.productId === productId &&
          item.capacity === capacity &&
          item.color === color
            ? {
                ...item,
                qty: item.qty + 1,
              }
            : item,
        )
      : [
          ...prev,
          {
            productId,
            capacity,
            color,
            qty: 1,
          },
        ];

    // Persist the updated cart immediately.
    try {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(updatedCart),
      );

      console.log(
        "💾 CART SAVED TO LOCALSTORAGE",
        updatedCart,
      );
    } catch (error) {
      console.error(
        "❌ FAILED TO SAVE CART",
        error,
      );
    }

    return updatedCart;
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

  // ---------------------------------------------------------
  // FAVOURITES
  // ---------------------------------------------------------

  const addToCollection = (productId: string) => {
    setFavCollections((prev) => {
      const exists = prev.some(
        (item) => item.productId === productId,
      );

      if (exists) {
        return prev;
      }

      return [
        ...prev,
        {
          productId,
        },
      ];
    });
  };

  const removeFromCollection = (productId: string) => {
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