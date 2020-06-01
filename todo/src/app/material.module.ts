import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  imports: [MatButtonModule, MatToolbarModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatListModule, MatIconModule, MatCardModule, MatDialogModule, MatDatepickerModule, MatMomentDateModule, MatCheckboxModule, FormsModule, MatTooltipModule], 
  exports: [MatButtonModule, MatToolbarModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatListModule, MatIconModule, MatCardModule, MatDialogModule, MatDatepickerModule, MatMomentDateModule, MatCheckboxModule, FormsModule, MatTooltipModule],
})
export class MaterialModule { }
