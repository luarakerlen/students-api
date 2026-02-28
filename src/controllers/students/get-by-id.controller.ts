import type { Request, Response } from 'express';
import { readDb } from '../../database/db';
import httpResponse from '../../utils/http-response';

// Controller: receber a solicitação e respondê-la de acordo.
export default async function getStudentById(req: Request, res: Response) {
	try {
		const { students } = await readDb();
		const { id } = req.params;

		const studentFound = students.find((student) => student.id === Number(id));

		if (!studentFound) return httpResponse(res, 404);

		return httpResponse(res, 200, studentFound);
	} catch (error) {
		console.error(error);
		return httpResponse(res, 500);
	}
}
