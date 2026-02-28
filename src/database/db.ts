import fs from 'fs/promises';
import path from 'path';
import type IStudent from '../types/student';

// Caminho do arquivo no sistema

// const __fileUrl = import.meta.url;
// const __filePath = fileURLToPath(__fileUrl);
// const __dirName = path.dirname(__filePath);
// const dbFilePath = path.join(__dirName, 'data.json');

interface IDataJson {
	students: IStudent[];
}

const dbFilePath = path.join(process.cwd(), 'src/database/data.json');

// Ler arquivo
export async function readDb() {
	const data = await fs.readFile(dbFilePath, { encoding: 'utf8' });

	return JSON.parse(data) as IDataJson; // converte uma string para o formato original
}

// Escrever no arquivo
export async function writeDb(newData: IDataJson) {
	await fs.writeFile(dbFilePath, JSON.stringify(newData, null, 2), {
		encoding: 'utf8',
	});
}
