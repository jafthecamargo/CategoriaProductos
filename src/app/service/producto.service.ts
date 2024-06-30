import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { Producto } from '../model/Producto';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private endPoint: string = 'https://apiinventariomini.onrender.com/apiProducto/productos';
  private httpheaders = new HttpHeaders(
    {'Content-Type': 'application/json'}
  )

  constructor() { }

  mostrarProductos(http: HttpClient):Observable<Producto[]>{
    return http
      .get<Producto[]>(this.endPoint)
      .pipe(map((response) => response as Producto[]));
  }

  mostrarProducto(http: HttpClient, id: number) {
    return http.get<Producto>(`${this.endPoint}/${id}`);
  }

  crearProducto(http: HttpClient, categoria: Producto): Observable<Producto>{
    return http.post<Producto>(this.endPoint, categoria,
      {
        headers : this.httpheaders,
      });
  }

  actualizarProducto(http: HttpClient, producto: Producto): Observable<Producto>{
    return http.put<Producto>(`${this.endPoint}/${producto.idProducto}`,
      producto,
      {
        headers : this.httpheaders,
      });
  }

  eliminarProducto(http: HttpClient, id: number): Observable<Producto>{
    return http.delete<Producto>(`${this.endPoint}/${id}`,
      {
        headers : this.httpheaders,
      });
  }
}
