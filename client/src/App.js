import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Clients from "./components/Clients";
function App() {
  return (
    <>
      <Header />
      <Container>
        <Clients />
      </Container>
    </>
  );
}

export default App;
