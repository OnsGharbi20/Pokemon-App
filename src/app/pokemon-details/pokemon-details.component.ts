import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../service/pokemon.service';
import { Router } from 'express';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, NgFor, NgIf, SlicePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Pokemon } from '../model/Pokemon';

@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [NgIf,NgFor,CommonModule,SlicePipe],
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.css'
})
export class PokemonDetailsComponent implements OnInit {
  pokemonId!:number;
  pokemon:Pokemon | undefined;
  species!:any;
constructor(private pokemonService:PokemonService,private route:ActivatedRoute,private modalService: NgbModal){}
ngOnInit(): void {
  this.route.params.subscribe(params=>{
    this.pokemonId=params['id']
    this.pokemonService.getPokemonById(this.pokemonId).subscribe(response=>{
      this.pokemon=response
    })
  })
}
open(content: any ,url:string) {
  this.modalService.open(content);
  this.pokemonService.getPokemon(url).subscribe(response=>{
    console.log(response)
    this.species=response
  })
}
}
