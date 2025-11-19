import { Search } from 'lucide-react'
import { useState } from 'react'


const NavBar = () => {
  const [search, setSearch] = useState('')
  

  

  return (
    <header className="flex items-center gap-8 bg-white px-6 py-4 shadow">
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded px-3 py-2 w-1/3"
      />
      <Search/>
     
    </header>
  )
}

export default NavBar
