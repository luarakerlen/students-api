import { Router } from 'express';
import {
	listAllStudents,
	getStudentById,
	createStudent,
	updateStudent,
	deleteStudent,
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
studentsRoutes.post('/students', createStudent);

// Atualizar aluno
studentsRoutes.put('/students/:id', updateStudent);

// Deletar aluno
studentsRoutes.delete('/students/:id', deleteStudent);

export default studentsRoutes;
