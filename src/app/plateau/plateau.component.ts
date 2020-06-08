import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-plateau',
  templateUrl: './plateau.component.html',
  styleUrls: ['./plateau.component.css']
})
export class PlateauComponent implements OnInit {
  tab_plateau = [];
  tab_rempli = false;
  ligne_un = [];
  ligne_deux = [];
  ligne_trois = [];
  ligne_quatre = [];
  ligne_cinq = [];
  ligne_six = [];
  user = {identifiant: ''};
  colonne = new FormControl('');
  statut_info = "";
  adversaire = "";
  etat_partie = "";
  tour = "";
  joueur = "";
  winner = "";

  constructor() { }

  ngOnInit(): void {
    this.initUser();
    this.initPlateau();
    this.statut();
    //lancer timeout après participation si pas d'adversaire
    //lancer timeout si partie en cours
    setTimeout(() => {
      this.initPlateau();
    },1000);
  }

  //Initialise la variable user avec l'user connecté
  initUser(): void{
    var users = JSON.parse(localStorage.getItem('users'));
    users.forEach((u) => {if(u.currentUser == "1"){ this.user = u;}});
    console.log(this.user);
  }

  initPlateau(): void{
    console.log(this.user.identifiant);
    const url = "https://trankillprojets.fr/P4/?statut&identifiant="+this.user.identifiant;

    var self = this;
    fetch(url)
    .then((response) => response.json())
    .then(function(data) {
      console.log(data);
        if(data.carte != "undefined"){
          self.joueur = data.joueur;
          var tab = data.carte;
          self.ligne_six = tab.substring(2,15).split(",","7");
          self.ligne_cinq = tab.substring(18,31).split(",","7");
          self.ligne_quatre = tab.substring(34,47).split(",","7");
          self.ligne_trois = tab.substring(50,63).split(",","7");
          self.ligne_deux = tab.substring(66,79).split(",","7");
          self.ligne_un = tab.substring(82,95).split(",","7");
          self.tab_plateau = [self.ligne_six,self.ligne_cinq,self.ligne_quatre,self.ligne_trois,self.ligne_deux,self.ligne_un];

          if(data.statut.search("gagne") == -1){
            self.tab_rempli = true;
          }
          /*
          console.log(self.ligne_six);
          console.log(self.ligne_cinq);
          console.log(self.ligne_quatre);
          console.log(self.ligne_trois);
          console.log(self.ligne_deux);
          console.log(self.ligne_un); */
        }else{
          self.etat_partie = "Aucune partie en cours";
        }
    });
  }

  

  jouer(): void{
    const url = "https://trankillprojets.fr/P4/?jouer&position="+this.colonne.value+"&identifiant="+this.user.identifiant;

    var self = this;
    fetch(url)
    .then((response) => response.json())
    .then(function(data) {
      if(data.joueur == data.tour){
        self.tour = "C'est votre tour";
      }else{
        self.tour = "C'est le tour de votre adversaire";
      }
      self.initPlateau();
      self.statut();
    });
  }

  participer(): void{
    const url = "https://trankillprojets.fr/P4/?participer&identifiant="+this.user.identifiant;

    var self = this;
    fetch(url)
    .then((response) => response.json())
    .then(function(data) {
      console.log("PARTICIPER");
      console.log(data);
    });
  }

  statut(): void{
    const url = "https://trankillprojets.fr/P4/?statut&identifiant="+this.user.identifiant;
    
    var self = this;
    fetch(url)
    .then((response) => response.json())
    .then(function(data) {
      console.log("STATUT");
      console.log(data);
      if(data.statut != "en cours"){
        self.etat_partie = "Aucune partie en cours";
        self.joueur = "";
        if(data.statut.search("gagne")){
          if(data.statut.search(data.joueur) != -1){
            self.winner = "Vous avez gagné votre dernière partie contre "+data.adversaire;
          }else{
            self.winner = "Vous avez perdu votre dernière partie contre "+data.adversaire;
          }
        }
      }else if(data.statut.search("gagne") != -1){
        if(data.statut.search(data.joueur) != -1){
          self.etat_partie = "Aucune partie en cours";
          self.winner = "Vous avez gagné contre "+data.adversaire;
          self.joueur = "";
          self.tab_rempli = false;
        }else{
          self.winner = "Vous avez perdu contre "+data.adversaire;
        }
      }
      else{
        self.adversaire = "Votre adversaire: "+ ((data.adversaire == null)? 'En attente' : data.adversaire);
        self.etat_partie = "Partie: "+data.statut;
        if(data.joueur == data.tour){
          self.tour = "C'est votre tour";
        }else{
          self.tour = "C'est le tour de votre adversaire";
        }
      }
    });
  }
}
