import { BrowserRouter as Router,Route,Routes, Link} from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import { useAppContext } from "./contexts/AppContext";
import AddHotel from "./pages/AddHotel";
import MyHotels from "./pages/MyHotels";

const App = () => {
  const {isLoggedIn}=useAppContext();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Link className="underline" to="/add-hotel">
            hotel
          </Link></Layout>} />
        <Route path="/register" element={<Layout><Register></Register></Layout>} />
        <Route path="/sign-in" element={<Layout><SignIn></SignIn></Layout>} />
        {isLoggedIn && (<Route path="/add-hotel" element={<Layout><AddHotel></AddHotel></Layout>} />)}
        {isLoggedIn && (<Route path="/my-hotels" element={<Layout><MyHotels/></Layout>} />)}
        <Route path="*" element={<p>alok</p>}/>
      </Routes>
    </Router>
  )
}

export default App