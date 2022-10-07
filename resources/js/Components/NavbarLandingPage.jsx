import { Link } from "@inertiajs/inertia-react";

const NavbarLandingPage = () => {
  return (
    <div data-theme="dark" className="navbar bg-base-200 max-w-6xl rounded-box shadow-xl">
      <div className="flex-1">
        <Link href='/' className="btn btn-ghost normal-case text-xl">TRVLX</Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          <li><Link href='/login'>Login</Link></li>
          <li><Link href='/register'>Sign Up</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default NavbarLandingPage;