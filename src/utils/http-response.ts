import type { Response } from 'express';

enum MessageEnum {
	'Operação realizada com sucesso' = 200,
	'Registro cadastrado com sucesso' = 201,
	'Registro não encontrado' = 404,
	'Requisição inválida' = 400,
	'Ops! Ocorreu um erro no servidor.' = 500,
}

export default function httpResponse<T>(
	res: Response,
	statusCode: number,
	data?: T,
) {
	const ok = statusCode < 400;

	return res.status(statusCode).json({
		ok,
		message: MessageEnum[statusCode],
		data,
	});
}
