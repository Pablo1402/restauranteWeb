import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { IRestaurante } from '../Models/restaurante.interface';

@Injectable()
export class RestauranteService {
	constructor(private http: Http) { }

	//get
	getRestaurantes() {
		return this.http.get("http://localhost:52294/api/Restaurante").map(data => <IRestaurante[]>data.json());
	}


	//post
	addRestaurante(restaurante: IRestaurante) {
		return this.http.post("http://localhost:52294/api/Restaurante", restaurante);
	}


	//put
	editRestaurante(restaurante: IRestaurante) {
		return this.http.put(`http://localhost:52294/api/Restaurante/${restaurante.id}`, restaurante);
	}

	//delete
	deleteRestaurante(restauranteId: number) {
		return this.http.delete(`http://localhost:52294/api/Restaurante/${restauranteId}`);
	}
	
}

