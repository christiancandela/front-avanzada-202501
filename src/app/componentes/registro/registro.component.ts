import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  registroForm!: FormGroup;
  result = '';

  constructor(private formBuilder: FormBuilder) {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.registroForm = this.formBuilder.group({
      fullName: ['', []],
      email: ['', []],
      dateBirth: ['', []],
      password: ['', []]
    });
  }

  onSubmit(): void {
    console.log('Datos del formulario:', this.registroForm.value);
    this.result = 'Registro exitoso';
  }
}
