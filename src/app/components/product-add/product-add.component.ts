import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  productAddForm: FormGroup = this.formBuilder.group({});
  constructor(private formBuilder: FormBuilder, private productService: ProductService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.createProductAddForm();
  }

  createProductAddForm() {
    this.productAddForm = this.formBuilder.group({
      categoryId: ["", Validators.required],
      productName: ["", Validators.required],
      unitsInStock: ["", Validators.required],
      unitPrice: ["", Validators.required]
    });
  }

  addProduct() {
    if (this.productAddForm.valid) {
      let product = this.productAddForm.value;
      // let product = Object.assign({}, this.productAddForm.value);
      this.productService.add(product).subscribe({
        next: resp => {
          if (resp.success) {
            this.toastrService.success(resp.message, "Success");
          } else {
            this.toastrService.error(resp.message, "Error");
          }
        },
        error: errorResp => {
          if (errorResp.error.validationFailures) {
            for (const failure of errorResp.error.validationFailures) {
              this.toastrService.error(failure.errorMessage, "Form Error");
            }
          } else {
            this.toastrService.error(errorResp.error.message, "Error");
          }
        }
      });
    } else {
      this.toastrService.error("Please fix the errors in the form.", "Form Error");
    }
  }
}
