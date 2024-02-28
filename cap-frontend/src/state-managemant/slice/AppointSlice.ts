import { StateCreator } from "zustand";

export interface Appoint {
    duration: string | undefined
    charges: number | undefined
    notes: string | undefined
    prescription: string | undefined
    setDuration: (dur: string | undefined) => void;
    setCharges: (chr: number | undefined) => void;
    setNotes:(note: string | undefined) => void;
    setPrescription: (prs: string | undefined) => void;
}


export const AppointSlice: StateCreator<Appoint> = (set) => ({
    duration: "",
    charges: 0,
    notes: "",
    prescription: "",
    setDuration: dur => set(() => ({duration : dur})),
    setCharges: chr => set(()=>({charges : chr})),
    setNotes: note => set(() => ({notes : note})),
    setPrescription: prs => set(() => ({ prescription : prs})),
});