import { BrowserRouter as Router,Route,Routes,Navigate} from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><p>alok</p></Layout>} />
        <Route path="/register" element={<Layout><Register></Register></Layout>} />
        <Route path="/sign-in" element={<Layout><SignIn></SignIn></Layout>} />
        {/* <Route path="*" element={}/> */}
      </Routes>
    </Router>
  )
}

export default App