import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { JwtPayloadType } from "@/app/interfaces/interfaces"
import { next_backend_route } from "../statics/ApiRoutes"

const useAuth = () => {
    const [role, setRole] = useState<string | null>(null)
    const router = useRouter()
    
    const publicRoutes = ["/symptoms-checker", "/", "/auth/Signup", "/auth/Login", "/auth/Login/ForgotPassword", "/auth/Login/ForgotPassword/InsertOTP", "/auth/Login/ForgotPassword/InsertOTP/ChangePassword"]

    useEffect(() => {
        const verifyToken = async (token: string): Promise<JwtPayloadType | null> => {
            try {
                const response = await fetch(`${next_backend_route}/auth/token/verify_token`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token }),
                })

                if (response.ok) {
                    const data = await response.json()
                    return data.payload as JwtPayloadType
                } else {
                    return null
                }
            } catch (error) {
                console.error("Token verification failed:", error)
                return null
            }
        }

        const refreshToken = async (): Promise<string | null> => {
            try {
                const refresh_token = localStorage.getItem("RefreshToken")
                if (!refresh_token) {
                    return null
                }

                const response = await fetch(`${next_backend_route}/auth/token/refresh`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ refresh_token }),
                })

                if (response.ok) {
                    const data = await response.json()
                    const newAccessToken = data.accessToken
                    localStorage.setItem("AccessToken", newAccessToken)
                    return newAccessToken
                } else {
                    return null
                }
            } catch (error) {
                console.error("Token refresh failed:", error)
                return null
            }
        }

        const handleAuth = async () => {
            const currentPath = window.location.pathname

            let token = localStorage.getItem("AccessToken")
            if (token) {
                let payload = await verifyToken(token)
                if (payload) {
                    setRole(payload.user.role)
                } else {
                    token = await refreshToken()
                    if (token) {
                        payload = await verifyToken(token)
                        if (payload) {
                            setRole(payload.user.role)
                        } else {
                            if (!publicRoutes.includes(currentPath)) {
                                router.push("/auth/Login")
                            }
                        }
                    } else {
                        if (!publicRoutes.includes(currentPath)) {
                            router.push("/auth/Login")
                        }
                    }
                }
            } else {
                if (!publicRoutes.includes(currentPath)) {
                    router.push("/auth/Login")
                }
            }
        }

        handleAuth()
    }, [router])

    return role
}

export default useAuth
