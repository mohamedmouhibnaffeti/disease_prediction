import jwt from "jsonwebtoken"
export const createAccessToken = (id: any) => {
    const user = {id: id._id, role: id.role}
    return jwt.sign({user}, process.env.JWT_SECRET || "", {
        expiresIn: '1h'
    })
}

export const createRefreshToken = (id: any) => {
    const user = {id: id._id, role: id.role}
    return jwt.sign({user}, process.env.JWT_SECRET || "", {
        expiresIn: '7d'
    })
}

export const refreshToken = async() => {
    try{
        const response = await fetch('api/auth/token/refresh', {
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
                //localStorage.removeItem('AccessToken');
                //localStorage.removeItem('RefreshToken');
                console.log(response)//window.location.href = '/login';
            } else {
                throw new Error('Failed to refresh token');
            }
        }
        if(response.ok){
            const data = await response.json()
            const { accessToken } = data
            localStorage.setItem('AccessToken', accessToken)
        }
    }catch(err){
        console.log(err)
    }
}

export const sendAuthenticatedRequest = async (url: string, options: any = {}) => {
    try {
        options.headers = options.headers || {};
        const accessToken = localStorage.getItem('AccessToken');
        if (accessToken) {
            options.headers.Authorization = `Bearer ${accessToken}`;
        }

        let response = await fetch(url, options);

        if (!response.ok) {
            if (response.status === 401) {
                await refreshToken();
                options.headers.Authorization = `Bearer ${localStorage.getItem('AccessToken')}`;
                response = await fetch(url, options);
            } else if (response.status === 403) {
                console.log(response);
            } else {
                throw new Error('Failed to fetch data');
            }
        }

        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
};