import { Producto } from 'src/app/_model/producto';
import { Component, OnInit, Inject } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProductoService } from 'src/app/_service/producto.service';

@Component({
  selector: 'app-producto-dialog',
  templateUrl: './producto-dialog.component.html',
  styleUrls: ['./producto-dialog.component.css']
})
export class ProductoDialogComponent implements OnInit {

  
  producto : Producto;
  constructor(private dialogRef:MatDialogRef<ProductoDialogComponent>, @Inject(MAT_DIALOG_DATA) private data: Producto, private productoService: ProductoService) { }

  ngOnInit() {
 
    this.producto = new Producto();
    this.producto.idProducto = this.data.idProducto;
    this.producto.marca= this.data.marca;
    this.producto.nombre= this.data.nombre;
  }


  cancelar(){
    this.dialogRef.close();

  }

  operar(){

    if (this.producto != null && this.producto.idProducto > 0) {
      this.productoService.modificar(this.producto).subscribe(data => { // me suscrito y traigo la nueva data 
        this.productoService.listar().subscribe(productos => {
          this.productoService.productosCambio.next(productos);  // poblar variables reactivas para q el componente padre sea notificado
          this.productoService.mensajeCambio.next("Se modifico");
        });
      });
    } else {
      this.productoService.registrar(this.producto).subscribe(data => {
        this.productoService.listar().subscribe(medicos => {
          this.productoService.productosCambio.next(medicos);
          this.productoService.mensajeCambio.next("Se registro");
        });
      });
    }
    this.dialogRef.close();  }

}