import {PokemonDetail} from '@/types/pokemon';
import {useQuery} from '@tanstack/react-query';

export const usePokemonDetail = (id: number) => {
	return useQuery({
		queryKey: ['pokemon', 'detail', id],
		queryFn: async (): Promise<PokemonDetail> => {
			const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
			if (!res.ok) throw new Error('Error al conseguir datos de la PokeAPI');
			return res.json();
		},
		staleTime: 1000 * 60 * 5,
	});
};
