import { Component, OnInit, input } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AddProgramService } from './services/addProgram.service';
import { CommonModule } from '@angular/common';
import { log } from 'console';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-programm',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-programm.component.html',
  styleUrl: './add-programm.component.scss',
})
export class AddProgrammComponent implements OnInit {
  FormSelection!: FormGroup;
  StageForm!: FormGroup;
  ActivityForm!: FormGroup;
  ClassRoomsList: any;
  InitiativesList!: any;
  currentYear: number = new Date().getFullYear();
  departmentId: number = 0;
  initiativeId: number = 0;
  purchaseOrderId: number = 0;
  paymentRequestId: number = 0;
  ActivityGroupList!: any;
  programNameList!: any;
  educationStageArray: any;
  programSupervisorsList!:any;
  onClassShow = true;
  onActivityShow=true;
  ToggleActivityGroupList = false;
  ToggleClassRoomsList = true;
  constructor(
    private fb: FormBuilder,
    private _AddProgramService: AddProgramService
  ) {
    // this.getSellectAll()
  }

  ngOnInit(): void {
    this.intialForm();
    this.GetAllClassRooms();
    this.GetInitiatives();
    this.getAllActivityGroups();
    // this.onemptied()
    this.getprogramSupervisors();
    this.CustomValidators();
    this.clearValidators();
  }

  intialForm() {
    this.FormSelection = this.fb.group({
      programId: [''],
      name: ['', Validators.required],
      genderId: [2],
      programCategoryId: ['', Validators.required],
      academicYearId: [113],
      educationMethodId: ['', Validators.required],
      educationFieldId: ['', Validators.required],
      capacity: ['', Validators.required],
      allowOnlineRegistration: ['', Validators.required],
      closeRegistrationAfterCompleting: [''],
      description: ['', [Validators.required, Validators.minLength(25)]],
      place: [''],
      quantity: [''],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      fromTime: ['', Validators.required],
      toTime: ['', Validators.required],
      initiativeId: ['', Validators.required],
      executivePlanDetailId: ['', Validators.required],
      requiredApproval: ['', Validators.required],
      maxReplyDate: [''],
      trainerName: [''],
      hoursCount: [''],
      pagesCount: [''],
      programHallId: [''],
      details: [''],
      publish: [''],
      isEducationStageMatch: [false],
      discussionDate: [''],
      programTrackId: ['',],
      programPurposeId: [''],
      createdDate: [''],
      createdBy: [''],
      modifiedDate: [''],
      modifiedBy: [''],
      educationStagePrograms: this.fb.array([], this.minArrayLength()),
      activityGroupPrograms: this.fb.array([],this.minArrayLength()),
      programSupervisors: this.fb.array([]),
    });
  }

  // get programCategoryId(){
  //   return this.FormSelection?.get('programCategoryId')?.value
  // }

  //...... ********************* method call in html as a property ********************* ......

  test() {
    // console.log(this.FormSelection?.get('programCategoryId')?.value);
    if(this.FormSelection?.get('programCategoryId')?.value == 1){
      this.ToggleActivityGroupList = true;
      this.ToggleClassRoomsList = false
    }else{
      this.ToggleActivityGroupList = false;
      this.ToggleClassRoomsList = true
    }
  }

  GetAllClassRooms() {
    this._AddProgramService.GetAllClassRooms().subscribe((res) => {
      this.ClassRoomsList = res;
      console.log(this.ClassRoomsList);
    });
  }

  GetInitiatives() {
    this._AddProgramService.GetInitiatives().subscribe((res) => {
      this.InitiativesList = res.result;
    });
  }

  getAllActivityGroups() {
    this._AddProgramService.GetAllActivityGroups().subscribe((res) => {
      this.ActivityGroupList = res;
      console.log(this.ActivityGroupList);
    });
  }

  getAllProgramName(event: any) {
    let initiativeId = event.target.value;
    let programGroupObj = {
      currentYear: this.currentYear,
      departmentId: this.departmentId,
      initiativeId: initiativeId,
      purchaseOrderId: this.purchaseOrderId,
      paymentRequestId: this.paymentRequestId,
    };
    // console.log(event.target.value);

    console.log(programGroupObj);
    this._AddProgramService
      .GetFilteredPrograms(programGroupObj)
      .subscribe((res) => {
        this.programNameList = res.result;
        // console.log(this.programNameList);
      });
  }

  GetFilteredPrograms() {}

  onSubmit() {
    if (this.FormSelection.valid) {
      console.log(this.FormSelection.value);
    }
  }

   //   get descriptionareaControl() {
   //     return this.FormSelection?.get('description')
  //  }



// ******************** START ActivityList **************************

  get activityGroupPrograms(): FormArray {
    return this.FormSelection.get('activityGroupPrograms') as FormArray;
  }

  FillactivityGroup(activityGroupId: number) {
    this.ActivityForm = this.fb.group({
      activityGroupProgramId: [0],
      programId: [0],
      activityGroupId: [activityGroupId],
    });
    console.log(this.activityGroupPrograms.value);
    this.activityGroupPrograms.push(this.ActivityForm);
    console.log(this.activityGroupPrograms.value);
  }

  getSelectActivityAll(event: any) {
    //
    let elements = document.getElementsByClassName('activity');
    this.activityGroupPrograms.clear();
    if (event.target.checked) {
      console.log(elements);
      Array.from(elements).forEach((item: any) => {
        item.checked = true;
        // console.log(item);
        this.FillactivityGroup(item.value);
      });
    } else {
      Array.from(elements).forEach((item: any) => {
        item.checked = false;
      });
    }
    console.log(this.activityGroupPrograms.value);
  }
  

