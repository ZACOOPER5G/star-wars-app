import Link from "next/link";

const Navbar = () => {
  return (
    <nav>
        <div className="logo" >
            <h1>Star Wars Flix</h1>
        </div>
        <Link href="/" className="link">Home</Link>
        <Link href="/favourites" className="link">Favourites</Link>
        <Link href="/characters" className="link">Characters</Link>
    </nav>
  )
}

export default Navbar