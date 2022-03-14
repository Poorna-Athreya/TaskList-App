import './App.css';
import List from './components/Lists/List';
import { useState } from 'react';
import AddItem from './components/AddItem/AddItem';
import Tasks from "./components/Tasks/Task";
import AddOrEditItemDialog from './components/AddOrEditItemDialog/AddOrEditItemDialog';

const INITIAL_MOCK_LISTS = [
  {
    id:1,
    listName: 'Grocery List',
    tasks: [
      {id: 1, title:'Buy milk'},
      {id: 2, title:'Buy sugar'},
      {id: 3, title: 'Buy Peanuts'},
      {id: 4, title:'Buy butter and cheese'},
      {id: 5, title: 'Tomatoes'}
    ]
  },
  {
    id:2,
    listName: 'Workout Goals',
    tasks: [{id: 1, title: '30 min run in the morning'}, {id:2, title: 'Gym workout'}, {id:3, title: 'Plan diet for week'}]
  },
  {
    id:3,
    listName: 'Exam Preparation',
    tasks: [{id: 1, title: 'Read chapters 1-5'}, {id: 2, title: 'Practice problems in chapter 2'}]
  }
];
function App() {
  const [lists, setLists] = useState(INITIAL_MOCK_LISTS);
  const [currentList, setCurrentList] = useState('');
  const [page, setPage] = useState('Lists');
  const [currentItemEdit, setCurrentItemEdit] = useState({title:''});
  const onClickList = (listName) => {
     let currentListWrite;
     lists.forEach((eachList) => {
       if(eachList.listName === listName) currentListWrite = eachList;
     });
     setCurrentList((prevList) => currentListWrite);
     setPage('Tasks');
  }

  const clickAddList = (list) => {
    setPage('Add List');
  }

  const createList = (newList) => {
    const newListItem = {
      id:lists.length,
      listName: newList,
      tasks: []
  };
    setLists((prevLists) => [...prevLists,newListItem]);
    setPage('Lists');
  }

  const clickAddTask = (task) => {
    setPage('Add Task');
  }

  const createTask = (task) =>{
    const modifiedList = lists.map((eachList) => {
      if(eachList.id !== currentList.id) {
        return eachList;
      }
      else {
        const modifiedListItem = {...eachList};
        console.log('Current ListItem: ',modifiedListItem);
        const modifiedTasks = [...eachList.tasks, 
          {id: eachList.tasks.length+1, title: task}];
        modifiedListItem.tasks = modifiedTasks;
        console.log('Modified object: ',modifiedListItem);
        setCurrentList((prevList) => modifiedListItem);
        return modifiedListItem;
      }
    });
     setLists((prevLists) => modifiedList);
     setPage('Tasks');
  }

  const editTask = (newTaskTitle) => {
    const modifiedList = lists.map((eachList) => {
      if(eachList.id !== currentList.id) {
        return eachList;
      }
      else {
        const modifiedListItem = {...eachList};
        const modifiedTasks = eachList.tasks.map((eachTask) => {
          if(eachTask.id === currentItemEdit.id) return {id: currentItemEdit.id, title: newTaskTitle};
          else return eachTask;
        });
        console.log('Modified tasks: ', modifiedTasks);
        modifiedListItem.tasks= modifiedTasks; 
        setCurrentItemEdit((prevEditItem) => {return {id:0,title:''}});
        // console.log('Modified List Item: ', modifiedListItem);
        return modifiedListItem;
      }
    });
    setLists((prevLists) => modifiedList);
    setPage('Tasks');
  } 

  const onClickEditTask = (oldTaskTitle, taskId) => {
    setCurrentItemEdit({id:taskId, title: oldTaskTitle});
    setPage('Add Task');
  }

  return (
    <div className="App">
      {page === 'Lists' ? (
        <div className='lists-page'>
          <AddItem item='List' onClickAdd = {clickAddList}/> 
          <List lists={lists} onClickList = {onClickList}/>
        </div>
      ): page === 'Tasks' ? (
        <div className='tasks-page'>
          <AddItem item='Task' onClickAdd = {clickAddTask}/>
          <Tasks onClickEdit = {onClickEditTask} list={currentList}/>
          <button className='back-button' onClick={() => setPage('Lists')}>Back</button>
        </div>
      ): page === 'Add List' ?
      (
        <AddOrEditItemDialog item='List' itemValue={currentItemEdit} onCreate = {createList} returnToPrev = {() => {
          setPage((prevPage) => 'Lists');
          setCurrentItemEdit((prevEditItem) => {return {id:0,title:''}});
        }}/>
      ) :
      (
        <AddOrEditItemDialog item='Task' itemValue={currentItemEdit} onEdit = {editTask} onCreate = {createTask} returnToPrev = {()=> {
          setPage((prevPage) => 'Tasks');
          setCurrentItemEdit((prevEditItem) => {return {id:0,title:''}});
        }}/>
      )
      }
    </div>
  );
}

export default App;
