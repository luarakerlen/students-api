import type { Request, Response } from 'express';
import { readDb, writeDb } from '../../database/db';
import httpResponse from '../../utils/http-response';

export default async function deleteStudent(req: Request, res: Response) {
	try {
		const { students } = await readDb();
		const { id } = req.params;

		const studentsList = [...students];
		const studentIndex = studentsList.findIndex(
			(student) => student.id === Number(id),
		); // 10 == '10'

		if (studentIndex === -1) return httpResponse(res, 404);

		const [studentDeleted] = studentsList.splice(studentIndex, 1);

		await writeDb({ students: studentsList });

		return httpResponse(res, 200, studentDeleted);
	} catch (error) {
		console.error(error);
		return httpResponse(res, 500);
	}
}
