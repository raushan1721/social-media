import React from 'react'
import { Alert } from 'react-bootstrap'

function Error( props ) {
    return (
<Alert show={props.show} variant={props.variant}>
  <p className="mb-0">
                {props.message}
  </p>      
</Alert>
    )
}

export default Error
