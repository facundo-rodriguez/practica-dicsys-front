import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth/auth.service';
import { UrlNavigateService } from './services/url-navigate.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  
  constructor(private authService:AuthService, private router: UrlNavigateService) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean{ //: Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
    
      const requiredRoles = route.data['roles']; // Obtener los roles permitidos desde la configuración de la ruta
      
      const currentUser = JSON.parse(localStorage.getItem('user'));   //this.authService.getCurrentUser(); // Obtener el usuario actual
  
      if (!currentUser || !requiredRoles.includes(currentUser.rol)) {
        this.router.navigateUrl('/login'); // Redirigir si no tiene permisos
        return false;
      }
  
      return true; // Permitir acceso si el rol es válido
  }
  
}
