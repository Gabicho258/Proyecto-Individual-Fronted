import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./_App.scss";
import { LandingPage } from "./pages/LandingPage/LandingPage";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import { Search } from "./pages/Search/Search";
import { UserProfile } from "./pages/UserProfile/UserProfile";
import { Hotel } from "./pages/Hotel/Hotel";
import { MyHotels } from "./pages/MyHotels/MyHotels";
import { CreateHotel } from "./pages/CreateHotel/CreateHotel";
import { EditHotel } from "./pages/EditHotel/EditHotel";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<Search />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/hotel/:id" element={<Hotel />} />
        <Route path="/myhotels/" element={<MyHotels />} />
        <Route path="/create/" element={<CreateHotel />} />
        <Route path="/edit/:id" element={<EditHotel />} />

        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
