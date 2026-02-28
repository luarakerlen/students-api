import express from 'express';
import studentsRoutes from './routes/students.routes';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(express.json()); // body parser
app.use(cors()); // habilita todos os verbos para todas as origens

app.use(studentsRoutes);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

// growdev.com.br (cliente/servidor) > HTTP (CORS) > growlabs.com.br (servidor)
// CORS define quais domínios estão autorizados a acessar a api no servidor.
// A não ser que o frontend esteja junto com o backend, precisa definir o CORS.
// Pode determinar o que pode acessar (quais recursos, quais rotas, quais métodos).
