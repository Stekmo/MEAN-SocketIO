import { Injectable } from '@angular/core';
import { isNullOrUndefined } from "util";

@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user){
    if(user.name == isNullOrUndefined || user.password == isNullOrUndefined || user.email == isNullOrUndefined || user.username == isNullOrUndefined){
      return false;
    } else{
      return true;
    }
  }

  validateEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}
