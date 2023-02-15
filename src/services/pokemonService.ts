import { BasicPokemon } from "../models/BasicPokemon";
import { Pokemon } from "../models/Pokemon";

const pokeApiEndpoint = 'https://pokeapi.co/api/v2';

export const getPokemon = {
    getKey: (id: number) => `/pokemon/${id}`,
    fetcher: async (key: string): Promise<Pokemon> => {
        const res = await fetch(`${pokeApiEndpoint}${key}`);
        const json = await res.json();

        return json;
    }
};

export const getPokemonRange = {
    getKey: (limit: number) => `/pokemon?limit=${limit}`,
    fetcher: async (key: string): Promise<BasicPokemon[]> => {
        const res = await fetch(`${pokeApiEndpoint}${key}`);
        const json = await res.json();

        return json.results;
    }
}