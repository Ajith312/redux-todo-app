import React, { useState } from "react";
import "../App.css";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  deleteTodo,
  handleEditingTodo,
  handleEditingTodoName,
  handleEditingTodoDescription,
  handleFilterTodo,
  handleTodoDescription,
  handleTodoName,
  toggleTodo,
  updateTodos,
  resetEditState,
} from "../Redux/Slice/TodoSlice";

const Home = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    dispatch(resetEditState());
  };
  const handleShow = () => setShow(true);

  const {
    todos,
    todo_Name,
    todo_Description,
    filteredTodos,
    editTodo,
    editing_todo_Name,
    editing_todo_Description,
  } = useSelector((state) => state.todoState);
  const dispatch = useDispatch();

  const handleSubmitTodo = () => {
    const newTodo = {
      todo_id: todos.length + 1,
      todo_Name: todo_Name,
      todo_Description: todo_Description,
      completed_Status: false,
    };
    if (todo_Name && todo_Description !== "") {
      dispatch(addTodo(newTodo));
    }
  };

  const editingTodo = (todo) => {
    handleShow();
    dispatch(handleEditingTodo(todo));
  };

  const filterTodo = (value) => {
    dispatch(handleFilterTodo(value));
  };

  const handleEditSubmit = () => {
    const updatedTodo = {
      ...editTodo,
      todo_Name: editing_todo_Name,
      todo_Description: editing_todo_Description,
    };

    const updatedTodos = todos.map((todo) =>
      todo.todo_id === updatedTodo.todo_id ? updatedTodo : todo
    );

    dispatch(updateTodos(updatedTodos));
    handleClose();
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row vh-100 d-flex justify-content-center bg-info-subtle">
          <div className="col-8 border border-dark bg-body-secondary" >
            <div className="todo-container d-flex flex-column p-2">
              <h1 className="my-4">Todo App</h1>
              <div className="createTodo-container">
                <Form>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="todoNameInput"
                  >
                    <Form.Label column sm="2">
                      Todo Name:
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        placeholder="Todo name"
                        value={todo_Name}
                        onChange={(e) =>
                          dispatch(handleTodoName(e.target.value))
                        }
                        className="w-75"
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="todoDescriptionInput"
                  >
                    <Form.Label column sm="2">
                      Todo Description:
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        placeholder="Todo description"
                        value={todo_Description}
                        onChange={(e) =>
                          dispatch(handleTodoDescription(e.target.value))
                        }
                        className="w-75"
                      />
                    </Col>
                  </Form.Group>
                  <Button
                    variant="success"
                    className="w-25"
                    onClick={handleSubmitTodo}
                  >
                    Add Todo
                  </Button>
                </Form>
              </div>
              <div className="filter-Container d-flex flex-row-reverse">
                <div className="completed-btn my-4 p-2">
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => filterTodo("all")}
                  >
                    All
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-success mx-3"
                    onClick={() => filterTodo("completed")}
                  >
                    Completed
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-warning"
                    onClick={() => filterTodo("notcompleted")}
                  >
                    Not Completed
                  </button>
                </div>
              </div>
              <div className="todo-container d-flex flex-wrap mt-5 justify-content-center">
                {filteredTodos.length ? (
                  filteredTodos.map((todo, index) => (
                    <div
                      key={index}
                      className="d-flex flex-column p-2 border border-black m-2 rounded-3"
                    >
                      <Card
                        className={
                          todo.completed_Status === false
                            ? "bg-info m-2"
                            : "bg-success m-2"
                        }
                      >
                        <Card.Body>
                          <Card.Title>Todo No: {todo.todo_id}</Card.Title>
                          <Card.Text>
                            <span className="me-2">Todo Name:</span>
                            {todo.todo_Name}
                          </Card.Text>
                          <Card.Text>
                            <span className="me-2">Todo Description:</span>
                            {todo.todo_Description}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                      <div className="d-flex flex-column p-2">
                        <Button onClick={() => editingTodo(todo)}>Edit</Button>
                        <div className="d-flex justify-content-evenly align-items-center mt-2">
                          <Button
                            variant="warning"
                            className="w-50 me-2"
                            onClick={() => dispatch(toggleTodo(todo.todo_id))}
                          >
                            {todo.completed_Status === false
                              ? "Complete"
                              : "Incomplete"}
                          </Button>
                          <Button
                            variant="danger"
                            className="w-50"
                            onClick={() => dispatch(deleteTodo(todo.todo_id))}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No todos found</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row} className="mb-3" controlId="todoNameInput">
              <Form.Label column sm="3">
                Todo Name:
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  placeholder="Todo name"
                  value={editing_todo_Name}
                  onChange={(e) =>
                    dispatch(handleEditingTodoName(e.target.value))
                  }
                  className="w-100"
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="todoDescriptionInput"
            >
              <Form.Label column sm="">
                Todo Description:
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  placeholder="Todo description"
                  value={editing_todo_Description}
                  onChange={(e) =>
                    dispatch(handleEditingTodoDescription(e.target.value))
                  }
                  className="w-100"
                />
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Home;
