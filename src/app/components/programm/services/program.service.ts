import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

constructor(private _HttpClient:HttpClient) { }


 getAllstages(): Observable<any> {
  return this._HttpClient.get('https://localhost:7281/api/Test/GetStages')
}
GetClassRoomByStageId(StageId:number): Observable<any>{
  return this._HttpClient.get(`https://localhost:7281/api/Test/GetClassRoomByStageId/${StageId}`)
}
GetProgramCategories(): Observable<any>{
  return this._HttpClient.get(`https://localhost:7281/api/Test/GetProgramCategories`)
}
GetAllPager(object:any, search:any): Observable<any>{
  return this._HttpClient.post(`https://localhost:7281/api/Test/GetProgramsPager`, object)
}


// GetAllPage(pram:any): Observable<any>{
//   return this._HttpClient.post(`https://localhost:7281/api/Test/GetProgramsPager`, {params:pram})
// }
}
