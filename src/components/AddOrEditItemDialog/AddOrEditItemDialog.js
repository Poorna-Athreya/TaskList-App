import "./AddOrEditItemDialog.css";
import Button from '../Button/Button';
import { useState } from "react";

const AddOrEditItemDialog = (props) => {
    const [newItem, setNewItem] = useState(props.itemValue.title);

    const submitHandler = (event) => {
        event.preventDefault();
        if(props.item === 'List') {
            props.onCreate(newItem);
        }
        else {
            if(props.itemValue.title === '') props.onCreate(newItem);
            else props.onEdit(newItem);
        }
        setNewItem('');
    }

    const onChangeItem = (event) =>{
        setNewItem(event.target.value);
    }

    return(
        <div className="add-item-dialog-container">
            <form className="add-item-form" onSubmit = {submitHandler} onCancel = {props.returnToPrev}>
                <label>Add {props.item}</label>
                <input type="text" value={newItem} onChange={onChangeItem}/>
                <div className="add-form-buttons">
                    <Button type='submit' content='Submit' className='submit-button'></Button>
                    <Button type='cancel' content='Cancel' onClick = {props.returnToPrev} className='cancel-button'></Button>
                </div>
            </form>
        </div>
    )
}
export default AddOrEditItemDialog;