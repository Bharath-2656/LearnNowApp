import { Component, OnInit } from '@angular/core';
import {UserService} from 'src/app/shared/services/User/user.service'
import { NgForm } from '@angular/forms';
import { CourseService } from 'src/app/shared/services/Course/course.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService],
})
export class RegisterComponent implements OnInit {
  showSuccessMessage!: boolean;
  serverErrorMessages!: string;
  constructor(public userService: UserService, private courseService: CourseService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.resetForm(); 
    var s = document.getElementById("age");
  }
  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.userService.selectedUsers = {
      userid:0,
      name: "",
      age: 18,
      email: "",
      password: "",
      confirm_password: "",
      courseid: "",
    };
    this.serverErrorMessages = '';
  }
  
    onSubmit(form: NgForm) {
        this.userService.postUser(form.value).subscribe((res) => {      
          this.toastr.success('Upadated Successfully','Success');     
        this.userService.sendConfirmationMail(form.value).subscribe((res) => {
        });
        this.resetForm(form);
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else
          this.toastr.error('Something went wrong. Please contact admin.','Error');
      }
    );
    }
    // else {
    //   this.userService.putUser(form.value).subscribe((res) => {
    //     this.resetForm(form);
    //     //M.toast({ html: 'Updated successfully', classes: 'rounded' });
    //   });
    // }

  }

    