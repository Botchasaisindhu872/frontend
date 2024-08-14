import React from 'react';

class EditForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            task: null,
            title: null,
            desc: null,
            deadline: null,
            loading: true,
            error: null,
            showWindow: true,
        };
    }

    // Fetch task details by ID when the component mounts
    componentDidMount() {
      
        this.getTaskById();
    }

    getTaskById() {
        const { id } = this.props; // Access the id prop

        fetch(`http://localhost:8080/tasks/${id}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({
                    task: data,
                    title: data.taskTitle,
                    desc: data.taskDescription,
                    deadline: data.deadline,
                    loading: false
                }, () => {
                    // Once the state is set, update the input fields
                    document.getElementById('title').value = data.taskTitle;
                    document.getElementById('desc').value = data.taskDescription;
                    document.getElementById('deadline').value = data.deadline;
                });
            })
            .catch(error => {
                console.error('Fetch error:', error);
                this.setState({ error, loading: false });
            });
    }

    handleSubmit = () => {
        const { id } = this.props;
        const taskTitle = document.getElementById('title').value;
        const taskDescription = document.getElementById('desc').value;
        const deadline = document.getElementById('deadline').value;

        fetch(`http://localhost:8080/tasks/${id}?u_id=1&c_id=1`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json', // Set the correct Content-Type
            },
            body: JSON.stringify({ taskTitle, taskDescription, deadline })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({ task: data, loading: false });
            })
            .catch(error => {
                console.error('Fetch error:', error);
                this.setState({ error, loading: false });
            });

        this.setState({ showWindow: false });
        this.props.handleFormClose();
    };

    handleClose = () => {
        this.setState({ showWindow: false });
        this.props.handleFormClose();
    };

    render() {
        
        const { task, title, desc, deadline, loading, error, showWindow } = this.state;

        if (showWindow)
            return (
                <div className='add task form'>
                    <div className='ui form '>
                        <div className='field'>
                            <label htmlFor="fname">Task Title:</label><br />
                            <input type="text" id="title" name="title" /><br />
                        </div>

                        <label htmlFor="Task Description ">Description</label><br />
                        <textarea id="desc" name="desc" rows="8" cols="65"></textarea>
                        <div className='field'>  <br />
                            <label htmlFor="deadline ">Deadline</label><br />
                            <input type="text" id="deadline" name="deadline" /><br />
                        </div>
                        <div className='ui button blue' onClick={this.handleSubmit}> Submit</div><br />
                        <br />
                        <div className='ui button blue' onClick={this.handleClose}> Close</div>

                    </div>
                </div>
            );
       
    }
}

export default EditForm;
