import { Station } from "./station";

export interface Ligne {
    id: number;
    minimumLouagistes: number;
    villeDestination: string;
    delegationDestination: string;
    prix: number;
    stationDepart: Station;
    stationArrivee: Station;
}
