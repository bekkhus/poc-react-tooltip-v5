const pokeApiEndpoint = 'https://pokeapi.co/api/v2';

export const getPokemon = {
    getKey: (id: number) => `/pokemon/${id}`,
    fetcher: async (key: string) => {
        const res = await fetch(`${pokeApiEndpoint}${key}`);
        const json = await res.json();

        return json;
    }
};