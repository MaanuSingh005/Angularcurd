import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../Model/user';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
//import { Validators } from '@angular/forms';

export interface UserModal {
  department: string;  
  name: string;
  mobile: number;
  email: string;
  gender: string;
  DOJ: string;
  city: string;
  salary: number;
  address: string;
  status: boolean;
}

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
  
})
export class UserComponent implements OnInit {
  userList : UserModel[] = [];
  editMode : boolean = false;
  user: UserModel = {
    id:0,
    department: '',
    name: '',
    mobile: 0,
    email: '',
    gender: '',
    DOJ: '',
    city: '',
    salary: 0,
    address: '',
    status: false
  };

  constructor( private _userService: UserService, private _toastrservice: ToastrService ){}
  ngOnInit(): void {
    this.getUserList();
  }
  cityList: string[] = ["New Delhi", "Mumbai", "Chennai", "Kolkata", "Chandigarh", "Gurugram", "Noida"];
  departmentList: string[] = ["IT&ESM", "HR", "Accounts", "Marketing", "Sales"];
  genderList: string[] = ["Male", "Female", "Other"];

  getUserList()
  {
    this._userService.getUsers(this.user).subscribe((res)=>{
      this.userList = res;

    });
  }

  
  onSubmit(form: NgForm): void {
    
    debugger;
    if(this.editMode){
      console.log(form);
    this._userService.updateUser(this.user).subscribe((res)=>{
      form.reset();
      this.getUserList();      
      this.editMode = false;
      this._toastrservice.success('User Updated Successfully', 'Success');

    });


    }
    else{
      console.log(form);
    this._userService.addUser(this.user).subscribe((res)=>{
      this.getUserList();
      form.reset();
      this.editMode = false;
      this._toastrservice.success('User added successfully','Success'); 


    });

    }
    
  }

  onEdit(userdata : UserModel)
  {
    this.user = userdata;
    this.editMode = true;
  }
  onDelete(id : any)
  {
    const isConfirm = confirm('Are you sure want to delete this?');
    if (isConfirm)
    {
      this._userService.deleteUser(id).subscribe((res ) => {
        this._toastrservice.error('User Deleted Successfully','Deleted')
        this.getUserList();
        
      });

    }
    

  }
  onResultForm(form: NgForm)
  {
    form.reset();
    this.editMode = false;
    this.getUserList();

    

  }
}
