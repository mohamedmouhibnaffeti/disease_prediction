import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/lib/Hooks/useAuth";

const withAuth = (WrappedComponent: React.ComponentType<any>, allowedRoles: string[]) => {
    const WithAuthComponent = (props: any) => {
        const role = useAuth();
        const router = useRouter();

        useEffect(() => {
            if (role && !allowedRoles.includes(role)) {
                router.push("/Forbidden");
            }
        }, [role, router, allowedRoles]);

        if (!role || !allowedRoles.includes(role)) {
            return null;
        }

        return <WrappedComponent {...props} />;
    };

    const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || "Component";
    WithAuthComponent.displayName = `withAuth(${wrappedComponentName})`;

    return WithAuthComponent;
};

export default withAuth;
