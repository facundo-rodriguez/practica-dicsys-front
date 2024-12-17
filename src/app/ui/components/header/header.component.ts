import { Component, OnInit } from '@angular/core';
import { GlobalText } from 'src/app/data/GlobalText';
import { AuthService } from 'src/app/data/services/auth/auth.service';
import { UrlNavigateService } from 'src/app/data/services/url-navigate.service';
import { GlobalUrl } from 'src/app/data/url';


@Component({
  selector:'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public logueado:boolean=false;

  constructor(public globalText:GlobalText, 
              public urlNavigateService:UrlNavigateService,
              public globalUrl:GlobalUrl,
              private authService:AuthService){ }

  ngOnInit(): void {

    this.authService.getEstadoLogin().subscribe(data=>{

      console.log(data)
      this.logueado=data;
    });

    
    (localStorage.getItem("token")) ? this.logueado=true : this.logueado=false;
  }


  navigateHome():void{
    
    this.urlNavigateService.navigateUrl(this.globalUrl.home);
  }

  navigateLogin():void{

    if(!this.logueado) this.urlNavigateService.navigateUrl(this.globalUrl.login); 
  }

  logout(){

    this.authService.logout().subscribe((response)=>{
      
      console.log(response)
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.authService.setEstadoLogin(false);
    },
    (error)=>{
      console.log(error)
    })
    
    
  
  }


}
