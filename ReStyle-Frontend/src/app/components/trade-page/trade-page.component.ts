import { Component, OnInit, Input } from '@angular/core';
import { ItemCard } from 'src/app/models/ItemCard';
import { Router, NavigationStart } from '@angular/router';
import { TradeItem } from '../../models/TradeItem';

@Component({
  selector: 'app-trade-page',
  templateUrl: './trade-page.component.html',
  styleUrls: ['./trade-page.component.sass']
})
export class TradePageComponent implements OnInit {
  queryParams: { you: string, item: string };
  itemId: string;
  youId: string;
  thumbnailsMe: TradeItem[];
  thumbnailsThem: TradeItem[];
  columnMe: TradeItem[];
  columnThem: TradeItem[];

  constructor(private router: Router) { }

  ngOnInit() {
    // Url will look like /trade?you=QqJVsgMeiVcF1bW0x9b28sHK9fh2&item=1
    console.log(this.router.url);
    // We will parse out the query params from the url
    // This will give us { you: "QqJVsgMeiVcF1bW0x9b28sHK9fh2", item: "1" }
    console.log(this.router.parseUrl(this.router.url).queryParams);

    const temp = this.router.parseUrl(this.router.url).queryParams;
    this.queryParams = { you: temp.you, item: temp.item };

    console.log(this.queryParams);

    this.itemId = this.queryParams.item;
    this.youId = this.queryParams.you;
  }

}
