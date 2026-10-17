import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LigneService } from '../../services/ligne-service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-ligne-component',
  styleUrl: './ligne-component.css',
  templateUrl: './ligne-component.html',
})
export class LigneComponent {
  private fb = inject(FormBuilder);
  service = inject(LigneService);

  showForm = signal(false);
  error = signal('');

  form = this.fb.nonNullable.group({
    depart: ['', [Validators.required, Validators.minLength(2)]],
    destination: ['', [Validators.required, Validators.minLength(2)]],
  });

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { depart, destination } = this.form.getRawValue();
    const d = depart.trim();
    const a = destination.trim();

    if (d.toLowerCase() === a.toLowerCase()) {
      this.error.set('Le départ et la destination doivent être différents.');
      return;
    }
    if (this.service.exists(d, a)) {
      this.error.set('Cette ligne existe déjà.');
      return;
    }

    this.service.add(d, a);
    this.form.reset();
    this.error.set('');
    this.showForm.set(false);
  }
}
