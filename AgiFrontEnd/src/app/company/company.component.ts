import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CompanyService } from '../services/company.service';
import { Company } from '../models/company';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  company$: Observable<Company>;
  companyId: number;

  constructor(private companyService: CompanyService, private avRoute: ActivatedRoute) {
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]) {
      this.companyId = this.avRoute.snapshot.params[idParam];
    }
  }

  ngOnInit() {
    this.loadCompany();
  }

  loadCompany() {
    this.company$ = this.companyService.getCompany(this.companyId);
  }

}
