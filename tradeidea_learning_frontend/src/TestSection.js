import React from 'react';
import ReactDOM from 'react-dom';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
class Test extends React.Component {
    constructor(props) {
        super(props);
 
        this.state = {
            percent: 0
        }
    }

    render() {
        const { percent } = this.state;
        setInterval(function(this){
            this.setState({
                percent: percent+1
            })
        }, 1000)
        
        return (
            <div>
                <Progress
              percent={percent}
              status="success"
            />
            </div>
        )
    }
};
 
export default Test