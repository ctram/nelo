import React from 'react';
import Navbar from '../components/navbar';
import ReactOnRails from 'react-on-rails';

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <Navbar />
      </div>
    );
  }
}

ReactOnRails.register({
  App
});
