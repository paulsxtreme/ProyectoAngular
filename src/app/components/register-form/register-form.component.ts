import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
// import { Api } from '../../services/api';
import { Product } from '../../models/product.model';
import { Api } from '../../service/api';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  @Input() editMode: boolean = false;
  form!: FormGroup;
  logoPreview: string | null = null;
  successMessage: string = '';
  errorMessage: string = '';
  editingId: string | null = null;
  loading: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private api: Api) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [{ value: '', disabled: this.editMode }, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      logo: [null, [Validators.required, this.imageFileValidator]],
      releaseDate: ['', [Validators.required, this.releaseDateValidator]],
      reviewDate: [{ value: '', disabled: true }, [Validators.required]]
    }, { validators: this.reviewDateValidator });

    this.form.get('releaseDate')?.valueChanges.subscribe(value => {
      const reviewDateCtrl = this.form.get('reviewDate');
      if (value) {
        reviewDateCtrl?.enable();
      } else {
        reviewDateCtrl?.disable();
        reviewDateCtrl?.setValue('');
      }
    });

    if (this.editMode) {
      this.route.queryParams.subscribe(params => {
        this.editingId = params['id'];
        if (this.editingId) {
          this.api.getById(this.editingId).subscribe(prod => {
            this.form.patchValue({
              id: prod.id,
              name: prod.nombre,
              description: prod.description,
              releaseDate: prod.fechaLib ? String(prod.fechaLib).substring(0, 10) : '',
              reviewDate: prod.fechaRev ? String(prod.fechaRev).substring(0, 10) : ''
            });
            this.logoPreview = prod.logo;
            this.form.get('id')?.disable();
          });
        }
      });
    }
  }

  imageFileValidator(control: AbstractControl): ValidationErrors | null {
    const file = control.value;
    if (!file) return { required: true };
    if (file && file.type && !file.type.startsWith('image/')) {
      return { invalidFileType: true };
    }
    return null;
  }

  releaseDateValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    const today = new Date();
    today.setHours(0,0,0,0);
    const valueDate = new Date(control.value);
    if (valueDate < today) {
      return { invalidDate: true };
    }
    return null;
  }

  reviewDateValidator(group: AbstractControl): ValidationErrors | null {
    const release = group.get('releaseDate')?.value;
    const review = group.get('reviewDate')?.value;
    if (release && review) {
      const releaseDate = new Date(release);
      const reviewDate = new Date(review);
      const expected = new Date(releaseDate);
      expected.setFullYear(expected.getFullYear() + 1);
      if (
        reviewDate.getFullYear() !== expected.getFullYear() ||
        reviewDate.getMonth() !== expected.getMonth() ||
        reviewDate.getDate() !== expected.getDate()
      ) {
        group.get('reviewDate')?.setErrors({ invalidReviewDate: true });
        return { invalidReviewDate: true };
      }
    }
    return null;
  }

  isInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onLogoChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.form.get('logo')?.setValue(file);
      this.form.get('logo')?.markAsTouched();
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.logoPreview = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      this.form.get('logo')?.setValue(null);
      this.logoPreview = null;
    }
  }

  async onSubmit() {
    this.successMessage = '';
    this.errorMessage = '';
    if (this.form.valid) {
      this.loading = true;
      const formValue = this.form.getRawValue();
      let logoBase64: string = this.logoPreview || '';
      if (formValue.logo && formValue.logo instanceof File) {
        logoBase64 = await this.fileToBase64(formValue.logo);
      }
      const product: Product = {
        id: formValue.id,
        nombre: formValue.name,
        description: formValue.description,
        logo: logoBase64,
        fechaLib: formValue.releaseDate,
        fechaRev: formValue.reviewDate
      };
      if (this.editMode && this.editingId) {
        this.api.update(product).subscribe(() => {
          this.successMessage = '¡Producto editado de manera exitosa!';
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 1500);
        }, err => {
          this.errorMessage = 'Error al editar el producto.';
        });
      } else {
        this.api.create(product).subscribe(() => {
          this.successMessage = '¡Producto agregado de manera exitosa!';
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 1500);
        }, err => {
          this.errorMessage = 'Error al agregar el producto.';
        });
      }
      this.loading = false;
    } else {
      this.form.markAllAsTouched();
      this.errorMessage = 'Por favor, corrige los errores antes de continuar.';
    }
  }

  fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }

  onReset() {
    this.form.reset();
    this.logoPreview = null;
    this.successMessage = '';
    this.errorMessage = '';
  }
}

