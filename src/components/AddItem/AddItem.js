import "./AddItem.css";
const AddItem = (props) => {
    return (
        <div className="add-new-item">
            <button className="add-item-button" onClick={props.onClickAdd}> +</button>
            <h3>Create {props.item}</h3>
        </div>
    );
}
export default AddItem;