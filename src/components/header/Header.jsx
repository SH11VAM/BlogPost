import React from "react";
import  Container from "../container/Container"
import Logo from "../Logo";
import LogoutButton from "./LogoutButton";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItem = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "SignUp", slug: "/signup", active: !authStatus },
    { name: "All Post", slug: "/all-post", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
    <header className='shadow py-3 bg-gray-700'>
      <Container>
        <nav className='flex'>
          
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px' />
            </Link>
          </div>
           
             
          <ul className="flex ml-auto">
          {navItem.map((item) =>
            item.active ? (
              <li key={item.name}>
                <button
                  className='inline-block px-6 py-2 duration-200 hover:bg-white rounded-full'
                  onClick={() => navigate(item.slug)}
                   >
                  {item.name}
                 </button>
              </li>
            ) : null,
          )}
{/* special type if authservice is true  && right side part is executed */}
          { authStatus && (<li><LogoutButton/></li>) }
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
