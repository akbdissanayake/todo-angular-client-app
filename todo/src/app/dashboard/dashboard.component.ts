import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../task';
import { MatDialog } from '@angular/material';
import {
  trigger,
  style,
  transition,
  animate,
  keyframes,
  query,
  stagger
} from '@angular/animations';
import { CreateTaskComponent } from '../create-task/create-task.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('swapTrigger', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),

        query(
          ':enter',
          stagger(
            '300ms',
            animate(
              '0.6s ease-in',
              keyframes([
                style({ opacity: 0, transform: 'translateX(100%)', offset: 0 }),
                style({
                  opacity: 0.5,
                  transform: 'translateY(50px)',
                  offset: 0.3
                }),
                style({ opacity: 1, transform: 'translateX(0px)', offset: 1 })
              ])
            )
          ),
          { optional: true }
        ),

        query(
          ':leave',
          stagger(
            '300ms',
            animate(
              '0.6s ease-in-out',
              keyframes([
                style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
                style({
                  opacity: 0.5,
                  transform: 'translateY(50px)',
                  offset: 0.3
                }),
                style({ opacity: 0, transform: 'translateX(100%)', offset: 1 })
              ])
            )
          ),
          { optional: true }
        )
      ])
    ])
  ]
})
export class DashboardComponent implements OnInit {
  todayTasks: Task[] = [];
  upcomingTasks: Task[] = [];
  updatedTask: Task;
  currentDate: Date = new Date();
  errorMessage: string;
  constructor(private taskService: TaskService, public dialog: MatDialog) {}

  ngOnInit() {
    this.getTodayTasks();
    this.getUpcomingTasks();
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      width: '600px',
      data: {
        taskName: '',
        description: '',
        createdBy: 'Akalanka Dissanayake',
        createdDate: new Date(),
        scheduleDate: new Date(),
        status: false,
        title: 'New'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getTodayTasks();
      this.getUpcomingTasks();
    });
  }

  getTodayTasks() {
    this.taskService
      .getTodayTasks()
      .subscribe(
        todayTasks => (this.todayTasks = todayTasks),
        error => (this.errorMessage = <any>error)
      );
  }

  getUpcomingTasks() {
    this.taskService
      .getUpcomingTasks()
      .subscribe(
        upcomingTasks => (this.upcomingTasks = upcomingTasks),
        error => (this.errorMessage = <any>error)
      );
  }

  editStatus(item, isUpcommingTask, index) {
    let taskList = [];
    const newItem = JSON.parse(JSON.stringify(item));
    newItem.status = !newItem.status;
    this.taskService.editTask(newItem).subscribe(data => {
      taskList = isUpcommingTask === 1 ? this.upcomingTasks : this.todayTasks;
      if (index > -1) {
        taskList.splice(index, 1);
        setTimeout(() => {
          taskList.push(data);
          this.performOderbyStatusSort(isUpcommingTask);
        }, 100);
      }
    });
  }

  performOderbyStatusSort(isUpcommingTask) {
    if (isUpcommingTask === 1) {
      this.upcomingTasks.sort((a, b) => {
        if (a.status) {
          return 1;
        }
        if (b.status) {
          return -1;
        }
        return 0;
      });
    } else {
      this.todayTasks.sort((a, b) => {
        if (a.status) {
          return 1;
        }
        if (b.status) {
          return -1;
        }
        return 0;
      });
    }
  }
}
