import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LogIn = ({ setUser,setLocal }) => {
  let navigate = useNavigate()
  const [formValues, setFormValues] = useState({ email: '', password: '' })
  const baseUrl = process.env.REACT_APP_BASE_URL

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    e.nativeEvent.path[4].children[0].children[0].classList = 'blurRemove'
    const res = await axios.get(`${baseUrl}api/login/${formValues.password}/${formValues.email}`)
    setUser({id: res.data[0].id,name:res.data[0].name})
    setLocal(res.data[0])
    setFormValues({ email: '', password: '' })
    navigate('/')
  }

  return (
    <div className="signinPage">
      <div className="card-overlay centered">
        <form className="signInForm" onSubmit={handleSubmit}>
          <div className="input-wrapper">
          <h3 id="signInTitle">Sign In</h3>
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="example@example.com"
              value={formValues.email}
              id="signInValues"
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              value={formValues.password}
              id="signInValues"
              required
            />
          </div>
          <button id="signInButton" disabled={!formValues.email || !formValues.password}>
            Log In
          </button>
        </form>
      </div>
    </div>
  )
}

export default LogIn
