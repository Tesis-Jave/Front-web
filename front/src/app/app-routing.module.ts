import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/components/home/home.component';
import { ProductoComponent } from './components/productos/productos.component';
import { LoginComponent } from './login/login.component';
import { PremiosComponent } from './components/premios/premios/premios.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'productos', component: ProductoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'premios', component: PremiosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
