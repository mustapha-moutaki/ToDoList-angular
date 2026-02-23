import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../../core/model/Task';
import { TaskService } from '../../../core/services/Task.service';

@Component({
  selector: 'app-todo-form',
  imports: [ReactiveFormsModule],
  templateUrl: './todo-form.html',
  styleUrl: './todo-form.css',
})
export class TodoForm {
  private readonly fb = inject(FormBuilder);
  private readonly taskService = inject(TaskService);
  private readonly initialTask: Task = {
    title: '',
    description: '',
    priority: 'low',
    dueDate: new Date(),
    status: 'pending',
  };

  readonly form = this.fb.nonNullable.group({
    title: [this.initialTask.title, Validators.required],
    description: [this.initialTask.description ?? ''],
    priority: this.fb.nonNullable.control<'low' | 'medium' | 'Highlight'>(this.initialTask.priority, {
      validators: [Validators.required],
    }),
    dueDate: this.fb.nonNullable.control(this.initialTask.dueDate, {
      validators: [Validators.required],
    }),
    status: this.fb.nonNullable.control<'pending' | 'done'>(this.initialTask.status, {
      validators: [Validators.required],
    }),
  });

  toTask(): Task {
    return this.form.getRawValue();
  }

  createTask(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.taskService.createTask(this.toTask()).subscribe({
      next: (createdTask) => {
        if (createdTask) {
          console.log('Task added');
        }
        this.form.reset({
          title: '',
          description: '',
          priority: 'low',
          dueDate: new Date(),
          status: 'pending',
        });
      },
      error: (err) => {
        console.log('Failed to create task', err);
      },
    });
  }
}
