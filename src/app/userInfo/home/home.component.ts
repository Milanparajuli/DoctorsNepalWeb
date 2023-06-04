import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  viewDoctor: any;
  name:any;
  isLoggedIn = false;
  doctorList = [
    {
      name:'Milan Parajuli1',
      phone:'9860894447',
      address:'kapan',
      profile:'../../../../assets/images/bg.jpg',
      speacialon:'Heart',
      description:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum aliquid sit ullam, aperiam libero tempore amet voluptates ex temporibus error expedita incidunt dicta eius odit animi, eos quo, perspiciatis rerum?'
    },
    {
      name:'Milan Parajuli2',
      phone:'9860894447',
      address:'kapan',
      profile:'../../../../assets/images/bg.jpg',
      speacialon:'Eye',
      description:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum aliquid sit ullam, aperiam libero tempore amet voluptates ex temporibus error expedita incidunt dicta eius odit animi, eos quo, perspiciatis rerum?'
    },
    {
      name:'Milan Parajuli3',
      phone:'9860894447',
      address:'kapan',
      profile:'../../../../assets/images/bg.jpg',
      speacialon:'Heart',
      description:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum aliquid sit ullam, aperiam libero tempore amet voluptates ex temporibus error expedita incidunt dicta eius odit animi, eos quo, perspiciatis rerum?'
    },
    {
      name:'Milan Parajuli4',
      phone:'9860894447',
      address:'kapan',
      profile:'../../../../assets/images/bg.jpg',
      speacialon:'Heart',
      description:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum aliquid sit ullam, aperiam libero tempore amet voluptates ex temporibus error expedita incidunt dicta eius odit animi, eos quo, perspiciatis rerum?'
    },
    {
      name:'Milan Parajuli5',
      phone:'9860894447',
      address:'kapan',
      profile:'../../../../assets/images/bg.jpg',
      speacialon:'Heart',
      description:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum aliquid sit ullam, aperiam libero tempore amet voluptates ex temporibus error expedita incidunt dicta eius odit animi, eos quo, perspiciatis rerum?'

    },
    {
      name:'Milan Parajuli6',
      phone:'9860894447',
      address:'kapan',
      profile:'../../assets/images/bg.jpg',
      speacialon:'Heart',
      description:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum aliquid sit ullam, aperiam libero tempore amet voluptates ex temporibus error expedita incidunt dicta eius odit animi, eos quo, perspiciatis rerum?'

    },

  ]

  constructor(
     private router: Router,
     private authService: AuthService,
     private ngbModal:NgbModal
    ) { }

  ngOnInit(): void {
  }

  viewDetails(template: any,index:any){
    if(localStorage.getItem('userId')) {
    //   this.router.navigate(['user-detail/doctor-detail']);
    this.ngbModal.open(template,{size:'lg'});
    this.viewDoctor = this.doctorList[index];
    } else {
      this.router.navigate(['auth/login']);
    }
  }

}
