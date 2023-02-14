import React from 'react';

function Loading({ data }) {
  if (data) {
    return false;
  } else {
    return <div>Loading...</div>;
  }
}

export default Loading;
