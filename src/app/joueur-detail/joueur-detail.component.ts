import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Joueur } from '../joueur';


@Component({
  selector: 'app-joueur-detail',
  templateUrl: './joueur-detail.component.html',
  styleUrls: ['./joueur-detail.component.css']
})
export class JoueurDetailComponent implements OnInit {
  joueur = null;
  
  constructor(private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.initUser();
  }

  goBack(): void {
    this.location.back();
  }

  initUser(): void{
    const id = this.route.snapshot.paramMap.get('id');
    if(localStorage.getItem('liste-joueurs') != null){
      var rawData = localStorage.getItem('liste-joueurs');
      var data = JSON.parse(rawData);
      data.forEach(element => {
        if(element.id == id){
          this.joueur = element;
        }
      });
    }
  }
}
