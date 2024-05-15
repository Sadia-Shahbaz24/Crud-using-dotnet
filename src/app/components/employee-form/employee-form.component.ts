import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { HttpService } from '../../http.service';
import { IEmployee } from '../../interfaces/employee';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-employee-form',

  standalone: true,
  imports: [MatInputModule,MatButtonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent {
  FormBuilder=inject(FormBuilder);
  httpService=inject(HttpService);
  //router=inject(Router);
  router=inject(Router);
  
  route =inject(ActivatedRoute);
  toaster=inject(ToastrService);
  employeeform=this.FormBuilder.group({
    name:['',[Validators.required]],
    email:['',[Validators.required,Validators.email]],
    phone:['',[]],
    age:[0,[Validators.required]],
    salary:[0,[Validators.required]],
});
employeeId!:number;
isEdit = false;
ngOnInit(){

  this.employeeId=this.route.snapshot.params['id'];
  if(this.employeeId){
    this.isEdit=true;
    this.httpService.getEmployee(this.employeeId).subscribe(result=>{
      console.log(result);
      this.employeeform.patchValue(result);
    //this.employeeform.controls.email.disable();

    })

  }

}
save(){
  console.log(this.employeeform.value);
  const employee: IEmployee= {
    name: this.employeeform.value.name!,
    email: this.employeeform.value.email!,
    phone: this.employeeform.value.phone!,
    age: this.employeeform.value.age!,
    salary: this.employeeform.value.salary!,
 };
 
 if (this.isEdit) {
  this.httpService
    .updateEmployee(this.employeeId, employee)
    .subscribe(() => {
      console.log('success');
      this.toaster.success("Record updated sucessfully.");
      this.router.navigateByUrl('/employee-list');
    });
} else {
  this.httpService.createEmployee(employee).subscribe(() => {
    console.log('success');
    this.toaster.success("Record added sucessfully.");
    this.router.navigateByUrl('/employee-list');
  });
}
}}