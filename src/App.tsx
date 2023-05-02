import type { Component } from 'solid-js';
import { Bookshelf } from './components/Bookshelf';

const App: Component = () => {
  return (
    <div class="app">
      <Bookshelf name="Arslanov" />
    </div>
  );
};

export default App;
