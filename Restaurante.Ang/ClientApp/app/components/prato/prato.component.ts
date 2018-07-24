import { Component, OnInit } from '@angular/core';
import { RestauranteService } from '../../Services/restaurante.service';
import { IRestaurante } from '../../Models/restaurante.interface';
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { IPrato } from '../../Models/prato.interface';
import { PratoService } from '../../Services/prato.service';

@Component({
	selector: 'app-prato',
	templateUrl: './prato.component.html'
})
export class PratoComponent implements OnInit {
	pratos: IPrato[] = [];
	prato: IPrato = <IPrato>{};

	//formulario
	formLabel: string;
	isEditMode: Boolean = false;
	rform: FormGroup;

	constructor(private pratoService: PratoService,
		private fb: FormBuilder) {
		this.rform = fb.group({
			"nome": ["", Validators.required],
			"preco": ["", Validators.required],
			"restaurante_id": ["", Validators.required],
		});
		this.formLabel = "Adicionar Prato";
		this.isEditMode = false;
	}

	private GetPratos() {
		this.pratoService.getPratos().subscribe(
			data => this.pratos = data,
			error => alert(error),
			() => console.log(this.pratos)
		);
	}

	onSubmit() {
		this.prato.nome = this.rform.controls["nome"].value;
		this.prato.preco = this.rform.controls["preco"].value;
		this.prato.restaurante_id = this.rform.controls["restaurante_id"].value;
		if (this.isEditMode == false) {
			this.pratoService.addPrato(this.prato)
				.subscribe(response => { this.GetPratos(); this.rform.reset(); });
		}
		else {
			this.pratoService.editPrato(this.prato)
				.subscribe();
			this.GetPratos();
			this.rform.reset();
		}

	};
	cancel() {
		this.formLabel = "Adicionar Prato";
		this.isEditMode = false;
		this.prato= <IPrato>{};
		this.rform.controls["nome"].setValue("");
		this.rform.controls["preco"].setValue("");
		this.rform.controls["restaurante_id"].setValue("");
	};

	edit(restaurante: IRestaurante) {
		this.formLabel = "Editar Prato";
		this.isEditMode = true;
		this.prato = this.prato;
		this.rform.controls["nome"].setValue(this.prato.nome);
		this.rform.controls["preco"].setValue(this.prato.preco);
		this.rform.controls["restaurante_id"].setValue(this.prato.restaurante_id);
	};

	delete(prato: IPrato) {
		this.pratoService.deletePrato(prato.id)
			.subscribe(response => { this.GetPratos() });
	};

	ngOnInit() {
		this.GetPratos();
	}
}