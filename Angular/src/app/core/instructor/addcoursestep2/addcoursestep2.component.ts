import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addcoursestep2',
  templateUrl: './addcoursestep2.component.html',
  styleUrls: ['./addcoursestep2.component.css']
})
export class Addcoursestep2Component implements OnInit {
 
  constructor() { }
  
  ngOnInit(): void {

  }
  add(){
    let row = document.createElement('div');  
      row.className = 'row';
      row.innerHTML = `
      <br>
      <input type="text" class  ="input">`;
      row.style.backgroundColor='salmon';
      var field = document.querySelector('.showInputField')!.appendChild(row);
    }

}
