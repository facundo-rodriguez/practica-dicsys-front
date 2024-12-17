
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class UtilService{

    public message:string;
    public alertVisible: boolean = false; // Controla la visibilidad del alert
    public alertType: string = 'success'; // Tipo de alerta (success, danger, etc.)
  

    // Método para mostrar el alert
    showAlert(message: string, type: string = 'success'): void {
        this.message = message;
        this.alertType = type;
        this.alertVisible = true;
    }

    dataAlert():[string, string, boolean] {

        return [this.message,  this.alertType, this.alertVisible];
    }
}