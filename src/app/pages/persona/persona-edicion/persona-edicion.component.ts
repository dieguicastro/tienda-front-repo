import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PersonaService } from 'src/app/_service/persona.service';
import { Persona } from 'src/app/_model/persona';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-persona-edicion',
  templateUrl: './persona-edicion.component.html',
  styleUrls: ['./persona-edicion.component.css']
})
export class PersonaEdicionComponent implements OnInit {

  persona: Persona;
  form: FormGroup;  // es el objeto formulario en html
  edicion: boolean;
  id: number;



  // route es: acceder a la url y acceder al parametro. inyectar route : url activa
  // personaService cuando se necesta la capa de personaservice para acceder al metodo editar. llenar el formulario de edicion
  // el router lamada q permite la navegscion
  constructor(private personaService: PersonaService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.persona = new Persona();

     // siempre cuando se trabaje con formularios se debe tener la representacion de html en ts
     this.form = new FormGroup({  // se inicializa el formulario  . se declara instancia de ese formulario
      'id': new FormControl(0), //  los datos q se tienen a nivrl de html , 0 es vacio
      'nombres': new FormControl(''),
      'apellidos': new FormControl('')
      
    });

    // poblar el formulario si viene un parametro en la url..
    // se obtiene la data q son parametros de url 
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];  // trae como parametro el mismo q se coloca 
      this.edicion = this.id != null; // edicion es true cuando haya id, sino es false

      this.initForm();
    });
  }

    //
    initForm() {
      if (this.edicion) {
        //cargar la data del servicio hacia el form
        this.personaService.listarPorId(this.id).subscribe(data => {//    se pobla la data del formulario de edicion o creación
          this.form = new FormGroup({
            'id': new FormControl(data.idPersona),
            'nombres': new FormControl(data.nombres),
            'apellidos': new FormControl(data.apellidos)
            
          });
        }/*, err => {  // no es buena practica hacer estos bloques de error, para eso se usan interceptadores, de acuerdo al status code q viene del bacc
          console.log(err.error.mensaje);
        }*/);
      }
    }
  
    operar(){  // para el boton aceptar del formulario setea la data q viene del formulario
      this.persona.idPersona = this.form.value['id'];
      this.persona.nombres = this.form.value['nombres'];
      this.persona.apellidos = this.form.value['apellidos'];
      
  
      if(this.edicion){
        this.personaService.modificar(this.persona).subscribe(()=>{
          this.personaService.listar().subscribe(data => {  // traer de nuevo la data de bd
            this.personaService.personaCambio.next(data);  // a esta variable reactiva se pobla con la nueva data tras la edición
            this.personaService.mensajeCambio.next('SE MODIFICO LA PERSONA');  // es una funcion propia de variables reactivas para poder poblar un dato, de cualquier tipo q sea
          });
        });
      }else{
        //insercion
        this.personaService.registrar(this.persona).subscribe(()=>{
          this.personaService.listar().subscribe(data => {
            this.personaService.personaCambio.next(data);
            this.personaService.mensajeCambio.next('SE REGISTRO LA PERSONA');
          });
        });
      }
  
      this.router.navigate(['persona']); // navegue a */paciete
    }
  

}
