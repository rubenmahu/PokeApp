'use client';

import {usePokemonDetail} from '@/hooks/usePokemonDetail';
import {Alert, Box, Card, CardContent, Chip, CircularProgress, IconButton, Stack, Typography} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {useFavoriteStore} from '@/store/useFavoriteStore';

interface PokemonDetailProps {
	id: string;
}

interface InfoCardProps {
	label: string;
	value: string | number;
	accent: string;
}

const TYPE_COLORS: Record<string, string> = {
	normal: '#A8A77A',
	fire: '#EE8130',
	water: '#6390F0',
	electric: '#F7D02C',
	grass: '#7AC74C',
	ice: '#96D9D6',
	fighting: '#C22E28',
	poison: '#A33EA1',
	ground: '#E2BF65',
	flying: '#A98FF3',
	psychic: '#F95587',
	bug: '#A6B91A',
	rock: '#B6A136',
	ghost: '#735797',
	dragon: '#6F35FC',
	dark: '#705746',
	steel: '#B7B7CE',
	fairy: '#D685AD',
};
const DEFAULT_COLOR = '#78909c';

const typeColor = (name?: string) => (name && TYPE_COLORS[name]) || DEFAULT_COLOR;

function InfoCard({label, value, accent}: InfoCardProps) {
	return (
		<Card
			variant="outlined"
			sx={{
				minWidth: 120,
				flex: '1 1 120px',
				bgcolor: 'background.paper',
				boxShadow: 1,
				borderTop: `4px solid ${accent}`,
				transition: 'transform 0.15s, box-shadow 0.15s',
				'&:hover': {transform: 'translateY(-3px)', boxShadow: 4},
			}}
		>
			<CardContent sx={{textAlign: 'center'}}>
				<Typography
					variant="caption"
					color="text.secondary"
					sx={{textTransform: 'uppercase', letterSpacing: 1.2, fontWeight: 600}}
				>
					{label}
				</Typography>
				<Typography variant="h5" sx={{textTransform: 'capitalize', fontWeight: 800, color: accent}}>
					{value}
				</Typography>
			</CardContent>
		</Card>
	);
}

function SectionTitle({children, accent}: {children: string; accent: string}) {
	return (
		<Typography
			variant="overline"
			component="h2"
			sx={{
				alignSelf: 'flex-start',
				fontWeight: 700,
				fontSize: '0.95rem',
				letterSpacing: 2,
				pl: 1.5,
				borderLeft: `4px solid ${accent}`,
			}}
		>
			{children}
		</Typography>
	);
}

export default function PokemonDetail({id}: PokemonDetailProps) {
	const {data, error, isLoading} = usePokemonDetail(Number(id));
	const toggleFavorite = useFavoriteStore((s) => s.toggleFavorite);
	const isFavorite = useFavoriteStore((s) => (data ? s.favorites.includes(data.name) : false));

	if (isLoading) {
		return (
			<Box sx={{display: 'flex', justifyContent: 'center', p: 6}}>
				<CircularProgress />
			</Box>
		);
	}

	if (error) {
		return (
			<Box sx={{p: 3, maxWidth: 720, mx: 'auto'}}>
				<Alert severity="error">No se ha podido cargar este Pokémon. Comprueba el id e inténtalo de nuevo.</Alert>
			</Box>
		);
	}

	if (!data) return null;

	const mainColor = typeColor(data?.types[0]?.type.name);
	const secondColor = typeColor(data?.types[1]?.type.name ?? data.types[0]?.type.name);

	return (
		<Stack spacing={3} sx={{alignItems: 'center', p: 3, maxWidth: 720, mx: 'auto'}}>
			<Stack
				spacing={2}
				sx={{
					position: 'relative',
					alignItems: 'center',
					width: '100%',
					p: 3,
					borderRadius: 4,
					color: '#fff',
					background: `linear-gradient(135deg, ${mainColor}, ${secondColor})`,
					boxShadow: 3,
				}}
			>
				<IconButton
					onClick={() => toggleFavorite(data.name)}
					aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
					sx={{
						position: 'absolute',
						top: 12,
						right: 12,
						color: isFavorite ? '#e3350d' : 'rgba(255,255,255,0.7)',
						bgcolor: 'rgba(255,255,255,0.15)',
						transition: 'transform 150ms',
						'&:hover': {color: '#e3350d', bgcolor: 'rgba(255,255,255,0.25)', transform: 'scale(1.1)'},
					}}
				>
					{isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
				</IconButton>
				<Box
					component="img"
					src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`}
					alt={data.name}
					sx={{
						width: 200,
						height: 200,
						imageRendering: 'pixelated',
						filter: 'drop-shadow(0 6px 8px rgba(0,0,0,0.35))',
					}}
				/>
				<Typography
					variant="h3"
					component="h1"
					sx={{textTransform: 'capitalize', fontWeight: 700, textShadow: '0 2px 4px rgba(0,0,0,0.3)'}}
				>
					{data.name}
				</Typography>
				<Stack direction="row" spacing={1}>
					{data.types.map(({type}) => (
						<Chip
							key={type.name}
							label={type.name}
							sx={{
								textTransform: 'capitalize',
								fontWeight: 600,
								color: '#fff',
								bgcolor: 'rgba(0,0,0,0.3)',
							}}
						/>
					))}
				</Stack>
			</Stack>

			<SectionTitle accent={mainColor}>Datos</SectionTitle>
			<Stack direction="row" useFlexGap sx={{flexWrap: 'wrap', gap: 2, width: '100%'}}>
				<InfoCard label="Nº" value={data.id} accent={mainColor} />
				<InfoCard label="Altura" value={`${data.height / 10} m`} accent={mainColor} />
				<InfoCard label="Peso" value={`${data.weight / 10} kg`} accent={mainColor} />
			</Stack>

			<SectionTitle accent={secondColor}>Estadísticas</SectionTitle>
			<Stack direction="row" useFlexGap sx={{flexWrap: 'wrap', gap: 2, width: '100%'}}>
				{data.stats.map(({stat, base_stat}) => (
					<InfoCard key={stat.name} label={stat.name} value={base_stat} accent={secondColor} />
				))}
			</Stack>
		</Stack>
	);
}
