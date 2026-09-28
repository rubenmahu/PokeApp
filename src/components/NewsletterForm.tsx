'use client';

import {Button, Stack, TextField, Typography, Alert, Snackbar} from '@mui/material';
import {useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';

export type NewsletterFormInputs = {
	name: string;
	email: string;
	phone: string;
};
export default function NewsletterForm() {
	const [snackbar, setSnackbar] = useState<{open: boolean; message: string; severity: 'success' | 'error'}>({
		open: false,
		message: '',
		severity: 'success',
	});
	const {
		register,
		handleSubmit,
		formState: {errors, isValid, isSubmitting},
	} = useForm<NewsletterFormInputs>({mode: 'onChange'});

	const onSubmit: SubmitHandler<NewsletterFormInputs> = async (data) => {
		const res: Response = await fetch('/api/newsletter', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(data),
		});

		const response = await res.json();

		if (response.success) {
			setSnackbar({open: true, message: response.message, severity: 'success'});
		} else {
			setSnackbar({open: true, message: response.error, severity: 'error'});
		}
	};

	return (
		<>
			<Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar((s) => ({...s, open: false}))}>
				<Alert severity={snackbar.severity}>{snackbar.message}</Alert>
			</Snackbar>{' '}
			<Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={2} sx={{maxWidth: 400, mx: 'auto'}}>
				<Typography variant="h6">Suscríbete a la newsletter</Typography>
				<TextField
					label="Nombre"
					{...register('name', {required: 'El nombre es obligatorio'})}
					error={!!errors.name}
					helperText={errors.name?.message}
				/>
				<TextField
					label="Teléfono"
					{...register('phone', {required: 'El teléfono es obligatorio'})}
					error={!!errors.phone}
					helperText={errors.phone?.message}
				/>
				<TextField
					label="Email"
					{...register('email', {
						required: 'El email es obligatorio',
						pattern: {
							value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
							message: 'Email no válido',
						},
					})}
					error={!!errors.email}
					helperText={errors.email?.message}
				/>
				<Button type="submit" variant="contained" disabled={!isValid || isSubmitting}>
					Suscribirme
				</Button>
			</Stack>
		</>
	);
}
