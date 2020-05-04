import React, { useState, useEffect } from 'react'
import APIInvoker from '../utils/APIInvoker'

//const [ok, state, error] = useAPI(`/followers/${props.profile.userName}`, 'GET', null)
const useAPI = (url, method, payload) => {
    const [state, setState] = useState({
        ok: null,
        response: null,
        error: null
    })

    const okCallback = (response) => {
        setState({
            ok: true,
            response: response.body
        })
    }

    const errCallback = (response) => {
        setState({
            ok: false,
            error: response
        })
    }

    useEffect(() => {
        setState({
        })
        let params = {
            method,
            headers: APIInvoker.getAPIHeader()
        }

        if(payload != null) params.body = JSON.stringify(payload)
        
        APIInvoker.invoke(url, okCallback, errCallback, params)

    }, [url, method, payload])


    return [state.ok, state.response, state.error]
}

export default useAPI