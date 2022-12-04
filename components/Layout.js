import Navbar from "./Navbar"

const Layout = ({ children, search, setSearch }) => {
  return (
    <div className="content" >
        <Navbar search={search} setSearch={setSearch} />
        { children }
    </div>
  )
}

export default Layout