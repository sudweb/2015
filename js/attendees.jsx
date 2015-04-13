'use strict';

var React = require('react');
var attendees = require('../.attendees.json')
  .filter(function(person, i, arr){
    return person.name && arr.slice(i+1, arr.length).some(function(p){
      return p.name !== person.name;
    });
  });

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
          <img src={person.gravatar + '&d=http://sudweb.fr/2015/img/you-re-awesome.jpg'} alt=""/>
        </p>

        <h3>{person.twitter ? this.renderTwitterHandle(person) : person.name}</h3>
      </li>);
    }, this);
  },

  renderTwitterHandle: function (person){
    if (!person.twitter) {
      return null;
    }

    return (<a href={'https://twitter.com/' + person.twitter} title={person.name}>@{person.twitter}</a>);
  }
});
