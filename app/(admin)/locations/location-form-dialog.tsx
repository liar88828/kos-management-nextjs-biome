import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { LocationSchema, type LocationType } from "./location-schema";


export function LocationDialogForm({
                                       saveData,
                                   }: {
    saveData: (data: LocationType) => void;
}) {
    const form = useForm<LocationType>({
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
        resolver: zodResolver(LocationSchema),
    });


    function onSubmit(values: LocationType) {
        console.log("Submitted Location:", values);
        saveData(values);
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
