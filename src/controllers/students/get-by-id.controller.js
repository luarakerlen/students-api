import { readDb } from '../../database/db.js';
import httpResponse from '../../utils/http-response.js';

// Controller: receber a solicitação e respondê-la de acordo.
export default async function getStudentById(req, res) {
	try {
		const { students } = await readDb();
		const { id } = req.params;

		const studentFound = students.find((student) => student.id == id);

		if (!studentFound) return httpResponse(res, 404);

		return httpResponse(res, 200, studentFound);
	} catch (error) {
		console.error(error);
		return httpResponse(res, 500);
	}
}
