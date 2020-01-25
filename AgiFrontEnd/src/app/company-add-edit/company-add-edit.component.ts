import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from '../services/company.service';
import { Company } from '../models/company';

@Component({
  selector: 'app-company-add-edit',
  templateUrl: './company-add-edit.component.html',
  styleUrls: ['./company-add-edit.component.scss']
})
export class CompanyAddEditComponent implements OnInit {

  form: FormGroup;
  actionType: string;

  //form properties
  formExternalId: string;
  formTradingName: string;
  formLegalName: string;
  formIsBuyer: string;
  formIsSeller: string;
  formPhone: string;
  formFax: string;

  companyId: number;
  errorMessage: any;
  existingCompany: Company;

  constructor(private companyService: CompanyService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router) {
    const idParam = 'id';
    this.actionType = 'Add';
    this.formExternalId = 'externalId';
    this.formTradingName = 'tradingName';
    this.formLegalName = 'legalName';
    this.formIsBuyer = 'isBuyer';
    this.formIsSeller = 'isSeller';
    this.formPhone = 'phone';
    this.formFax = 'fax';
    if (this.avRoute.snapshot.params[idParam]) {
      this.companyId = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      {
        companyId: 0,
        externalId: ['', [Validators.required]],
        tradingName: ['', [Validators.required]],
        legalName: ['', [Validators.required]],
        isBuyer: ['', [Validators.required, Validators.pattern('^yes$|^no$|^Yes$|^No$|^YES$|^NO$')]],
        isSeller: ['', [Validators.required, Validators.pattern('^yes$|^no$|^Yes$|^No$|^YES$|^NO$')]],
        phone: ['', [Validators.required]],
        fax: ['', [Validators.required]],
      }
    )
  }

  ngOnInit() {
    if (this.companyId > 0) {
      this.actionType = 'Edit';
      this.companyService.getCompany(this.companyId)
        .subscribe(data => (
          this.existingCompany = data,
          this.form.controls[this.formExternalId].setValue(data.externalId),
          this.form.controls[this.formTradingName].setValue(data.tradingName),
          this.form.controls[this.formLegalName].setValue(data.legalName),
          this.form.controls[this.formIsBuyer].setValue(data.isBuyer),
          this.form.controls[this.formIsSeller].setValue(data.isSeller),
          this.form.controls[this.formPhone].setValue(data.phone),
          this.form.controls[this.formFax].setValue(data.fax)
        ));
    }
  }

  save() {
    if (!this.form.valid) {
      return;
    }

    if (this.actionType === 'Add') {
      let company: Company = {
        externalId: this.form.get(this.formExternalId).value,
        tradingName: this.form.get(this.formTradingName).value,
        legalName: this.form.get(this.formLegalName).value,
        isBuyer: this.form.get(this.formIsBuyer).value,
        isSeller: this.form.get(this.formIsSeller).value,
        phone: this.form.get(this.formPhone).value,
        fax: this.form.get(this.formFax).value
      };

      this.companyService.saveCompany(company)
        .subscribe((data) => {
          this.router.navigate(['/companies']);
        });
    }

    if (this.actionType === 'Edit') {
      let company: Company = {
        id: this.existingCompany.id,
        externalId: this.form.get(this.formExternalId).value,
        tradingName: this.form.get(this.formTradingName).value,
        legalName: this.form.get(this.formLegalName).value,
        isBuyer: this.form.get(this.formIsBuyer).value,
        isSeller: this.form.get(this.formIsSeller).value,
        phone: this.form.get(this.formPhone).value,
        fax: this.form.get(this.formFax).value
      };

      this.companyService.updateCompany(company.id, company)
        .subscribe((data) => {
          this.router.navigate(['/companies']);
        });
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }

  get externalId() { return this.form.get(this.formExternalId); }
  get tradingName() { return this.form.get(this.formTradingName); }
  get legalName() { return this.form.get(this.formLegalName); }
  get isBuyer() { return this.form.get(this.formIsBuyer); }
  get isSeller() { return this.form.get(this.formIsSeller); }
  get phone() { return this.form.get(this.formPhone); }
  get fax() { return this.form.get(this.formFax); }
}
