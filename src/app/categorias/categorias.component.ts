import {Component, OnInit} from '@angular/core';
import { Categoria } from '../model/Categoria';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import {CategoriaService} from "../service/categoria.service";
import {RouterLink} from "@angular/router";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})
export class CategoriasComponent implements OnInit {
  titulo: string = 'Categorias';
  listadoDeCategorias: Categoria[] = []

  constructor(private http: HttpClient, private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.categoriaService
      .mostrarCategorias(this.http)
      .subscribe((lasCategorias) => this.listadoDeCategorias = lasCategorias);
  }

  delete(categoria: Categoria): void {
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
        this.categoriaService.eliminarCategoria(this.http, categoria.idCategoria)
          .subscribe(
            (response) => {
              this.categoriaService.mostrarCategorias(this.http)
                .subscribe(
                  (lasCategorias) => {
                    this.listadoDeCategorias = lasCategorias;
                    Swal.fire({
                      title: "¡Eliminado!",
                      text: "El registro ha sido eliminado satisfactoriamente.",
                      icon: "success"
                    });
                  }
                );
            },
            (error) => {
              Swal.fire({
                title: "Error",
                text: `Hubo un error al eliminar la categoría: ${error.message}`,
                icon: "error"
              });
            }
          );
      }
    });
  }
}
