import { IRestaurante } from "./restaurante.interface";

export interface IPrato {
	id: number;
	nome: string;
	preco: number;
	restaurante_id: number;
	restaurante: IRestaurante;
}