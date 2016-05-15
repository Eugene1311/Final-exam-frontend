import React from 'react';
import Header from './header/header';
import request from '../helpers/request';

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    var that = this;
    request('GET', 'http://localhost:8080/init', null, response => {
      var data = JSON.parse(response);
      that.refs.header.getData(data);
      //todo это же событие создаётся в header - разобраться
      var event = new CustomEvent('changeLanguage', {
        detail: data
      });

      window.dispatchEvent(event);
    });
  }
  render() {
    return (
      <div className="layout">
        <header className="header">
          <div className="container">
            <Header ref="header" />
          </div>
        </header>
        <main className="main">
          {this.props.children}
        </main>
        <footer className="footer"></footer>
      </div>
    )
  }
};

// request('GET', 'http://localhost:8080/init', null, response => {
//   ReactDOM.render((
//     <Router history={browserHistory}>
//       <Route path="/" component={Layout}>
//         <IndexRoute component={Main} ></IndexRoute>
        
//       </Route>
//     </Router>
//   ), document.getElementById('app'));
//   console.log(response);
// });