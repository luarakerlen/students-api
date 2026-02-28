import type { Request, Response } from 'express';
import { readDb, writeDb } from '../../database/db';
import httpResponse from '../../utils/http-response';
import type { PartialStudent } from '../../types/partial-student';

export default async function createStudent(req: Request, res: Response) {
	try {
		const { students } = await readDb();
		// 1 - input
		const dadosBody = req.body as PartialStudent;

		// 2 - processamento
		if (
			!dadosBody ||
			!dadosBody.name ||
			!dadosBody.email ||
			!dadosBody.birthDate
		)
			return httpResponse(res, 400);

		// O email é único
		if (students.some((student) => student.email === dadosBody.email))
			return httpResponse(res, 400);

		// dd/MM/yyyy
		const [dia, mes, ano] = dadosBody.birthDate.split('/');
		const diaInvalido =
			!dia || dia?.length !== 2 || Number(dia) > 31 || Number(dia) < 1;
		const mesInvalido =
			!mes || mes?.length !== 2 || Number(mes) > 12 || Number(mes) < 1;
		const anoInvalido =
			!ano ||
			ano?.length !== 4 ||
			Number(ano) < 1900 ||
			Number(ano) > new Date().getFullYear();

		const idDateInvalid = diaInvalido || mesInvalido || anoInvalido;
		const isNameInvalid =
			typeof dadosBody.name !== 'string' || dadosBody.name.trim() === '';
		const isEmailInvalid =
			typeof dadosBody.email !== 'string' || !dadosBody.email.includes('@');

		// Garantir que os dados estão no formato e tipos adequados
		if (isNameInvalid || isEmailInvalid || idDateInvalid)
			return httpResponse(res, 400);

		const newStudent = {
			id: new Date().getTime(),
			name: dadosBody.name.trim(),
			email: dadosBody.email.trim(),
			birthDate: dadosBody.birthDate,
		};

		const newStudentsList = [...students, newStudent];
		await writeDb({ students: newStudentsList });

		// 3 - output - Para toda request deve existir uma response
		return httpResponse(res, 201, newStudent);
	} catch (error) {
		console.error(error);
		return httpResponse(res, 500);
	}
}
