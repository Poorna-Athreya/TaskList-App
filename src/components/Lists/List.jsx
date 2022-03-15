import './List.css';
import ListItem from '../ListItems/ListItem';

function List(props) {
  const listDisplay = props.lists.map((eachList) => <ListItem key={eachList.id} listName={eachList.listName} onClickList={props.onClickList} />);
  return (
    <div className="lists-container">
      <h1> Available Lists:</h1>
      <div className="listItems-container">
        {listDisplay}
      </div>
    </div>
  );
}
export default List;
