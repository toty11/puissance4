import { Component, OnInit } from '@angular/core';
import { JOUEUR } from '../joueur-liste';
import { JoueurService } from '../joueur.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-liste-joueur',
  templateUrl: './liste-joueur.component.html',
  styleUrls: ['./liste-joueur.component.css']
})
export class ListeJoueurComponent implements OnInit {

  pseudo = new FormControl('');
  identifiant = new FormControl('');
  info_ajout_joueur = "";
  user = null;
  joueurs = [];
  constructor(private joueurService: JoueurService) { }

  ngOnInit(): void {
    this.user = this.initUser();
    var players = [{ id: 11, name: 'Dr Nice' , statut: 'OK'},
    { id: 12, name: 'Narco' , statut: 'OK'},
    { id: 13, name: 'Bombasto' , statut: 'OK'},
    { id: 14, name: 'Celeritas' , statut: 'NOK'},
    { id: 15, name: 'Magneta' , statut: 'NOK'}];
    localStorage.setItem('liste-joueurs',JSON.stringify(players));
    this.getJoueur();
  }

  //Récupère le json contenant la liste des joueurs
  getJoueur(): void{
    if(localStorage.getItem('liste-joueurs') != null){
      var rawData = localStorage.getItem('liste-joueurs');
      var data = JSON.parse(rawData);
      this.joueurs = data;
    }
  }

  initUser(){
    var user = {
      identifiant: localStorage.getItem('identifiant'),
      pseudo: localStorage.getItem('pseudo') 
    }
    return user;
  }

  //Ajoute à la variable localstorage players le nouveau joueur si il n'est pas présent
  ajouterJoueur(): void{
    var newUser = {id: this.identifiant.value, name: this.pseudo.value, statut: 'OK'};
    var userNotFound = true;
    this.joueurs.forEach((j) => { if(j.id == newUser.id){
      userNotFound = false;
    }});
    if(userNotFound){
      this.joueurs.push(newUser);
      localStorage.setItem('liste-joueurs',JSON.stringify(this.joueurs));
      this.info_ajout_joueur = "Le joueur à été ajouter.";
      this.identifiant.setValue("");
      this.pseudo.setValue("");
    }else{
      this.info_ajout_joueur = "Vous avez déjà ajoutez ce joueur.";
    }
  }
}
