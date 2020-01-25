import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, mergeMap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Company } from '../models/company';

@Injectable({
  providedIn: 'root'
})

export class CompanyService {

  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient) {
      this.myAppUrl = environment.appUrl;
      this.myApiUrl = 'api/Companies/';
  }

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.myAppUrl + this.myApiUrl)
    .pipe(
      retry(1),
      map(res => {
        this.parseArrayCompanyType(res);
        return res;
      }),
      catchError(this.errorHandler)
    );
  }

  getCompany(companyId: number): Observable<Company> {
    return this.http.get<Company>(this.myAppUrl + this.myApiUrl + companyId)
    .pipe(
      retry(1),
      map(res => { 
        this.parseElementCompanyType(res);
        return res;
      }),
      catchError(this.errorHandler)
    );
  }

  parseArrayCompanyType(companies: Company[]) {
    companies.forEach(company => {
      this.parseElementCompanyType(company);
    });
  }

  parseElementCompanyType(company: Company) {
    if(company.companyType == 1 || company.companyType == 2) {
      company.isBuyer = 'Yes';
    }
    else {
      company.isBuyer = 'No';
    }
    
    if(company.companyType == 1 || company.companyType == 3) {
      company.isSeller = 'Yes';
    }
    else {
      company.isSeller = 'No';
    }
  }

  //TODO Create Picklist/Checkbox control for boolean type fields
  getCompanyType(company: Company)
  {
    if((company.isBuyer === "Yes" || company.isBuyer === "yes" ||  company.isBuyer === "YES")
      && (company.isSeller === "Yes" || company.isSeller === "yes" ||  company.isSeller === "YES")) {
      company.companyType = 1;
      delete company.isBuyer;
      delete company.isSeller;
    }
    else if((company.isBuyer === "Yes" || company.isBuyer === "yes" ||  company.isBuyer === "YES")
    && (company.isSeller === "No" || company.isSeller === "no" ||  company.isSeller === "NO")) {
      company.companyType = 2;
      delete company.isBuyer;
      delete company.isSeller;
    }
    else if((company.isBuyer === "No" || company.isBuyer === "no" ||  company.isBuyer === "NO")
    && (company.isSeller === "Yes" || company.isSeller === "yes" ||  company.isSeller === "YES")) {
      company.companyType = 3;
      delete company.isBuyer;
      delete company.isSeller;
    }
    else{
      company.companyType = 4;
      delete company.isBuyer;
      delete company.isSeller;
    }
  }

  saveCompany(company): Observable<Company> {
    this.getCompanyType(company);
    return this.http.post<Company>(this.myAppUrl + this.myApiUrl, JSON.stringify(company), this.httpOptions)
    .pipe(
      retry(1),
      map(res => { 
        this.parseElementCompanyType(res);
        return res;
      }),
      catchError(this.errorHandler)
    );
  }

  updateCompany(companyId: number, company): Observable<Company> {
    this.getCompanyType(company);
    return this.http.put<Company>(this.myAppUrl + this.myApiUrl + companyId, JSON.stringify(company), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  deleteCompany(companyId: number): Observable<Company> {
    return this.http.delete<Company>(this.myAppUrl + this.myApiUrl + companyId)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
