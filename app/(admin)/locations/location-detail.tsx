// import type { LocationType } from "@/app/locations/location-type";

import { RoomPage } from "@/app/(admin)/rooms/room-page";
import { PageNotFound } from "@/components/mini/pageNotFound";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/format";
import { useLocationStore } from "@/store/useLocationStore";
import { CalendarDays, Mail, MapPin, Phone } from "lucide-react";
import type { LocationType } from "./location-schema";


export function LocationDetailPage(
    // { location }: { location?: LocationType }
    { idLocation }: { idLocation: string },
) {
    const getLocationById = useLocationStore((state) => state.getLocationById);
    const location = getLocationById(idLocation);

    if (!location) return <PageNotFound/>;
    return (
        <>
            <LocationDetail location={ location }/>
            <RoomPage/>
        </>
    );
}


export function LocationDetail({ location }: { location: LocationType }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-bold text-2xl">
                    { location.name }
                </CardTitle>
                <p className="text-muted-foreground">{ location.description }</p>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                    <p className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground"/>
                        { location.address }, { location.city }, { location.province }
                        , { location.postalCode }
                    </p>
                    <p className="mt-2 flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground"/>
                        { location.phone }
                    </p>
                    { location.email && (
                        <p className="mt-2 flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground"/>
                            { location.email }
                        </p>
                    ) }
                    <p className="mt-2">
                        Contact Person:{ " " }
                        <span className="font-medium">
                            { location.contactPerson }
                        </span>
                    </p>
                </div>
                <div>
                    <p>
                        Total Rooms:{ " " }
                        <Badge variant="outline">{ location.totalRooms }</Badge>
                    </p>
                    <p className="mt-2">
                        Available Rooms:{ " " }
                        <Badge
                            variant={
                                location.availableRooms > 0
                                    ? "default"
                                    : "destructive"
                            }
                        >
                            { location.availableRooms }
                        </Badge>
                    </p>
                    <p className="mt-2 flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-muted-foreground"/>{ " " }
                        Created: { formatDate(location.createdAt) }
                    </p>
                    <p className="mt-2 flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-muted-foreground"/>{ " " }
                        Updated: { formatDate(location.updatedAt) }
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
