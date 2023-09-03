import { Places } from "./places";
import { Projection } from "./projection";
import { Salle } from "./salle";

export class ReservationDTO {
    idReservation!: number;
    nbPlaces!: any;
    dateReservation!: string;
    projection!: Projection;
    places!: Places[];
}
