import { Injectable } from '@angular/core';
import { Cliente } from '../components/clientes/cliente';
import {catchError, map} from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import { Region } from '../components/clientes/region';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/api/clientes';
  private header = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient, private router: Router) {}
  getClientes(page: number): Observable<Cliente[]>{
    let url = `${this.urlEndPoint}/page/${page}`;
    return this.http.get<Cliente[]>(url);
  }

  crearCliente(cliente: Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(this.urlEndPoint, cliente, {headers: this.header}).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e => {
        if(e.status == 400){
          return throwError(e);
        }
        Swal.fire('Error', e.error.mensaje, 'error');
        return throwError(e);
      })
    )
  }

  getCliente(id):Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        Swal.fire('Error', e.error.mensaje, 'error');
        return throwError(e);
      })
    )
  }

  updateCliente(cliente: Cliente): Observable<Cliente>{
    let url = `${this.urlEndPoint}/${cliente.id}`;
    return this.http.put<Cliente>(url, cliente, {headers: this.header}).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e => {

        if(e.status == 400){
          return throwError(e);
        }
        
        Swal.fire('Error', e.error.mensaje, 'error');
        return throwError(e);
      })
    )
  }

  deletCliente(cliente: Cliente): Observable<Cliente>{
    let url = `${this.urlEndPoint}/${cliente.id}`;
    return this.http.delete<Cliente>(url, {headers: this.header});
  }

  subirFoto(archivo: File, id): Observable<HttpEvent<any>> {
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    let url = `${this.urlEndPoint}/upload`;

    const req = new HttpRequest('POST', url, formData, {
      reportProgress: true
    });

    return this.http.request(req);
  }

  getRegiones():Observable<Region[]>{
    let url = `${this.urlEndPoint}/regiones`;
    return this.http.get<Region[]>(url);
  }


  
}
