const React = require('react');
const TagsBarItem = require('./tags_bar_item.jsx');
const TagActions = require('../actions/tag_actions.js');

const TagsBarIndex = React.createClass({
  getInitialState: function() {
    return { title: "" };
  },

  createCurrentNoteTags: function() {
    if(!this.props.currentNote.tags) return;

    return this.props.currentNote.tags.map( tag => {
     return (
         <TagsBarItem key={tag.id} tag={tag}
          className="current-note-tag" title={tag.title} />
       );
     });
  },

  resetTitle: function() {
    this.setState({ title: "" });
  },

  handleTitleChange: function(e) {
    e.preventDefault();
    this.setState({ title: e.target.value });
    // if(e.keyCode === 13) {
    //   const tag = {title: this.state.title};
    //   TagActions.createTag(tag, this.props.currentNote.id);
    // }
  },

  createTag: function(e) {
    if(this.state.title === "") return;
    
    if(e.key === "Enter") {
      const tag = {title: this.state.title};
      TagActions.createTag(tag, this.props.currentNote.id);
      this.resetTitle();
    }
  },
// onBlur={this.createTag}
  render: function() {
    return (
      <section className="tag-bar">
        <div className="tag-selector">choose tag</div>
        <ul className="tag-list">
          { this.createCurrentNoteTags() }
          <input type="text"
            onKeyPress={this.createTag}
            className="tag-create-button"
            onChange={this.handleTitleChange}
            placeholder="+"
            value={this.state.title}
            />
        </ul>
      </section>
    );
  }
});

module.exports = TagsBarIndex;
