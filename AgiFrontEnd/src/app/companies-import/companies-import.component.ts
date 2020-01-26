import { Component, OnInit } from '@angular/core';
import { CSVParser } from '../services/parsers/csvParser' 
import { CompanyService } from '../services/company.service';
import { Company } from '../models/company';
//import { GridApi } from 'ag-grid-community';

@Component({
  selector: 'app-companies-import',
  templateUrl: './companies-import.component.html',
  styleUrls: ['./companies-import.component.scss']
})

export class CompaniesImportComponent implements OnInit {

  informationMessage: string;
  saveButtonText: string = "Save companies";
  saveButtonDisplay: boolean = false;
  
  private gridApi;
  private gridColumnApi;
  columnDefs = [];
  rowData = [];
  columnMaps = [
    {"property": "externalId", "mappedTo": "CounterPartID"},
    {"property": "tradingName", "mappedTo": "Name"},
    {"property": "legalName", "mappedTo": "Name"},
    {"property": "isBuyer", "mappedTo": "IsBuyer"},
    {"property": "isSeller", "mappedTo": "IsSeller"},
    {"property": "phone", "mappedTo": "Phone"},
    {"property": "fax", "mappedTo": "Fax"}];

  constructor(private companyService: CompanyService) {}

  ngOnInit() {}

  fileUploaded($event: any): void {  
    this.informationMessage = "";
    let files = $event.srcElement.files;

    if(files == null) {
      this.informationMessage = "Select file to proceed.";
      return;
    }

    if(files.length > 1) {
      this.informationMessage = "Select only one file to proceed.";
      return;
    }

    if(files[0].name == null) {
      this.informationMessage = "Select file with the name to proceed.";
      return;
    }

    if(files != null && files.length == 1)
    {
      let fileExtension = files[0].name.match(/\.[0-9a-z]+$/i)[0];
      if(fileExtension == null) {
        this.informationMessage = "File extension is not found.";
        return;
      }

      switch(fileExtension) {
        case ".csv":
          CSVParser.getData(files[0]).subscribe(results => {
            this.processResults(results);
          });
          break;
        default:
          this.informationMessage = "This file type is not supported yet. Push AgiTeam to implement it.";
      }
    }      
  }

  processResults(results: any) {
    if(results != null) {
      this.saveButtonDisplay = true;
      this.saveButtonText = "Save companies";

      this.columnDefs = [];
      this.rowData = [];

      results[0].forEach(element => {
        let column = {headerName: element, field: element, editable: true };
        this.columnDefs.push(column);
      });
      this.columnDefs.push({headerName: "Status", field: "Status", editable: false});
    
      for(var i = 1; i < results.length; i++) {
        let row = results[i];
        let rowObject = {CounterPartID: "", Name: "", IsBuyer: "", IsSeller: "", Phone: "", Fax: "", Status: ""};
        for(var j = 0; j < this.columnDefs.length - 1; j++) {
          rowObject[this.columnDefs[j]["field"]] = row[j];
        }
        rowObject["Status"] = "";
        this.rowData.push(rowObject);
      }
    }
  }

  saveCompanies() {

    this.saveButtonDisplay = false;

    if(this.saveButtonText === "Retry to save only errors") {
      for(var i = 0; i < this.rowData.length; i++) {
        let row = this.rowData[i];
        if(row[this.columnDefs[this.columnDefs.length - 1].field] === "Saved") {
          this.rowData.splice(i, 1);
          i--;
        }
      }
    }

    this.saveButtonText = "Save companies";
    this.rowData.forEach(row => {
      row[this.columnDefs[this.columnDefs.length - 1].field] = "Saving";

      this.gridApi.refreshCells();
      let company = new Company();
      for(var i = 0; i < this.columnMaps.length; i++) {
        company[this.columnMaps[i].property] = row[this.columnMaps[i].mappedTo];
      }
      
      this.companyService.saveCompany(company)
        .subscribe(
          (data) => {
            row[this.columnDefs[this.columnDefs.length - 1].field] = "Saved";
            this.gridApi.refreshCells();
          },
          (err) => {
            row[this.columnDefs[this.columnDefs.length - 1].field] = "Error: " + err;
            this.saveButtonText = "Retry to save only errors";
            this.saveButtonDisplay = true;
            this.gridApi.refreshCells();
          }
        );
    });
  }

  mapColumns() {
    let currentMapsText = "Column Mappings:";
    for(var i = 0; i < this.columnMaps.length; i++) {
      currentMapsText += "\r\n'" + this.columnMaps[i].property + "' mapped to: '" + this.columnMaps[i].mappedTo + "'";
    }
    alert(currentMapsText);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.sizeColumnsToFit();
  }
}
