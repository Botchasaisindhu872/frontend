import React from 'react';
import AddTaskForm from './AddTaskForm';
import TaskDetails from './TaskDetails';
import { click } from '@testing-library/user-event/dist/click';
import ShowSubTask from './ShowSubTask';

class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            taskId: null,
            tasks: [],
            loading: true,
            error: null,
            showFormWindow:false,
      showDetailsWindow:false,
      showSubTasks:0,
          
            
            
        };
    }

    // Fetch tasks when the component mounts
    componentDidMount() {
        this.getTasks();
    }

    getTasks() {
        fetch("http://localhost:8080/tasks?u_id=1&c_id=1")
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                this.setState({ tasks: data, loading: false });
            })
            .catch(error => {
                console.error('Fetch error:', error);
                this.setState({ error, loading: false });
            });
    }

    handleSubClick = (id) => {
        if(this.state.showSubTasks ==0 ){
        this.setState({ taskId:id,showSubTasks: 1 }, () => {
            console.log(this.state.showDetailsWindow); 
        });
    }
    if(this.state.showSubTasks ==1 && id==this.state.taskId ){
        this.setState({ taskId:id,showSubTasks: 0 }, () => {
            console.log(this.state.showDetailsWindow); 
        });
    }
    if(id!=this.state.taskId ){
        this.setState({ taskId:id,showSubTasks: 1 }, () => {
            console.log(this.state.showDetailsWindow); 
        });
    }

    };
    handleDetailsClick = (id) => {
        this.setState({ taskId:id,showDetailsWindow: true }, () => {
            console.log(this.state.showDetailsWindow); 
        });
    };

    handleFormClick = (id) => {
        this.setState({ showFormWindow: true }, () => {
            console.log("HII",this.state.showFormWindow); 
        });
             };
    handleDetailsClose
    =()=>{
        console.log("Hiii this is details");
        this.setState({ showDetailsWindow: false }, () => {
            console.log(this.state.showDetailsWindow);  
        });

    };
    handleFormClose=()=>{
        console.log("Hiii this is Form");
        this.setState({ showFormWindow: false }, () => {
            console.log(this.state.showDetailsWindow);
        });

        
    };
    render() {
        const { taskId, tasks, loading, error ,showFormWindow,showDetailsWindow,showSubTasks} = this.state;

       if (loading) return <div>Loading...</div>;
        if (error) return <div>Error: {error.message}</div>;
        
    /*    return (
            <div className='task list'>
          
                
            
      <div  className='task title'>
          <div className='task title name'>taskTitle</div>
          <div className='task title buttons'>
              <button 
                  className='ui button blue'  
                  onClick={() => this.handleClick(1)}
              >
                  Show Task Details
              </button>
              <button className='ui button blue'>Show Subtasks</button>
              <button 
                  className='ui button blue' 
                  onClick={() => this.handleClick(1)}
              >
                  Add Subtask
              </button>
          </div>
      </div>
      {showWindow && taskId && (
    <div className='add task form'>
        <AddTaskForm id={taskId}  />
    </div>
)}
</div>


       
        );
*/
        return (
            
            <div className='task list'>
                
          
                
          {tasks.map(task => (
        <div   className='tasks'>
                <div key={task.taskId} className='task title'>
                    <div className='task title name'>{task.taskTitle}</div>
                    <div className='task title buttons'>
                        <button 
                            className='ui button blue'  
                            onClick={() => this.handleDetailsClick(task.taskId)}
                        >
                            Show Task Details
                        </button>
                        <button className='ui button blue'  onClick={() => this.handleSubClick(task.taskId)} >Show Subtasks</button>
                        <button 
                            className='ui button blue' 
                            onClick={() => this.handleFormClick(task.taskId)}
                        >
                            Add Subtask
                        </button>

                    

                    </div>
                    </div>
        <div>
        {showSubTasks==1 && taskId==task.taskId&&
        (<ShowSubTask id={task.taskId}/>)
       
             }
     
    </div>
    </div>

))}

{showDetailsWindow  && (
    <div >
        <TaskDetails id={taskId}  handleDetailsClose={this.handleDetailsClose} />
    </div>
)}
{showFormWindow  &&(
    <div id='task form'>
        <AddTaskForm  handleFormClose={this.handleFormClose} />
    </div>
)}
 <div className='add task'>
<button 
                className='ui button blue' 
                onClick={() => this.handleFormClick(1)}
            >
                Add task
            </button>
            </div>
 </div>
 
        );
    }
}

export default TaskList;
