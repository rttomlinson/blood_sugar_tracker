import React, {
  Component
}
from 'react';
import '../App.css';
import Header from './Header';
// import Footer from './Footer';
// <Footer />


class App extends Component {
  render() {
    return (
      <div>
        <Header />
          <div className="container">
            {this.props.children}
          </div>
      </div>
    );
  }
}

export default App;
