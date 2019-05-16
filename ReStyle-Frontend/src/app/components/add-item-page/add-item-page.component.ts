import { Component, OnInit } from '@angular/core';
import { AddedItemInterface } from '../../models/AddedItemInterface';
import { AddItemService } from '../../services/add-item.service';
import { firebase } from 'firebaseui-angular';

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
  size: number;
  gender: string;
  cats: Category[] = [
    // { value: '0', viewValue: '-😃--------------'},
    { value: 'Shirt', viewValue: '👕 Shirts' },
    { value: 'Pants', viewValue: '👖 Pants' },
    { value: 'Outerwear', viewValue: '🧥 Outerwear' },
    { value: 'Accessories', viewValue: '👜 Accessories' },
    { value: 'Miscellaneous', viewValue: '➕ Miscellaneous' }
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

    const uid = firebase.auth().currentUser.uid;

    if (!uid) { return null; }

    const newItem: AddedItemInterface = {
      ownerId : uid,
      title: this.title,
      description: this.description,
      gender : this.gender,
      size: 1, // TODO not hardcoded
      category : this.sCat,
      photos : [this.selectedFile]
    };

    this.addItemService.submitNewItem(newItem);
  }

  ngOnInit() {
  }

  // Formats the values on the size slider (0 = XS, 1 = S, 2 = M, 3 = L, 4 = XL)
  formatLabel(value: number | null) { // TODO: use an array for this instead of if statements
    const sizeArray: string[] = ['XS', 'S', 'M', 'L', 'XL'];
    return sizeArray[value];
  }
}
