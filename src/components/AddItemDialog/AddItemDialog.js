import "./AddItemDialog.css";
import Button from '../Button/Button';
import { useState } from "react";

const AddItemDialog = (props) => {
    const [newList, setNewList] = useState('');

    const submitHandler = (event) => {
        const newListItem = {
            listName: newList,
            tasks: []
        };
        event.preventDefault();
        props.onSubmit(newListItem);
        setNewList('');
    }

    const onChangeList = (event) =>{
        setNewList(event.target.value);
    }
    return(
        <div className="add-item-dialog-container">
            <form className="add-item-form" onSubmit = {submitHandler} onCancel = {props.returnToPrev}>
                <label>Add {props.item}</label>
                <input type="text" value={newList} onChange={onChangeList}/>
                <div className="add-form-buttons">
                    <Button type='submit' content='Submit' className='submit-button'></Button>
                    <Button type='cancel' content='Cancel' onClick = {props.returnToPrev} className='cancel-button'></Button>
                </div>
            </form>
        </div>
    )
}
export default AddItemDialog;