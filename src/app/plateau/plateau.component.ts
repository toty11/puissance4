import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plateau',
  templateUrl: './plateau.component.html',
  styleUrls: ['./plateau.component.css']
})
export class PlateauComponent implements OnInit {
  tab_plateau = [];
  ligne_un = [];
  ligne_deux = [];
  ligne_trois = [];
  ligne_quatre = [];
  ligne_cinq = [];
  ligne_six = [];

  constructor() { }

  ngOnInit(): void {
    this.initPlateau();
  }

  initPlateau(): void{
    const url = "https://trankillprojets.fr/P4/?statut&identifiant=34b3ea78c86e775535b1b5b812ace5b6fea83550aac9273c9ee435c4f103b39d";

    var self = this;
    fetch(url)
    .then((response) => response.json())
    .then(function(data) {
      var tab = data.carte;
      console.log(tab);
      self.ligne_six = tab.substring(2,15).split(",","7");
      self.ligne_cinq = tab.substring(18,31).split(",","7");
      self.ligne_quatre = tab.substring(34,47).split(",","7");
      self.ligne_trois = tab.substring(50,63).split(",","7");
      self.ligne_deux = tab.substring(66,79).split(",","7");
      self.ligne_un = tab.substring(82,95).split(",","7");
      console.log(self.ligne_six);
      console.log(self.ligne_cinq);
      console.log(self.ligne_quatre);
      console.log(self.ligne_trois);
      console.log(self.ligne_deux);
      console.log(self.ligne_un);
    });
  }
}
