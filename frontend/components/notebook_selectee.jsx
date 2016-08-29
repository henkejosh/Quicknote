const React = require('react');

const NotebookSelectee = React.createClass({
  render: function() {
    return (
        <div className="nb-selector-option">
        <div className="line-break"/>
          <div className="keep-row-green">
            <div className="title-card"
              onClick={this.props.onSelect}>{this.props.title}</div>
          </div>
        </div>
    );
  }
});

module.exports = NotebookSelectee;
