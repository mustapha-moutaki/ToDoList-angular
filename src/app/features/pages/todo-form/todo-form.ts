import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../../core/model/Task';

@Component({
  selector: 'app-todo-form',
  imports: [ReactiveFormsModule],
  templateUrl: './todo-form.html',
  styleUrl: './todo-form.css',
})
export class TodoForm {
  private readonly fb = inject(FormBuilder);

  readonly form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    description: [''],
    priority: this.fb.nonNullable.control<'low' | 'medium' | 'Highlight'>('low', {
      validators: [Validators.required],
    }),
    dueDate: [new Date(), Validators.required],
    status: this.fb.nonNullable.control<'pending' | 'done'>('pending', {
      validators: [Validators.required],
    }),
  });

  toTask(): Task {
    return this.form.getRawValue();
  }
}
