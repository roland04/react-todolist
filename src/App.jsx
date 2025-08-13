import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import './App.css'
import TodoList from './components/TodoList/TodoList';

function App() {
  return (
    <div className="h-100 rounded shadow p-4">
      <TodoList />
    </div>
  )
}

export default App
