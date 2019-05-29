  import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Persona } from '../_model/persona';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  personaCambio = new Subject<Persona[]>(); // variable reactiva, sujeto de estudio..   // cuando haya un cambio va a pasarle algo, tipo arreglo de personas
  mensajeCambio = new Subject<string>();  //
  url: string = `${environment.HOST_URL}/personas`;

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Persona[]>(this.url);      //retorna un arreglo de personas, y se pasa la url
  }

  listarPorId(idPersona: number) {
    return this.http.get<Persona>(`${this.url}/${idPersona}`);
  }

  registrar(persona: Persona) {
    return this.http.post(`${this.url}`, persona);
  }

  modificar(persona: Persona) {
    return this.http.put(`${this.url}`, persona);
  }

  eliminar(idPersona: number) {
    return this.http.delete(`${this.url}/${idPersona}`);
  }
}
