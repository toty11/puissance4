import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-joueur-detail',
  templateUrl: './joueur-detail.component.html',
  styleUrls: ['./joueur-detail.component.css']
})
export class JoueurDetailComponent implements OnInit {
  participer_info = "";
  statut_info = "";
  jouer_info = "";
  colonne = new FormControl('');

  constructor(private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
  }

  goBack(): void {
    this.location.back();
  }

  participer(): void{
    //const url = "https://trankillprojets.fr/P4/?participer&identifiant=34b3ea78c86e775535b1b5b812ace5b6fea83550aac9273c9ee435c4f103b39d&adversaire=toty";
    const url = "https://trankillprojets.fr/P4/?participer&identifiant=47617ec484740548bbd62a0b2e7580e62647acd03a1b59843541285c06300c3e&adversaire=cuda";

    var self = this;
    fetch(url)
    .then((response) => response.json())
    .then(function(data) {
      self.participer_info = JSON.parse(data);
    });
  }

  statut(): void{
    const url = "https://trankillprojets.fr/P4/?statut&identifiant=34b3ea78c86e775535b1b5b812ace5b6fea83550aac9273c9ee435c4f103b39d"; //cuda
    //const url = "https://trankillprojets.fr/P4/?statut&identifiant=47617ec484740548bbd62a0b2e7580e62647acd03a1b59843541285c06300c3e"; //toty
    var self = this;
    fetch(url)
    .then((response) => response.json())
    .then(function(data) {
      self.statut_info = JSON.parse(data);
    });
  }

  jouer(): void{
    const url = "https://trankillprojets.fr/P4/?jouer&position="+this.colonne.value+"&identifiant=34b3ea78c86e775535b1b5b812ace5b6fea83550aac9273c9ee435c4f103b39d";
    //const url = "https://trankillprojets.fr/P4/?jouer&position="+this.colonne.value+"&identifiant=47617ec484740548bbd62a0b2e7580e62647acd03a1b59843541285c06300c3e";
    
    var self = this;
    fetch(url)
    .then((response) => response.json())
    .then(function(data) {
      self.statut_info = JSON.parse(data);
    });
  }
}
