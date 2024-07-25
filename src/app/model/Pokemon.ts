import { PokemonAbility } from "./PokemonAbility";
import { PokemonMove } from "./PokemonMove";

export interface Pokemon {
    name: string;
    moves: PokemonMove[];
    abilities: PokemonAbility[];
    height:number;
    weight:number;
    base_experience:string;
    sprites: {
        front_default: string;
    };
    species: {
        url: string;
    };
  }