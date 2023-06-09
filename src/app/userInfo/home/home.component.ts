import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from 'src/app/service/auth.service';
import {DoctorService} from "../../service/doctor.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  viewDoctor: any;
  name: any;
  isLoggedIn = false;
  @Input() doctorName: any;
  doctorList: any;

  // doctorName: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private ngbModal: NgbModal,
    private doctorService: DoctorService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.getParams();
    this.doctorService.getDoctorSearch().subscribe({
      next: (res: any) => {
        if (res) {
          this.getParams();
          this.doctorService.setDoctorSearch(null);
        }
      }
    })
    console.log(this.name);
    this.listDoctor();
  }

  getParams() {
    this.activatedRoute.queryParams.subscribe({
      next: (res: any) => {
        this.name = res?.name;
        res ? this.getDoctorByName(this.name) : this.listDoctor();
      }
    })
  }

  getDoctorByName(name: any) {
    this.doctorService.getDoctorByName(this.name).subscribe(
      (response: any) => {
        this.doctorList = response.doctor;
      },
      error => {
        console.error(error);
      }
    )
  }

  listDoctor() {
    this.doctorService.getDoctor().subscribe(
      (response: any) => {
        // this.userId = response;
        this.doctorList = response.doctor;
        console.log('resp: ', this.doctorList);
      },
      (error: any) => {
        console.error('Error: ', error);
      }
    );
  }

  viewDetails(template: any, index: any) {
    if (localStorage.getItem('userId')) {
      //   this.router.navigate(['user-detail/doctor-detail']);
      this.ngbModal.open(template, {size: 'lg'});
      this.viewDoctor = this.doctorList[index];
    } else {
      this.router.navigate(['auth/login']);
    }
  }

}
