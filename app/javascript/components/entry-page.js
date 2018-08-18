import React from 'react';
import EntryForm from './entry-form';
import Entry from './entry';

export default class EntryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: props.entry.id
    };
    this.toggleEditMode = this.toggleEditMode.bind(this);
  }

  toggleEditMode() {
    this.setState({ editMode: !this.state.editMode });
  }

  render() {
    const { editMode } = this.state;
    const { entry } = this.props;
    let dom = <Entry entry={entry} onToggleEditMode={this.toggleEditMode} />;

    if (editMode) {
      dom = <EntryForm entry={entry} onToggleEditMode={this.toggleEditMode} />;
    }

    return dom;
  }
}
