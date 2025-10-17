import z from "zod";
import type { RoomType } from "../rooms/room-type";

export const LocationSchema = z.object({
    id: z.string().optional(),
    address: z.string().min(1, "Address is required"),
    availableRooms: z.number().min(0),
    city: z.string().min(1, "City is required"),
    contactPerson: z.string().min(1, "Contact person required"),
    description: z.string().optional(),
    email: z.email().optional(),
    key: z.string().min(1, "Key is required"),
    name: z.string().min(1, "Name is required"),
    phone: z.string().min(8, "Phone is required"),
    postalCode: z.string().min(4, "Postal Code required"),
    province: z.string().min(1, "Province is required"),
    totalRooms: z.number().min(0),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

export type LocationType = z.infer<typeof LocationSchema> & {
    room?: RoomType[];
};
