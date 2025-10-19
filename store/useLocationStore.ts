"use client";

import type { LocationType } from "@/app/locations/location-schema";
import { nanoid } from "nanoid";
import { create } from "zustand";
import { persist } from "zustand/middleware";


type LocationStore = {
    locations: LocationType[];
    query: string;
    // filtered: Location[];
    setLocations: (locations: LocationType[]) => void;
    setQuery: (query: string) => void;
    addLocation: (location: LocationType) => void;
    updateLocation: (location: LocationType) => void;
    deleteLocation: (id: string) => void;
    getLocationById: (id: string) => LocationType | undefined;
};

export const useLocationStore = create<LocationStore>()(
    persist(
        (set, get) => ({
            addLocation: (location) => {
                set((state) => ({
                    locations: [
                        {
                            ...location,
                            id: nanoid(),
                            createdAt: new Date(),
                            updatedAt: new Date(),
                        },
                        ...state.locations,
                    ],
                }));
            },

            getLocationById: (id) => {
                return get().locations.find((item) => item.id === id);
            },
            deleteLocation: (id) => {
                set((state) => ({
                    locations: state.locations.filter((r) => r.id !== id),
                }));
            },
            query: "",
            locations: [],
            // get filtered() {
            //     const q = get().query.toLowerCase();
            //     return get().locations.filter(
            //         (r) =>
            //             r.nomor.toLowerCase().includes(q) ||
            //             r.status.toLowerCase().includes(q) ||
            //             r.fasilitas.join(", ").toLowerCase().includes(q) ||
            //             r.hargaBulanan.toString().includes(q) ||
            //             (r.hargaTahunan?.toString().includes(q) ?? false),
            //     );
            // },

            setQuery: (query) => set({ query }),
            setLocations: (locations) => set({ locations: locations }),
            updateLocation: (location) => {
                set((state) => ({
                    locations: state.locations.map((r) =>
                        r.id === location.id ? location : r,
                    ),
                }));
            },
        }),
        {
            name: "location-storage", // key untuk localStorage
            partialize: (state) => ({
                query: state.query,
                locations: state.locations,
            }),
        },
    ),
);
