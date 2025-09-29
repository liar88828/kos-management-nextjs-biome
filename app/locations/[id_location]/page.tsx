import { LocationDetailPage } from "@/app/locations/location-detail";
import { locations } from "@/app/locations/location-example";

export default async function Page({
                                       params,
                                   }: PageProps<"/locations/[id_location]">) {
    const { id_location } = await params;
    const location = locations.find((item) => item.id_key === id_location);
    return <LocationDetailPage location={ location }/>;
}

