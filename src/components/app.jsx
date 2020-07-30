import  React, {Component} from 'react'
import  Main from './main'
import Search from './search'
class App extends Component {

  render () {
    return(
      <div className="container">
        <Search />
        <Main />
      </div>
    )
  }
}

export default App
