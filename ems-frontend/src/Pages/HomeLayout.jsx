import { Outlet } from "react-router-dom";
import { Header, Footer } from "../components";


function HomeLayout() {
  return (
    <>
      <Header />      
      <section className="align-element max-w-screen-xl py-20 m-auto">
        <Outlet />    
      </section>
      <Footer />
    </>
  )
}

export default HomeLayout