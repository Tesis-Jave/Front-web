import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
    ProductoComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    PremiosComponent,
    CafeteriasComponent,
    
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, FormsModule, BrowserAnimationsModule, HttpClientModule,    MatFormFieldModule,
    MatSelectModule,
    BrowserAnimationsModule,],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
