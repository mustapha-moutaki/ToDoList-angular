export interface Task {
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'Highlight';
  dueDate: Date;
  status: 'pending' | 'done';
}
