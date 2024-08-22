import React from 'react';

class AlertForm extends React.Component {
    constructor(props) {
        super(props);
        
    }
    handleSubmit=(id)=>{
        console.log("Hiii this is Alert Submit Form");
        fetch(`http://localhost:8080/tasks/${id}`,{            
            method : 'Delete',
            headers: {
                'Content-Type': 'application/json',
               
            }
           


        }
       ).then(()=>{
        this.props.handleAlertClose();
       }
       ).catch(error => {
                console.error('Fetch error:', error);
                this.setState({ error, loading: false });
            });
           


        
    };

    handleClose=()=>{
        console.log("Hiii this is Alert");
        this.props.handleAlertClose();
       

        
    };

render(){
  
    return(
        <div className='alert form'>
            <div> Are you sure you want to delete  this task</div>
            <br/>
            <br/>
            <div className='alert buttons'>
            <div className='ui button blue' onClick={() => this.handleSubmit(this.props.id)}> Yes</div>
            
            <div className='ui button blue' onClick={() => this.handleClose()}>  No</div>
        </div>
            </div>
            
    );
}

}
export default AlertForm;

