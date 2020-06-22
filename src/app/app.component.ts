import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { CRUDServiceService } from './crudservice.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CRUD-APP';

  personas:any= [];

  productForm: FormGroup;

  ngOnInit() {
    this.productForm = this.fb.group({
      nombre: [''],
      apellido: [''],
      edad: Number,
    });

    this.CRUDServiceService.getAll().subscribe(res => {
      this.personas = res;
    },
      error => { console.log(error) }
    )

  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private CRUDServiceService: CRUDServiceService
  ) { }
  submitForm() {
    this.CRUDServiceService.save(this.productForm.value).subscribe(
      res => {
        this.personas.push(res);
        this.productForm.reset();
      },
      error => { console.log("No se pudo guardar el producto: " + error) }
    );

  }


  delete(persona:any){
    console.log(persona)
    this.CRUDServiceService.delete(persona).subscribe(res=>{
      this.personas.pop(res);
    },
    error=>{console.log(error)}
    )
  }


}
