import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationRequest } from '../models/authentication-request';
import { AuthenticationResponse } from '../models/authentication-response';
import { RegisterRequest } from '../models/register-request';

//import * as jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
// on met tt les meth dans le service 
export class AuthentficationService {
  /////
  private currentUserSource = new ReplaySubject<AuthenticationRequest | null>(1);
  currentUser$ = this.currentUserSource.asObservable();
  //////////

  apiUrl: string = environment.baseUrl + "/auth";
  // injection de router dans: (navigation entre les pages)
  constructor(private http: HttpClient, private router: Router) { }


  authenticate(authenticationRequest: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(this.apiUrl + '/authenticate', authenticationRequest);
  }

  isUserAuthenticated(): boolean {
    if (localStorage.getItem("accesstoken")) {
      return true;
    }
    this.router.navigate(["/authentification"])
    return false;
  }

  // setUserToken : utilisée pour stocker le token d'authentification après une connexion réussie //  JSON.stringify(authenticationResponse)
  setUserToken(authenticationResponse: AuthenticationResponse) {
    //localStorage.setItem("accesstoken", authenticationResponse.accessToken)
    localStorage.setItem("accesstoken", JSON.stringify(authenticationResponse))
  }


  register(registerRequest: RegisterRequest): Observable<AuthenticatorResponse> {
    return this.http.post<AuthenticatorResponse>(this.apiUrl + '/register', registerRequest);
  }

  loggin(login: any) {
    return this.http.post(`${environment.baseUrl}/auth/authenticate`, login)
  }

  /*getUserRole(): string | null {
    const token = localStorage.getItem('accesstoken'); // Supposons que le token est stocké dans le local storage
    if (token) {
      const payload = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payload));

      // Supposons que "authorities" est un tableau de rôles dans le payload
      const authorities = decodedPayload.authorities;
      if (authorities && authorities.length > 0) {
        const userRole = authorities[1]; // Vous pourriez adapter ceci selon votre structure
        return userRole;
      }
    }
    return null;


  }*/

}

