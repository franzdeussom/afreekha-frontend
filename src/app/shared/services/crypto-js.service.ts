import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
 
@Injectable({
  providedIn: 'root'
})
export class CryptoJsService {

key : string = "afreekha2025";

constructor() { }

encryptData(data: any) {
  try {
    return CryptoJS.AES.encrypt(JSON.stringify(data), this.key).toString();
  } catch (e) {
    console.log(e);
  }

}

decryptData(data: string): any{
  try {
    const bytes = CryptoJS.AES.decrypt(data, this.key);
    if (bytes.toString()) {
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
    return data;
  } catch (e: any) {
    console.log(e.message);
  }
}


}

