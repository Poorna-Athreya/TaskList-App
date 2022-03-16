import './App.css';
import React, { useState } from 'react';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import List from './components/Lists/List';
import AddItem from './components/AddItem/AddItem';
import Tasks from './components/Tasks/Task';
import AddOrEditItemDialog from './components/AddOrEditItemDialog/AddOrEditItemDialog';
import { LIST_ROUTE, TASK_ROUTE } from './constants/routes';
import { INITIAL_LISTS } from './constants/values';

function App() {
  const [lists, setLists] = useState(INITIAL_LISTS);
  // const [currentItemEdit, setCurrentItemEdit] = useState({ title: '' });

  const getListById = (listId) => lists.find((listItem) => listItem.id === listId);

  const createList = (newListName) => {
    const newListItem = {
      id: Math.floor(Math.random() * 101),
      listName: newListName,
      tasks: [],
    };
    setLists((prevLists) => [...prevLists, newListItem]);
  };

  const createTask = (taskTitle, listId) => {
    const modifiedList = lists.map((eachList) => {
      if (eachList.id !== listId) {
        return eachList;
      }
      const modifiedListItem = { ...eachList };
      const modifiedTasks = [...eachList.tasks,
        { id: Math.floor(Math.random() * 101), title: taskTitle }];
      modifiedListItem.tasks = modifiedTasks;
      return modifiedListItem;
    });
    setLists(() => modifiedList);
  };

  const getTaskById = (listId, taskId) => {
    let oldTask;
    lists.forEach((listItem) => {
      if (listItem.id === listId) {
        oldTask = listItem.tasks.find((task) => {
          if (task.id === taskId) {
            return task;
          }
          return null;
        });
      }
    });
    return oldTask;
  };

  const editTask = (newTaskTitle, listId, taskId) => {
    const modifiedList = lists.map((eachList) => {
      if (eachList.id !== listId) {
        return eachList;
      }
      const modifiedListItem = { ...eachList };
      const modifiedTasks = eachList.tasks.map((eachTask) => {
        if (eachTask.id === taskId) {
          return { id: taskId, title: newTaskTitle };
        }
        return eachTask;
      });
      modifiedListItem.tasks = modifiedTasks;
      return modifiedListItem;
    });
    setLists(() => modifiedList);
  };

  const listsPage = (
    <div className="lists-page">
      <AddItem item="List" />
      <List lists={lists} />
    </div>
  );
  const tasksPage = (
    <div className="tasks-page">
      <AddItem item="Task" />
      <Tasks getListById={getListById} />
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
      onCreate={createTask}
    />
  );
  const editTaskPage = (
    <AddOrEditItemDialog
      item="Task"
      itemValue="edit"
      setListData={setLists}
      getTaskById={getTaskById}
      onEdit={editTask}
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
          <Route path="*" element={<p>404 not found!</p>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
