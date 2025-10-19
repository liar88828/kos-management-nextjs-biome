"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { RoomType } from "@/app/rooms/room-schema";


type RoomStore = {
    rooms: RoomType[];
    query: string;
    // filtered: Room[];
    setRooms: (rooms: RoomType[]) => void;
    setQuery: (query: string) => void;
    addRoom: (room: RoomType) => void;
    updateRoom: (room: RoomType) => void;
    deleteRoom: (id?: string) => void;
    getRoomById: (id?: string) => RoomType | undefined;
    filterRoom: () => RoomType[];
    selectedRoom?: RoomType | null;
    selectRoom: (id: string) => void;
    clearSelection: () => void;
};

export const useRoomStore = create<RoomStore>()(
    persist(
        (set, get) => ({
            selectedRoom: null,
            getRoomById: (id) => get().rooms.find((room) => room.id === id),
            selectRoom: (id) =>
                set((s) => ({
                    selectedRoom: s.rooms.find((r) => r.id === id) || null,
                })),
            clearSelection: () => set({ selectedRoom: null }),
            filterRoom: () => {
                const { rooms, query } = get();
                return rooms.filter((r) => {
                    const q = query.toLowerCase();
                    return (
                        r.nomor.toLowerCase().includes(q) ||
                        r.status.toLowerCase().includes(q) ||
                        r.fasilitas.join(", ").toLowerCase().includes(q)
                        // r.hargaBulanan.toString().includes(q)
                        // (r.hargaTahunan?.toString().includes(q) ?? false)
                    );
                });
            },
            addRoom: (room) => {
                set((state) => ({ rooms: [ room, ...state.rooms ] }));
            },

            deleteRoom: (id) => {
                if (id) {
                    set((state) => ({
                        rooms: state.rooms.filter((r) => r.id !== id),
                    }));
                }
            },
            query: "",
            rooms: [],
            setQuery: (query) => set({ query }),
            setRooms: (rooms) => set({ rooms }),
            updateRoom: (room) => {
                set((state) => ({
                    rooms: state.rooms.map((r) =>
                        r.id === room.id ? room : r,
                    ),
                }));
            },
        }),
        {
            name: "room-storage", // key untuk localStorage
            partialize: (state) => ({
                query: state.query,
                rooms: state.rooms,
            }),
        },
    ),
);
