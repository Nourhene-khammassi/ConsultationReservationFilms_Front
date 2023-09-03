export class FilmDTO {
    idFilm!: number;
    nomFilm!: string;
    dureeFilm!: string;
    createur!: string;
    description!: string; // Vous pouvez utiliser un type Date si c'est plus approprié
    actif!: boolean;
    category!: string;
    image!: string;
    dateFilm!: Date;
    // Ajoutez d'autres propriétés en fonction de vos besoins
}
