import React from 'react'
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

const NotFound=()=>{

    return(
        <Result
        status="404"
        title="404"
        subTitle="Lo siento, la página que visitaste no existe."
        extra={<Link to="/"><Button type="primary">Back Home</Button></Link>}
  />
    )
}

export default NotFound;