import {Container, Typography} from '@mui/material';
import PokemonList from '@/components/PokemonList';

export default function List() {
	return (
		<>
			<Container maxWidth={false} sx={{bgcolor: '#2a75bb', color: 'white', py: 4, textAlign: 'center'}}>
				<Typography variant="h3" component="h1" sx={{fontWeight: 700}}>
					Pokédex
				</Typography>
			</Container>
			<Container maxWidth="lg" sx={{py: 4}}>
				<PokemonList></PokemonList>
			</Container>
		</>
	);
}
