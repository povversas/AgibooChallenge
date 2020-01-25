import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyService } from '../services/company.service';
import { Company } from '../models/company';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
  companies$: Observable<Company[]>;

  constructor(private companyService: CompanyService) {
  }

  ngOnInit() {
    this.loadCompanies();
  }

  loadCompanies() {
    this.companies$ = this.companyService.getCompanies();
  }

  delete(companyId) {
    const ans = confirm('Do you want to delete company with id: ' + companyId);
    if (ans) {
      this.companyService.deleteCompany(companyId).subscribe((data) => {
        this.loadCompanies();
      });
    }
  }
}
