import { readDb } from '../../database/db.js';
import httpResponse from '../../utils/http-response.js';

// Controller: receber a solicitação e respondê-la de acordo.
export default async function listAllStudents(req, res) {
	try {
		const { students } = await readDb();

		let studentsFiltered = [];

		if (Object.keys(req.query).length === 0) {
			studentsFiltered = [...students];
		} else {
			studentsFiltered = students.filter((student) => {
				const searchResult = []; // [true, true, true]

				// req.query.name, req.query.email, req.query.birthDate
				for (const prop in req.query) {
					// validar se essa prop é uma prop válida no objeto students
					if (student[prop] && req.query[prop]) {
						const receivedProp = req.query[prop];
						const isMatch = student[prop].includes(receivedProp);
						searchResult.push(isMatch);
					}
				}

				// se nenhuma prop for válida, mantém o registro na listagem
				if (!searchResult.length) return true;
				return searchResult.every((bool) => bool);
			});
		}

		return httpResponse(res, 200, studentsFiltered);
	} catch (error) {
		console.error(error);
		return httpResponse(res, 500);
	}
}
