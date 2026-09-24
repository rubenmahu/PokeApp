'use client';
import {Button} from '@mui/material';
import Link from 'next/link';

interface LinkButtonProps {
	href: string;
	children: React.ReactNode;
}
export default function LinkButton({href, children}: LinkButtonProps) {
	return (
		<Button
			variant="contained"
			size="large"
			sx={{textTransform: 'none', fontWeight: 600, px: 4, bgcolor: '#ffcb05', color: '#1d3c6e', '&:hover': {bgcolor: '#f2bd00'}}}
			component={Link}
			href={href}
		>
			{children}
		</Button>
	);
}
