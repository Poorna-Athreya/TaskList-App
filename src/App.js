// import logo from './logo.svg';
import './App.css';
import List from './components/Lists/List';
import { useState } from 'react';
import AddItem from './components/AddItem/AddItem';
import Tasks from "./components/Tasks/Task";

const mockLists = [
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
  const [lists, setLists] = useState(mockLists);
  const [currentList, setCurrentList] = useState('');
  const [page, setPage] = useState('Lists');
  const onClickList = (listName) => {
     console.log(listName);
     let currentListWrite;
     mockLists.forEach((eachList) => {
       if(eachList.listName === listName) currentListWrite = eachList;
     });
     setCurrentList((prevList) => currentListWrite);
    //  console.log(currentListWrite);
     console.log('State:',currentList);
     setPage('Tasks');
  }
  return (
    <div className="App">
      {page === 'Lists' ? (
        <div className='lists-page'>
          <AddItem item='List'/> 
          <List lists={lists} onClickList = {onClickList}/>
        </div>
      ): (
        <div className='tasks-page'>
          <AddItem item='Task'/>
          <Tasks list={currentList}/>
        </div>
      )}
    </div>
  );
}

export default App;
