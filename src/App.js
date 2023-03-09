import {Route, Routes} from "react-router-dom";
import {Typography} from "@mui/material";
import News from "./containers/News/News";
import FullPost from "./containers/FullPost/FullPost";

const App = () => (
  <Routes>
    <Route path="/" element={<News/>}/>
    <Route path="/news/:id" element={<FullPost/>}/>
    <Route path="*" element={<Typography textAlign="center" fontSize="36px">Page not found</Typography>}/>
  </Routes>
);

export default App;