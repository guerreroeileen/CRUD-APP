import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';


import { CRUDServiceService } from './crudservice.service';
import { Persona } from './models/Persona';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CRUD-APP';

  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'correo', 'edad', 'numeroDocumentoIdentificacion'];

  dataSource: any;
  messageInfo: string;
  mostrarAlerta: boolean;

  productForm: FormGroup;

  ngOnInit() {
    this.productForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      numeroDocumentoIdentificacion: ['', Validators.required],
      correo: ['', Validators.required],
      edad: [Number, Validators.required],
    });
    this.messageInfo = "Persona agregada correctamente :)";
    this.mostrarAlerta = false;

    this.CRUDServiceService.getAll(0, 10, false).subscribe(res => {
      this.dataSource = new MatTableDataSource<Persona>(res.content);
      this.dataSource.paginator = this.paginator;
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
    this.mostrarAlerta = true;
    this.CRUDServiceService.save(this.productForm.value).subscribe(
      res => {
        this.dataSource.push(res);
        this.productForm.reset();
      },
      error => {
        console.log("No se pudo guardar el producto: " + error);
        console.error(error);
        this.messageInfo = "No se pudo guardar la persona: " + error.message;
      }
    );

  }

  cerrarAlerta() {
    this.mostrarAlerta = false;
  }


  delete(persona: any) {
    this.CRUDServiceService.delete(persona).subscribe(res => {
      this.dataSource.pop(res);
    },
    )
  }

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;


}
