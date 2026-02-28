import type { Request, Response } from 'express';
import { readDb } from '../../database/db';
import httpResponse from '../../utils/http-response';
import type IStudent from '../../types/student';
import type { PartialStudent } from '../../types/partial-student';

// Controller: receber a solicitação e respondê-la de acordo.
export default async function listAllStudents(req: Request, res: Response) {
	try {
		const { students } = await readDb();

		let studentsFiltered = [];

		const query = req.query as Partial<PartialStudent>;
		if (Object.keys(query).length === 0) {
			studentsFiltered = [...students];
		} else {
			studentsFiltered = students.filter((student) => {
				const searchResult = []; // [true, true, true]

				const queryProps: (keyof PartialStudent)[] = Object.keys(
					query,
				) as (keyof PartialStudent)[];

				// req.query.name, req.query.email, req.query.birthDate
				for (const prop of queryProps) {
					// validar se essa prop é uma prop válida no objeto students
					if (student[prop] && query[prop]) {
						const receivedProp = query[prop] as string;
						const currentProp = student[prop] as string;
						const isMatch = currentProp.includes(receivedProp);
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
