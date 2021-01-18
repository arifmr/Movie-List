import './App.css';
import { ApolloProvider } from '@apollo/client'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import client from './config/graphql'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Movies from './Pages/Movies'
import Series from './Pages/Series'
import DetailMovie from './Pages/DetailMovie'
import DetailSeries from './Pages/DetailSeries'
import AddMovie from './Pages/AddMovie'
import AddSeries from './Pages/AddSeries'
import EditMovie from './Pages/EditMovie'
import EditSeries from './Pages/EditSeries'

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/movies" component={Movies} />
            <Route exact path="/series" component={Series} />
            <Route exact path="/movies/:id" component={DetailMovie} />
            <Route exact path="/series/:id" component={DetailSeries} />
            <Route exact path="/add-movie/" component={AddMovie} />
            <Route exact path="/add-series/" component={AddSeries} />
            <Route exacth path="/edit-movie/:id" component={EditMovie} />
            <Route exacth path="/edit-series/:id" component={EditSeries} />
          </Switch>
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
