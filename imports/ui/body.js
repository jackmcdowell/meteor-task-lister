import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
 
import { Tasks } from '../api/tasks.js';

import './task.js';
import './body.html';
 
Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('tasks');
  Meteor.subscribe('allUsers');

});

Template.task.rendered = function(){

};

Template.body.helpers({
  tasks() {
    const instance = Template.instance();
    if (instance.state.get('hideCompleted')) {
      // If hide completed is checked, filter tasks
      return Tasks.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
    }
    // Otherwise, return all of the tasks
    return Tasks.find({}, { sort: { createdAt: -1 } });
  },
  incompleteCount() {
    return Tasks.find({ checked: { $ne: true } }).count();
  },


});

Template.body.helpers({
  allUsers(){ return Meteor.users.find({_id: {$ne: Meteor.userId()}}); },
//  allUsers(){ return Meteor.users.find()},

  usernames(){ return this.username[0]; },

  currentUser: function() {
    return Meteor.user();
  }
});

Template.body.helpers({
    categories: function(){
        return ["Front End", "Back End", "Marketing/SEO", "Design"]
    }
});

Template.body.events({
    "change #category-select": function (event, template) {
        var category = $(event.currentTarget).val();
        console.log("category : " + category);
        // additional code to do what you want with the category
    }
});

Template.body.events({
  'submit .new-task'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const text = target.text.value;
    const category = target.categoryassignment.value;
    const userassign = target.userassign.value;

    // Insert a task into the collection
    Meteor.call('tasks.insert', text, userassign, category);
 
    // Clear form
    target.text.value = '';
  },
    'change .hide-completed input'(event, instance) {
        instance.state.set('hideCompleted', event.target.checked);
    },
});
