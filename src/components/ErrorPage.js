import React from 'react';
import { Paper } from '@material-ui/core';

function ErrorPage() {
  return (
    <div className="error-page">
      <div>
        <Paper className="paper">
          <div className="page-title">
            <h1>404 Page</h1>
          </div>
        </Paper>
      </div>
    </div>
  );
}

export default ErrorPage;
