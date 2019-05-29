import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductoService } from 'src/app/_service/producto.service';
import { Producto } from 'src/app/_model/producto';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { ProductoDialogComponent } from './producto-dialog/producto-dialog.component';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  
  displayedColumns = ['idproducto', 'nombre', 'marca', 'acciones'];
  dataSource: MatTableDataSource<Producto>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private productoService: ProductoService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {

    this.productoService.productosCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.productoService.mensajeCambio.subscribe(data=>{
      this.snackBar.open(data,'Aviso',{duration:2000});
    });
 
    this.productoService.listar().subscribe(data =>{
       this.dataSource =  new MatTableDataSource(data);
       this.dataSource.paginator =  this.paginator;
       this.dataSource.sort =  this.sort;
    }); 
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  openDialog(producto?: Producto){
    let prod = producto != null ? producto: new Producto();
    this.dialog.open(ProductoDialogComponent,{
        width: '300px',
        data: producto 
     } );

  }

  eliminar(producto : Producto ){

    this.productoService.eliminar(producto.idProducto).subscribe(()=>{
      this.productoService.listar().subscribe(productos => {
        this.productoService.productosCambio.next(productos);
        this.productoService.mensajeCambio.next("Se eliminó el producto con id" + producto.idProducto );
      });
   }); 
    
  }
}
