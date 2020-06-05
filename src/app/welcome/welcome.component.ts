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
  user = null;
  userCheck = true;
  message = "";
  constructor(private messageService: MessageService, private location: Location, private router: Router) {}

  ngOnInit(): void {
    this.user = (localStorage.getItem('identifiant') != null) ? this.initUser() : null;
    if(this.user == null){ this.userCheck = false;}
  }

  inscription(): void{
    const url = "https://trankillprojets.fr/P4/?inscription&pseudo="+this.pseudo.value;
    //const url = "https://trankillprojets.fr/P4/?statut&identifiant=34b3ea78c86e775535b1b5b812ace5b6fea83550aac9273c9ee435c4f103b39d";
    var self = this;
    fetch(url)
    .then((response) => response.json())
    .then(function(data) {
      if(data.etat == 'OK'){
        self.message = "Votre compte à été créé.";
        localStorage.setItem('identifiant',data.identifiant);
        localStorage.setItem('pseudo',data.pseudo);
        self.router.navigate(["/joueurs"]);
      }else{
        self.message = "Ce pseudo est déjà utilisé.";
      }
    });
  }

  initUser(){
    var user = {
      identifiant: localStorage.getItem('identifiant'),
      pseudo: localStorage.getItem('pseudo') 
    }
    return user;
  }

  play(){
    this.router.navigate(["/joueurs"]);
  }
}
