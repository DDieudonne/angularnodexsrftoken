import { Injectable } from '@angular/core';
import { RESOURCE_CACHE_PROVIDER } from '@angular/platform-browser-dynamic';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlServer = environment.urlServer;
  private dataCrypted;
  private xsrfoken;

  constructor(private httpClient: HttpClient) { }

  getCsrfServer() {
    let options: any = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), observe: 'body', responseType: 'json' };
    return this.httpClient.get(this.urlServer, options);
  }

  setXsrf(xsrf) {
    this.xsrfoken = xsrf;
  }

  getXsrf() {
    return this.xsrfoken;
  }
  login(email, pass) {
    let url = this.urlServer + 'api/login';
    let headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let params = new HttpParams();
    this.crypted(email, pass, environment.key, environment.keySize, environment.iv);
    params = params.set('email', this.dataCrypted.email)
    params = params.set('pass', this.dataCrypted.pass);
    let options: any = { headers: headers, params: params, observe: 'body' };
    return this.httpClient.post(url, options);
  }

  crypted(email, pass, keyPass, keySize, iv) {
    let optionsEncrypted = { keySize: keySize, iv: iv, mode: CryptoJS.mode.CBC };
    let encryptedEmail = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(email), keyPass, optionsEncrypted);
    let encryptedPass = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(pass), keyPass, optionsEncrypted);
    this.dataCrypted = { email: encryptedEmail.toString(), pass: encryptedPass.toString() };
  }


}

