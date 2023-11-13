import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoComponent } from './components/productos/productos.component';
import { LoginComponent } from './login/login.component';
import { PremiosComponent } from './components/premios/premios/premios.component';
import { CafeteriasComponent } from './components/cafeterias/cafeterias/cafeterias.component';
import { DashboardComponent } from './login/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'productos', component: ProductoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'premios', component: PremiosComponent},
  { path: 'cafeterias', component: CafeteriasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
