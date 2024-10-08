import Front from "./comp/Front";
import Content from "./comp/Content";
import "./App.css";
const App = () => {
  return (
    <main>
      <div className="main">
        <div className="gradient"/>
      </div>
      <div className="app">

        <Front />
        <Content />
      </div>
    </main>
  );
};

export default App;
