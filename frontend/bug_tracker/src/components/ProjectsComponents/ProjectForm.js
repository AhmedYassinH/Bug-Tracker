import { useState } from "react"
import { useAuthContext } from '../../hooks/useAuthContext'
import { useStateContext } from "../../context/ContextProvider";

import { Button, Modal, Form } from "react-bootstrap";

const ProjectForm = () => {


    // The Modal
    const {showModal:show,dispatch} = useStateContext()
  
    const handleClose = () => dispatch({type:'close_modal'});



    
  



    // the code for the form
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
 
    
    const [error, setError] = useState(null)

    const { user } = useAuthContext()


    
    

    const handleSubmit = async(e)=>{
      e.preventDefault();

      if (!user) {
        setError('You must be logged in')
        return
      }

      const project = {name,description} ;

      const response = await fetch('/api/projects',{
        method: 'POST',
        body: JSON.stringify(project),
        headers: {
          'Content-Type' : 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })

      const json = await response.json();

      if (!response.ok) {
        setError(json.error)
      }
      if (response.ok) {
        setName('')
        setDescription('')
        
        setError(null)
        handleClose()
      }

    }



    
  return (

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
      <Modal.Title>Add a New Project:</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form >
          <Form.Group className="mb-3" controlId="name">
          <Form.Label>Project Name:</Form.Label>
          <Form.Control
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
          />
          </Form.Group>
          <Form.Group
          className="mb-3"
          controlId="description"
          >
          <Form.Label>Desciption:</Form.Label>
          <Form.Control
              as="textarea"
              rows={3} 
              placeholder="Write a brief description ..."
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              />
          </Form.Group>
          {error && <div className="error">{error}</div>}
      </Form>
      </Modal.Body>
      <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
          Close
      </Button>
      <Button variant="success" onClick={handleSubmit}>
          Add Project
      </Button>
      </Modal.Footer>
  </Modal>
  )
}

export default ProjectForm ;