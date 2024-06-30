import { CommonModule } from '@angular/common';
import {Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Categoria } from '../model/Categoria';
import Swal from 'sweetalert2';
import {CategoriaService} from "../service/categoria.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-categoria-form',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './categoria-form.component.html',
  styleUrl: './categoria-form.component.css'
})
export class CategoriaFormComponent implements OnInit {
  titulo:string="Datos de la Categoría";
  categoria:Categoria = new Categoria();

  ngOnInit(): void {
    this.mostrarCategoria()
  }

  constructor(private http: HttpClient,
              private categoriaService: CategoriaService,
              private router: Router,
              private activateRouter: ActivatedRoute
  ) { }

  registrarCategoria(): void {
    this.categoriaService.crearCategoria(this.http, this.categoria)
      .subscribe(
        (laCategoria) => {
          Swal.fire({
            title: 'Registrando la categoria',
            text: `La categoria ${this.categoria.nombreCategoria} se registró correctamente`,
            icon: 'success'
          }).then(() => {
            this.router.navigate(['/categorias']);
          });
        },
        (error) => {
          Swal.fire({
            title: 'Error',
            text: `Hubo un error al registrar la categoria: ${error.message}`,
            icon: 'error'
          });
        }
      );
  }

  actualizarCategoria(): void {
    this.categoriaService.actualizarCategoria(this.http, this.categoria)
      .subscribe(
        (laCategoria) => {
          Swal.fire({
            title: 'Actualizando la categoria',
            text: `La categoria se actualizó correctamente`,
            icon: 'success'
          }).then(() => {
            this.router.navigate(['/categorias']);
          });
        },
        (error) => {
          Swal.fire({
            title: 'Error',
            text: `Hubo un error al actualizar la categoria: ${error.message}`,
            icon: 'error'
          });
        }
      );
  }

  mostrarCategoria() {
    this.activateRouter.params
      .subscribe(
        (params) => {
          let id = params['id'];
          if (id) {
            this.categoriaService.mostrarCategoria(this.http, id)
              .subscribe(
                (laCategoria) => (this.categoria = laCategoria)
              );
          }
        }
      );
  }
}
