import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
 
import './task.html';

Template.task.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
  allUsers(){ return Meteor.users.find({_id: {$ne: this.userassign}}); },
  usernames(){ return this.username[0]; }

});

Template.task.rendered = function(){

};

Template.task.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Meteor.call('tasks.setChecked', this._id, !this.checked);
  },
  'click .delete'() {
    Meteor.call('tasks.remove', this._id);
  },
  'click .toggle-started'() {
    Meteor.call('tasks.setStarted', this._id, !this.started);
  },
  'click .completed'() {
    Meteor.call('tasks.completed', this._id);
  },
  'click .toggle-private'() {
    Meteor.call('tasks.setPrivate', this._id, !this.private);
  },
});
