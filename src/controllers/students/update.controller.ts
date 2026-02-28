import type { Request, Response } from 'express';
import { readDb, writeDb } from '../../database/db';
import httpResponse from '../../utils/http-response';
import type { PartialStudent } from '../../types/partial-student';
import type IStudent from '../../types/student';

export default async function updateStudent(req: Request, res: Response) {
	try {
		const { students } = await readDb();
		const { id } = req.params;
		const { name, email, birthDate } = req.body as PartialStudent;

		const studentsList = [...students];
		const studentIndex = studentsList.findIndex(
			(student) => student.id === Number(id),
		); // 10 == '10'

		if (studentIndex === -1) return httpResponse(res, 404);

		const studentFound = studentsList[studentIndex] as IStudent;
		const studentUpdated = {
			...studentFound,
			name: name || studentFound?.name,
			email: email || studentFound?.email,
			birthDate: birthDate || studentFound?.birthDate,
		};

		studentsList.splice(studentIndex, 1, studentUpdated);

		await writeDb({ students: studentsList });

		return httpResponse(res, 200, studentUpdated);
	} catch (error) {
		console.error(error);
		return httpResponse(res, 500);
	}
}
