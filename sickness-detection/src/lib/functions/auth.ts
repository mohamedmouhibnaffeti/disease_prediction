import jwt from "jsonwebtoken"

export const createAccessToken = (id: any) => {
    return jwt.sign({id}, process.env.JWT_SECRET || "", {
        expiresIn: '1h'
    })
}

export const createRefreshToken = (id: any) => {
    return jwt.sign({id}, process.env.JWT_SECRET || "", {
        expiresIn: '7d'
    })
}

export const refreshToken = async() => {
    try{
        const response = await fetch('/auth/token/refresh', {
            method: 'POST',
            body: JSON.stringify({
                refresh_token: localStorage.getItem('RefreshToken')
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if(!response.ok){
            if (response.status === 401) {
                localStorage.removeItem('AccessToken');
                localStorage.removeItem('RefreshToken');
                window.location.href = '/login';
            } else {
                throw new Error('Failed to refresh token');
            }
        }
        const data = await response.json()
        const { accessToken, expiryTime } = data
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('expiryTime', expiryTime)
    }catch(err){
        console.log(err)
    }
}

export const sendAuthenticatedRequest = async(url: string, options: any) => {
    try{
        const response = await fetch(url, options)
        if(!response.ok){
            if(response.status === 401){
                await refreshToken()
                options.headers.Autorization = `Bearer ${localStorage.getItem("accessToken")}`
                return fetch(url, options)
            }else{
                throw new Error("Failed to fetch data")
            }
        }
    }catch(err){
        console.log(err)
        throw err
    }
}