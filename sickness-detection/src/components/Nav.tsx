"use client";
import Image from "next/image";
import Logo from "./Images/Logo.png";
import { LogIn, MenuIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import useAuth from "@/lib/Hooks/useAuth";
import { useEffect, useState } from "react";
import AvatarDropdown from "./AvatarDropdown";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/Store/store";
import { ToggleHamMenu } from "@/Store/auth/authSlice";

export default function Nav() {
    const role = useAuth();
    console.log("Role:", role);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (typeof window !== "undefined") {
            console.log("Running in the browser");
            try {
                const userString = window.localStorage.getItem("user") || "";
                console.log("userString from localStorage:", userString);
                if (userString) {
                    const userObject = JSON.parse(userString);
                    console.log("Parsed userObject:", userObject);
                    if (userObject && typeof userObject === 'object' && Object.keys(userObject).length > 0) {
                        // Ensure that the userObject has the expected properties
                        if (userObject.name) {
                            setUser(userObject);
                        } else {
                            console.log("Invalid user object:", userObject);
                        }
                    }
                }
            } catch (error) {
                console.error("Error parsing user from localStorage:", error);
            }
            setLoading(false);
        } else {
            console.log("Running on the server");
            setLoading(false);
        }
    }, []);

    const Router = useRouter();
    const pathname = usePathname();
    const dispatch = useDispatch<AppDispatch>();

    if (pathname.startsWith("/admin") || pathname.startsWith("/dashboard")) {
        return null;
    }

    return (
        <div className="fixed z-50 top-0 h-[5rem] bg-white shadow-md w-full">
            <div className="w-full h-full flex justify-between items-center px-8">
                <div className="flex md:gap-3 gap-1 justify-center items-center">
                    <Image src={Logo} alt="Logo" className="w-[170px]" />
                    <a
                        href="/symptoms-checker"
                        className={`md:flex hidden font-bold ${
                            pathname.startsWith("/symptoms-checker")
                                ? "text-sickness-primary hover:text-sickness-primary/80"
                                : "text-black hover:text-black/80"
                        } transition delay-75 ease-in-out`}
                    >
                        Disease Prediction
                    </a>
                </div>
                {!loading && (
                    user ? (
                        <AvatarDropdown user={user} role={role || ""} />
                    ) : (
                        !pathname.startsWith("/auth/Login") && (
                            <button
                                className="md:flex hidden justify-center items-center font-semibold text-white bg-sickness-mayaBlue hover:bg-sickness-mayaBlue/70 transition delay-75 ease-in px-2 py-2 rounded-md"
                                onClick={() => Router.push('/auth/Login')}
                            >
                                Login <LogIn />
                            </button>
                        )
                    )
                )}
                <div
                    onClick={() => dispatch(ToggleHamMenu(true))}
                    className="md:hidden flex p-1 cursor-pointer hover:bg-sickness-gray/30 transition delay-100 duration-100 ease-in bg-sickness-gray/20 rounded-md border-sickness-border border"
                >
                    <MenuIcon className="w-8 h-8" />
                </div>
            </div>
        </div>
    );
}
