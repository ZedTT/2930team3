import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { firebase } from 'firebaseui-angular';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

  constructor(private http: HttpClient) { }

  postUserData(uid, userName, email): Observable<any> {
    // test sending data via post request body to the server
    return this.http.post<any>('/api/users',
    {
      'uid': uid,
      'userName': userName,
      'email': email
    });
  }

  getUserData(user): Observable<any> {
    // getting all the user's database using current user's uid
    return this.http.get<any>(`/api/users?uid=${user.uid}`);
  }

}
