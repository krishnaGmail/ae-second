import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userData:{};
  @Output()  childLoaded= new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
    this.userData=JSON.parse(localStorage.getItem('userData'));
   
  }
  setChildLoaded()
  {
    
    this.childLoaded.emit(true);
   
  }
  
}
