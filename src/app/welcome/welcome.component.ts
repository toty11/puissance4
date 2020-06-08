import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { MessageService } from '../message.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})

export class WelcomeComponent implements OnInit {
  pseudo = new FormControl('');
  userCheck = true;
  users = [];
  message = "";

  constructor(private messageService: MessageService, private location: Location, private router: Router) {}
  
  ngOnInit(): void {
    this.resetConnexion();
  }

  inscription(): void{
    const url = "https://trankillprojets.fr/P4/?inscription&pseudo="+this.pseudo.value;
    //const url = "https://trankillprojets.fr/P4/?statut&identifiant=34b3ea78c86e775535b1b5b812ace5b6fea83550aac9273c9ee435c4f103b39d";
    var self = this;
    fetch(url)
    .then((response) => response.json())
    .then(function(data) {
      if(data.etat == 'OK'){
        console.log(data);
        self.ajouterJoueur(data);
      }else{
        self.message = "Ce pseudo est déjà utilisé.";
      }
    });
  }

  resetConnexion(): void{
    if(localStorage.getItem('users') != null){
      var users = JSON.parse(localStorage.getItem('users'));
      users.forEach((user) => {user.currentUser = '0';});
      localStorage.setItem('users', JSON.stringify(users));
    }
  }

  //Ajoute à la variable localstorage players le nouveau joueur si il n'est pas présent
  ajouterJoueur(data): void{
    var newUser = {identifiant: data.identifiant, pseudo: data.pseudo, currentUser: '1'};
    var userNotFound = true;
    var users = JSON.parse(localStorage.getItem('users'));
    users.forEach((user) => { if(user.identifiant == newUser.identifiant){
      userNotFound = false;
    }});

    if(userNotFound){
      users.push(newUser);
      localStorage.setItem('users',JSON.stringify(users));
      this.message = "Votre compte à été créé.";
      this.router.navigate(["/jouer"]);
    }else{
      this.message = "Vous avez déjà ajoutez ce compte.";
    }
  }
}
