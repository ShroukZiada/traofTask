import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddProgramService {

constructor(private _HttpClient:HttpClient) { }


GetAllClassRooms():Observable<any>{
  return this._HttpClient.get(`https://localhost:7281/api/Test/GetAllClassRooms/0`);
}


GetInitiatives():Observable<any>{
  return this._HttpClient.get(`https://localhost:7281/api/Test/GetInitiativesByDepartment/10`);
}


GetFilteredPrograms(object:any): Observable<any>{
  return this._HttpClient.post(`https://localhost:7281/api/Test/GetFilteredPrograms`, object);
}

GetAllActivityGroups():Observable<any>{
  return this._HttpClient.get('https://localhost:7281/api/Test/GetAllActivityGroups');
}

get programSupervisors():Observable<any>{
  return this._HttpClient.get(`https://localhost:7281/api/Test/GetAllEmployeeByGenderId`)
}

}
