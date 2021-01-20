import './App.css';
import { ApolloProvider } from '@apollo/client'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import client from './config/graphql'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Categories from './Pages/Categories'
import Detail from './Pages/Detail'
import Add from './Pages/Add'
import Edit from './Pages/Edit'
import Favorite from './Pages/Favorite'

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/movies" component={Categories} />
            <Route exact path="/series" component={Categories} />
            <Route exact path="/favorites" component={Favorite} />
            <Route exact path="/movies/:id" component={Detail} />
            <Route exact path="/series/:id" component={Detail} />
            <Route exact path="/add-movie/" component={Add} />
            <Route exact path="/add-series/" component={Add} />
            <Route exacth path="/edit-movie/:id" component={Edit} />
            <Route exacth path="/edit-series/:id" component={Edit} />
          </Switch>
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
