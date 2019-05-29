import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonaComponent } from './pages/persona/persona.component';
import { PersonaEdicionComponent } from './pages/persona/persona-edicion/persona-edicion.component';
import { ProductoComponent } from './pages/producto/producto.component';

const routes: Routes = [
  {path: 'persona', component: PersonaComponent, children:[
    {path: 'nuevo', component : PersonaEdicionComponent}, // este es el componente hijo de persona..
    {path: 'edicion/:id', component : PersonaEdicionComponent} 
  ] },
  {path : 'producto', component: ProductoComponent
  
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  
exports: [RouterModule]
})
export class AppRoutingModule { }
