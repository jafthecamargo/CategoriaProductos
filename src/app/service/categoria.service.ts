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

  constructor(private http: HttpClient) { }

  mostrarCategorias():Observable<Categoria[]>{
    return this.http.get<Categoria[]>(this.endPoint);
    pipe(map((response) => response as Categoria[]));
  }
}
