import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { LoginService } from 'src/app/services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidators } from 'src/app/_helpers/password-validators';
import { MustMatch } from 'src/app/_helpers/must-match.validator';

@Component({
  selector: 'app-replacepassword',
  templateUrl: './replacepassword.component.html',
  styleUrls: ['./replacepassword.component.css']
})
export class ReplacepasswordComponent implements OnInit {

  username : string = ''
  password : string = ''
  confirmpassword : string = ''
  user : User [] = [];
  replaceForm!: FormGroup;
  submitted = false;
  constructor(private router: Router, private route: ActivatedRoute, private changePassService : LoginService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.username = routeParams.get('username')!;
    this.replaceForm = this.formBuilder.group({
      userid: [this.username],
      password: ['', [Validators.required, 
                      Validators.minLength(6), 
                      PasswordValidators.patternValidator(new RegExp("(?=.*[0-9])"), {requiresDigit: true}),
                      PasswordValidators.patternValidator(new RegExp("(?=.*[A-Z])"), {requiresUppercase: true}),
                      PasswordValidators.patternValidator(new RegExp("(?=.*[a-z])"), {requiresLowercase: true}),
                      PasswordValidators.patternValidator(new RegExp("(?=.*[$@^!%*?&])"), {requiresSpecialChars: true})]],
      confirmPassword: ['', Validators.required],
      }, {
      validator: MustMatch('password', 'confirmPassword')
  });
  }

  onReset() {
    this.submitted = false;
    this.replaceForm.reset();
}

onSubmit() {
  this.submitted = true;

  // stop here if form is invalid
  if (this.replaceForm.invalid) {
      return;
  }
}
  change(){
    this.submitted = true;

  // stop here if form is invalid
  if (this.replaceForm.invalid) {
      return;
  }
  else{
    alert('USERNAME->'+this.replaceForm.value['userid'] + " PASS->" + this.replaceForm.value['password'])
    this.changePassService.getUserByUsername(this.username).subscribe(
      data =>{
        this.user = data;
        let userToUpdate = this.user[0]
        // console.log('OLD->'+JSON.stringify(this.user[0]))
        this.user[0].password = this.replaceForm.value['password'];
        // console.log('NEW->'+JSON.stringify(this.user[0]))
        this.changePassService.updateRoleStatus(userToUpdate).subscribe();
      }
    )
    this.router.navigate(['login']);
  }
  }

    


  get f() { return this.replaceForm.controls; }

  get requiresDigitValid() {
    return !this.replaceForm.controls["password"].hasError("requiresDigit");
  }


  get requiresUppercaseValid() {
    return !this.replaceForm.controls["password"].hasError("requiresUppercase");
  }

  get requiresLowercaseValid() {
    return !this.replaceForm.controls["password"].hasError("requiresLowercase");
  }

  get requiresSpecialCharsValid() {
    return !this.replaceForm.controls["password"].hasError("requiresSpecialChars");
  }

  seePass(){
    console.log(document.getElementById('password')?.getAttribute('type'))
    if(document.getElementById('password')?.getAttribute('type') == 'password'){
      document.getElementById('password')?.setAttribute('type','text')
      document.getElementById('togglePassword')?.classList.remove('bi-eye-slash');
      document.getElementById('togglePassword')?.classList.add('bi-eye');
    }else{
      document.getElementById('password')?.setAttribute('type','password')
      document.getElementById('togglePassword')?.classList.remove('bi-eye');
      document.getElementById('togglePassword')?.classList.add('bi-eye-slash');
    }
  }

  seeConfPass(){
    console.log(document.getElementById('passwordconf')?.getAttribute('type'))
    if(document.getElementById('passwordconf')?.getAttribute('type') == 'password'){
      document.getElementById('passwordconf')?.setAttribute('type','text')
      document.getElementById('togglePassword1')?.classList.remove('bi-eye-slash');
      document.getElementById('togglePassword1')?.classList.add('bi-eye');
    }else{
      document.getElementById('passwordconf')?.setAttribute('type','password')
      document.getElementById('togglePassword1')?.classList.remove('bi-eye');
      document.getElementById('togglePassword1')?.classList.add('bi-eye-slash');
    }
  }

}
