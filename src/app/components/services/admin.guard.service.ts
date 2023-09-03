/* import { Injectable } from '@angular/core';
import { AuthentficationService } from './authentfication.service';
import { CanActivate, Router } from '@angular/router';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {
  constructor(private auth: AuthentficationService, private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.auth.currentUser$.pipe(
      map((user) => {
        // Assurez-vous que vous avez un moyen de récupérer le rôle de l'utilisateur, par exemple, depuis un token JWT ou une propriété de l'objet utilisateur.
        // Je suppose que le rôle est stocké dans un champ "authority" de l'objet utilisateur.

        if (user && user.=== 'ADMIN') {
          return true; // L'utilisateur est un administrateur, autorisez l'accès.
        } else {
          this.router.navigate(['/']); // L'utilisateur n'est pas un administrateur, redirigez-le vers une autre page.
          return false;
        }
      })
    );
  }
} */