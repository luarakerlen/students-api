import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Caminho do arquivo no sistema

// const __fileUrl = import.meta.url;
// const __filePath = fileURLToPath(__fileUrl);
// const __dirName = path.dirname(__filePath);
// const dbFilePath = path.join(__dirName, 'data.json');

const dbFilePath = path.join(
	path.dirname(fileURLToPath(import.meta.url)),
	'data.json',
);

// Ler arquivo
export async function readDb() {
	const data = await fs.readFile(dbFilePath, { encoding: 'utf8' });

	return JSON.parse(data); // converte uma string para o formato original
}

// Escrever no arquivo
export async function writeDb(newData) {
	await fs.writeFile(dbFilePath, JSON.stringify(newData, null, 2), {
		encoding: 'utf8',
	});
}
