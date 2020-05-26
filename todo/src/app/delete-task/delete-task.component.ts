import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {MatDialogRef} from '@angular/material';
import { TaskService } from '../services/task.service';
import { Task } from '../task';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.scss']
})
export class DeleteTaskComponent implements OnInit {
  newTask: Task;
  constructor(
    public thisDialogRef: MatDialogRef<DeleteTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: object,
    private taskService: TaskService
  ) { }

  ngOnInit() {
  }

  onCloseConfirm(){
    const copy = JSON.parse(JSON.stringify(this.data));
    const taskId = copy.taskId;
    this.taskService.deleteTask(taskId).subscribe();
    this.thisDialogRef.close('Confirm');
  }

  onCloseCancel(){
    this.thisDialogRef.close('Cancel');
  }

}
