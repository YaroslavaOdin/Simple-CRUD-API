import http from 'http';
import { Methods, BASE_API } from './utils/constants';
import { getUsers, getUserById, addNewUser } from './utils/users.helper'

export const createServer = (): http.Server => {
    return http.createServer((request: http.IncomingMessage, response: http.ServerResponse) => {
        try {
            switch (request.method) {
                case Methods.GET:
                    if(request?.url === BASE_API) {
                        getUsers(response);
                    } else if (request?.url?.startsWith("/api/users")) {
                        getUserById(response, request?.url.split('/')[3]);
                    } else {
                        response.writeHead(404, { 'Content-type': 'application/json' });
                        response.end(JSON.stringify({ message: 'Not Found.' }));
                    }
                    break;
                case Methods.POST:
                    if(request?.url === BASE_API) {
                        addNewUser(request, response);
                    } else {
                        response.writeHead(404, { 'Content-type': 'application/json' });
                        response.end(JSON.stringify({ message: 'Not Found.' }));
                    }
                    break;
                case Methods.PUT:
                    break;
                case Methods.DELETE:
                    break;
                default:
                    response.statusCode = 404;
                    response.end(JSON.stringify({ message: 'Not Found.' }));
                break;
            }
        } catch (err) {
            response.statusCode = 500;
            response.end({ message: 'Server error.' });
        }
    });
}