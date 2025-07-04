import React, { useEffect } from 'react';

const Content = () => {
  useEffect(() => {
    const userId = '3'; // Replace with dynamic ID if needed
    localStorage.setItem('userId', userId);
  }, []);

  return (
    <main>
      <h2>Hello Srilekha</h2>
      <p>Welcome to the e-voting portal.</p>
    </main>
  );
};

export default Content;