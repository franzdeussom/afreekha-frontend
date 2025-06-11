import { Component, TemplateRef, ViewChild, PLATFORM_ID, Inject, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AccountUser } from "../../../../interface/account.interface";
import { AccountState } from '../../../../state/account.state';
import { UpdateUserProfile } from '../../../../action/account.action';
import * as data from '../../../../data/country-code';
import { TranslateModule } from '@ngx-translate/core';
import { Select2Module } from 'ng-select2-component';
import { ButtonComponent } from '../../button/button.component';
import { ExpressOrder } from 'src/app/shared/action/order.action';

@Component({
    selector: 'app-express-user-modal',
    templateUrl: './express-user-modal.component.html',
    styleUrls: ['./express-user-modal.component.scss'],
    standalone: true,
    imports: [ButtonComponent, ReactiveFormsModule, Select2Module, TranslateModule]
})
export class ExpressUserModalComponent {

  user$: Observable<any> = inject(Store).select(AccountState.user) as Observable<any>;

  public form: FormGroup;
  public closeResult: string;

  public modalOpen: boolean = false;
  public flicker: boolean = false;
  public isBrowser: boolean;
  commande: any;
  @ViewChild("profileModal", { static: false }) ProfileModal: TemplateRef<string>;
  
  constructor(private modalService: NgbModal,
    private store: Store, @Inject(PLATFORM_ID) private platformId: Object,
    private formBuilder: FormBuilder) {
      this.isBrowser = isPlatformBrowser(this.platformId);
        this.form = this.formBuilder.group({
          nom: new FormControl("", [Validators.required]),
          prenom: new FormControl("", [Validators.required]),
          tel: new FormControl("", [Validators.required, Validators.pattern(/^[0-9]*$/)]),
          express_adresse: new FormControl("", [Validators.required]), 
        });
  }

  async openModal(value?: any) {
    if (isPlatformBrowser(this.platformId)) {  
      this.modalOpen = true;
      this.commande = value;

      this.modalService.open(this.ProfileModal, {
        ariaLabelledBy: 'profile-Modal',
        centered: true,
        windowClass: 'theme-modal'
      }).result.then((result) => {
        `Result ${result}`
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }

  }

  private getDismissReason(reason: ModalDismissReasons): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  submit(){
    this.form.markAllAsTouched();
    if(this.form.valid) {
      this.commande['isExpressOrder'] = true;
      this.commande['userData'] = this.form.value;
      console.log('commande', this.commande);
      this.store.dispatch(new ExpressOrder(this.commande))
      this.modalService.dismissAll();
    }
    this.modalService.dismissAll();
  }

  ngOnDestroy() {
    if(this.modalOpen) {
      this.modalService.dismissAll();
    }
  }

}
