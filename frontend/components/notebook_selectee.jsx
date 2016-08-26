const React = require('react');

const NotebookSelectee = React.createClass({
  render: function() {
    return (
        <div onClick={this.props.onSelect}
          className="nb-selector-option">{this.props.title}</div>
    );
  }
});

module.exports = NotebookSelectee;
