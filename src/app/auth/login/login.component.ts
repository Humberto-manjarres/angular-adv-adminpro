import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators} from "@angular/forms";
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';


/* usamos 'declare' xq google lo tenemos importado de manera global en el index.html principal */
declare const google: any;


/* 
  Credenciales : 'elias@gmail.com' -- '123456'
*/
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
  
  /* de esta manera llamamos la referencia local del botón de google que está en el 'login.component.html', ya que no llamamos al boton por el 'Id' */
  @ViewChild('googleBtn') googleBtn: ElementRef | undefined;
  
  public formSubmitted = false;

  public loginForm = this.fb.group({
    /* (localStorage.getItem('email') || '') --> si no exite un email, envie un string vacío */
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [false]
  });


  constructor(private router: Router, private fb: FormBuilder, private usuarioService: UsuarioService, private ngZone:NgZone) { }
  
  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit(){
    
    google.accounts.id.initialize({
      client_id: "767489549606-fe3vaardt0sb2t7mv8tnumdveo6haj3m.apps.googleusercontent.com",
      callback: (response: any) => this.handleCredentialResponse(response)
    });

    google.accounts.id.renderButton(
      /* document.getElementById("buttonDiv") */
      this.googleBtn?.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse(response: any){
    //console.log("Encoded JWT ID token: " + response.credential);
    this.usuarioService.loginGoogle(response.credential)
        .subscribe({
          next: ()=> 
          this.ngZone.run(()=> {
            this.router.navigateByUrl('/');
          }),  
          error: (err)=> console.log(err)
        });
  }

  ngOnInit(): void {
  }

  login(){
    console.log(this.loginForm.value);
    this.usuarioService.login(this.loginForm.value).subscribe({
      next: (resp) => {
        if (this.loginForm.get('remember')?.value) {
          localStorage.setItem('email', this.loginForm.get('email')?.value+'');
        }else{
          localStorage.removeItem('email');
        }        
        //Navegar al Dashboard
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        Swal.fire('Error',err.error.msg, 'error');
      }
    });
    //this.router.navigateByUrl('/');
  }

}
