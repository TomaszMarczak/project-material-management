import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Clients from "./components/Clients";
import Projects from "./components/Projects";
function App() {
  return (
    <>
      <Header />
      <Container>
        <Projects />
        <Clients />
      </Container>
    </>
  );
}

export default App;
