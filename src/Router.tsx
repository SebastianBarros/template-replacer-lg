import { BrowserRouter, Route, Routes } from "react-router";
import { Instruction, Home } from "./pages";
import { routes } from "./routes";

export const Router = () => {
  return (
    <BrowserRouter basename="/template-replacer-lg/">
      <Routes>
        <Route path={routes.home} element={<Home />}/>
        <Route path={routes.instructions} element={<Instruction />} />
      </Routes>
    </BrowserRouter>
  );
};
