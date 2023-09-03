import { Time } from "@angular/common";
import { FilmDTO } from "./FilmDTO";
import { Salle } from "./salle";

export class Projection {

    idProjection!: number;
    dateProjection!: Date;
    tarifProjection!: string;
    timeProjection!: Time;
    salledto!: Salle;
    filmdto!: FilmDTO;
}
