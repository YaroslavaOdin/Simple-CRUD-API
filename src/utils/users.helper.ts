import { User } from './constants';
import crypto from 'crypto';
import http from 'http';

const uuidReg = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

let users: User[] = [];

export const dataParser: (request: http.IncomingMessage) => Promise<unknown> = async (request: http.IncomingMessage) => {
    return new Promise((resolve, reject) => {
    try {
        let data: string = '';

        request.on('data', (chunk: unknown) => {
            data += chunk;
        });

        request.on('end', () => {
            resolve(data);
        });
        } catch (err) {
            reject(err);
        }
    });
};

export const getUsers = async (response: http.ServerResponse): Promise<void> => {  
    response.writeHead(200, { 'Content-type': 'application/json' });
    response.end(JSON.stringify(users));
}

export const getUserById = (response: http.ServerResponse, id: string) => {
    if(!uuidReg.test(id)) {
        response.writeHead(400, { 'Content-type': 'application/json' });
        response.end(JSON.stringify({ message: 'Invalid userId.' }));
        return;
    }

    const user = users.find((user) => user.id === id);

    if (user) {
        response.writeHead(200, { 'Content-type': 'application/json' });
        response.end((JSON.stringify(user)));
        return;
    }

    response.writeHead(404, { 'Content-type': 'application/json' });
    response.end(JSON.stringify({ message: 'There is no user with this id.' }));
};

export const addNewUser = async (request: http.IncomingMessage, response: http.ServerResponse): Promise<void> => {
    const data = await dataParser(request) as string;
    if(JSON.parse(data)?.username && JSON.parse(data)?.age && JSON.parse(data)?.hobbies) {
        const user: User = {
            id: crypto.randomUUID(),
            username: JSON.parse(data).username,
            age: JSON.parse(data).age,
            hobbies: JSON.parse(data).hobbies,
        }; 
        users.push(user);
        response.writeHead(201, { 'Content-type': 'application/json' });
        response.end((JSON.stringify(user)));
    } else {
        response.writeHead(400, { 'Content-type': 'application/json' });
        response.end(JSON.stringify({ message: 'There are not enough required data to create a user.' }));
    }
}