export interface User {
    id: string;
    username: string;
    age: number;
    hobbies: string[];
}

export enum Methods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export const BASE_API = '/api/users';