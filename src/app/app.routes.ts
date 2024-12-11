import { Routes,RouterModule } from '@angular/router';
import { ProgrammComponent } from './components/programm/programm.component';
import { AddProgrammComponent } from './components/add-programm/add-programm.component';


export const routes: Routes = [
    { path: '', component: ProgrammComponent},
    { path: 'addprogramm', component: AddProgrammComponent},
    // { path: 'addprogramm', loadComponent: () =>
    //     import('../app/components/add-programm/add-programm.component').then(
    //       (c) => c.AddProgrammComponent
    //     ) }
    
];


