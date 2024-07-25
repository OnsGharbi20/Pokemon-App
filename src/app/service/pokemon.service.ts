import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  apiUrl="https://pokeapi.co/api/v2/pokemon"
  constructor(private http:HttpClient) { }
  getAllPokemons(limit:number,offset:number):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}?limit=${limit}&offset=${offset}`);
  }
  getPokemon(url:string):Observable<any>{
    return this.http.get<any>(url);
  }
  getPokemonById(id:number):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
