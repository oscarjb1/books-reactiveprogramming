import React, { useEffect, useState } from 'react'
import APIInvoker from '../utils/APIInvoker'
import browserHistory from '../History'

const useLogin = () => {
    const [loginStatus, setLoginStatus] = useState({
        load: false,
        user: null
    })


    useEffect(() => {
        let token = window.localStorage.getItem("token")
        if (token == null) {
            setLoginStatus({
                load: true,
                user: null
            })
        } else {
            APIInvoker.invokeGET('/secure/relogin', response => {
                setLoginStatus({
                    load: true,
                    user: response.profile
                })
                window.localStorage.setItem("token", response.token)
                window.localStorage.setItem("username", response.profile.userName)
            }, error => {
                console.log("Error al autenticar al autenticar al usuario ");
                window.localStorage.removeItem("token")
                window.localStorage.removeItem("username")
                setLoginStatus({
                    load: true,
                    user: null
                })
            })
        }
    }, [window.localStorage.getItem("token")])

    return [loginStatus.load, loginStatus.user]
}

export default useLogin