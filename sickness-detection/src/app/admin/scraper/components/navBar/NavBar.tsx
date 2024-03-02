import Link from 'next/link';
import NavbarItem from './NavbarItem';
const Navbar = () => {


    return (
        <>
            <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-6 mb-5">
                <div className="flex items-center flex-shrink-0 text-white mr-6">
                    <Link href="/">
                        <>My Website</>
                    </Link>
                </div>
                <div className="block lg:hidden">
                    <span
                        className="cursor-pointer text-gray-200 hover:text-gray-400 transition-all">
                    </span>
                </div>
                <div className={`w-full block flex-grow lg:flex  lg:items-center lg:w-auto `}>
                    <div className="text-sm w-[90%] lg:flex justify-center">
                        <NavbarItem />
                    </div>
                </div>
            </nav>

        </>
    );
};

export default Navbar;