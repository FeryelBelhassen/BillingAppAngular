import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { SlideMenu } from 'primeng/slidemenu';
import { ContextMenu } from 'primeng/contextmenu';
import { User } from '../demo/domain/user';
import { UserService } from '../demo/services/user.service';
import { AuthService } from '../demo/services/auth.service';
import { Router } from '@angular/router';
import { Useer } from '../demo/domain/useer';
import { HttpClient } from '@angular/common/http';
declare var myScript: any;
@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    styleUrls: ['./app.topbar.component.css'],
})
export class AppTopBarComponent {
    showMenu = false;
    items!: MenuItem[];
    userValue!: Useer;
    visible!: boolean;
    sidebarVisible!: boolean;
    username: string;
    
    id!:number;

    user!:User;
    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;
   
    loggedInUser!: User;

    editFormOpen = false;
    
    constructor(public layoutService: LayoutService, private authService: AuthService,
        private route: Router, private userService: UserService, private http: HttpClient) { 
          this.username = authService.getUsername();
        console.log(this.username)
        }
    
    
    
    ngOnInit() {
       /* this.loggedInUser = this.authService.getLoggedInUser();*/
 
       
       
    }
    toggleMenu(){
        this.showMenu = !this.showMenu;
        this.authService.userValue.username;
    }

    get(){
      //this.showAccountForm = true;
      this.userService.getUser(this.id);
      console.log( "feryel",this.userService.getUser(this.id));
    }

    openEditForm() {
      this.editFormOpen = true;
    }


    logout() {
      this.authService.logout();
      this.route.navigateByUrl('/auth/login');
    }
       
       
     
      

    
}
  

