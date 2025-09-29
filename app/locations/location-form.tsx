"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
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
});

export type LocationSchema = z.infer<typeof formSchema>;


export function LocationDialogForm() {
    const form = useForm<LocationSchema>({
        defaultValues: {
            address: "",
            availableRooms: 0,
            city: "",
            contactPerson: "",
            description: "",
            email: "",
            key: "",
            name: "",
            phone: "",
            postalCode: "",
            province: "",
            totalRooms: 0,
        },
        resolver: zodResolver(formSchema),
    });


    function onSubmit(values: LocationSchema) {
        console.log("Submitted Location:", values);
    }


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <Plus/>
                    Add Location
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Add New Location</DialogTitle>
                    <DialogDescription>
                        Fill in the details for a new location.
                    </DialogDescription>
                </DialogHeader>

                <Form { ...form }>
                    <form
                        className="space-y-4"
                        onSubmit={ form.handleSubmit(onSubmit) }
                    >
                        <FormField
                            control={ form.control }
                            name="key"
                            render={ ({ field }) => (
                                <FormItem>
                                    <FormLabel>Key</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Unique key"
                                            { ...field }
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            ) }
                        />

                        <FormField
                            control={ form.control }
                            name="name"
                            render={ ({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Location name"
                                            { ...field }
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            ) }
                        />

                        <FormField
                            control={ form.control }
                            name="address"
                            render={ ({ field }) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Full address"
                                            { ...field }
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            ) }
                        />

                        <div className="grid grid-cols-2 gap-2">
                            <FormField
                                control={ form.control }
                                name="city"
                                render={ ({ field }) => (
                                    <FormItem>
                                        <FormLabel>City</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="City"
                                                { ...field }
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                ) }
                            />

                            <FormField
                                control={ form.control }
                                name="province"
                                render={ ({ field }) => (
                                    <FormItem>
                                        <FormLabel>Province</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Province"
                                                { ...field }
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                ) }
                            />
                        </div>

                        <FormField
                            control={ form.control }
                            name="postalCode"
                            render={ ({ field }) => (
                                <FormItem>
                                    <FormLabel>Postal Code</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Postal code"
                                            { ...field }
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            ) }
                        />

                        <FormField
                            control={ form.control }
                            name="contactPerson"
                            render={ ({ field }) => (
                                <FormItem>
                                    <FormLabel>Contact Person</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Person in charge"
                                            { ...field }
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            ) }
                        />

                        <FormField
                            control={ form.control }
                            name="phone"
                            render={ ({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Phone number"
                                            { ...field }
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            ) }
                        />

                        <FormField
                            control={ form.control }
                            name="email"
                            render={ ({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Optional email"
                                            type="email"
                                            { ...field }
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            ) }
                        />

                        <div className="grid grid-cols-2 gap-2">
                            <FormField
                                control={ form.control }
                                name="totalRooms"
                                render={ ({ field }) => (
                                    <FormItem>
                                        <FormLabel>Total Rooms</FormLabel>
                                        <FormControl>
                                            <Input
                                                defaultValue={ field.value }
                                                onChange={ (e) =>
                                                    field.onChange(
                                                        Number(e.target.value),
                                                    )
                                                }
                                                type="number"
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                ) }
                            />

                            <FormField
                                control={ form.control }
                                name="availableRooms"
                                render={ ({ field }) => (
                                    <FormItem>
                                        <FormLabel>Available Rooms</FormLabel>
                                        <FormControl>
                                            <Input
                                                defaultValue={ field.value }
                                                onChange={ (e) =>
                                                    field.onChange(
                                                        Number(e.target.value),
                                                    )
                                                }
                                                type="number"
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                ) }
                            />
                        </div>

                        <FormField
                            control={ form.control }
                            name="description"
                            render={ ({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Optional description"
                                            { ...field }
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            ) }
                        />

                        <DialogFooter>
                            <Button type="submit">Save</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
