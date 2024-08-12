import React from 'react';

class AddTaskForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            task: null,
            title:null,
            desc:null,
            deadline:null,
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
    handleSubmit =()=>{

       const taskTitle =document.getElementById('title').value ;
       const taskDescription =document.getElementById('desc').value ;
       const deadline =document.getElementById('deadline').value ;
       console.log(taskTitle);
       console.log(taskDescription);
       console.log(deadline);
      // console(JSON.stringify({ taskTitle, taskDescription, deadline }));


        
        fetch("http://localhost:8080/tasks?u_id=1&c_id=1",{            
            method : 'POST',
            headers: {
                'Content-Type': 'application/json', // Set the correct Content-Type
            },
            body: JSON.stringify({ taskTitle, taskDescription, deadline })


        }
        )
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

            this.setState({showWindow:false});
            this.props.handleFormClose();  
    };

    handleClose =()=>{
        this.setState({showWindow:false});
        this.props.handleFormClose();    
       
        
     };
     
    
    render() {
        const { task, title,   desc,deadline,loading,error,showWindow } = this.state;
      //  if (loading) return <div>Loading...</div>;
    //if (error) return <div>Error: {error.message}</div>;
if(showWindow)
        return (
            
          <div className='add task form'>
            
                <div className='ui form '>
                    <div className='field'>

                    <label htmlFor="fname">Task Title:</label><br/>
                    <input type="text" id="title" name="title"/><br/>
                    </div>
                    
                    <label htmlFor="Task Description ">Description</label><br/>
                    <textarea id="desc" name="desc" rows="8" cols="65"></textarea>     
                    <div className='field'>  <br/> 
                    <label htmlFor="deadline ">Deadline</label><br/>
                    <input type="text" id="deadline" name="deadline"/><br/>
                    </div>
                    <div className='ui button blue' onClick={()=> this.handleSubmit()}> Submit</div><br/>
                    <br/>
                    <div className='ui button blue' onClick={()=> this.handleClose()}> Close</div>

                    </div>
                    </div>
        );
    if( !showWindow && task)  
       return( <div  className='task title'>
        <div className='task title name'>{task.taskTitle}</div>
                <div className='task title buttons'>
                    <button 
                        className='ui button blue'  
                        onClick={() => this.handleDetailsClick(task.taskId)}
                    >
                        Show Task Details
                    </button>
                    <button className='ui button blue'>Show Subtasks</button>
                    <button 
                        className='ui button blue' 
                        onClick={() => this.handleFormClick(task.taskId)}
                    >
                        Add Subtask
                    </button>

        </div>
        </div>
        );
            
        
            
     
        
    }
}

export default AddTaskForm;
