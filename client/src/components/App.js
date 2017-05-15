import React, {
  Component
}
from 'react';
import '../App.css';
import Header from './Header';
import Footer from './Footer';


class App extends Component {
  render() {
    return (
      <div>
        <Header />
          <div className="container">
            {this.props.children}
          </div>
        <Footer />
      </div>
    );
  }
}

export default App;
