import type IStudent from "./student";

export type PartialStudent = Omit<IStudent, 'id'>;