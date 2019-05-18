import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { TradeItem } from '../../models/TradeItem';

@Component({
  selector: 'app-trade-item',
  templateUrl: './trade-item.component.html',
  styleUrls: ['./trade-item.component.sass']
})
export class TradeItemComponent implements OnInit {
  @Input() item: TradeItem; // for getting the item
  @Output() toggleItemOutput: EventEmitter<TradeItem> = new EventEmitter(); // for passing the item to column component when toggled

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.setClasses();
  }

  /**
   * * Sets dynamic classes
   * See the HTML [ngClasses]="setClasses()"
   *
   * Selected: if the item is currently selected or not.
   * tradeItem: unused.
   *
   * @returns An object representing what classes should be set by angular.
   */
  setClasses() {
    const classes = {
      selected: this.item.selected,
      tradeItem: true
    };
    return classes;
  }

  toggleSelected() {
    // Invert the value of boolean item.selected.
    this.item.selected = !this.item.selected;
    // A bandaid. If we remove changeDetectorRef from trade page we don't need this anymore
    // But if we remove it from trade page then columnMeArray breaks when we refresh
    this.changeDetectorRef.detectChanges();
    // Pass the item that was just toggled so that we can add it to or remove it from the preview thumbnails
    this.toggleItemOutput.emit(this.item);

    // * Logs for debug
    // console.log('Item', this.item);
  }

}
