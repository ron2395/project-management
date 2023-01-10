import { Container, Row } from "react-bootstrap";

const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className='justify-content-md-center' lg={12}>
        { children }
      </Row>
    </Container>
  )
}

export default FormContainer
