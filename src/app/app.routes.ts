import { Routes } from '@angular/router';
import { TodoForm } from './features/pages/todo-form/todo-form';

export const routes: Routes = [
    {
        path: 'tasks',
        component: TodoForm
    }
];
