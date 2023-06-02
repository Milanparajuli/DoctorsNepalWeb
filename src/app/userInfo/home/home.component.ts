import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  doctorList = [
    {
      name:'Milan Parajuli',
      phone:'9860894447',
      address:'kapan',
      profile:'../../../../assets/images/bg.jpg',
      speacialon:'Heart'
    },
    {
      name:'Milan Parajuli',
      phone:'9860894447',
      address:'kapan',
      profile:'../../../../assets/images/bg.jpg',
      speacialon:'Eye'
    },
    {
      name:'Milan Parajuli',
      phone:'9860894447',
      address:'kapan',
      profile:'../../../../assets/images/bg.jpg',
      speacialon:'Heart'
    },
    {
      name:'Milan Parajuli',
      phone:'9860894447',
      address:'kapan',
      profile:'../../../../assets/images/bg.jpg',
      speacialon:'Heart'
    },
    {
      name:'Milan Parajuli',
      phone:'9860894447',
      address:'kapan',
      profile:'../../../../assets/images/bg.jpg',
      speacialon:'Heart'

    },
    {
      name:'Milan Parajuli',
      phone:'9860894447',
      address:'kapan',
      profile:'../../../../assets/images/bg.jpg',
      speacialon:'Heart'

    },

  ]

  constructor() { }

  ngOnInit(): void {
  }

}
