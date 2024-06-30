import { CommonModule } from '@angular/common';
import {Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Producto} from "../model/Producto";
import {ProductoService} from "../service/producto.service";

@Component({
  selector: 'app-productos-form',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './productos-form.component.html',
  styleUrl: './productos-form.component.css'
})
export class ProductosFormComponent implements OnInit {
  titulo:string="Datos del Producto";
  producto:Producto = new Producto();

  ngOnInit(): void {
    this.mostrarProducto()
  }

  constructor(private http: HttpClient,
              private productoService: ProductoService,
              private router: Router,
              private activateRouter: ActivatedRoute
  ) { }

  registrarProducto(): void {
    this.productoService.crearProducto(this.http, this.producto)
      .subscribe(
        (elProducto) => {
          Swal.fire({
            title: 'Registrando el producto',
            text: `El producto ${this.producto.nombreProducto} se registró correctamente`,
            icon: 'success'
          }).then(() => {
            this.router.navigate(['/productos']);
          });
        },
        (error) => {
          Swal.fire({
            title: 'Error',
            text: `Hubo un error al registrar el producto: ${error.message}`,
            icon: 'error'
          });
        }
      );
  }

  actualizarProducto(): void {
    this.productoService.actualizarProducto(this.http, this.producto)
      .subscribe(
        (elProducto) => {
          Swal.fire({
            title: 'Actualizando el producto',
            text: `El producto se actualizó correctamente`,
            icon: 'success'
          }).then(() => {
            this.router.navigate(['/productos']);
          });
        },
        (error) => {
          Swal.fire({
            title: 'Error',
            text: `Hubo un error al actualizar el producto: ${error.message}`,
            icon: 'error'
          });
        }
      );
  }

  mostrarProducto() {
    this.activateRouter.params
      .subscribe(
        (params) => {
          let id = params['id'];
          if (id) {
            this.productoService.mostrarProducto(this.http, id)
              .subscribe(
                (elProducto) => (this.producto = elProducto)
              );
          }
        }
      );
  }
}
