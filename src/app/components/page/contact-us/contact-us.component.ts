import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ContactUs } from '../../../shared/action/page.action';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';
import { ButtonComponent } from '../../../shared/components/widgets/button/button.component';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import { Contact, Option } from '../../../shared/interface/theme-option.interface';
import { ThemeOptionState } from '../../../shared/state/theme-option.state';
import { AccountState } from 'src/app/shared/state/account.state';
import { ImageLinkComponent } from 'src/app/shared/components/widgets/image-link/image-link.component';

@Component({
    selector: 'app-contact-us',
    templateUrl: './contact-us.component.html',
    styleUrls: ['./contact-us.component.scss'],
    standalone: true,
    imports: [BreadcrumbComponent, ReactiveFormsModule, ButtonComponent, TranslateModule]
})
export class ContactUsComponent {

  themeOption$: Observable<Option> = inject(Store).select(ThemeOptionState.themeOptions) as Observable<Option>;
  user$: Observable<any> = inject(Store).select(AccountState.user) as Observable<any>;

  public breadcrumb: Breadcrumb = {
    title: "Contact Us",
    items: [{ label: 'Contact Us', active: true }]
  }

  public form: FormGroup;
  public contactData: Contact;

  constructor(private formBuilder: FormBuilder,
    private store: Store){
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      contenus: new FormControl('', [Validators.required]),
      idUser: new FormControl(''),
    });

    this.form.get('email')?.disable();
    this.form.get('name')?.disable();
    
    this.themeOption$.subscribe(data=> this.contactData = data?.contact_us)

    this.user$.subscribe((user: any)=>{
      this.form.patchValue({
        idUser: user?.user?.id,
        email: user?.user?.email,
        phone: user?.user?.tel,
        name: user?.user?.prenom + ' ' + user?.user?.nom 
      })
    })
  }

  submit(){
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.store.dispatch(new ContactUs(this.form.value)).subscribe({
        complete: ()=>{
          this.form.patchValue({
            contenus: ''
          });
        }
      })
    }
  }

  openWhatsapp(){
    const url = "wa.link/re041t"
    window.open("https://"+url, '_blank');
  }
}
