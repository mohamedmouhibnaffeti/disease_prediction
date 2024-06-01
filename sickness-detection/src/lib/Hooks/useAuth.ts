import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { JwtPayloadType } from "@/app/interfaces/interfaces";
import { next_backend_route } from "../statics/ApiRoutes";

const useAuth = () => {
    const [role, setRole] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const verifyToken = async (token: string): Promise<JwtPayloadType | null> => {
            try {
                const response = await fetch(`${next_backend_route}/auth/token/verify_token`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token }),
                });

                if (response.ok) {
                    const data = await response.json();
                    return data.payload as JwtPayloadType;
                } else {
                    return null;
                }
            } catch (error) {
                console.error("Token verification failed:", error);
                return null;
            }
        };

        const token = localStorage.getItem("AccessToken");
        if (token) {
            verifyToken(token).then((payload) => {
                if (payload) {
                    setRole(payload.user.role);
                } else {
                    router.push("/auth/Login");
                }
            });
        } else {
            router.push("/auth/Login");
        }
    }, [router]);

    return role;
};

export default useAuth;
