import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import ComingSoon from "../comingSoonPage/ComingSoon";


export default function PageRoute() {
     return (
       <BrowserRouter>
         <Routes>
             <Route path="/" element={<App />} ></Route>
             <Route path="/coming-soon" element={<ComingSoon />} ></Route>
         </Routes>
       </BrowserRouter>
     )
}