import React, {Component} from 'react'
import axios from 'axios'
import  PubSub from 'pubsub-js'
class Main extends Component {


  state = {
    initView: true,
    loading: true,
    users: null,
    errorMsg: null
  }

  componentDidMount () {
    PubSub.subscribe('search',(msg,searchName) => {
      console.log(msg,searchName);
      this.setState({
        initView: false,
        loading: true
      })
      const url =  `http://api.github.com/search/users?q=${searchName}`
      // const url = `https://search.bilibili.com/all/?keyword=uid${searchName}&from_source=nav_search_new`
      axios.get(url).then((res) => {
          const data = res.data
          console.log(data)
          const users = data.items.map(item => {
            return { name: item.login, url: item.html_url, avatarUrl: item.avatar_url }
          })
          this.setState({loading: false, users})
        }).catch((err) => {
          this.setState({loading: false, errorMsg: err.message})
          console.log(err)
        })
    })
  }


  render () {
    const {initView,loading,users,errorMsg} = this.state
    const {searchName} = this.props

    if (initView) {
    return <h2>请输入关键字搜索: {searchName}</h2>
    }
    else if (loading){
      return  <h2>正在请求中...</h2>
    }
    else if (errorMsg) {
      return <h2>{errorMsg}</h2>
    }
    return(
      <div className="row">
        {
          users.map((user,index) => (
            <div className="card" key={index}>
              <a href={user.url} target="_blank">
                <img src={user.avatarUrl} style={{width: 100}} alt=""/>
              </a>
              <p className="card-text">{user.name}</p>
            </div>
          ))
        }        
    </div>
    )
  }
}

export default Main
