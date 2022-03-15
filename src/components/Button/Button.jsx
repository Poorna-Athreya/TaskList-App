import './Button.css';

const Button = (props) => {
    if(props.type === 'submit') return (<button className ='submit-button' type='submit'>{props.content}</button>);
    else return(<button onClick ={props.onClick} className='cancel-button'>{props.content}</button>)
};
export default Button;