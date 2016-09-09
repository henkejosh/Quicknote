const React = require('react');
const TagActions = require('../actions/tag_actions.js');

const TagsBarItem = React.createClass({
  getInitialState: function() {
    return { display: "none" };
  },

  handleDestroy: function(e) {
    e.preventDefault();
    this.props.tag.taggings.forEach( tagging => {
      if(tagging.tag_id === this.props.tag.id &&
        tagging.note_id === this.props.currentNote.id) {
        TagActions.destroyRelationship(this.props.tag.id, tagging.id);
      }
    });
    e.stopPropagation();
  },

  makeSelection: function(e) {
    e.preventDefault();
    this.setState({ selected: true });
  },

  unSelect: function(e) {
    e.preventDefault();
    this.setState({ selected: false });
  },

  showDelete: function() {
    this.setState({ display: "inline-block"});
  },

  hideDelete: function() {
    this.setState({ display: "none"});
  },

  toggleView: function() {
    if(this.state.display === "none"){
      this.setState({ display: "inline-block"});
    } else if(this.state.display === "inline-block") {
      this.setState({ display: "none"});
    }
  },

  render: function() {

    return (
      <li className="current-note-tag" onMouseEnter={this.showDelete}
        onMouseLeave={this.hideDelete}
        >{this.props.title} <i className="tag-relat-delete fa fa-times"
          aria-hidden="true"
          style={this.state}
          onClick={this.handleDestroy}></i>
        </li>
    );
  }
});

module.exports = TagsBarItem;
