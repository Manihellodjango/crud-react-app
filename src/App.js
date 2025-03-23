import "./App.css";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/layout/Footer";
import { TaskProvider } from "./context/TaskContext";
import Header from "./components/layout/Header";
import CreateTask from "./components/tasks/CreateTask";
import ShowTask from "./components/tasks/ShowTask";
import EditTask from "./components/tasks/EditTask";
import DetailTask from "./components/tasks/DetailTask";

function App() {
  return (
    <TaskProvider>
      <div className="App">
        <header className="container">
          <Header />
          <Routes>
            <Route path="/" element={<CreateTask />} />
            <Route path="/tasks" element={<ShowTask />} />
            <Route path="/edit-task/:id" element={<EditTask />} />
            <Route path="/tasks/:id" element={<DetailTask />} />
          </Routes>
        </header>
      </div>
      <Footer />

    </TaskProvider>
  );
}

export default App;
