import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyComponent } from './company/company.component';
import { CompanyAddEditComponent } from './company-add-edit/company-add-edit.component';
import { CompanyService } from './services/company.service';
import { CompaniesImportComponent } from './companies-import/companies-import.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [
    AppComponent,
    CompaniesComponent,
    CompanyComponent,
    CompanyAddEditComponent,
    CompaniesImportComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([])
  ],
  providers: [
    CompanyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
