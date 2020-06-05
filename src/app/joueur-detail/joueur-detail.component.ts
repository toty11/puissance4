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
  joueur: Joueur = {
    id: 123,
    name: 'test',
    statut: 'OK'
  }
  
  constructor(private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    
  }

  goBack(): void {
    this.location.back();
  }
}
