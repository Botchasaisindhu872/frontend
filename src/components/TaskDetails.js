import React from 'react';
import TaskList from './TaskList';

class TaskDetails extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            task: null,
            loading: true,
            error: null,
            showWindow:true,
        };
    }

    // Fetch task details by ID
    getTaskById() {
        const { id } = this.props; // Access the id prop

        fetch(`http://localhost:8080/tasks/${id}`)
            .then(response => {
                
                return response.json();
            })
            .then(data => {
                console.log(data);
                this.setState({ task: data, loading: false });
            })
            .catch(error => {
                console.error('Fetch error:', error);
                this.setState({ error, loading: false });
            });
    }

    componentDidMount(){
        this.getTaskById();
    }
    
    handleClick = () => {
        
       
        this.setState({ showWindow: false });
        console.log(this.state.showWindow);
        this.props.handleDetailsClose();
        
    };
    render() {
        const { task, loading, error ,showWindow} = this.state;

        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error: {error.message}</div>;

        return (<div>{showWindow && (
            <div className='task details'>
                <h3>{task.taskTitle}</h3>
                
                <h4>Task Description</h4>
               <div>{task.taskDescription}</div>
               <h4>Task Deadline</h4>
               <div>{task.deadline}</div>
               <br>
               </br>
               <br/>
               <div className='ui button blue' onClick={()=> this.handleClick()}> Close</div>
                
            </div>)}</div>
        );
    }
}

export default TaskDetails;
