import { Component, OnInit } from '@angular/core';
import { RestauranteService } from '../../Services/restaurante.service';
import { IRestaurante } from '../../Models/restaurante.interface';
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { IPrato } from '../../Models/prato.interface';
import { PratoService } from '../../Services/prato.service';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';

@Component({
	selector: 'app-prato',
	templateUrl: './prato.component.html'
})
export class PratoComponent implements OnInit {
	pratos: IPrato[] = [];
	prato: IPrato = <IPrato>{};
	restaurantes: IRestaurante[] = [];

	//formulario
	formLabel: string;
	isEditMode: Boolean = false;
	formEdit: FormGroup;
	fPesquisa: FormGroup;
	postback: boolean = false;

	constructor(private pratoService: PratoService,
		private fb: FormBuilder,private restauranteService: RestauranteService) {
		this.formEdit = fb.group({
			"nome": ["", Validators.required],
			"preco": ["", Validators.required],
			"restaurante_id": ["", Validators.required],
		});
		this.fPesquisa = fb.group({
			"nomePesquisa": [""]
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

	private GetRestaurante() {
		this.restauranteService.getRestaurantes()
			.subscribe(data => this.restaurantes = data,
				error => alert(error),
				() => console.log(this.restaurantes));
	}

	onSubmit() {
		this.prato.nome = this.formEdit.controls["nome"].value;
		this.prato.preco = this.formEdit.controls["preco"].value;
		this.prato.restaurante_id = this.formEdit.controls["restaurante_id"].value;
		if (this.isEditMode == false) {
			this.pratoService.addPrato(this.prato)
				.subscribe(response => { this.GetPratos(); this.formEdit.reset(); }
							, error => alert(error), () => alert("Prato cadastrado com sucesso!"));
		}
		else {
			this.pratoService.editPrato(this.prato)
				.subscribe(response => {
					this.GetPratos();
					this.formEdit.reset();
					}
					,error => alert(error), () => alert("Prato atualizado com sucesso!"));
			this.GetPratos();
			this.formEdit.reset();
		}
		this.postback = false;
	};
	cancel() {
		this.formLabel = "Adicionar Prato";
		this.isEditMode = false;
		this.prato= <IPrato>{};
		this.formEdit.controls["nome"].setValue("");
		this.formEdit.controls["preco"].setValue("");
		this.formEdit.controls["restaurante_id"].setValue("");
		this.postback = false;
	};
	novo() {
		this.formEdit.reset();
		this.GetRestaurante();
		this.postback = true;
	}

	edit(prato: IPrato) {
		this.GetRestaurante();
		this.formLabel = "Editar Prato";
		this.isEditMode = true;
		this.prato = prato;
		console.log(this.prato);
		this.formEdit.controls["nome"].setValue(this.prato.nome);
		this.formEdit.controls["preco"].setValue(this.prato.preco);
		this.formEdit.controls["restaurante_id"].setValue(this.prato.restaurante_id);
		this.postback = true;
	};

	delete(prato: IPrato) {
		this.pratoService.deletePrato(prato.id)
			.subscribe(
				response => { this.GetPratos()},error => alert(error), () => alert("Prato removido com sucesso!"));
	};

	search() {
		if (this.fPesquisa.controls["nomePesquisa"].value != '') {
			this.pratoService.getByNome(this.fPesquisa.controls["nomePesquisa"].value).subscribe(
				data => this.pratos = data,
				error => alert(error),
				() => console.log(this.pratos)
			);
		}
		else {
			this.GetPratos();
		}
	}

	ngOnInit() {
		this.GetPratos();
	}
}