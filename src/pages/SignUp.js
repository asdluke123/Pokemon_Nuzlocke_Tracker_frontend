import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const SignUp = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL
  let navigate = useNavigate()
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await axios.post(`${baseUrl}api/createuser/`,{
      name: formValues.name,
      eMail: formValues.email,
      password: formValues.password
    })
    console.log(res)
    setFormValues({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
    navigate('/login')
  }

  return (
    <div className="signupCol">
      <div className="card-overlay centered">
        <form className="signUpForm" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <h3 id="signUpTitle">Sign Up</h3>
            <label htmlFor="name">Name</label>
            <input
              onChange={handleChange}
              name="name"
              type="text"
              placeholder="John Smith"
              value={formValues.name}
              id="signUpValues"
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              name="email"
              type="text"
              placeholder="example@example.com"
              value={formValues.email}
              id="signUpValues"
              required
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              type="text"
              name="password"
              value={formValues.password}
              id="signUpValues"
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              onChange={handleChange}
              type="text"
              name="confirmPassword"
              value={formValues.confirmPassword}
              id="signUpValues"
              required
            />
          </div>
          <button
            id="registerButton"
            disabled={
              !formValues.email ||
              (!formValues.password &&
                formValues.confirmPassword === formValues.password)
            }
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignUp
