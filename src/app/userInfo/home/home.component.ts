import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from 'src/app/service/auth.service';
import {DoctorService} from "../../service/doctor.service";
import {ToastrService} from "ngx-toastr";
import {UserService} from "../../service/user.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  viewDoctor: any;
  name: any;
  isLoggedIn = false;
  @Input() doctorName: any;
  doctorList: any;
  roleType: any;
  userList: any;
  isPatient = false;
  users: any;
  userId: any;
  diseaseType: any;
  distance: any;

  // doctorName: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private ngbModal: NgbModal,
    private doctorService: DoctorService,
    private activatedRoute: ActivatedRoute,
    private toasterService: ToastrService,
    private userService: UserService,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    console.log('userId:', this.userId)
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
    this.buildForm();
    this.listDoctor();
    this.getUser();
    this.getAllUser();
  }

  getParams() {
    this.activatedRoute.queryParams.subscribe({
      next: (res: any) => {
        this.name = res?.name;
        res ? this.getDoctorByNames(this.name) : this.listDoctor();
      }
    })
  }

  getDoctorByNames(name: any) {
    this.doctorService.getDoctorByName(this.name).subscribe(
      (response: any) => {
        this.doctorList = response.identity;
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
        this.doctorList = response.identity;
        console.log('respifjencn: ', this.doctorList);
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

  syncDoctors() {
    this.doctorService.saveIdentities().subscribe({
      next: (res: any) => {
        this.toasterService.success('Doctors Successfully Synced');
      }
    })
  }

  getUser() {
    this.userService.getUserById(localStorage.getItem('userId')).subscribe(
      (res: any) => {
        this.userList = res;
        this.roleType = res.roleType;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  getAllUser() {
    this.userService.getUser().subscribe(
      (res: any) => {
        console.log('response: hello', res);
        this.roleType = res.roleType;
        if (res.roleType === 'PATIENT') {
          this.isPatient = true;
          this.users = res.users;
        }
      }
    )
  }

  bookAppointment(app: any, userId: any) {
    this.userService.addAppointment(app, userId).subscribe(
      (res: any) => {
        console.log('hello world', res)
        this.toasterService.success('Successfully booked appointment');
      }, (err: any) => {
        this.toasterService.error('unable to booking appointment');
      }
    )
  }

  buildForm() {
    this.form = this.formBuilder.group({
      disease: [undefined]
    })
  }

  chooseWithSpeciality(disease: any) {
    switch (disease) {
      case '1':
        this.diseaseType = 'Cardiologist';
        break;
      case '2':
        this.diseaseType = 'Neurologist'
        break;
      case '3':
        this.diseaseType = 'ophthalmologist';
        break;
      case '4':
        this.diseaseType = 'Geriatric medicine'
        break;
      default:
        this.toasterService.warning('please choose Disease first');
    }
    // if (disease === 1) {
    //   this.diseaseType = 'Cardiologist'
    // } else if (disease === 2) {
    //   this.diseaseType = 'Neurologist'
    // } else if (disease === 3) {
    //   this.diseaseType = 'ophthalmologist'
    // } else if (disease === 4) {
    //   this.diseaseType = 'Geriatric medicine'
    // }
    console.log('diseaseType::::', this.diseaseType);
    this.getDoctorBySpeciality(this.diseaseType);
  }

  getDoctorBySpeciality(disease: any) {
    console.log('disease::::', disease)
    this.doctorService.getDoctorBySpeciality(disease).subscribe(
      (res => {
        console.log('response', res)
        this.doctorList = res.identity;
      }),
      err => {
        console.error('error is', err);
      }
    )
  }

  getLongititudeLatitude(endLat:any, endLon: any) {
    debugger
    const sLat = localStorage.getItem("Latitude");
    const sLon = localStorage.getItem("Longitude");
    this.userService.getTwoPoint(sLat,sLon,endLat,endLon).subscribe(
      res =>{
        console.log('this is long lat:', res);
        this.distance = res;
      }
    )
  }
}
