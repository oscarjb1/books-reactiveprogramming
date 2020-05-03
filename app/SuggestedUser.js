import React, { useState, useEffect } from 'react'
import APIInvoker from './utils/APIInvoker'
import { Link } from 'react-router-dom'

const SuggestedUser = (props) => {

  const [state, setState] = useState([])

  useEffect(() => {
    APIInvoker.invokeGET('/secure/suggestedUsers', response => {
      setState(response.body)
    }, error => {
      setState([])
      console.log("Error al actualizar el perfil", error);
    })
  }, [])

  return (
    <aside id="suggestedUsers" className="twitter-panel">
      <span className="su-title">A quién seguir</span>
      <If condition={state != null} >
        <For each="user" of={state}>
          <div className="sg-item" key={user._id}>
            <div className="su-avatar">
              <img src={user.avatar} alt={user.name} />
            </div>
            <div className="sg-body">
              <div>
                <Link to={"/" + user.userName}>
                  <span className="sg-name">{user.name}</span>
                  <span className="sg-username">@{user.userName}</span>
                </Link>
              </div>
              <Link to={"/" + user.userName}
                className="btn btn-primary btn-sm">
                <i className="fa fa-user-plus" aria-hidden="true"></i>
                      Ver perfil</Link>
            </div>
          </div>
        </For>
      </If>
    </aside>
  )
}
export default SuggestedUser;
