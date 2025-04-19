import { Component, TemplateRef, ViewChild, PLATFORM_ID, Inject, inject } from '@angular/core';
import { isPlatformBrowser, AsyncPipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Select, Store } from '@ngxs/store';
import { map, Observable } from 'rxjs';
import { Select2Data, Select2UpdateEvent, Select2Module } from 'ng-select2-component';
import { CreateAddress, UpdateAddress } from '../../../../action/account.action';
import { CountryState } from '../../../../state/country.state';
import { StateState } from '../../../../state/state.state';
import { UserAddress } from '../../../../interface/user.interface';
import * as data from '../../../../data/country-code';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../../button/button.component';
import { AccountState } from 'src/app/shared/state/account.state';

@Component({
    selector: 'address-modal',
    templateUrl: './address-modal.component.html',
    styleUrls: ['./address-modal.component.scss'],
    standalone: true,
    imports: [ButtonComponent, ReactiveFormsModule, Select2Module, AsyncPipe, TranslateModule]
})
export class AddressModalComponent {

  public form: FormGroup;
  public closeResult: string;
  public modalOpen: boolean = false;

  public states$: Observable<Select2Data>;
  public address: UserAddress | null;
  public codes = data.countryCodes;
  public isBrowser: boolean;
  
  @ViewChild("addressModal", { static: false }) AddressModal: TemplateRef<string>;
  
  countries$: Observable<Select2Data> = inject(Store).select(CountryState.countries);
  user$ : Observable<any> = inject(Store).select((AccountState.user));

  constructor(private modalService: NgbModal,
    @Inject(PLATFORM_ID) private platformId: Object,
    private store: Store,
    private formBuilder: FormBuilder) {
      this.isBrowser = isPlatformBrowser(this.platformId);
    this.form = this.formBuilder.group({
      titre: new FormControl('', [Validators.required]),
      ville: new FormControl('', [Validators.required]),
      etat: new FormControl('', [Validators.required]),
      country_code: new FormControl('', [Validators.required]),
      numero_telephone: new FormControl('', [Validators.required]),
      pays: new FormControl('', [Validators.required]),
      adresse: new FormControl('', [Validators.required]),
      idUser: new FormControl(''),
      idAdresse: new FormControl('') 
    })
  }

  countryChange(data: Select2UpdateEvent) {
    if(data && data?.value) {
      this.states$ = this.store
          .select(StateState.states)
          .pipe(map(filterFn => filterFn(+data?.value)));

      let index = 0;
      let pays : any;
      this.countries$.subscribe((country)=>{
          index = country.findIndex((pays: any)=> pays.value == data?.value);
        pays = country[index]
      });
      //this.form?.controls?.["pays"].setValue(country[index].label)

    } 
  }

  stateChange(data: Select2UpdateEvent){
    if(data && data?.value){
      let index = 0;
      let value : any;
       this.states$.subscribe((state)=>{
           index = state.findIndex((st: any)=> st.value == data?.value);
           value = state[index];

       });

      //console.log('etat value', value.label);
     // this.form?.controls?.["etat"].setValue(value.label);

    }
  }

  async openModal(value?: UserAddress) {
    if (isPlatformBrowser(this.platformId)) {  
      this.modalOpen = true;
      this.patchForm(value);
      this.modalService.open(this.AddressModal, {
        ariaLabelledBy: 'address-add-Modal',
        centered: true,
        windowClass: 'theme-modal modal-lg'
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

  patchForm(value?: UserAddress) {
    console.log('value ', value);
    if(value) {
      this.address = value;
      this.form.patchValue({
        idUser: value?.idUser,
        titre: value?.titre,
        country_id: value?.pays,
        state_id: value?.etat,
        ville: value?.ville,
        adresse: value?.adresse,
        pays: value?.pays,
        country_code: "237",
        idAdresse: value?.idAdresse,
        numero_telephone: value?.numero_telephone
      });
    } else {
      this.address = null;
      this.form.reset();
      this.form?.controls?.['country_code'].setValue('237');
    }
  }

  submit(){
   
    this.user$.subscribe((user) => {
      this.form?.controls?.['idUser'].setValue(user.user.id);
    });
    
    let action: any;
    if(!this.address){
      action = new CreateAddress(this.form.value);
    }else{
     action = new UpdateAddress(this.form.value, this.address.idAdresse);
    }

    if(this.form.valid) {
      this.store.dispatch(action).subscribe({
        complete: () => {
          this.form.reset();
          this.modalService.dismissAll();
          this.modalOpen = false;
          if(!this.address){
            this.form?.controls?.['country_code'].setValue('237');
          }
        }
      });
    }
  }

  ngOnDestroy() {
    if(this.modalOpen) {
      this.modalService.dismissAll();
    }
  }

}
