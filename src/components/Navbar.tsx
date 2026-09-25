'use client';
import {useFavoriteStore} from '@/store/useFavoriteStore';
import {AppBar, Badge, Box, Toolbar, Typography, Button} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
export function Navbar() {
	const pathName = usePathname();
	const isHome = pathName === '/';
	const isPokemon = pathName.startsWith('/pokemon');

	const favorites = useFavoriteStore((s) => s.favorites);

	return (
		<AppBar position="static" sx={{bgcolor: '#1d3c6e'}}>
			<Toolbar variant="dense">
				<Typography sx={{fontWeight: 700, color: '#ffcb05', flexGrow: 1}}>PokeApp</Typography>
				<Button
					component={Link}
					href="/"
					color="inherit"
					sx={{
						textTransform: 'none',
						fontWeight: 600,
						ml: 1,
						'&.MuiButton-outlined': {borderColor: '#ffcb05', color: '#ffcb05'},
					}}
					variant={isHome ? 'outlined' : 'text'}
				>
					Inicio
				</Button>
				<Button
					component={Link}
					href="/pokemon"
					color="inherit"
					sx={{
						textTransform: 'none',
						fontWeight: 600,
						ml: 1,
						'&.MuiButton-outlined': {borderColor: '#ffcb05', color: '#ffcb05'},
					}}
					variant={isPokemon ? 'outlined' : 'text'}
				>
					Listado
				</Button>
				<Box sx={{display: 'flex', alignItems: 'center', ml: 2.5, mr: 1}} aria-label={`${favorites.length} favoritos`}>
					<Badge
						badgeContent={favorites.length ? favorites.length : ''}
						showZero
						sx={{'& .MuiBadge-badge': {bgcolor: '#ffcb05', color: '#1d3c6e', fontWeight: 700}}}
					>
						<FavoriteIcon sx={{color: '#e3350d'}} />
					</Badge>
				</Box>
			</Toolbar>
		</AppBar>
	);
}
