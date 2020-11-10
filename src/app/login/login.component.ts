import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  constructor(private formBuilder: FormBuilder, private router:Router,private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    let passwordregex:RegExp=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
    
    this.form = this.formBuilder.group({
      userName: ['',Validators.required],
      password: ['',[Validators.required,Validators.pattern(passwordregex)]],
    });
  }

  login(){
    this.authenticationService.login(this.form.controls.userName.value, this.form.controls.password.value)
    .subscribe(
        data => {
            this.router.navigate(["/dashboard"]);
        },
        error => {
          alert(JSON.stringify(error))
        });
      
  }

  getErrorpassword() {
    return this.form.get('password').hasError('required') ? 'Field is required' :
      this.form.get('password').hasError('pattern') ? 'Not a valid input' :'';
  }
}
