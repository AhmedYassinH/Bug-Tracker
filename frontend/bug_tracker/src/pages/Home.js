
import ProjectForm from "../components/ProjectsComponents/ProjectForm";
import Projects from "../components/ProjectsComponents/Projects";
import { useEffect, useState } from "react";

import { useAuthContext } from '../hooks/useAuthContext';

import { Button, Modal, Form } from "react-bootstrap";
const Home = () => {



    const [projects , setProjects] = useState(null);

    const { user } = useAuthContext()

    useEffect(()=>{
        // console.log("token",user.token)
        const fetchProjects = async ()=>{
            const response = await fetch('/api/projects', {
                headers: {'Authorization': `Bearer ${user.token}`},
              });
            const json = await response.json();

            if(response.ok){
                setProjects(json.projects);
                
            }}

            if (user?.token) {
                fetchProjects()
              }
    },[user])


    console.log("Home.js projects",projects)


//  TODO: MOVE ALL THE CODE BELLOW TO ProjectForm.js AND ADD A CONTEXT TO HANDLE THE MODAL 
            
    // The Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // the code for the form
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('')


    const [error, setError] = useState(null)
    
    

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
        setStatus('')
        setError(null)
        handleClose()
      }

    }

    








    
    return ( 
        
        <div className="projects" >
            

            <h3 className='title'>Projects:</h3>
            <div className="project-details">
                <p><strong>Name</strong></p>
                <p><strong>Description</strong></p>
                <p><strong>Status</strong></p>
                <Button  variant="dark" onClick={handleShow}>Add Project</Button>
            </div>

            <hr style={{margin:"0px"}}/>
            {projects && projects.map((project)=>(
                <Projects key={project.project_id} project={project}/>
                
            ))}








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
        </div>


     );
}
 
export default Home;