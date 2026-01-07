import Link from "next/link";
import SideMenu from "../SideMenu";

export const Header = () => {
  return (
    <nav className="fixed inset-x-0 top-[50px] z-1000">
      <div className="relative w-full px-[5vw] flex justify-between items-center">
        <Link href="/" className="text-white font-mono text-xl uppercase">
          Expont Mind
        </Link>

        <SideMenu />
      </div>
    </nav>
  );
};
