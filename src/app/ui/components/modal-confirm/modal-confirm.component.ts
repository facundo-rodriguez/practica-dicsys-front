import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.css']
})
export class ModalConfirmComponent implements OnInit {

  
  @Input() title:string // Título del modal
  @Input() message:string // Mensaje del modal
  @Output() confirm = new EventEmitter<void>(); // Emite cuando se confirma
  @Output() cancel = new EventEmitter<void>(); // Emite cuando se cancela


  constructor() { }

  ngOnInit(): void {
  }

  onConfirm(): void {
    this.confirm.emit(); // Notifica que se confirmó
  }

  onCancel(): void {
    this.cancel.emit(); // Notifica que se canceló
  }
}
