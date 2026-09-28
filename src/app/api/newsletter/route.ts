import {NextResponse} from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import {NewsletterFormInputs} from '@/components/NewsletterForm';
export async function POST(request: Request) {
	try {
		const body: NewsletterFormInputs = await request.json();
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailPattern.test(body.email)) {
			return NextResponse.json({error: 'Email no válido'}, {status: 400});
		}
		const filePath = path.join(process.cwd(), 'data', 'subscribers.json');
		await fs.mkdir(path.join(process.cwd(), 'data'), {recursive: true});
		let currentData = [];
		try {
			const file = await fs.readFile(filePath, 'utf-8');
			currentData = JSON.parse(file);
		} catch {
			currentData = [];
		}
		currentData.push({...body, createdAt: new Date().toISOString()});
		await fs.writeFile(filePath, JSON.stringify(currentData, null, 2));
		return NextResponse.json({success: true, message: 'Registrado en el BFF'});
	} catch (error) {
		return NextResponse.json({error: 'Error interno'}, {status: 500});
	}
}
