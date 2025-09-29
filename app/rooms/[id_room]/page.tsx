import RoomDetail from "@/app/rooms/room-detail";
import { exampleRooms } from "@/app/rooms/room-example";

export default async function Page({ params }: PageProps<"/rooms/[id_room]">) {
    const { id_room } = await params;
    const room = exampleRooms.find((item) => item.id === id_room);
    return <RoomDetail room={ room }/>;
}
