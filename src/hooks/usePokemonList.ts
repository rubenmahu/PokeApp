import {PokemonResponse} from '@/types/pokemon';
import {useQuery} from '@tanstack/react-query';

export const usePokemonList = (page: number) => {
	const offset = (page - 1) * 20;

	return useQuery({
		queryKey: ['pokemon', page],
		queryFn: async (): Promise<PokemonResponse> => {
			const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`);
			if (!res.ok) throw new Error('Error al conseguir datos de la PokeAPI');
			return res.json();
		},
		staleTime: 1000 * 60 * 5,
	});
};
