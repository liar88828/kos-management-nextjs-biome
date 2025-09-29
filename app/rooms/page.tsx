"use client";

import { exampleRooms } from "@/app/rooms/room-example";
import { RoomPage } from "@/app/rooms/room-page";

export default function Page() {
    return (
        <RoomPage roomsProps={ exampleRooms }/>
    );
}



