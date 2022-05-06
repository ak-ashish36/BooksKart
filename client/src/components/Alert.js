import React from 'react'

function Alert(props) {
    
    return (
        <div class="fixed-top" style={{ height: '5px' ,  marginTop:"44px"}}>
        {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
            {props.alert.msg} 
        </div>}
        </div>
    )
}

export default Alert
