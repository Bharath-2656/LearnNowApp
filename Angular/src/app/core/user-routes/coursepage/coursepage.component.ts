import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/shared/services/Course/course.service';
import { UserService } from 'src/app/shared/services/User/user.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';



@Component({
  selector: 'app-coursepage',
  templateUrl: './coursepage.component.html',
  styleUrls: ['./coursepage.component.css']
})
export class CoursepageComponent implements OnInit {

  public id!: any;
  public userid!: any;
  courseid!: any;
  courses: any[] = [];
  showSuccessMessage!: boolean;
  serverErrorMessages!: string;
  courseincludes!: string;
  coursecontents!: string;
  courserequirements!: string;
  reviews!: String;
  price!: number;
  courselink!: String;
  totalamount!: Number;
  couponcode: String = '';
  constructor(private courseService: CourseService, private toastr: ToastrService, 
     private userService: UserService, private router: Router, private cookieService: CookieService,
      private route: ActivatedRoute) { }

  ngOnInit() {
    
    this.id=this.route.snapshot.paramMap.get('id');
    this.courselink =  localStorage.getItem('course')!;
    this.userid= this.userService.getuserfromPayload();
    this.totalamount = Number(this.cookieService.get('totalamount'));

    this.courseService.getCourse().subscribe((res:any) => {
      for (let index = 0; index < res.length; index++) {
        this.courses[index]=res[index];
       if(this.id==this.courses[index].routerlink)
       {
        
         this.courseincludes=this.courses[index].courseincludes.split(',');
         this.coursecontents=this.courses[index].contents.split(',');
        this.courserequirements=this.courses[index].requirements.split(',');
        this.reviews=this.courses[index].reviews; 
            
         this.price = this.courses[index].price;
         
        this.cookieService.set('price',(this.courses[index].price + "00") )

        this.userService.getUserProfile().subscribe((res:any) => {
          for (let index = 0; index < res.length; index++) {
            if(res[index].userid == this.userid)
            this.totalamount = res[index].totalamount;
            
          }
        })
       }     
       
      }
      
      
    },
    (err:any) => {
      console.log(err);
      });
      
      
      

  };
  
  applyCouponCode(couponform: NgForm)
  {
    console.log(JSON.stringify(couponform.value.couponcodebutton).replace(/\"/g, ""));
    
    if(this.totalamount>1000 && (JSON.stringify(couponform.value.couponcodebutton).replace(/\"/g, "") == "FLAT10"))
    {
      this.price= Math.floor((this.price) - (this.price/10));
      console.log(this.price);
     this.cookieService.set('price',String(this.price +"00"))
    }
  }

  onSubmit(formOne : NgForm){
    formOne.value.courseid=this.id;
    formOne.value.userid = this.userService.getUserPayload().userid;

    Swal.fire({
      title: "Do you wish to enroll to this course ",
       text: "Please pay Rs "+ JSON.stringify(this.price),
      // input: 'text',
      //html: '<input id="one >' + '<input id="two">',
      
      showCancelButton: true,
  }).then((result) => {
    
       if (result.value) {
        localStorage.setItem('course', this.id);
        
        if(this.price==0)
        {
          console.log("Result: " + result.value);

          this.courseService.courseEnrollCount(this.id).subscribe((res) => {
            
          })
          this.courseService.sendConfirmationMail(formOne.value).subscribe((res) => {
        
          });
      
          this.userService.postUserCourse(this.courselink, this.userid).subscribe((res) => {
            this.toastr.success('Enrollment successful','Success');
          setTimeout(() => {
            this.router.navigate(['user/dashboard']);
          }, 3000);
          
        },
        err => {
          if (err.status === 422) {
            this.serverErrorMessages = err.error.join('<br/>');
          }
          else
            this.serverErrorMessages = 'Something went wrong. Please contact admin.';
        }
      );
        }
        else
        {
          this.router.navigate(['course/' + this.id + '/user/payment']);
        }
      }
  });

    
  }
  onLogout(){
    this.userService.deleteToken().subscribe((res:any) => { 
    });
    this.cookieService.deleteAll();
    this.router.navigate(['user/login']);
  }
  

}
