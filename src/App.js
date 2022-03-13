import './App.css';
import List from './components/Lists/List';
import { useState } from 'react';
import AddItem from './components/AddItem/AddItem';
import Tasks from "./components/Tasks/Task";
import AddItemDialog from './components/AddItemDialog/AddItemDialog';

const INITIAL_MOCK_LISTS = [
  {
    listName: 'Grocery List',
    tasks: ['Buy milk', 'Buy sugar', 'Buy Peanuts', 'Buy butter and cheese', 'Tomatoes']
  },
  {
    listName: 'Workout Goals',
    tasks: ['30 min run in the morning', 'Gym workout', 'Plan diet for week']
  },
  {
    listName: 'Exam Prepration',
    tasks: ['Read chapters 1-5', 'Practice problems in chapter 2']
  }
];
function App() {
  const [lists, setLists] = useState(INITIAL_MOCK_LISTS);
  const [currentList, setCurrentList] = useState('');
  const [page, setPage] = useState('Lists');

  const onClickList = (listName) => {
     let currentListWrite;
     lists.forEach((eachList) => {
       if(eachList.listName === listName) currentListWrite = eachList;
     });
     setCurrentList((prevList) => currentListWrite);
     console.log('Current list: ', currentListWrite);
     setPage('Tasks');
  }

  const clickAddList = (list) => {
    setPage('Add List');
  }

  const createList = (newList) => {
    setLists((prevLists) => [...prevLists,newList]);
    console.log('New List Item: ',newList);
    setPage((prevPage) => 'Lists');
  }

  const clickAddTask = (task) => {
    setPage('Add Task');
  }

  const createTask = (task) =>{
    setLists((prevLists) => {
      prevLists.forEach((list) => {
        if(list.listName === currentList) list.tasks = [...list.tasks, task];
      });
    });
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
          <Tasks list={currentList}/>
        </div>
      ):
      (
        <AddItemDialog item='List' onSubmit = {createList} returnToPrev = {() => setPage((prevPage) => 'Lists')}/>
      )
      }
    </div>
  );
}

export default App;
