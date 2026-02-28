import { Router } from 'express';
import {
	listAllStudents,
	getStudentById,
} from '../controllers/students/index.js';

const studentsRoutes = Router();

// CRUD
// Cadastrar
// Listar ou obter
// Atualizar
// Excluir

// Listar todos os registros - List All
studentsRoutes.get('/students', listAllStudents);

// Buscar um aluno por ID - Get by ID
studentsRoutes.get('/students/:id', getStudentById);

// Criar um novo aluno
studentsRoutes.post('/students', (req, res) => {
	// 1 - input
	const dadosBody = req.body;

	// 2 - processamento
	if (
		!dadosBody ||
		!dadosBody.name ||
		!dadosBody.email ||
		!dadosBody.birthDate
	) {
		let message = 'Dados inválidos!';
		if (!dadosBody.name) {
			message = 'O campo name é obrigatório!';
		} else if (!dadosBody.email) {
			message = 'O campo email é obrigatório!';
		} else if (!dadosBody.birthDate) {
			message = 'O campo birthDate é obrigatório!';
		}

		return res.status(400).json({
			message,
		});
	}

	// Garantir que os dados estão no formato e tipos adequados
	if (typeof dadosBody.name !== 'string' || dadosBody.name.trim() === '') {
		return res.status(400).json({
			message: 'O campo name deve ser uma string não vazia.',
		});
	}

	if (typeof dadosBody.email !== 'string' || !dadosBody.email.includes('@')) {
		return res.status(400).json({
			message: 'O campo email deve ser uma string e um email válido.',
		});
	}

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

	if (diaInvalido || mesInvalido || anoInvalido) {
		return res.status(400).json({
			message:
				'O campo birthDate deve conter uma data de nascimento válida no formato dd/MM/yyyy.',
		});
	}

	// const proximoId = alunos.length ? alunos[alunos.length - 1].id + 1 : 1;

	const novoAluno = {
		id: proximoId,
		name: dadosBody.name.trim(),
		email: dadosBody.email.trim(),
		birthDate: dadosBody.birthDate,
	};

	// alunos.push(novoAluno);

	// 3 - output - Para toda request deve existir uma response
	// return res.status(201).json(alunos);
});

export default studentsRoutes;
