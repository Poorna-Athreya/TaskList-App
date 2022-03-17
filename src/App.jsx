import './App.css';
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import List from './components/Lists/List';
import AddItem from './components/AddItem/AddItem';
import Tasks from './components/Tasks/Task';
import AddOrEditItemDialog from './components/AddOrEditItemDialog/AddOrEditItemDialog';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import { LIST_ROUTE, TASK_ROUTE } from './constants/routes';
import makeRequest from './utils/makeRequest';
import { INITIAL_LISTS } from './constants/values';
import utils from './utils/common';

function App() {
  const [lists, setLists] = useState(INITIAL_LISTS);
  const [currentListTasks, setCurrentListTasks] = useState([]);

  const [isListsInitialised, setIsListsInitialised] = useState(false);

  useEffect(() => {
    if (!isListsInitialised) {
      setIsListsInitialised(true);
      makeRequest({ method: 'get', url: `${LIST_ROUTE}` }).then((listsData) => {
        setLists(listsData);
      });
    }
  }, [lists]);

  const getListById = (listId) => utils.getItemById(lists, listId);

  const createList = (newListName) => {
    const newListItem = {
      name: newListName,
    };
    makeRequest({ method: 'post', url: `${LIST_ROUTE}` }, { data: newListItem }).then((newListData) => {
      setLists((prevLists) => [...prevLists, { id: newListData.newListId, name: newListName }]);
    });
  };

  const getTaskById = (listId, taskId) => utils.getItemById(currentListTasks, listId, taskId);

  const listsPage = (
    <div className="lists-page">
      <AddItem item="List" itemEditOrAdd="Add" />
      <List lists={lists} />
    </div>
  );
  const tasksPage = (
    <div className="tasks-page">
      <AddItem item="Task" />
      <Tasks
        getListById={getListById}
        tasks={currentListTasks}
        setTasks={setCurrentListTasks}
      />
    </div>
  );
  const addListPage = (
    <AddOrEditItemDialog
      item="List"
      onCreate={createList}
    />
  );
  const addTaskPage = (
    <AddOrEditItemDialog
      item="Task"
      itemEditOrAdd="Add"
      setTasks={setCurrentListTasks}
      tasks={currentListTasks}
    />
  );
  const editTaskPage = (
    <AddOrEditItemDialog
      item="Task"
      itemEditOrAdd="Edit"
      tasks={currentListTasks}
      setTasks={setCurrentListTasks}
      getTaskById={getTaskById}
    />
  );

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={`${LIST_ROUTE}`} element={listsPage} />
          <Route path={`${LIST_ROUTE}/:listId`} element={tasksPage} />
          <Route path={`${LIST_ROUTE}/add`} element={addListPage} />
          <Route path={`${LIST_ROUTE}/:listId${TASK_ROUTE}/add`} element={addTaskPage} />
          <Route path={`${LIST_ROUTE}/:listId${TASK_ROUTE}/:taskId/edit`} element={editTaskPage} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
