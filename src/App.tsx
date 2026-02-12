import Form from "./components/Form";
import Main from "./components/Main";
import NavBar from "./components/NavBar";
import Preview from "./components/Preview";
import Footer from "./components/Footer";
import { NametagProvider } from "./context/NametagContext";

function App() {
  return (
    <>
      <NametagProvider>
        <NavBar />
        <Main>
          <Form />
          <Preview />
        </Main>
        <Footer />
      </NametagProvider>
    </>
  );
}

export default App;
