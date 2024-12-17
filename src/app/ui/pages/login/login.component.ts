import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/data/services/auth/auth.service';
//import { FormsModule } from '@angular/forms';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = 'facu';
  password = '1234';
  message = '';

  //private logueado:boolean=false;

  constructor(private authService:AuthService){ }

  ngOnInit(): void {
  }


  login() {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        //const token = response.token;
        //--proxy-config src/proxy.conf.json
        
        console.log("la respuesta del loguin es: ",response);

        const user = { username: response.username, rol: response.rol };
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(user));
        
        this.authService.setCurrentUser({username:response.username, rol:response.rol})
        this.message = 'Login exitoso. Token guardado.';

        this.authService.setEstadoLogin(true);

      },
      (error) => {
        console.log(error)
        this.message = 'Error: ' + error.error;
      }
    );
  }


 
}
