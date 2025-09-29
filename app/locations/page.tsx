import { locations } from "@/app/locations/location-example";
import { LocationTable } from "@/app/locations/location-table";

export default function Page() {
    return <LocationTable locations={ locations }/>;
}
