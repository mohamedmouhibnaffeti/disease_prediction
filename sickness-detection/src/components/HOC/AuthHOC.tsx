import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/lib/Hooks/useAuth";

const withAuth = (WrappedComponent: React.ComponentType<any>, allowedRoles: string[]) => {
    return (props: any) => {
        const role = useAuth();
        const router = useRouter();

        useEffect(() => {
            if (role && !allowedRoles.includes(role)) {
                router.push("/Forbidden")
            }
        }, [role]);

        if (!role || !allowedRoles.includes(role)) {
            return null
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
