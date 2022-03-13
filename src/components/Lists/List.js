import "./List.css";
import ListItem from "../ListItems/ListItem";

const List = (props) => {
    const listDisplay = props.lists.map((eachList, index) => <ListItem key={index+1} listName = {eachList.listName} onClickList = {props.onClickList}/>);
    return(
    <div className="lists-container">
        <h1> Available Lists:</h1>
        <div className="listItems-container">
            {listDisplay}
        </div>
    </div>
    );

}
export default List;