import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PersonaComponent } from './pages/persona/persona.component';
import { HttpClientModule } from '@angular/common/http';
import { PersonaEdicionComponent } from './pages/persona/persona-edicion/persona-edicion.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProductoComponent } from './pages/producto/producto.component';
import { ProductoDialogComponent } from './pages/producto/producto-dialog/producto-dialog.component';




@NgModule({
  declarations: [
    AppComponent,
    PersonaComponent,
    PersonaEdicionComponent,
    ProductoComponent,
    ProductoDialogComponent,
   
  ],
  entryComponents:[ProductoDialogComponent], 
  imports: [
  
  BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    MaterialModule, 
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
