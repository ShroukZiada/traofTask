import { dirname } from 'node:path';
import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';

import {
  MatOptionModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ProgramService } from './services/program.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconAnchor } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-programm',
  standalone: true,
  templateUrl: './programm.component.html',
  styleUrl: './programm.component.scss',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterModule
  ],
  providers: [provideNativeDateAdapter()],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgrammComponent implements OnInit {
  getStages!: any;
  getClassRoom!: any;
  getCategries!: any;
  getAllPagesList:any;
  programsForm!: FormGroup
  isloading :boolean = false;
  dir:number = 1;
  searchValue: string = ''
  myDate = new Date();


  constructor(private _ProgramService: ProgramService) {}

  ngOnInit(): void {
    this.intialForm();
    this.getAllpages();
    this.getAllStages();
    this.GetProgramCategories();
  }

  intialForm(){
    this.programsForm = new FormGroup({
      page: new FormControl(1, [Validators.required]),
      pageSize: new FormControl(1, [Validators.required]),
      sort: new FormControl(0, [Validators.required]),
      dir: new FormControl(this.dir, [Validators.required]),
      statusId: new FormControl(0, [Validators.required]),
      search: new FormControl('', [Validators.required]),
      programCategoryId: new FormControl(0, [Validators.required]),
      educationalStageId: new FormControl(0, [Validators.required]),
      classroomId: new FormControl(0, [Validators.required]),
      programStatusId: new FormControl(0, [Validators.required]),
      university: new FormControl(0, [Validators.required]),
      fromDate: new FormControl(this.myDate, [Validators.required]),
      toDate: new FormControl(this.myDate, [Validators.required]),
    });
  }

  getAllStages() {
    this._ProgramService.getAllstages().subscribe((res) => {
      this.getStages = res?.result;
      console.log('stages', res);
    });
  }

  GetClassRoomByStageId(e: any) {
    console.log(e);
    let id = e.value;
    if (id > 0) {
      console.log(id);
      this._ProgramService.GetClassRoomByStageId(id).subscribe((res) => {
        this.getClassRoom = res.result;
        console.log('classes', res);
      });
    }
  }

  GetProgramCategories() {
    this._ProgramService.GetProgramCategories().subscribe((res) => {
      this.getCategries = res.result;
      console.log(this.getCategries);
    });
  }

  onSearch(){
    this.getAllpages();
  }

  getAllpages() {
    let Filters = this.programsForm.value; 
    let Search = this.searchValue; 

    this.isloading = true;
    this._ProgramService.GetAllPager(Filters , Search).subscribe((res) =>{
      this.getAllPagesList =res.result;
      this.isloading = false;

      console.log(res);
      console.log(this.isloading);
      console.log(this.getAllPagesList);
    })
  }



  sorting(number:number){
  
    if(this.dir == 1){
      this.dir = 2;
    }else{
      this.dir = 1
    }
    this.programsForm.patchValue({
      sort:number,
      dir:this.dir,
    }) 
    this.getAllpages()
    console.log(this.programsForm.value);
    
  }













  // getAllpage() {
  //   let prams ={
  //     pageSize :this.pageSize,
  //     pageNumber :this.pageNumber,
  //     sort :this.sort,
  //     dir:this.dir
  //   }
   
  //   this._ProgramService.GetAllPage(prams).subscribe((res) =>{
  //     this.getAllPagesList =res
  //     console.log(this.getAllPagesList);
      
  //   })
  // }
}
