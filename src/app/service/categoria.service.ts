import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { Categoria } from '../model/Categoria';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private endPoint: string = 'https://apiinventariomini.onrender.com/api/categorias';
  private httpheaders = new HttpHeaders(
    {'Content-Type': 'application/json'}
  )

  constructor() { }

  mostrarCategorias(http: HttpClient):Observable<Categoria[]>{
    return http
      .get<Categoria[]>(this.endPoint)
      .pipe(map((response) => response as Categoria[]));
  }

  mostrarCategoria(http: HttpClient, id: number) {
    return http.get<Categoria>(`${this.endPoint}/${id}`);
  }

  crearCategoria(http: HttpClient, categoria: Categoria): Observable<Categoria>{
    return http.post<Categoria>(this.endPoint, categoria,
      {
        headers : this.httpheaders,
      });
  }

  actualizarCategoria(http: HttpClient, categoria: Categoria): Observable<Categoria>{
    return http.put<Categoria>(`${this.endPoint}/${categoria.idCategoria}`,
      categoria,
      {
        headers : this.httpheaders,
      });
  }

  eliminarCategoria(http: HttpClient, id: number): Observable<Categoria>{
    return http.delete<Categoria>(`${this.endPoint}/${id}`,
      {
        headers : this.httpheaders,
      });
  }
}
