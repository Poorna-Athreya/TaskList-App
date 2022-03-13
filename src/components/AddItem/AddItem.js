import "./AddItem.css";
const AddItem = (props) => {
    return (
        <div className="add-new-item">
            <button className="add-item-button"> +</button>
            <h3>Create {props.item}</h3>
        </div>
    );
}
export default AddItem;