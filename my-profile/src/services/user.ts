import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { User } from "../app/common/types/user";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private readonly URL = 'http://localhost:3000'
    private client = inject(HttpClient)

    getAllUsers(): Observable<{ users: User[] }> {
        return this.client.get(this.URL + '/usuarios/list') as Observable<{ users: User[] }>
    }

    getUserByUUID(uuid: string): Observable<{ user: User }> {
        return this.client.get(this.URL + `/usuarios/${uuid}`) as Observable<{ user: User }>
    }

    editUser(user: User): Observable<{ updated: boolean }> {
        return this.client.put(this.URL + `/usuarios/edit/${user.id}`, user) as Observable<{ updated: boolean }>
    }

    createUser(user: User) {
        return this.client.post(this.URL + '/usuarios', user) as Observable<{ created: true }>
    }
}