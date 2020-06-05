import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  pseudo = new FormControl('');
  identifiant = new FormControl('');
  users = [];
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.initUsers();
  }

  connexionUser(): void{
    var newUser = {identifiant: this.identifiant.value, pseudo: this.pseudo.value, currentUser: '1'};
    var users = [];
    if(localStorage.getItem('users') != null){
      users = JSON.parse(localStorage.getItem('users'));
    }
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    this.router.navigate(["/joueurs"]);
  }

  connexionUserSelect(user): void{
    var users = JSON.parse(localStorage.getItem('users'));
    users.forEach(element => {
      if(element.identifiant == user.identifiant){
        element.currentUser = '1';
      }
    });
    localStorage.setItem('users', JSON.stringify(users));
    this.router.navigate(["/joueurs"]);
  }

  initUsers(): void{
    if(localStorage.getItem('users') != null){
      var rawData = localStorage.getItem('users');
      var data = JSON.parse(rawData);
      this.users = data;
    }
  }
}
