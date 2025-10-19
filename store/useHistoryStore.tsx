"use client";

import { nanoid } from "nanoid";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";


export type HistoryTransaction = {
    id: string;
    idRoom: string;
    roomName: string;
    date: string;
    guests: string;
    price: number;
    status: "Selesai" | "Dibatalkan" | "Diproses";
};

type HistoryStore = {
    histories: HistoryTransaction[];
    addHistory: (data: Omit<HistoryTransaction, "id">) => void;
    updateHistory: (id: string, data: Partial<HistoryTransaction>) => void;
    deleteHistory: (id: string) => void;
    clearHistories: () => void;
};

export const useHistoryStore = create<HistoryStore>()(
    persist(
        immer((set) => ({
            histories: [],

            addHistory: (data) =>
                set((state) => {
                    state.histories.push({ id: nanoid(), ...data });
                }),

            updateHistory: (id, data) =>
                set((state) => {
                    const index = state.histories.findIndex((h) => h.id === id);
                    if (index !== -1) {
                        state.histories[index] = {
                            ...state.histories[index],
                            ...data,
                        };
                    }
                }),

            deleteHistory: (id) =>
                set((state) => {
                    state.histories = state.histories.filter(
                        (h) => h.id !== id,
                    );
                }),

            clearHistories: () => set(() => ({ histories: [] })),
        })),
        {
            name: "history-storage", // persisted key in localStorage
        },
    ),
);
