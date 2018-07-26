import { Component, OnInit, ViewChild } from '@angular/core';
import { RestauranteService } from '../../Services/restaurante.service';
import { IRestaurante } from '../../Models/restaurante.interface';
import { FormGroup, FormControl, FormBuilder,Validators, ReactiveFormsModule} from '@angular/forms';

@Component({
	selector: 'app-restaurante',
	templateUrl: './restaurante.component.html'
})

export class RestauranteComponent implements OnInit {
	restaurantes: IRestaurante[] = [];
	restaurante: IRestaurante = <IRestaurante>{};

	//formulario
	formLabel: string;
	isEditMode: Boolean = false;
	rform: FormGroup;
	fPesquisa: FormGroup;
	postback: boolean = false;
	//@ViewChild(formularioRestaurante) formularioRestaurante;
	
	constructor(private restauranteService: RestauranteService,
				private fb : FormBuilder) {
		this.rform = fb.group({
			"nome": ["", Validators.required]
		});
		this.fPesquisa = fb.group({
			"nomePesquisa": [""]
		});
		this.formLabel = "Adicionar Restaurante";
		this.isEditMode = false;
	}

	private GetRestaurantes() {
		this.restauranteService.getRestaurantes().subscribe(
			data => this.restaurantes = data,
			error => alert(error),
			() => console.log(this.restaurantes)
		);
	}

	onSubmit() {
		this.restaurante.nome = this.rform.controls["nome"].value;
		if (this.isEditMode == false) {
			this.restauranteService.addRestaurante(this.restaurante)
				.subscribe(response => { this.GetRestaurantes(); this.rform.reset(); }
				, error => alert(error), () => alert("Restaurante cadastrado com sucesso!"));
		}
		else {
			this.restauranteService.editRestaurante(this.restaurante)
				.subscribe(response => {this.GetRestaurantes(); this.rform.reset(); }
					, error => alert(error), () => alert("restaurante alterado com sucesso!"));
			
		}
		this.postback = false;
	};
	cancel() {
		this.formLabel = "Adicionar Restaurante";
		this.isEditMode = false;
		this.restaurante = <IRestaurante>{};
		this.rform.controls["nome"].setValue("");
		this.postback = false;
		this.GetRestaurantes();
	};

	edit(restaurante: IRestaurante) {
		this.formLabel = "Editar Restaurante";
		this.isEditMode = true;
		this.restaurante = restaurante;
		this.rform.controls["nome"].setValue(restaurante.nome);
		this.postback = true;
	};

	novo() {
		this.restaurante = <IRestaurante>{};
		this.postback = true;
	}

	search() {
		if (this.fPesquisa.controls["nomePesquisa"].value != '') {
			this.restauranteService.getByNome(this.fPesquisa.controls["nomePesquisa"].value).subscribe(
				data => this.restaurantes = data,
				error => alert(error),
				() => console.log(this.restaurantes)
			);
		}
		else {
			this.GetRestaurantes();
		}
	}

	delete(id: number) {
		this.restauranteService.deleteRestaurante(id)
			.subscribe(response => { this.GetRestaurantes(); }, error => alert(error), () => alert("Restaurante removido com sucesso!"));
	}

	ngOnInit() {
		this.GetRestaurantes();
	}
}	