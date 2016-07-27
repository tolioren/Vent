import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ROUTER_DIRECTIVES } from '@angular/router';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { MeteorComponent } from 'angular2-meteor';

import { Parties } from '../../../both/collections/parties.collection';
import { Party } from '../../../both/interfaces/party.interface';
import { DisplayNamePipe } from '../shared/display-name.pipe';

import template from './party-details.component.html';

@Component({
  selector: 'party-details',
  template,
  directives: [ROUTER_DIRECTIVES],
  pipes: [DisplayNamePipe]
})
export class PartyDetailsComponent extends MeteorComponent implements OnInit {
  partyId: string;
  party: Party;
  users: Mongo.Cursor<any>;

  constructor(private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.route.params
      .map(params => params['partyId'])
      .subscribe(partyId => {
        this.partyId = partyId;

        this.subscribe('party', this.partyId, () => {
          this.party = Parties.findOne(this.partyId);
        }, true);

        this.subscribe('uninvited', this.partyId, () => {
        this.users = Meteor.users.find({_id: {$ne: Meteor.userId()}});
      }, true);
      });
  }

  saveParty() {
    if (Meteor.userId()) {
      Parties.update(this.party._id, {
        $set: {
          name: this.party.name,
          description: this.party.description,
          location: this.party.location
        }
      });
    } else {
      alert('Please log in to change this party');
    }
  }
}
