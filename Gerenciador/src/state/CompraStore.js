import { create } from "zustand";
import { httpGet } from "../../app";
import { baseUrl } from "../../baseurl";

const useComprasStore = create((set) => ({
  compras: [],
  loading: false,
  error: null,

  fetchCompras: async () => {
    set({ loading: true, error: null });
    try {
      const data = await httpGet(`${baseUrl}/api/compras`, {
        headers: { nomeloja: "LojaC2" },
      });
      set((state) => ({
        ...state,
        compras: data,
        loading: false,
      }));
    } catch (error) {
      console.log(error);
      set((state) => ({ ...state, error, loading: false }));
    }
  },
}));

export default useComprasStore;
