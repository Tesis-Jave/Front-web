import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/components/home/home.component';
import { ProductoComponent } from './components/productos/productos.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './login/header/header.component';
import { FooterComponent } from './login/footer/footer.component';
import { DashboardComponent } from './login/dashboard/dashboard.component';
import { PremiosComponent } from './components/premios/premios/premios.component';
import { CafeteriasComponent } from './components/cafeterias/cafeterias/cafeterias.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductoComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    PremiosComponent,
    CafeteriasComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, FormsModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
