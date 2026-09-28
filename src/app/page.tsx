'use client';
import {Container, Typography} from '@mui/material';
import LinkButton from '../components/LinkButton';
import NewsletterForm from '@/components/NewsletterForm';

export default function Home() {
	return (
		<>
			<Container maxWidth={false} sx={{textAlign: 'center', bgcolor: '#2a75bb', color: 'white', py: 6}}>
				<Typography variant="h2">POC - PokeApp</Typography>
				<Typography variant="h5">Aplicación para consultar API de Pokemon</Typography>
			</Container>
			<Container maxWidth={false} sx={{textAlign: 'center', bgcolor: '#f5f5f5', py: 4}}>
				<LinkButton href="/pokemon"> Listado </LinkButton>
			</Container>
			<Container maxWidth={false} sx={{textAlign: 'center', bgcolor: '#f5f5f5', py: 4}}>
				<NewsletterForm></NewsletterForm>
			</Container>
		</>
	);
}
