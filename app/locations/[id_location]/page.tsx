import { LocationDetailPage } from "@/app/locations/location-detail";


export default async function Page({
                                       params,
                                   }: PageProps<"/locations/[id_location]">) {
    const { id_location } = await params;
    // const location = locations.find((item) => item.id_key === id_location);
    return (
        <LocationDetailPage
            idLocation={ id_location }
            // location={location}
        />
    );
}
