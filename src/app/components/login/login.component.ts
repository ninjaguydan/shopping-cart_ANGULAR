import { Component, OnInit } from '@angular/core';
import {DataService} from "../../data.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username!:string
  password!:string
  error!:string|void

  constructor(private dataService:DataService) { }

  ngOnInit(): void {
  }
  login(){
    this.error=this.dataService.login(this.username, this.password)
  }

}
