import { Component, OnInit, ViewChild } from '@angular/core';
import { PersonaService } from './../../_service/persona.service';
import { Persona } from './../../_model/persona';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  displayedColumns = ['idPersona', 'nombres', 'apellidos', 'acciones'];
  dataSource: MatTableDataSource<Persona>;
  @ViewChild(MatSort) sort: MatSort;  // ES UNA DIRECTIVA q busca el tipo de elemnto, en este caso matsort y se almacena en sort..
  @ViewChild(MatPaginator) paginator: MatPaginator;   // paginador para la lista


  constructor(private personaService: PersonaService, private snackBar: MatSnackBar) { }


  ngOnInit() {
    this.personaService.personaCambio.subscribe(data => { //  con esa nueva data se puede pintar el datasource 
    //  console.log(data);
     this.dataSource = new MatTableDataSource(data);
     this.dataSource.sort = this.sort;   // a todo datasource se debe englobar su sort correspondiente
     this.dataSource.paginator = this.paginator;  //  a todo paginador se debe englobar su paginator correspondiente
    });

     this.personaService.mensajeCambio.subscribe(data => {  // se suscribe 
      this.snackBar.open(data, 'INFO', {
        duration: 2000
      });
    });

     this.personaService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

  }
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();  // filtro de busqueda  
  }

  eliminar(idPersona: number) {
    this.personaService.eliminar(idPersona).subscribe(() => { //
      this.personaService.listar().subscribe(data => {
        this.personaService.personaCambio.next(data);
        this.personaService.mensajeCambio.next('SE ELIMINó el registro');
      });
    });
  }

}
