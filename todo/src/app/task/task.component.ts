import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../task';
import { MatDialog } from '@angular/material/dialog';
import {trigger, style, transition, animate, keyframes, query, stagger} from '@angular/animations';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { DeleteTaskComponent } from '../delete-task/delete-task.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  animations: [
    trigger('listStagger', [
      transition('* => *', [
        query(':enter', [
          style({opacity : 0, transform: 'translateY(-15px)'}), stagger('50ms', animate('800ms ease-out',
          style({opacity: 1, transform: 'translateY(0px)'})))
        ], {optional: true}),

        query(':leave', animate('50ms',
        style({opacity: 0})), {optional: true})
      ])
    ])
  ]
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  errorMessage: string;
  p = 1;

  constructor(
    private taskService: TaskService,
    public dialog: MatDialog) {}

  ngOnInit() {
  this.getTasks();
  }

  getTasks(){
    this.taskService.getTasks().subscribe(data => {
      this.tasks = data;
    },
    error => this.errorMessage = <any>error
    );
  }

  openDialog(item){
    if (item == null){
      const dialogRef = this.dialog.open(CreateTaskComponent, {
        width: '600px',
        data : {
          taskName: '',
          description: '',
          createdBy: 'Akalanka Dissanayake',
          createdDate: new Date(),
          scheduleDate: new Date(),
          status: false,
          title : 'New'
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        this.refreshTaskList();
      });
    }else{
      const dialogRef = this.dialog.open(CreateTaskComponent, {
        width : '600px',
        data : {
          taskId : item.taskId,
          taskName : item.taskName,
          description : item.description,
          createdBy : item.createdBy,
          createdDate : item.createdDate,
          scheduleDate : item.scheduleDate,
          status : item.status,
          title : 'Edit',
          isEdit : true
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        this.refreshTaskList();
      });
    }
  }

  openDeleteDialog(item){
    const dialogRef = this.dialog.open(DeleteTaskComponent, {
      width : '400px',
      data : item
    });

    dialogRef.afterClosed().subscribe(result => {
      this.refreshTaskList();
    });
  }

  refreshTaskList(){
    this.getTasks();
  }
}
