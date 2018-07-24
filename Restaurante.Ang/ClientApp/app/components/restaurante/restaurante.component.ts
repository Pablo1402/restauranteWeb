import { Component, OnInit } from '@angular/core';
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
	
	constructor(private restauranteService: RestauranteService,
				private fb : FormBuilder) {
		this.rform = fb.group({
			"nome": ["", Validators.required]
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
				.subscribe(response => { this.GetRestaurantes(); this.rform.reset(); });
		}
		else {
			this.restauranteService.editRestaurante(this.restaurante)
				.subscribe();
			this.GetRestaurantes();
			this.rform.reset();
		}
		
	};
	cancel() {
		this.formLabel = "Adicionar Restaurante";
		this.isEditMode = false;
		this.restaurante = <IRestaurante>{};
		this.rform.controls["nome"].setValue("");
	};

	edit(restaurante: IRestaurante) {
		this.formLabel = "Editar Restaurante";
		this.isEditMode = true;
		this.restaurante = restaurante;
		this.rform.controls["nome"].setValue(restaurante.nome);

	};

	delete() { };

	ngOnInit() {
		this.GetRestaurantes();
	}
}