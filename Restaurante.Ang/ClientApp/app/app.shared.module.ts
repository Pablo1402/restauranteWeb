import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { RestauranteComponent } from './components/restaurante/restaurante.component';
import { RestauranteService } from './Services/restaurante.service';
import { PratoService } from './Services/prato.service';
import { PratoComponent } from './components/prato/prato.component';

@NgModule({
	declarations: [
		AppComponent,
		NavMenuComponent,
		//CounterComponent,
		//FetchDataComponent,
		HomeComponent,
		RestauranteComponent,
		PratoComponent
	],
	providers: [
		RestauranteService ,
		PratoService
	],
	imports: [
		ReactiveFormsModule,
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
			{ path: 'restaurante', component: RestauranteComponent },
			{ path: 'prato', component: PratoComponent },
            //{ path: 'counter', component: CounterComponent },
            //{ path: 'fetch-data', component: FetchDataComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ]
})
export class AppModuleShared {
}
