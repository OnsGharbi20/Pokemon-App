import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule} from '@angular/router';
import { PokemonService } from '../service/pokemon.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [MatIconModule,MatPaginatorModule,RouterModule,NgFor,NgIf],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css'
})
export class PokemonListComponent implements OnInit {
  constructor(private modalService: NgbModal, private pokemonService: PokemonService) {}

  pokemons: any;
  pokemonsDetails: any[] = [];
  displayedPokemons: any[] = [];
  pageSize = 6;
  pageIndex = 0;

  ngOnInit(): void {
    this.pokemonService.getAllPokemons(40, 0).subscribe(response => {
      this.pokemons = response.results;
      this.pokemons.forEach((pokemon: any) => {
        this.pokemonService.getPokemon(pokemon.url).subscribe(details => {
          this.pokemonsDetails.push(details);
          this.updateDisplayedPokemons();
        });
      });
    });
  }

  open(content: any) {
    this.modalService.open(content);
  }

  delete(id: string) {
    localStorage.removeItem(id);
    this.pokemonsDetails = this.pokemonsDetails.filter(pokemon => pokemon.id !== id);
    this.updateDisplayedPokemons();
  }

  updateDisplayedPokemons(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedPokemons = this.pokemonsDetails.slice(startIndex, endIndex);
  }

  onPageChange(event: any): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updateDisplayedPokemons();
  }
}
