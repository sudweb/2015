'use strict';

var React = require('react');
var attendees = require('../.attendees.json')
  .filter(function(person, i, arr){
    return person.first_name && !arr.slice(i + 1, arr.length).some(function(p){
      return personName(p) === personName(person);
    });
  })
  .sort(function(a, b){
    return a.date > b.date ? 1 : (a.date < b.date ? -1 : 0);
  });

function personName(person, separator){
  return person.first_name + (separator || ' ') + person.last_name;
}

function personInitials(person){
  return personName(person).split(' ').map(function(word){
    return word.replace(/^(d|l)'/i, '')[0];
  }).join('').toLocaleUpperCase();
}

module.exports = React.createClass({
  getDefaultProps: function(){
    return { attendees: attendees };
  },

  render: function(){
    return (<ol>{this.renderAttendees()}</ol>);
  },

  renderAttendees: function (){
    return this.props.attendees.map(function(person, i){
      return (<li className="column person" key={i}>
        <p className="avatar">
	  <img src={person.gravatar + '?s=75&r=g&d=blank'} alt=""/>
	  <span className="initials">{personInitials(person)}</span>
        </p>

	<h3>{person.twitter ? this.renderTwitterHandle(person) : this.renderName(person)}</h3>
      </li>);
    }, this);
  },

  renderName: function (person) {
    return (<span>{personName(person)}</span>);
  },

  renderTwitterHandle: function (person){
    return (<a href={'https://twitter.com/' + person.twitter} title={personName(person)}>@{person.twitter}</a>);
  }
});
