import { useState, useRef } from "react";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 0, content: "123" },
    { id: 1, content: "코딩 공부하기" },
    { id: 2, content: "잠 자기" },
  ]);

  return (
    <>
      <TodoList todoList={todoList} setTodoList={setTodoList} />
      <hr />
      <TodoInput todoList={todoList} setTodoList={setTodoList} />
    </>
  );
}

function TodoInput({ todoList, setTodoList }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="plus">
      <input
        className="plusInput"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      
      <button
        className="plusBtn"
        onClick={() => {
          const newTodo = { id: Number(new Date()), content: inputValue };
          const newTodoList = [...todoList, newTodo];
          setTodoList(newTodoList);
          setInputValue("");
        }}
      >
        추가
      </button>
    </div>
  );
}

function TodoList({ todoList, setTodoList }) {
  return (
    <ul>
      {todoList.map((todo) => (
        <Todo key={todo.id} todo={todo} setTodoList={setTodoList} />
      ))}
    </ul>
  );
}

function Todo({ todo, setTodoList }) {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);
  const radioBtn = useRef(null);
  const clickRadio = () => {
    const radio = radioBtn.current;
    radio.classList.toggle("line");
  }
  const handleEditClick = () => {
    const input = inputRef.current;
    input.classList.toggle("hidden");

    if (!input.classList.contains("hidden")) {
    input.focus();
    input.value = todo.content;
    } else {
      const newValue = input.value;
      setTodoList((prev) =>
        prev.map((el) =>
          el.id === todo.id ? { ...el, content: newValue } : el
        )
      );
    }
  };
  return (
    <li ref={radioBtn}>
      <div className="div">
        <button
          onClick={clickRadio}
          className="finishBtn"
        >완료</button>
        {todo.content}
      </div>

      <div className="buttons">
        <input
          ref={inputRef}
          className="hidden"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <button 
          onClick= {handleEditClick}
          className="btn"> 
          수정
        </button>
        <button
          onClick={() => {
            setTodoList((prev) => {
              return prev.filter((el) => el.id !== todo.id);
            });
          }}
          className="btn"
        >
          삭제
        </button>
      </div>
    </li>
  );
}

export default App;
