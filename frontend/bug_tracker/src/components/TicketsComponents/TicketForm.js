import { useState } from "react"
import { useAuthContext } from '../../hooks/useAuthContext'

import { useStateContext } from "../../context/ContextProvider";
import { Button, Modal, Form } from "react-bootstrap";
import Select from 'react-select'
const TicketForm = (id) => {

  
    // The Modal
    const {showModal:show,setShowModal,setTickets} = useStateContext()
    const handleClose = () =>setShowModal(false);
    
    const project_id = id.id

    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [status, setStatus] = useState('')

    const [error, setError] = useState(null)
    
    const { user } = useAuthContext()

    // Select Options
    const statusOptions = [
      { value: 'OPEN', label: 'OPEN' },
      { value: 'In Progress', label: 'In Progress' },
      { value: 'Resolved', label: 'Resolved' },
      { value: 'CLOSED', label: 'CLOSED' }
    ];
    const typeOptions = [
      { value: 'TASK', label: 'TASK' },
      { value: 'ISSUE', label: 'ISSUE' }
    ];

    const handleSubmit = async(e)=>{
      e.preventDefault();

      if (!user) {
        setError('You must be logged in')
        return
      }
      
      const ticket = {name,project_id,type,status} ;
      console.log('Hey Ahmed I am here waiting for ya', ticket)

      const response = await fetch('/api/tickets',{
        method: 'POST',
        body: JSON.stringify(ticket),
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
        setType('')
        setStatus('')
        setError(null)
        setTickets(json.tickets);
        handleClose()
      }

    }



    
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
      <Modal.Title>Create a New Ticket:</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form >
          <Form.Group className="mb-3" controlId="name">
          <Form.Label>Ticket Name:</Form.Label>
          <Form.Control
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
          />
          </Form.Group>
          <Form.Group
          className="mb-3"
          controlId="status"
          >
          <Form.Label>Status:</Form.Label>
            <Select
              options={statusOptions}
              onChange={(choice)=> setStatus(choice.value)}
              />
          </Form.Group>
          <Form.Group
          className="mb-3"
          controlId="type"
          >
          <Form.Label>Type:</Form.Label>
          <Select
              options={typeOptions}
              onChange={(choice)=> setType(choice.value)}
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
          Add Ticket
      </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default TicketForm ;