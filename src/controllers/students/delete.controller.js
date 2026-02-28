import { readDb, writeDb } from '../../database/db.js';
import httpResponse from '../../utils/http-response.js';

export default async function deleteStudent(req, res) {
	try {
		const { students } = await readDb();
		const { id } = req.params;

		const studentsList = [...students];
		const studentIndex = studentsList.findIndex((student) => student.id == id); // 10 == '10'

		if (studentIndex === -1) return httpResponse(res, 404);

		const [studentDeleted] = studentsList.splice(studentIndex, 1);

		await writeDb(studentsList);

		return httpResponse(res, 200, studentDeleted);
	} catch (error) {
		console.error(error);
		return httpResponse(res, 500);
	}
}
