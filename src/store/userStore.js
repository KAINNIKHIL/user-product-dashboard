import { create } from "zustand";

const useUserStore = create((set, get) => ({
  users: [],
  singleUser: null,
  total: 0,
  loading: false,
  error: null,
  limit: 10,
  skip: 0,
  search: "",

  // Fetch list
  fetchUsers: async (params = {}) => {
    const { limit, skip, search } = { ...get(), ...params };

    try {
      set({ loading: true, error: null });

      let url = "";

      if (search) {
        url = `https://dummyjson.com/users/search?q=${search}`;
      } else {
        url = `https://dummyjson.com/users?limit=${limit}&skip=${skip}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      set({
        users: data.users,
        total: data.total,
        limit,
        skip,
        search,
        loading: false,
      });

    } catch (error) {
      set({ error: "Failed to fetch users", loading: false });
    }
  },

  // Fetch single user
  fetchSingleUser: async (id) => {
  try {
    set({ loading: true, error: null });

    // 🔥 Add caching logic HERE
    const existing = get().users.find(
      (u) => u.id === Number(id)
    );

    if (existing) {
      set({ singleUser: existing, loading: false });
      return; // stop here, don't call API
    }

    // If not found in list → fetch from API
    const res = await fetch(`https://dummyjson.com/users/${id}`);
    const data = await res.json();

    set({
      singleUser: data,
      loading: false,
    });

  } catch (error) {
    set({ error: "Failed to fetch user", loading: false });
  }
},

  clearSingleUser: () => set({ singleUser: null }),
}));

export default useUserStore;