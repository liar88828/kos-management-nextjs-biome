"use client";

import { nanoid } from "nanoid";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { InvoiceType } from "@/app/payments/invoice-schema";


type InvoiceStore = {
    invoices: InvoiceType[];
    query: string;
    // filtered: Invoice[];
    setInvoices: (invoices: InvoiceType[]) => void;
    setQuery: (query: string) => void;
    addInvoice: (invoice: InvoiceType) => void;
    updateInvoice: (invoice: InvoiceType) => void;
    deleteInvoice: (id: string) => void;
    getInvoicebyId: (id: string) => InvoiceType | undefined;
};

export const useInvoiceStore = create<InvoiceStore>()(
    persist(
        (set, get, _get) => ({
            addInvoice: (invoice) => {
                set((state) => ({
                    invoices: [ { ...invoice, id: nanoid() }, ...state.invoices ],
                }));
            },

            getInvoicebyId: (id) => {
                return get().invoices.find((item) => item.id === id);
            },
            deleteInvoice: (id) => {
                set((state) => ({
                    invoices: state.invoices.filter((r) => r.id !== id),
                }));
            },
            query: "",
            invoices: [],
            // get filtered() {
            //     const q = get().query.toLowerCase();
            //     return get().invoices.filter(
            //         (r) =>
            //             r.nomor.toLowerCase().includes(q) ||
            //             r.status.toLowerCase().includes(q) ||
            //             r.fasilitas.join(", ").toLowerCase().includes(q) ||
            //             r.hargaBulanan.toString().includes(q) ||
            //             (r.hargaTahunan?.toString().includes(q) ?? false),
            //     );
            // },

            setQuery: (query) => set({ query }),
            setInvoices: (invoices) => set({ invoices: invoices }),
            updateInvoice: (invoice) => {
                set((state) => ({
                    invoices: state.invoices.map((r) =>
                        r.id === invoice.id ? invoice : r,
                    ),
                }));
            },
        }),
        {
            name: "invoice-storage", // key untuk localStorage
            partialize: (state) => ({
                query: state.query,
                invoices: state.invoices,
            }),
        },
    ),
);
