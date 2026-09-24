export default async function Detail({params}: PageProps<'/pokemon/[id]'>) {
	const {id} = await params;
	return (
		<>
			<h1>Pokemon {id}</h1>
		</>
	);
}
