import { useSetColors } from "../hooks/useSetColors";
import { RouterProvider } from "react-router-dom";
import { router } from "../router/router";
import { Loader } from "./components/Loader";
import { useCheckAuth } from "../hooks";
export const App = () => {
  useSetColors();
  const { isFetching } = useCheckAuth();
  return (
    <section className="full-page">
      {isFetching ? <Loader text="Checking..." /> : <RouterProvider router={router} />}
    </section>
  )
}