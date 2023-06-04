import Image from "next/image";
import Link from "next/link";
const NavBar = () => {
  return (
    <div className="fixed w-full px-4 sm:px-24 lg:px-48 bg-slate-950 bg-opacity-50 border-b-[1px] border-neutral-950 backdrop-blur-sm z-50">
      <nav className="flex justify-between items-center p-5">
        <div className="group flex flex-row gap-3 items-center cursor-pointer">
          <Image
            src={"/logos/logo.svg"}
            width={40}
            height={40}
            alt="Sac Slippi Logo"
          />
          <span className="font-semibold group-hover:text-sky-300 transition-all">
            Sacramento Slippi Power Rankings
          </span>
        </div>
        {/* <ul className="flex flex-row gap-5 invisible sm:visible">
          <li>
            <Link className="hover:text-sky-300 transition-all" href="/">
              Manage
            </Link>
          </li>
          <li>
            <Link className="hover:text-sky-300 transition-all" href="/">
              Logout
            </Link>
          </li>
        </ul> */}
      </nav>
    </div>
  );
};

export default NavBar;
