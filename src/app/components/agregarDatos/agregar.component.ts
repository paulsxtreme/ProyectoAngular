import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../api/api.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-agregar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './agregar.component.html',
  styleUrl: './agregar.component.css'
})
export class AgregarComponent implements OnInit {
  product: Product = {
    id: '',
    nombre: '',
    description: '',
    logo: '',
    fechaLib: new Date(),
    fechaRev: new Date()
  };

  showErrors = false;
  idExiste = false;
  validarFechaLiberacion = true;
  validarFechaRevision = true;

  listaIdsExistentes: string[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    // consulta los ids si existen
    this.apiService.getAll().subscribe((productos: Product[]) => {
      this.listaIdsExistentes = productos.map(p => p.id);
    });
  }

  registrarDatos() {
    this.showErrors = true;

    const crearId = this.product.id.length >= 3 && this.product.id.length <= 10;
    const crearNombre = this.product.nombre.length >= 5 && this.product.nombre.length <= 100;
    const crearDescripcion = this.product.description.length >= 10 && this.product.description.length <= 200;

    const hoy = new Date();
    const fechaLib = new Date(this.product.fechaLib);
    const fechaRev = new Date(this.product.fechaRev);

    this.validarFechaLiberacion = fechaLib >= new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());

    this.validarFechaRevision =
      fechaRev.getFullYear() === fechaLib.getFullYear() + 1 &&
      fechaRev.getMonth() === fechaLib.getMonth() &&
      fechaRev.getDate() === fechaLib.getDate();

    this.idExiste = this.listaIdsExistentes.includes(this.product.id);

    if (
      !crearId ||
      this.idExiste ||
      !crearNombre ||
      !crearDescripcion ||
      !this.product.logo ||
      !this.validarFechaLiberacion ||
      !this.validarFechaRevision
    ) {
      return;
    }

    // Si pasa validación, guardar producto
    this.apiService.create(this.product).subscribe(() => {
      this.router.navigate(['/']);
    });       
  }

  //para regresar
  volver() {
    this.router.navigate(['/']); 
  }
}
