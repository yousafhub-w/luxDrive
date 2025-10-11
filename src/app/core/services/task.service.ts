import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpClientModule,} from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {


    private apiUrlProducts = 'http://localhost:3000/products';
   

    constructor(private http: HttpClient) {}

    getProducts():Observable<any[]>{
      return this.http.get<any[]>(this.apiUrlProducts);
    }
}
