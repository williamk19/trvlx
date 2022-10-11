import { Link } from "@inertiajs/inertia-react";
import logo from '../assets/images/logo.png';

const NavbarLandingPage = () => {
  return (
    <div data-theme='dark' className="navbar z-10 fixed bg-base-200 max-w-6xl rounded-box shadow-xl mt-3 ml-3 mr-3 w-11/12">
      <div className="flex-1">
        <Link href='/' className="btn btn-ghost normal-case text-xl">
          <img src={logo} alt="company logo" className='w-28'/>
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          <li><Link className='active:bg-[#a6adba1a]' href='/login'>Login</Link></li>
          <li><Link className='active:bg-[#a6adba1a]' href='/register'>Sign Up</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default NavbarLandingPage;