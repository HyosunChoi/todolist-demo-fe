import React, {useState} from "react";
import { Col, Row } from "react-bootstrap";

const TodoItem = ({item, deleteTask}) => {

  const [isCompleted, setIsCompleted] = useState(item.isCompleted);

  const handleComplete = async() => {
    try {
      const updatedStatus = !isCompleted;
      setIsCompleted(updatedStatus);

          // 경로와 데이터 로그
      console.log("Request URL:", `/api/tasks/${item.id}`);
      console.log("Request Body:", { isCompleted: updatedStatus });

      // const response = await fetch(`/api/tasks/${item.id}`, {
      const response = await fetch(`https://todolist-demo-e6b4fa9776fc.herokuapp.com/api/tasks/${item.id}`, {
        method: "PUT",
        headers : {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({isCompleted: updatedStatus}),
      });

      if(!response.ok) {
        throw new Error("Task update failed");
      }

      console.log("Updated successfully");      
    } catch (err) {
      console.error("error", err);
      //에러발생 시 원래 상태로 복구
      setIsCompleted(!isCompleted);
    }
  };

  return (
    <Row>
      <Col xs={12}>
        <div className={`todo-item ${isCompleted ? "completed" : ""}`}>
          <div className="todo-content">{item.task}</div>

          <div>
            <button className="button-delete" onClick={() => deleteTask(item.id)}>삭제</button>
            <button 
            className={`button-complete ${isCompleted ? "completed" : ""}`}
            onClick={handleComplete}
            >
              {isCompleted ? "완료" : "끝남"}
            </button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;
