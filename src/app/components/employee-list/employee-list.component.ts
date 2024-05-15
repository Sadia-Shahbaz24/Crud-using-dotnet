import { Component, inject } from '@angular/core';
import { IEmployee } from '../../interfaces/employee';
import { HttpService } from '../../http.service';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';





@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [MatTableModule,MatButtonModule,RouterLink],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  //router=inject(Router);
  router=inject(Router);

  //employee list show krny k liye
  EmployeeList:IEmployee[]=[];
  toaster=inject(ToastrService);
  httpService=inject(HttpService);   //component ma httpservice ko inject krna h
 //datasource k liye yh kia ha to display data table
  displayedColumns: string[] = ['id', 'name', 'email', 'phone','age', 'salary','action'];

  
  ngOnInit(){                       //jasy e comp load hoga  ngOnInit lifecycle py server sy emplist fetch kry gy usk ak http service use kry gy      //ng g s http (http create krny k liy) terminal m likhna h
  // this.getEmployeeFromServer();
  this.httpService.getAllEmployee().subscribe(result=>{ //yhasaray employee mily gy or subscribe sy result mily ga or rssult ko console log krwa lyty h  server sy return data hoga esko hum emplist m assign kr k store kr lty h
         this.EmployeeList=result;
     console.log(this.EmployeeList);
     });
  }
  // getEmployeeFromServer(){
  //   this.httpService.getAllEmployee().subscribe(result=>{ //yhasaray employee mily gy or subscribe sy result mily ga or rssult ko console log krwa lyty h  server sy return data hoga esko hum emplist m assign kr k store kr lty h
  //     this.EmployeeList=result;
  //     console.log(this.EmployeeList);
  //   });
  // }
  edit(id:number){
    console.log(id);
   // this.router.navigateByUrl("/employee/"+id);
   this.router.navigateByUrl("/employee/"+id)

  }
  delete(id:number){
    this.httpService.deleteEmployee(id).subscribe(()=>{
      console.log("deleted");
      //locally
      this.EmployeeList=this.EmployeeList.filter(x=>x.id!=id);
      //fetching from server
      //this.getEmployeeFromServer();
this.toaster.success("Record Deleted Successfully");
    })
  

  }

}
