import {SideBar, Footer, NavBar} from '../components'


const Layout = () => {
  return (
    <>
    <NavBar />
    <SideBar /> {/* Outlet in Sidebar */}
    <Footer/>
    </>
  )
}

export default Layout