import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Room = {
    id: string;
    nomor: string;
    status: "kosong" | "terisi" | "renovasi";
    hargaTahunan?: number;
    fasilitas: string[];
    foto?: string;
    hargaBulanan: number;
};

type RoomStore = {
    rooms: Room[];
    query: string;
    // filtered: Room[];
    setRooms: (rooms: Room[]) => void;
    setQuery: (query: string) => void;
    addRoom: (room: Room) => void;
    updateRoom: (room: Room) => void;
    deleteRoom: (id: string) => void;
};

export const useRoomStore = create<RoomStore>()(
    persist(
        (set, get) => ({
            addRoom: (room) =>
                set((state) => ({ rooms: [ room, ...state.rooms ] })),
            deleteRoom: (id) =>
                set((state) => ({
                    rooms: state.rooms.filter((r) => r.id !== id),
                })),
            // get filtered() {
            //     const q = get().query.toLowerCase();
            //     return get().rooms.filter(
            //         (r) =>
            //             r.nomor.toLowerCase().includes(q) ||
            //             r.status.toLowerCase().includes(q) ||
            //             r.fasilitas.join(", ").toLowerCase().includes(q) ||
            //             r.hargaBulanan.toString().includes(q) ||
            //             (r.hargaTahunan?.toString().includes(q) ?? false),
            //     );
            // },
            query: "",
            rooms: [],
            setQuery: (query) => set({ query }),
            setRooms: (rooms) => set({ rooms }),
            updateRoom: (room) =>
                set((state) => ({
                    rooms: state.rooms.map((r) =>
                        r.id === room.id ? room : r,
                    ),
                })),
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
