import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import {RouterLink} from "@angular/router";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Producto} from "../model/Producto";
import {ProductoService} from "../service/producto.service";

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit {
  titulo: string = 'Productos';
  listadoDeProductos: Producto[] = []

  constructor(private http: HttpClient, private productoService: ProductoService) { }

  ngOnInit(): void {
    this.productoService
      .mostrarProductos(this.http)
      .subscribe((losProductos) => this.listadoDeProductos = losProductos);
  }

  delete(producto: Producto): void {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, bórralo!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.eliminarProducto(this.http, producto.idProducto)
          .subscribe(
            (response) => {
              this.productoService.mostrarProductos(this.http)
                .subscribe(
                  (losProductos) => {
                    this.listadoDeProductos = losProductos;
                    Swal.fire({
                      title: "¡Eliminado!",
                      text: "El producto se ha sido eliminado satisfactoriamente.",
                      icon: "success"
                    });
                  }
                );
            },
            (error) => {
              Swal.fire({
                title: "Error",
                text: `Hubo un error al eliminar el producto: ${error.message}`,
                icon: "error"
              });
            }
          );
      }
    });
  }
}
