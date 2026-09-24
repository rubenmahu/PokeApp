'use client';
import {AppBar, Toolbar, Typography, Button} from '@mui/material';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
export function Navbar() {
	const pathName = usePathname();
	const isHome = pathName === '/';
	const isPokemon = pathName.startsWith('/pokemon');

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
			</Toolbar>
		</AppBar>
	);
}
