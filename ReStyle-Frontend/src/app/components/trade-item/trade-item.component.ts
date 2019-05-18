import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { TradeItem } from '../../models/TradeItem';

@Component({
  selector: 'app-trade-item',
  templateUrl: './trade-item.component.html',
  styleUrls: ['./trade-item.component.sass']
})
export class TradeItemComponent implements OnInit {
  @Input() item: TradeItem; // for getting the item

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.setClasses();
  }

  setClasses() {
    const classes = {
      selected: this.item.selected,
      tradeItem: true
    };
    return classes;
  }

  toggleSelected() {
    this.item.selected = !this.item.selected;
    // A bandaid. If we remove changeDetectorRef from trade page we don't need this anymore
    // But if we remove it from trade page then columnMeArray breaks when we refresh
    this.changeDetectorRef.detectChanges();
  }

}
