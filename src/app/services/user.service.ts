import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../Model/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private apiUrl = 'http://localhost:3000/user';
  constructor() { }
  
http = inject(HttpClient);
  
  
  getUsers(user: UserModel): Observable<UserModel[]> 
  {
    //return [localStorage.getItem('')]
    return this.http.get<UserModel[]>(this.apiUrl);
  }

  addUser(user: UserModel): Observable<UserModel> 
  {
    return this.http.post<UserModel>(this.apiUrl, user);
  }

  updateUser(user: UserModel): Observable<UserModel> 
  {
    return this.http.put<UserModel>(`${this.apiUrl}/${user.id}`, user);
  }

  deleteUser(id: number): Observable<void> 
  {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}