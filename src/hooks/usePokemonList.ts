import {PokemonResponse} from '@/types/pokemon';
import {useQuery} from '@tanstack/react-query';

export const POKEMON_PAGE_SIZE = 20;

export const usePokemonList = (page: number) => {
	const offset = (page - 1) * POKEMON_PAGE_SIZE;

	return useQuery({
		queryKey: ['pokemon', 'list', page],
		queryFn: async (): Promise<PokemonResponse> => {
			const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${POKEMON_PAGE_SIZE}`);
			if (!res.ok) throw new Error('Error al conseguir datos de la PokeAPI');
			return res.json();
		},
		staleTime: 1000 * 60 * 5,
	});
};
