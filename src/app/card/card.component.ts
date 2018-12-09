import { Component, OnInit, Input } from '@angular/core';
import Card from 'app/models/card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() card: Card;
  @Input() small: boolean;
  valueKey = {
    1: 'A',
    11: 'J',
    12: 'Q',
    13: 'K'
  };
  suitKey = {
    'Spades': '♠',
    'Hearts': '♥',
    'Clubs': '♣',
    'Diamonds': '♦'
  };
  suit: string;
  value: number;
  constructor() { }

  ngOnInit() {
    const suit = this.card.suit;
    const value = this.card.value;
    this.suit = this.suitKey[suit];
    this.value = this.valueKey[value] ? this.valueKey[value] : value;
  }

}
