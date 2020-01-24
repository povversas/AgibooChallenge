import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyComponent } from './company/company.component';
import { CompanyAddEditComponent } from './company-add-edit/company-add-edit.component';

const routes: Routes = [
  { path: '', component: CompaniesComponent, pathMatch: 'full' },
  { path: 'company/:id', component: CompanyComponent },
  { path: 'add', component: CompanyAddEditComponent },
  { path: 'company/edit/:id', component: CompanyAddEditComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
