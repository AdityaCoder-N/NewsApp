
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import React,{Component} from "react";

import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component{

  state = {
    progress:10
  }

  setProgress =(progress)=>{
    this.setState({progress:progress})
  }

  render(){

    return(
      <div>
        <BrowserRouter>
        
        <Navbar/>
        <LoadingBar
        height={3}
        color='#f11946'
        progress={this.state.progress}
        />
        
        <Routes>
          
          <Route  exact path="/" element={<News setProgress={this.setProgress}  key="general" pageSize={12} country = "in" category="general"/>}/>
          
          <Route  exact path="/buisness" element={<News setProgress={this.setProgress}  key="buisness" pageSize={12} country = "in" category="buisness"/>}/>
          <Route  exact path="/entertainment" element={<News setProgress={this.setProgress}  key="entertainment" pageSize={12} country = "in" category="entertainment"/>}/>
          <Route  exact path="/general" element={<News setProgress={this.setProgress}  key="general" pageSize={12} country = "in" category="general"/>}/>
          <Route  exact path="/health" element={<News setProgress={this.setProgress}  key="health" pageSize={12} country = "in" category="health"/>}/>
          <Route  exact path="/science" element={<News setProgress={this.setProgress}  key="science" pageSize={12} country = "in" category="science"/>}/>
          <Route  exact path="/sports" element={<News setProgress={this.setProgress}  key="sports" pageSize={12} country = "in" category="sports"/>}/>
          <Route  exact path="/technology" element={<News setProgress={this.setProgress}  key="technology" pageSize={12} country = "in" category="technology"/>}/>
        
        </Routes>

        </BrowserRouter>
      </div>
    )

  }

}