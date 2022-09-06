import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const NavbarComponents = () => {
    return (
        <div className="">

            <Navbar className="shadow-lg border-info bg-black" expand="lg">
                <Container className="container-fluid">
                    <Navbar.Brand className="text-white font-bold fs-1"><strong>Kasir App</strong></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0 align-item-center"
                            style={{ maxHeight: '100px' }}
                            navbarScroll>
                            <Nav.Link as={Link} className="text-white justify-item-center" to="/">Home</Nav.Link>
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </div>

    )
}

export default NavbarComponents