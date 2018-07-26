import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { IPrato } from '../Models/prato.interface';

@Injectable()
export class PratoService {
	constructor(private http: Http) { }

	//get
	getPratos() {
		return this.http.get("http://localhost:52294/api/Prato").map(data => <IPrato[]>data.json());
	}

	getByNome(nome: string) {
		return this.http.get("http://localhost:52294/api/Prato/nome/" + nome).map(data => <IPrato[]>data.json());
	}

	//post
	addPrato(prato: IPrato) {
		return this.http.post("http://localhost:52294/api/Prato", prato);
	}


	//put
	editPrato(prato: IPrato) {
		return this.http.put(`http://localhost:52294/api/Prato/${prato.id}`, prato);
	}

	//delete
	deletePrato(pratoId: number) {
		return this.http.delete(`http://localhost:52294/api/Prato/${pratoId}`);
	}

}

