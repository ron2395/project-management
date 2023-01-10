import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className='text-white bg-dark'>
      <Container>
        <Row>
            <Col className='text-center py-3'>
                Created by Rohan Sharma
            </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
