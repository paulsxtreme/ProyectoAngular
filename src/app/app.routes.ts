import { Routes } from '@angular/router';
import { AgregarComponent } from './components/agregarDatos/agregar.component';
import { ProductTableComponent } from './components/product-table/product-table.component';
import { Head } from 'rxjs';
import { ProductComponent } from './pages/product/product.component';
import { EditarComponent } from './components/editarDatos/editar.component';


export const routes: Routes = [
    {
        path: '', component: ProductTableComponent
    },
    {
        path: 'agregar' , component: AgregarComponent
    },
    {
        path: 'editar/:id' , component: EditarComponent
    }
];
