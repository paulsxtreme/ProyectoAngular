import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, RegisterFormComponent],
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  constructor(private router: Router) {}
  goBack() {
    this.router.navigate(['../']);
  }
}

