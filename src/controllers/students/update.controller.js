import { readDb, writeDb } from '../../database/db.js';
import httpResponse from '../../utils/http-response.js';

export default async function updateStudent(req, res) {
	try {
		const { students } = await readDb();
		const { id } = req.params;
		const { name, email, birthDate } = req.body;

		const studentsList = [...students];
		const studentIndex = studentsList.findIndex((student) => student.id == id); // 10 == '10'

		if (studentIndex === -1) return httpResponse(res, 404);

		const studentFound = studentsList[studentIndex];
		const studentUpdated = {
			...studentFound,
			name: name || studentFound.name,
			email: email || studentFound.email,
			birthDate: birthDate || studentFound.birthDate,
		};

		studentsList.splice(studentIndex, 1, studentUpdated);

		await writeDb(studentsList);

		return httpResponse(res, 200, studentUpdated);
	} catch (error) {
		console.error(error);
		return httpResponse(res, 500);
	}
}
