import './App.css';
import Header from './Header';
import 'semantic-ui-css/semantic.min.css'
import AddTask from './AddTask';
import TaskList from './TaskList';
import React from 'react';

class App extends React.Component {
 
  render(){
  return (
    <div className="container">
      <Header/>
      <TaskList />
      

      
     
      </div>
      
  );
}
}

export default App;
