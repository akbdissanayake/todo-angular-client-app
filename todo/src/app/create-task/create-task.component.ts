import { Component, OnInit, Inject  } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {MatDialogRef} from '@angular/material';
import { TaskService } from '../services/task.service';
import { Task } from '../task';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {
  task: Task;
  minDate: Date = new Date();
  constructor(
    public thisDialogRef: MatDialogRef<CreateTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: object,
    private taskService: TaskService
  ) {}

  ngOnInit() {
  }

  onCloseConfirm(){
    const copy = JSON.parse(JSON.stringify(this.data));
    if (copy.isEdit === true){
      this.taskService.editTask(copy).subscribe(data => this.task = data);
      this.thisDialogRef.close('Confirm');
    }else{
      this.taskService.newTask(copy).subscribe(data => this.task = data);
    }
    this.thisDialogRef.close('Confirm');
  }

  onCloseCancel(){
    this.thisDialogRef.close('Cancel');
  }
}
