import './NotFoundPage.css';
import React from 'react';
import BackToListsButton from '../BackToListsButton/BackToListsButton';

function NotFoundPage() {
  return (
    <div className="not-found-container">
      <div className="not-found-message">
        <h1> Error: 404, Page Not Found!</h1>
      </div>
      <BackToListsButton />
    </div>
  );
}
export default NotFoundPage;
