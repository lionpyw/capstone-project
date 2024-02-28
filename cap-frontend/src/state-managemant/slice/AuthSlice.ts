import { StateCreator } from "zustand";
import { Store } from "../../types/Store.1";

export const AuthSlice: StateCreator<Store> = (set) => ({
    username: "",
    password: "",
    token: {},
    setToken: token => set(() => ({ token: token })),
    setUsername: user => set(() => ({ username: user })),
    setPassword: pass => set(() => ({ password: pass })),
});
