import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable, ObservableInput, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;
  isLoggedIn = false;
  constructor( private afAuth: AngularFireAuth,
    public toast : ToastrService,
    public router : Router) {
      this.user$ = this.afAuth.authState.pipe(
        switchMap((user:any)  => {
          if (user) {
            this.isLoggedIn = true;
            return user;
          } else {
            this.isLoggedIn = false;
            return of(null);
          }
        })
      );
     }



  // async emailSignUp(userFrom) {
  //   console.log("here");
    
  //   this.afAuth.createUserWithEmailAndPassword(userFrom.email, userFrom.password).then(u => {
  //     if (u.additionalUserInfo.isNewUser) {
  //       const user: any = u.user;
  //       console.log("user",user);
        
  //               return   this.router.navigate(['/']);;
  //     }
  //   }).catch(err => {
  //     console.log('User Already Exists, Please login', 'Unable to Create Account');
  //   });
  // }

  async emailSignIn(userFrom : any) {
    console.log("reaaaaaaaaaaaaaaaa");
    
    this.afAuth.signInWithEmailAndPassword(userFrom.email, userFrom.password)
      .then((res :any) => {
        console.log("91",res);
        const user: any = res.user;
        console.log("93",res.user)
       // this.createdUserInstance = user;
        this.router.navigate(['/']);
        return;
      })
      .catch(error => {
        console.log("error",error);   
        this.toast.error( 'Unable to login', "please enter corret email or password");
      
    });
  }

  async signOut() {
    console.log("hit ssssssssssss");
    
    await this.afAuth.signOut().then(res => {
      this.toast.show("successfully logout")
    }).catch(err => {
     console.log("errrr",err)
    });
    return this.router.navigate(['/']);
  }
}
