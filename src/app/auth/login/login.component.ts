import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngxs/store';

import { TranslateModule } from '@ngx-translate/core';
import { AlertComponent } from '../../shared/components/widgets/alert/alert.component';
import { BreadcrumbComponent } from '../../shared/components/widgets/breadcrumb/breadcrumb.component';
import { ButtonComponent } from '../../shared/components/widgets/button/button.component';
import { Breadcrumb } from '../../shared/interface/breadcrumb';
import { AuthService } from '../../shared/services/auth.service';
import { Login } from '../../shared/action/auth.action';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [
    BreadcrumbComponent,
    AlertComponent,
    ReactiveFormsModule,
    RouterLink,
    ButtonComponent,
    TranslateModule
],
})
export class LoginComponent {

  public form: FormGroup;
  public breadcrumb: Breadcrumb = {
    title: "Log in",
    items: [{ label: 'Log in', active: true }]
  }

  constructor(
    private store: Store,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.form = this.formBuilder.group({
      email: new FormControl('john.customer@example.com', [Validators.required, Validators.email]),
      password: new FormControl('123456789', [Validators.required]),
    });
  }

  submit() {
    this.form.markAllAsTouched();
    if(this.form.valid) {
      this.store.dispatch(new Login(this.form.value)).subscribe({
        complete: () => {
          // Navigate to the intended URL after successful login
          const redirectUrl = this.authService.redirectUrl || '/account/dashboard';
          this.router.navigateByUrl(redirectUrl);

          // Clear the stored redirect URL
          this.authService.redirectUrl = undefined;
        }
      });
    }
  }

}
