import z from "zod";


export const BookingSchema = z.object({
    name: z.string().min(2, "Nama harus diisi"),
    email: z.email("Email tidak valid"),
    guests: z.number().int().min(1).max(10),
});
export type BookingForm = z.infer<typeof BookingSchema>;
