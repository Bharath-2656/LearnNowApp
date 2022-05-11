import { Component, OnInit } from '@angular/core';
import { AreaofinterestService } from 'src/app/shared/services/AreaOfIntrest/areaofinterest.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  areaOfInterests: any[] = [];
  constructor(private areaOfInterestService: AreaofinterestService) { }

  ngOnInit(): void {
    this.areaOfInterestService.getAreaOfInterest().subscribe((res:any) => {
      for (let index = 0; index < res.length; index++) {
       this.areaOfInterests[index]=res[index]; 
      }
    },
    (err:any) => {
      console.log(err);
      });
      const buttonRight = document.getElementById('slideRight')!;
    const buttonLeft = document.getElementById('slideLeft')!;
      buttonRight.onclick = function () {
        document.getElementById('row')!.scrollLeft += 340;
      };
      buttonLeft.onclick = function () {
        document.getElementById('row')!.scrollLeft -= 300;
      };

    };
  }


