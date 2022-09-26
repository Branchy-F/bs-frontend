import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/http.service';

@Component({
  templateUrl: './welcome.component.html'
})

export class WelcomeComponent implements OnInit, OnDestroy {

  constructor(private router: Router, 
              private http: HttpService) { }
  
  public pageTitle = 'Battleship';
  errorMessage: string = '';
  sub!: Subscription;

  private _name: string = '';
  get name(): string {return this._name;}
  set name(value: string) {this._name = value;}


  getId(): void{
    this.sub = this.http.getId(this._name).subscribe({
      next: id => {
        localStorage.setItem('id', id);
        this.router.navigate(['/generate']);
      },
      error: err => this.errorMessage = err
    });
  }


  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}