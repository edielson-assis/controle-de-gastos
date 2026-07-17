import { api } from "./Api";
import type { PersonRequest, PersonResponse } from "../types/Person";

export async function findAllPersons(): Promise<PersonResponse[]> {

    const response = await api.get<PersonResponse[]>("/persons");

    return response.data;
}

export async function createPerson(person: PersonRequest): Promise<PersonResponse> {

    const response = await api.post<PersonResponse>("/persons", person);

    return response.data;
}

export async function deletePerson(id: number): Promise<void> {

    await api.delete(`/persons/${id}`);
}