  onCheckactivitybox(event: any) {
    this.educationStagePrograms.clear()
    let Id = event.target.value;
    console.log(Id);

    if (event.target.checked) {
      this.FillactivityGroup(Id);
    } else {
      Array.from(this.activityGroupPrograms.controls).forEach(
        (item, index) => {
          console.log(this.activityGroupPrograms.value);
          if (item.value.activityGroupId == Id) {
            this.activityGroupPrograms.removeAt(index);
            console.log(this.educationStagePrograms.value);
          }
        }
      );
    }
  }

  
  SelectedOneOrMoreActivityGroup(): boolean {
    return this.activityGroupPrograms.length > 0  // Returns true if one or more options are selected or if "Select All" is checke
  }
// ******************** END ActivityList **************************








// ********************START EducationSList **************************
  get educationStagePrograms(): FormArray {
    return this.FormSelection.get('educationStagePrograms') as FormArray;
  }

  FilleducationStages(educationalStageId: number, classRoomId: number) {
    this.StageForm = this.fb.group({
      educationStageProgramId: [0],
      programId: 0,
      educationalStageId: [educationalStageId],
      classRoomId: [classRoomId],
    });
    this.educationStagePrograms.push(this.StageForm);
    console.log(this.educationStagePrograms.value);
  }

  onCheckboxChange(event: any) {
    // this.educationStagePrograms.clear()
    let Id = event.target.value;
    console.log(Id);

    if (event.target.checked) {
      this.FilleducationStages(0, Id);
    } else {
      Array.from(this.educationStagePrograms.controls).forEach(
        (item, index) => {
          console.log(this.educationStagePrograms.value);
          if (item.value.classRoomId == Id) {
            this.educationStagePrograms.removeAt(index);
            console.log(this.educationStagePrograms.value);
          }
        }
      );
    }
  }

  getSellectAll(event: any) {
    let elements = document.getElementsByClassName('stage');
    this.educationStagePrograms.clear();
    if (event.target.checked) {
      console.log(elements);
      Array.from(elements).forEach((item: any) => {
        item.checked = true;
        // console.log(item);
        this.FilleducationStages(0, item.value);
      });
    } else {
      Array.from(elements).forEach((item: any) => {
        item.checked = false;
      });
    }
    console.log(this.educationStagePrograms.value);
  }
  SelectedOneOrMoreEducationStage(): boolean {
    return this.educationStagePrograms.length > 0  // Returns true if one or more options are selected or if "Select All" is checke
  }

// ********************END EducationSList **************************

 


  //
  // isOneOrMoreSelected(): boolean {
  //   return this.selectedOptions.length > 0; // Returns true if one or more options are selected
  // }

// ******************** END ActivityList **************************







// **********************START  programSupervisors  ************************

get programSupervisors(): FormArray{
  return this.FormSelection.get('programSupervisors') as FormArray;
}

FillprogramSupervisors(){
// programSupervisorId
//   programId
//   supervisorId
}

getprogramSupervisors(){
  this._AddProgramService.programSupervisors.subscribe((res)=>{
    this.programSupervisorsList = res.result;
    console.log(this.programSupervisorsList);
  })
}

// ******************** END programSupervisors **************************

OnSave(){
  var Test = this.findInvalidControls(this.FormSelection)
  console.log(Test);
  
  console.log(this.FormSelection.valid);
  console.log(this.FormSelection.value);
  
}

minArrayLength(min = 1) {
  var validator: any = (formArray: any) => {
    if (formArray instanceof FormArray) {
      var totalSelected = formArray.controls.length;    
    return totalSelected >= min ? null : { required: true };
    }
    throw new Error('formArray is not an instance of FormArray');
  };
  return validator;
}


findInvalidControls(form:FormGroup) {
  var invalid = [];
  var controls = form.controls;
  for (var name in controls) {
      if (controls[name].invalid) {
          invalid.push(name);
      }
  }
  return invalid;
}

CustomValidators() {
  
  this.FormSelection?.get('programCategoryId')?.valueChanges.subscribe( (val:number) =>{
  // ********************val == 4**********************

    console.log(val);
    if(val == 4){
      this.FormSelection.get('pagesCount')?.setValidators([Validators.required])
      this.FormSelection.get('discussionDate')?.setValidators([Validators.required])
    } 
     else{
      this.FormSelection.get('pagesCount')?.clearValidators();
      this.FormSelection.patchValue({
        pagesCount:''
      })

      this.FormSelection.get('discussionDate')?.clearValidators();
      this.FormSelection.patchValue({
        pagesCount:''
      })
    }
    this.FormSelection.get('pagesCount')?.updateValueAndValidity();
    this.FormSelection.get('discussionDate')?.updateValueAndValidity();

// ********************val == 5**********************
  if  (val == 5) {
      this.FormSelection.get('trainerName')?.setValidators([Validators.required])
      this.FormSelection.get('hoursCount')?.setValidators([Validators.required])
    }
     else{
     this.FormSelection.get('trainerName')?.clearValidators();
      this.FormSelection.patchValue({
        pagesCount:''
      })

      this.FormSelection.get('hoursCount')?.clearValidators();
      this.FormSelection.patchValue({
        pagesCount:''
      })
    }
      this.FormSelection.get('trainerName')?.updateValueAndValidity();
      this.FormSelection.get('hoursCount')?.updateValueAndValidity();

// ********************val == 1**********************

     if  (val == 1) {
      this.FormSelection.get('activityGroupPrograms')?.setValidators(this.minArrayLength())
    } else{
      this.FormSelection.get('activityGroupPrograms')?.clearValidators();
      this.FormSelection.patchValue({
        pagesCount:''
      })
    }
    this.FormSelection.get('activityGroupPrograms')?.updateValueAndValidity();
  })
    
}

clearValidators(){
  this.FormSelection.get('activityGroupPrograms')?.clearValidators();
}
}


