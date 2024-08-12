import React from 'react';
import TaskDetails from './TaskDetails';

class ShowSubTask extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            taskId: null,
            tasks: [],
            loading: true,
            error: null,
            showFormWindow:false,
      showDetailsWindow:false,
          
            
            
        };
    }

    // Fetch sub tasks when the component mounts
    componentDidMount() {
        this.getSubTasks();
    }
    handleDetailsClick = (id) => {
        this.setState({ taskId:id,showDetailsWindow: true }, () => {
            console.log(id,this.state.showDetailsWindow); 
        });
    };
    handleDetailsClose = (id) => {
        this.setState({ taskId:id,showDetailsWindow: false }, () => {
            console.log(id,this.state.showDetailsWindow); 
        });
    };

    getSubTasks() {
        const id =this.props.id;
        fetch(`http://localhost:8080/tasks/${id}/subtasks`)
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

  
        

    render(){

        const { taskId, tasks, loading, error ,showFormWindow,showDetailsWindow} = this.state;
    return (
        <div className='sub task list'>
            <ul>

            {tasks.map(task => (

                <li >{task.taskTitle}  <button className='ui button blue'   onClick={() =>this.handleDetailsClick(task.taskId)}   >
                 Show Subtask details
            </button>
            <br/>
            <br/>
            <br/>
            
            </li>
            
            

            ))}
            

            </ul>

            {showDetailsWindow  && (
    <div >
        <TaskDetails id={taskId} handleDetailsClose={this.handleDetailsClose}   />
    </div>
)}
        </div>
               



        

    )
    ;
}
}
export default ShowSubTask;