import React, {useState} from "react";
import { Col, Row } from "react-bootstrap";

const TodoItem = ({item, deleteTask}) => {

  const [isCompleted, setIsCompleted] = useState(false);

  const handleComplete = () => {
    setIsCompleted(!isCompleted);
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
