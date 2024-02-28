import { create } from "zustand";
import { AuthSlice } from "./slice/AuthSlice";
import { Store } from "../types/Store.1";
import {Appoint, AppointSlice} from "./slice/AppointSlice";


const useStore = create<Store & Appoint>()((...a) => ({
    ...AuthSlice(...a),
    ...AppointSlice(...a),

}))

export default useStore;