import PokemonDetail from '@/components/PokemonDetail';
import {usePokemonDetail} from '@/hooks/usePokemonDetail';

export default async function Detail({params}: PageProps<'/pokemon/[id]'>) {
	const {id} = await params;
	return (
		<>
			<PokemonDetail id={id}></PokemonDetail>
		</>
	);
}
