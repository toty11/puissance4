import { Component, OnInit } from '@angular/core';
import { JOUEUR } from '../joueur-liste';
import { JoueurService } from '../joueur.service';

@Component({
  selector: 'app-liste-joueur',
  templateUrl: './liste-joueur.component.html',
  styleUrls: ['./liste-joueur.component.css']
})
export class ListeJoueurComponent implements OnInit {

  joueurs = JOUEUR;
  constructor(private joueurService: JoueurService) { }

  ngOnInit(): void {
    
  }

  getJoueur(): void{
    
  }
}
