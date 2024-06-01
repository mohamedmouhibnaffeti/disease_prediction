import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { JwtPayloadType, Role, RolePermissionsType } from "./app/interfaces/interfaces";


const rolePermissions: RolePermissionsType = {
    patient: ['/api/Appointments/request_appointment', '/api/dashboard/patient', '/api/user/patient/update_patient', '/api/user/doctor/get_doctor_by_speciality'],
    doctor: ['/api/Appointments', '/api/dashboard/doctor', '/api/user/doctor/update_doctor'],
    admin: ['/api/admin', '/api/dashboard/admin', '/api/user/admin', '/api/user/doctor', '/api/user/patient/change_patient_state', '/api/user/patient/get_all_patients',]
};

export async function middleware(request: Request){
    /*
    console.log('Middleware')
    console.log(request.method)
    console.log(request.url)
    */
    const allowedOrigin = 'http://localhost:3030/'
    const origin = request.headers.get('referer')
    /*
    if(!origin?.startsWith(allowedOrigin)){
        return NextResponse.json("Error fetching resource", {status: 403})
    }
    */
    const url = new URL(request.url);
    const path = url.pathname;

    if (!isProtectedRoute(path)) {
        return NextResponse.next();
    }
    
    const authHeader = request.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const token = authHeader.split(' ')[1];

    try {
        // Verify the token
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);

        const decodedPayload = payload as unknown as JwtPayloadType;
        if (!decodedPayload || !decodedPayload.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const userRole = decodedPayload.user.role as Role;


        // Check if the role is authorized to access the route

        if (!isAuthorized(userRole, path)) {
            return NextResponse.json({ message: "Forbidden" }, { status: 403 });
        }

        // Proceed to the next middleware or route handler
        return NextResponse.next();
    } catch (error) {
        console.error('JWT verification error:', error);
        return NextResponse.json({ message: "Unauthorized Error" }, { status: 401 });
    }

}

function isProtectedRoute(path: string): boolean {
    return Object.values(rolePermissions).some(routes => routes.some((route: string) => path.startsWith(route)));
}

function isAuthorized(role: Role, path: string) {
    const allowedRoutes: Array<string> = rolePermissions[role] || [];
    return allowedRoutes.some((route: string) => path.startsWith(route));
}

export const config = {
    matcher: '/api/:path*',
}