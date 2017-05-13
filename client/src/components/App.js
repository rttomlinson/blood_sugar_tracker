import React, {
  Component
}
from 'react';
import '../App.css';




class App extends Component {
  render() {
    return (
      <div>
        <div>Header Here</div>
          <div className="container">
            {this.props.children}
          </div>
        <div>Footer Here</div>
      </div>
    );
  }
}

export default App;
