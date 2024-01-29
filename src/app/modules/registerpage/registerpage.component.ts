import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Registeruser } from 'src/app/models/registeruser';
import { UserRole } from 'src/app/models/userrole';
import { AuthuserService } from 'src/app/services/authuser.service';

@Component({
  selector: 'app-registerpage',
  templateUrl: './registerpage.component.html',
  styleUrls: ['./registerpage.component.sass'],
  providers:[MessageService]
})
export class RegisterpageComponent implements OnInit {
  userRegistrationForm!: FormGroup;
  userRoles!:UserRole[];

  constructor(private formBuilder: FormBuilder, private authuser: AuthuserService,private router:Router,
    private messageService: MessageService) { }

  ngOnInit(): void {

      
      this.initializeForm();
  }

  initializeForm() {
    this.userRegistrationForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(10)]],
      selectedRole: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
    this.initializeUsersRoles()

  }

  initializeUsersRoles(){
  this.authuser.getallUserRole().subscribe(res=>{
    this.userRoles=res
    // console.log(res);
    
  })
  }

  

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onClickRegister() {
    if (this.userRegistrationForm.valid) {
        
      const userrole = this.userRegistrationForm.get('selectedRole')?.value

        const user: Registeruser = {
          username: this.userRegistrationForm.get('userName')?.value,
          email: this.userRegistrationForm.get('email')?.value,
          password: this.userRegistrationForm.get('password')?.value,
          role: userrole.roleName
        };
        console.log(user);
        
        this.authuser.addNewUser(user).subscribe(
          (res) => {
            console.log("Registered successfully!");
            this.messageService.add({ severity: 'success', summary: 'Registered successfully!', detail: 'valid credentials!' });

            setTimeout(() => {
              this.userRegistrationForm.reset();
              this.router.navigate(['/u/loginpage']);
            }, 1000);

          }
        );
     
        }}
  


}
