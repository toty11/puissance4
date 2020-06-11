import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription, Observable, timer } from 'rxjs';

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
  user = {identifiant: '', pseudo: ''};
  colonne = new FormControl('');
  statut_info = "";
  adversaire = "";
  etat_partie = "";
  display_plateau = false;
  tour = "";
  joueur = "";
  winner = "";
  tourInfo = "";
  subscription: Subscription;

  constructor() { }

  everySecond: Observable<number> = timer(1000,2000);
  
  ngOnInit(): void {
    this.initUser();
    this.statut();
    this.initPlateau();
  }

  //Initialise la variable user avec l'user connecté
  initUser(): void{
    var users = JSON.parse(localStorage.getItem('users'));
    users.forEach((u) => {if(u.currentUser == "1"){ this.user = u;}});
  }

  initPlateau(): void{
    const url = "https://trankillprojets.fr/P4/?statut&identifiant="+this.user.identifiant;

    var self = this;
    fetch(url)
    .then((response) => response.json())
    .then(function(data) {
      if(typeof(data.carte) !== 'undefined'){
        self.joueur = data.joueur;
        let tab = JSON.stringify(data.carte);
      
        //Création de tableau de dimension 7 de chaque ligne
        //Permet l'affichage du plateau avec ngFor
        self.ligne_six = tab.substring(2,15).split(",",7);
        self.ligne_cinq = tab.substring(18,31).split(",",7);
        self.ligne_quatre = tab.substring(34,47).split(",",7);
        self.ligne_trois = tab.substring(50,63).split(",",7);
        self.ligne_deux = tab.substring(66,79).split(",",7);
        self.ligne_un = tab.substring(82,95).split(",",7);
        self.tab_plateau = [self.ligne_six,self.ligne_cinq,self.ligne_quatre,self.ligne_trois,self.ligne_deux,self.ligne_un];
        if(data.etat.search("gagne") == -1){
          self.tab_rempli = true;
        }
      }
    });
  }

  jouer(colonne: number): void{
    if(this.tour != "C'est le tour de votre adversaire"){
      const url = "https://trankillprojets.fr/P4/?jouer&position="+colonne+"&identifiant="+this.user.identifiant;
      
      var self = this;
      fetch(url)
      .then((response) => response.json())
      .then(function(data) {
        if(data.etat.search("gagne") != -1){
          this.subscription.unsubscribe();
        }
        self.statut();
        self.initPlateau();
      });
    }else{
      alert("Ce n'est pas votre tour");
    }
  }

  participer(): void{
    const url = "https://trankillprojets.fr/P4/?participer&identifiant="+this.user.identifiant;

    var self = this;
    fetch(url)
    .then((response) => response.json())
    .then(function(data) {
      self.subscription = self.everySecond.subscribe((seconds) => {
        self.statut();
        self.initPlateau();
      });
    });
  }

  statut(): void{
    const url = "https://trankillprojets.fr/P4/?statut&identifiant="+this.user.identifiant;
    
    var self = this;
    fetch(url)
    .then((response) => response.json())
    .then(function(data) {
      if(typeof(data.carte) == 'undefined'){
        self.display_plateau = false;
      }

      if(data.etat == "En cours"){
        if(self.display_plateau == false){
          self.initPlateau();
          self.display_plateau = true;
          self.subscription = self.everySecond.subscribe((seconds) => {
            self.statut();
            self.initPlateau();
          });
        }
        self.etat_partie = "Partie: en cours";
        self.adversaire = "Adversaire: "+data.adversaire;
        self.joueur = data.joueur;
        self.tour = data.tour;
        if(data.joueur == data.tour){
          self.tourInfo = "C'est votre tour";
        }else{
          self.tourInfo = "C'est le tour de votre adversaire";
        }
      }else if(data.etat == "En attente"){
        self.etat_partie = data.etat+" d'un adversaire";
      }else if(data.etat.search("gagne") != -1){
        if(data.etat.search(data.joueur) != -1){
          self.etat_partie = "Aucune partie en cours";
          self.winner = "Vous avez gagné";
          self.joueur = "";
          self.tab_rempli = false;
        }else{
          self.winner = "Vous avez perdu contre";
        }
      }
      else if(data.etat == "Match nul"){
        self.etat_partie = data.etat;
        self.joueur = data.joueur;
        self.adversaire = data.adversaire;
        self.winner = "Auncun gagnant";
        self.tab_rempli = false;
        this.subscription.unsubscribe();
      }else if(data.etat == "OK"){
        self.etat_partie = "Aucune partie en cours";
        self.adversaire = "";
        self.tourInfo = "";
        self.joueur = "";
        self.tab_rempli = false;
        self.display_plateau = false;
        this.subscription.unsubscribe();
      }else if(data.etat == "KO"){
        self.etat_partie = "Votre compte n'as pas été reconnu.";
        self.tab_rempli = false;
        this.subscription.unsubscribe();
      }
      else{
        self.etat_partie = "Une erreur est survenu, veuillez réessayer";
      }
    });
  }
}
