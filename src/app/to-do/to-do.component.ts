import { Component,ViewChild, OnInit } from '@angular/core';
import { HeroService } from '../shared/hero.service';
import { AnimationOptions } from "ngx-lottie";
import { FormGroup,FormBuilder } from '@angular/forms';
import { Model  } from '../to-do/todo.model';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent  implements OnInit  {
  options: AnimationOptions = {
    path: "/assets/animation_lk9oclyd.json"
  };
  @ViewChild('screen', { static: true }) screen: any;
    constructor(private api:HeroService,private formBuilder:FormBuilder) { }
    
    //Pagination
    page: number = 1;
    count: number = 0;
    tableSize: number = 3;
    tableSizes: any = [3, 6, 9, 12];


    formValue!: FormGroup; 
    data:any;
    obj: Model = new Model;

    filterTerm!: string;
    
    
    ngOnInit(): void {
      
  
    this.api.getList().subscribe(res => {
         this.data = res;
    })

    this.formValue = this.formBuilder.group({
      name:''
    })
  
  }
  
  AddList(){
    this.obj.name = this.formValue.value.name;
     this.api.postList(this.obj).subscribe(res => { 
      Swal.fire(
        'Good job!',
        'Success',
        'success',
     
      ).then(function(){ 
        location.reload();
        });
     this.data;
    })
}
  
getList(data:any){
  this.data=data;
  this.api.getListbyid(data.id).subscribe((data => {
    console.log(data, "getres==>");
    this.data;
    
  }));

}


UpdateList(){
  this.obj.name = this.formValue.value.name;
 
  this.api.putList(this.obj,this.obj.id).subscribe(res => {
    Swal.fire(
      'Good job!',
      'Update person with success',
      'success',
   
    ).then(function(){ 
      location.reload();
      });
    this.data;
    
  })



  }  
 
EditStudent(data:any){
  this.formValue.controls['name'].setValue(data.name);

  this.obj.id = data.id;

}


DeleteList(data:any){
  this.api.deleteList(data.id).subscribe((res => {
    Swal.fire(
      'Good job!',
      'Delete with success',
      'error'
    ).then(function(){ 
      location.reload();
      });
    
   
  }))


}

DeleteAll(){
  
  this.api.deleteAllListt().subscribe((res => {
    Swal.fire(
      'Good job!',
      'Delete All with success',
      'error',
   
    ).then(function(){ 
      location.reload();
      });
    
    
  }))

} 
 


onTableDataChange(event: any) {
  this.page = event;
  this.ngOnInit();
}
onTableSizeChange(event: any): void {
  this.tableSize = event.target.value;
  this.page = 1;
  this.ngOnInit();
}

  
  }
