import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../api/api.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css'
})
export class EditarComponent implements OnInit {
  product: Product = {
    id: '',
    nombre: '',
    description: '',
    logo: '',
    fechaLib: new Date(),
    fechaRev: new Date()
  };

  showErrors = false;
  validacionFechaLiberacion = true;
  validacionFechaRevision = true;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.apiService.getById(id).subscribe({
        next: (producto) => {
          this.product = producto;
        },
        error: () => {
          alert('Producto no encontrado');
          this.router.navigate(['/']);
        }
      });
    }
  }

  validarFormulario() {
    this.showErrors = true;

    const validarId = this.product.id.length >= 3 && this.product.id.length <= 10;
    const validarNombre = this.product.nombre.length >= 5 && this.product.nombre.length <= 100;
    const validarDescripcion = this.product.description.length >= 10 && this.product.description.length <= 200;

    const diaHoy = new Date();
    const validarFechaLib = new Date(this.product.fechaLib);
    const validarFechaRev = new Date(this.product.fechaRev);

    this.validacionFechaLiberacion = validarFechaLib >= new Date(diaHoy.getFullYear(), diaHoy.getMonth(), diaHoy.getDate());

    this.validacionFechaRevision =
      validarFechaRev.getFullYear() === validarFechaLib.getFullYear() + 1 &&
      validarFechaRev.getMonth() === validarFechaLib.getMonth() &&
      validarFechaRev.getDate() === validarFechaLib.getDate();

    if (
      !validarId ||
      !validarNombre ||
      !validarDescripcion ||
      !this.product.logo ||
      !this.validacionFechaLiberacion ||
      !this.validacionFechaRevision
    ) {
      return;
    }

    // Actualizar producto
    this.apiService.update(this.product).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  volver() {
    this.router.navigate(['/']);
  }
}
