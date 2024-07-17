import { Routes } from '@angular/router';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';

export const routes: Routes = [{path:'register',component:RegistrationPageComponent},
{path:'admin',component:AdminPageComponent},
{path:'',redirectTo:'/register',pathMatch:'full'},
{path:'**',redirectTo:'/register',pathMatch:'full'}];
