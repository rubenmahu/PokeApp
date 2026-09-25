'use client';

import {usePokemonList} from '@/hooks/usePokemonList';
import {useState} from 'react';
import {Box, Card, IconButton, Pagination, Skeleton, Stack, Typography} from '@mui/material';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {useFavoriteStore} from '@/store/useFavoriteStore';

const gridSx = {
	display: 'grid',
	gridTemplateColumns: {xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(5, 1fr)'},
	gap: 2,
};

export default function PokemonList() {
	const [page, setPage] = useState(1);
	const {data, error, isLoading} = usePokemonList(page);

	const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	const toggleFavorite = useFavoriteStore((s) => s.toggleFavorite);
	const favorites = useFavoriteStore((s) => s.favorites);

	if (isLoading) {
		return (
			<Box sx={gridSx}>
				{Array.from({length: 20}, (_, i) => (
					<Skeleton key={i} variant="rounded" height={150} />
				))}
			</Box>
		);
	} else {
		{
			return (
				<Stack spacing={3}>
					<Typography color="text.secondary">{data?.count} Pokémon en total</Typography>
					<Box sx={gridSx}>
						{data?.results.map((pokemon) => (
							<Card
								key={pokemon.name}
								variant="outlined"
								sx={{
									position: 'relative',
									p: 2,
									borderRadius: 3,
									textAlign: 'center',
									transition: 'transform 150ms, box-shadow 150ms',
									'&:hover': {transform: 'translateY(-4px)', boxShadow: 4, borderColor: '#ffcb05'},
								}}
							>
								<Box
									sx={{
										width: 80,
										height: 80,
										mx: 'auto',
										mb: 1.5,
										borderRadius: '50%',
										bgcolor: '#f5f5f5',
										display: 'grid',
										placeItems: 'center',
									}}
								>
									<CatchingPokemonIcon sx={{fontSize: 40, color: '#2a75bb', opacity: 0.4}} />
								</Box>
								<IconButton
									onClick={() => toggleFavorite(pokemon.name)}
									aria-label={favorites.includes(pokemon.name) ? 'Quitar de favoritos' : 'Añadir a favoritos'}
									size="small"
									sx={{
										position: 'absolute',
										top: 8,
										right: 8,
										color: favorites.includes(pokemon.name) ? '#e3350d' : 'grey.400',
										transition: 'transform 150ms',
										'&:hover': {color: '#e3350d', transform: 'scale(1.15)'},
									}}
								>
									{favorites.includes(pokemon.name) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
								</IconButton>
								<Typography sx={{fontWeight: 600, textTransform: 'capitalize', color: '#1d3c6e'}}>
									{pokemon.name}
								</Typography>
							</Card>
						))}
					</Box>
					<Pagination
						count={Math.round((data?.count ?? 0) / 20)}
						page={page}
						onChange={handleChange}
						shape="rounded"
						size="large"
						sx={{
							alignSelf: 'center',
							'& .MuiPaginationItem-root': {fontWeight: 600, color: '#1d3c6e'},
							'& .MuiPaginationItem-root.Mui-selected': {
								bgcolor: '#ffcb05',
								color: '#1d3c6e',
								'&:hover': {bgcolor: '#f2bd00'},
							},
						}}
					/>
				</Stack>
			);
		}
	}
}
