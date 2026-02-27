import { create } from "zustand";

const useProductStore = create((set, get) => ({
  products: [],
  singleProduct: null,
  categories: [],
  total: 0,
  loading: false,
  error: null,
  limit: 10,
  skip: 0,
  search: "",
  selectedCategory: "",

  // Fetch product list
  fetchProducts: async (params = {}) => {
    const { limit, skip, search, selectedCategory } = {
      ...get(),
      ...params,
    };

    try {
      set({ loading: true, error: null });

      let url = "";

      if (search) {
        url = `https://dummyjson.com/products/search?q=${search}`;
      } else if (selectedCategory) {
        url = `https://dummyjson.com/products/category/${selectedCategory}`;
      } else {
        url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      set({
        products: data.products,
        total: data.total,
        limit,
        skip,
        search,
        selectedCategory,
        loading: false,
      });

    } catch (error) {
      set({ error: "Failed to fetch products", loading: false });
    }
  },

  // Fetch single product
  fetchSingleProduct: async (id) => {
    try {
      set({ loading: true, error: null });

      const res = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await res.json();

      set({
        singleProduct: data,
        loading: false,
      });

    } catch (error) {
      set({ error: "Failed to fetch product", loading: false });
    }
  },

  clearSingleProduct: () => set({ singleProduct: null }),

  // Fetch categories
  fetchCategories: async () => {
    try {
      const res = await fetch("https://dummyjson.com/products/categories");
      const data = await res.json();

      set({ categories: data });
    } catch (error) {
      console.error("Failed to fetch categories");
    }
  },
}));

export default useProductStore;