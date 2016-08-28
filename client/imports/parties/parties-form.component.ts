import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Meteor } from 'meteor/meteor';

import { Parties } from '../../../both/collections/parties.collection';
import { PartiesUpload } from './parties-upload.component';

import template from './parties-form.component.html';

@Component({
  selector: 'parties-form',
  template,
  directives: [PartiesUpload]
})
export class PartiesFormComponent implements OnInit {
  addForm: FormGroup;
  images: string[] = [];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [],
      location: ['', Validators.required],
      public: [false]
    });
  }

  resetForm() {
    this.addForm.controls['name']['updateValue']('');
    this.addForm.controls['description']['updateValue']('');
    this.addForm.controls['location']['updateValue']('');
    this.addForm.controls['public']['updateValue'](false);
  }

  addParty() {
    if (this.addForm.valid) {
      if (Meteor.userId()) {
        Parties.insert({
          name: this.addForm.value.name,
          description: this.addForm.value.description,
          location: {
            name: this.addForm.value.location
          },
          images: this.images,
          public: this.addForm.value.public,
          owner: Meteor.userId()
        });

        // XXX will be replaced by this.addForm.reset() in RC5+
        //this.resetForm();
        this.addForm.reset();
      } else {
        alert('Please log in to add a party');
      }
    }
  }

  onImage(imageId: string) {
    this.images.push(imageId);
  }
}
