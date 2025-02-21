import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { VerifyEmailOtp } from '../../../shared/action/auth.action';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../../../shared/components/widgets/button/button.component';
import { AlertComponent } from '../../../shared/components/widgets/alert/alert.component';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';

@Component({
    selector: 'app-otp',
    templateUrl: './otp.component.html',
    styleUrls: ['./otp.component.scss'],
    standalone: true,
    imports: [
        BreadcrumbComponent,
        AlertComponent,
        ReactiveFormsModule,
        ButtonComponent,
        TranslateModule,
    ],
})
export class OtpComponent {

  public form: FormGroup;
  public email: string;
  public breadcrumb: Breadcrumb = {
    title: "OTP",
    items: [{ label: 'OTP', active: true }]
  }

  constructor(
    public router: Router, 
    public store: Store, 
    public formBuilder: FormBuilder
  ) {
    this.email = this.store.selectSnapshot(state => state.auth.email);
    this.form = this.formBuilder.group({
      otp: new FormControl('', [Validators.required, Validators.minLength(5)]),
    });
  }

  submit() {
    this.form.markAllAsTouched();
    if(this.form.valid) {
      this.store.dispatch(new VerifyEmailOtp({ 
        email: this.email, 
        token: this.form.value.otp
      })).subscribe(
        {
          complete: () => { 
            this.router.navigateByUrl('/auth/update-password'); 
          }
        }
      );
    }
  }

}

