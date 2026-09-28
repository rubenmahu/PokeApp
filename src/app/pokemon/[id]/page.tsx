import PokemonDetail from '@/components/PokemonDetail';

export default async function Detail({params}: PageProps<'/pokemon/[id]'>) {
	const {id} = await params;
	return (
		<>
			<PokemonDetail id={id}></PokemonDetail>
		</>
	);
}
