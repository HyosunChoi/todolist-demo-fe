import {useEffect, useState} from 'react';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import TodoBoard from "./components/TodoBoard";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import api from "./utils/api";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState([]);

  const getTasks = async() => {
    const response = await api.get('/tasks');
    console.log("rrrr", response);
    setTodoList(response.data.data);
  };
  const addTask = async () => {
    try{
      const response = await api.post('/tasks', {
        task: todoValue,
        isCompleted: false,
      });
      if(response.status === 200) {
        console.log('성공')
        //1.입력한 값이 안 사라짐
        setTodoValue("");
        //2.추가한 값이 안보임
        getTasks();
      }else {
        throw new Error('task can not be added')
      }
    }catch(err){
      console.log("error", err)
    }
  }

//삭제기능 추가
  const deleteTask = async (id) => {
    try{
      console.log("삭제할 id:", id); // id가 올바른지 확인
      const response = await api.delete(`/tasks/${id}`);
      if (response.status === 200) {
        console.log('Deleted successfully');

        getTasks();
      }else {
        throw new Error('task can not be deleted');
      }
    }catch(err){
      console.log("error", err);
    }
  };

    useEffect(() => {
    getTasks();
  }, []);
  return (
    <Container>
      <Row className="add-item-row">
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            className="input-box"
            value = {todoValue}
            onChange ={(event)=>setTodoValue(event.target.value)}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button className="button-add" onClick={addTask}>추가</button>
        </Col>
      </Row>

      <TodoBoard todoList={todoList} deleteTask={deleteTask}/>
    </Container>
  );
}

export default App;
