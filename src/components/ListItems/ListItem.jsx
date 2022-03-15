import "./ListItem.css";
const ListItem = (props) => {
    return(<button className= 'list-items' onClick={(title)=>props.onClickList(props.listName)}>
        {props.listName}
    </button>);
}
export default ListItem;