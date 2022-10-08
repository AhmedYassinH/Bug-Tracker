const MyTickets = () => {
    return ( 
        <div className="projects" >
            
        <div className='projects-title'>
        <h3 >Projects:</h3>
        {/* <Button  variant="dark" onClick={handleShow}>Add Project</Button> */}
        </div>
        <div className="projects-header">
            <p><strong>Name</strong></p>
            <p><strong>Description</strong></p>
            <p><strong>Status</strong></p>
            <p><strong>Actions</strong></p>
        </div>
        <div className="projects-body">
        <hr style={{margin:"0px"}}/>
        {/* {projects && projects.map((project)=>(
            <Projects key={project.project_id} project={project}/>
            
        ))} */}
        </div>



    </div>
     );
}
 
export default MyTickets;