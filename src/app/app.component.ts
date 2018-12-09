import { Component, OnInit } from '@angular/core';
import Card from './models/card';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: String = 'app works!';
  hand: Array<Card> = [];
  decks = 1;
  small = false;
  handSize: number;
  maxHandSize: number;
  errors: Array<string> = [];
  allowedSuits = {
    'Spades': true,
    'Hearts': true,
    'Clubs': true,
    'Diamonds': true
  };
  minimumValue = 1;
  maximumValue = 13;
  deck = [];
  standardDeck: Array<Card> = [
    {
      suit: 'Spades',
      value: 1
    },
    {
      suit: 'Spades',
      value: 2
    },
    {
      suit: 'Spades',
      value: 3
    },
    {
      suit: 'Spades',
      value: 4
    },
    {
      suit: 'Spades',
      value: 5
    },
    {
      suit: 'Spades',
      value: 6
    },
    {
      suit: 'Spades',
      value: 7
    },
    {
      suit: 'Spades',
      value: 8
    },
    {
      suit: 'Spades',
      value: 9
    },
    {
      suit: 'Spades',
      value: 10
    },
    {
      suit: 'Spades',
      value: 11
    },
    {
      suit: 'Spades',
      value: 12
    },
    {
      suit: 'Spades',
      value: 13
    },
    {
      suit: 'Hearts',
      value: 1
    },
    {
      suit: 'Hearts',
      value: 2
    },
    {
      suit: 'Hearts',
      value: 3
    },
    {
      suit: 'Hearts',
      value: 4
    },
    {
      suit: 'Hearts',
      value: 5
    },
    {
      suit: 'Hearts',
      value: 6
    },
    {
      suit: 'Hearts',
      value: 7
    },
    {
      suit: 'Hearts',
      value: 8
    },
    {
      suit: 'Hearts',
      value: 9
    },
    {
      suit: 'Hearts',
      value: 10
    },
    {
      suit: 'Hearts',
      value: 11
    },
    {
      suit: 'Hearts',
      value: 12
    },
    {
      suit: 'Hearts',
      value: 13
    },
    {
      suit: 'Clubs',
      value: 1
    },
    {
      suit: 'Clubs',
      value: 2
    },
    {
      suit: 'Clubs',
      value: 3
    },
    {
      suit: 'Clubs',
      value: 4
    },
    {
      suit: 'Clubs',
      value: 5
    },
    {
      suit: 'Clubs',
      value: 6
    },
    {
      suit: 'Clubs',
      value: 7
    },
    {
      suit: 'Clubs',
      value: 8
    },
    {
      suit: 'Clubs',
      value: 9
    },
    {
      suit: 'Clubs',
      value: 10
    },
    {
      suit: 'Clubs',
      value: 11
    },
    {
      suit: 'Clubs',
      value: 12
    },
    {
      suit: 'Clubs',
      value: 13
    },
    {
      suit: 'Diamonds',
      value: 1
    },
    {
      suit: 'Diamonds',
      value: 2
    },
    {
      suit: 'Diamonds',
      value: 3
    },
    {
      suit: 'Diamonds',
      value: 4
    },
    {
      suit: 'Diamonds',
      value: 5
    },
    {
      suit: 'Diamonds',
      value: 6
    },
    {
      suit: 'Diamonds',
      value: 7
    },
    {
      suit: 'Diamonds',
      value: 8
    },
    {
      suit: 'Diamonds',
      value: 9
    },
    {
      suit: 'Diamonds',
      value: 10
    },
    {
      suit: 'Diamonds',
      value: 11
    },
    {
      suit: 'Diamonds',
      value: 12
    },
    {
      suit: 'Diamonds',
      value: 13
    }
  ];

  drawHand(): Array<Card> {
    const shuffledDeck = this.shuffleDeck(this.deck);
    const hand = this.drawCards(shuffledDeck);
    return hand;
  }

  shuffleDeck(cards: Array<Card>): Array<Card> {
    let j, x, i; // JS implementation of Fisher-Yates shuffle taken from SO
    const shuffledCards = cards;
    for (i = shuffledCards.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = shuffledCards[i];
      shuffledCards[i] = shuffledCards[j];
      shuffledCards[j] = x;
    }
    return shuffledCards;
  }

  drawCards(cards: Array<Card>): Array<Card> {
    this.errors = [];
    const suitFilteredHand = this.filterBySuit(cards);
    const valueFilteredHand = this.filterByValue(suitFilteredHand);
    const sizeFilteredHand = this.filterBySize(valueFilteredHand);
    const organizedCards = this.organizeCards(sizeFilteredHand);
    return organizedCards;
  }

  filterBySize(cards: Array<Card>): Array<Card> {
    const handSize = this.handSize;
    if (!handSize) {
      this.errors.push('Maximum hand size is zero');
      return [];
    } else if (handSize < cards.length) {
      const filteredCards = cards.slice(0, handSize);
      return filteredCards;
    } else {
      return cards;
    }
  }

  filterBySuit(cards: Array<Card>): Array<Card> {
    const allowedSuits = this.allowedSuits;
    if (!allowedSuits.Spades && !allowedSuits.Hearts && !allowedSuits.Clubs && !allowedSuits.Diamonds) {
      this.errors.push('All suits have been excluded');
      return [];
    } else if (!allowedSuits.Spades || !allowedSuits.Hearts || !allowedSuits.Clubs || !allowedSuits.Diamonds) {
      const filteredCards = cards.filter(card => {
        return this.allowedSuits[card.suit];
      });
      return filteredCards;
    } else {
      return cards;
    }
  }

  filterByValue(cards: Array<Card>): Array<Card> {
    if (this.minimumValue < 1 || this.maximumValue > 13 || this.minimumValue > this.maximumValue) {
      this.errors.push('Invalid value boundaries (minimum and maximum)');
      return [];
    } else {
      const filteredCards = cards.filter(card => {
        return card.value >= this.minimumValue && card.value <= this.maximumValue;
      });
      return filteredCards;
    }
  }

  organizeCards(cards: Array<Card>): Array<Card> {
    const organizer = {
      'Spades': [],
      'Hearts': [],
      'Clubs': [],
      'Diamonds': []
    };
    cards.forEach(card => {
      organizer[card.suit].push(card);
    });
    let organizedCards = [];
    for (const suit in organizer) {
      const sortedSuit = organizer[suit].sort((cardA, cardB) => {
        return cardA.value - cardB.value;
      });
      organizedCards = organizedCards.concat(sortedSuit);
    };
    return organizedCards;
  }

  onClickDraw(): void {
    this.hand = this.drawHand();
    if (this.hand.length > 30) {
      this.small = true;
    } else {
      this.small = false;
    }
  }

  onDeckNumberChange(event): void {
    this.maxHandSize = 52 * event.target.value;
    let deck = [];
    for (let i = 0; i < this.decks; i++) {
      deck = deck.concat(this.standardDeck);
    }
    this.deck = deck;
    if (this.handSize > this.deck.length) {
      this.handSize = this.deck.length;
    }
  }

  ngOnInit(): void {
    this.deck = this.standardDeck;
    this.maxHandSize = this.deck.length;
    this.handSize = this.maxHandSize;
  }
}
