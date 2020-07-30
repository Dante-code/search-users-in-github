import  React, {Component} from 'react'
import  Main from './main'
import Search from './search'
class App extends Component {

  state = {
    searchName: ''
  }

  setSearchName = (searchName) => {
    this.setState({searchName})
  }



  render () {
    return(
      <div className="container">
        <Search setSearchName = {this.setSearchName} />
        <Main searchName = {this.state.searchName} />
      </div>
    )
  }
}

export default App
