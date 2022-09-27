import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Coordinates } from '../coordinates';
import { HttpService } from '../http.service';
import { ServerRespose } from '../server-response';

@Component({
  selector: 'app-generate-field',
  templateUrl: './generate-field.component.html',
  styleUrls: ['./generate-field.component.css']
})
export class GenerateFieldComponent implements OnInit, OnDestroy {

  pageTitle: string = 'Make your own Battlefield'
  field: number[][] = new Array(10).fill(0).map(() => new Array(10).fill(0));
  message: string  = "";

  clickable: boolean = true;
  ready: boolean = false;

  sub!: Subscription;
  id!: string;

  battleship: number = 0;
  cruisers: number = 0;
  destroyers: number = 0;
  submarines: number = 0;
  errorMessage: any;
  
  constructor(private router: Router, private http: HttpService) {   }

  ngOnInit(): void {
    let id = localStorage.getItem('id');
    if (id) { this.id = id; this.message = id; }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  setShip(x: number, y: number): void {
    let coordinates = new Coordinates(this.id, x, y);
    this.clickable = false;

    if (this.field[x][y] === 0) { 
      this.addShip(coordinates);
    } else {
      this.deleteShip(coordinates);
    }
  }

  addShip(coordinates: Coordinates): void {
    this.sub = this.http.addShip(coordinates).subscribe({
      next: response => {
        this.processResponse(response, coordinates.x, coordinates.y)
      },
       error: err => this.message = err
    });
  }

  deleteShip(coordinates: Coordinates): void {
    this.sub = this.http.deleteShip(coordinates).subscribe({
      next: response => {
        this.processResponse(response, coordinates.x, coordinates.y);
      },
      error: err => this.message = err
    });
  }

  processResponse(response: ServerRespose, x: number, y: number): void {
    if (response.allShipHaveRightPosition) { 
      this.field = response.field;
      this.message = "" 
    } else { this.message = "Cannot be placed here" }
    
    this.battleship = response.battleship;
    this.cruisers = response.cruisers;
    this.destroyers = response.destroyers;
    this.submarines = response.submarines;

    this.clickable = true;
    this.ready = response.ready;
  }

  startGame(): void {
    this.sub = this.http.startGame(this.id).subscribe({
      next: answer => {
        this.router.navigate(['/game']);
      },
      error: err => this.errorMessage = err
    });
  }
}

