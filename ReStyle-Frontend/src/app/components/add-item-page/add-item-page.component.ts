import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddedItemInterface } from '../../models/AddedItemInterface';
import { AddItemService } from '../../services/add-item.service';

export interface Category {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-item-page',
  templateUrl: './add-item-page.component.html',
  styleUrls: ['./add-item-page.component.sass']
})
export class AddItemPageComponent implements OnInit {
  selectedFile: File;
  title: string;
  description: string;
  sCat: string;
  cats: Category[] = [
    { value: 'Shirt', viewValue: 'Shirt' },
    { value: 'Pants', viewValue: 'Pants' }
  ];
  fileName = 'No file selected';

  public imagePath;
  imgURL: any;
  public message: string;

  constructor(private addItemService: AddItemService) {}

  onFileSelected(fileEvent) {

    this.selectedFile = fileEvent.target.files[0] as File;
    this.fileName = this.selectedFile.name;

    // Displays a preview of the uploaded image
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    // tslint:disable-next-line: variable-name
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

  onSubmit() {

    const newItem: AddedItemInterface = {
      ownerId : 'l15CGtMJ5bSnEkRPpYEgyvVWeLt2', // TODO: Make sure none of these are hard coded.
      title: this.title,
      description: this.description,
      gender : 'Female',
      size: 1,
      category : 'category',
      photos : [this.selectedFile]
    };

    this.addItemService.submitNewItem(newItem);
  }

  ngOnInit() {
  }

  // Formats the values on the size slider (0 = XS, 1 = S, 2 = M, 3 = L, 4 = XL)
  formatLabel(value: number | null) { // TODO: use an array for this instead of if statements
    if (value === 0) {
      return 'XS';
    }
    if (value === 1) {
      return 'S';
    }
    if (value === 2) {
      return 'M';
    }
    if (value === 3) {
      return 'L';
    } else {
      return 'XL';
    }
  }
}
