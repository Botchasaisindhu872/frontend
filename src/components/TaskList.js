import React from 'react';
import AddTaskForm from './AddTaskForm';
import TaskDetails from './TaskDetails';
import { click } from '@testing-library/user-event/dist/click';
import ShowSubTask from './ShowSubTask';
import AlertForm from './AlertForm';
import EditForm from './EditForm';

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
      showAlert:false,
      showEditWindow: false,
      updateList:false,
          
            
            
        };
    }

    // Fetch tasks when the component mounts
    componentDidMount() {
        this.getTasks();
    }
    componentDidUpdate() {
console.log("re rendered");
        if(this.state.updateList==true){
            console.log("hiii this is update")
        
        this.getTasks();
        console.log(this.state.tasks);
        this.setState({ updateList:false});
        this.getTasks();

        }
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
    handleDelete = (id) => {
        
        this.setState({ taskId:id,showAlert: true}, () => {
            console.log('THII this is delete',this.state.showALert); 
        });


       

    }
    handleEditClick = (id) => {
        this.setState({ taskId:id,showEditWindow: true ,updateList:true}, () => {
            console.log(this.state.showEditWindow); 
        });
    };


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
      console.log(id);
       
        this.setState({ taskId :id ,showFormWindow: true}, () => {
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
        console.log("Hiii this is Form close");
        this.setState({ showFormWindow: false,showEditWindow:false ,updateList:true}, () => {
            console.log(this.state.showDetailsWindow,this.state.updateList);
        });

        
    };

    handleAlertClose=()=>{
        console.log("Hiii this is Form");
        this.setState({ showAlert: false,updateList:true}, () => {
            console.log(this.state.showAlert);
        });

        
    };
    render() {
        const { taskId, tasks, loading, error ,showFormWindow,showDetailsWindow,showSubTasks,showAlert,showEditWindow} = this.state;

       if (loading) return <div>Loading...</div>;
        
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
                            onClick={() => this.handleEditClick(task.taskId)}
                        >
                            Edit task
                        </button>
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
                        <i className='delete big icon' title='Delete this task' onClick={() => this.handleDelete(task.taskId)}></i>

                    

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
        <AddTaskForm  id={taskId} handleFormClose={this.handleFormClose} />
    </div>
)}
{showAlert  && (
    <div >
        <AlertForm  id={taskId} handleAlertClose={this.handleAlertClose} />
    </div>
)}
{showEditWindow  &&(
    <div id='task form'>
        <EditForm  id={taskId} handleFormClose={this.handleFormClose} />
    </div>
)}
 <div className='add task'>
<button 
                className='ui button blue' 
                onClick={() => this.handleFormClick(-1)}
            >
                Add task
            </button>
            </div>
 </div>
 
        );
    }
}

export default TaskList;
