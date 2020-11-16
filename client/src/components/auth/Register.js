import React, {useState, useContext, useEffect} from "react";
import alertContext from "../../context/alert/alertContext";
import authContext from "../../context/auth/authContext";

const Register = () => {
  const AlertContext = useContext(alertContext);
  const AuthContext = useContext(authContext);

  const {setAlert} = AlertContext;
  const {register, clearError, error} = AuthContext;

  useEffect(() => {
    if (error !== null) {
      setAlert(error, "danger");
      clearError();
    }
  }, [error]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });
  const {name, email, password, password2} = user;

  const onChange = e => {
    setUser({...user, [e.target.name]: e.target.value});
  };

  const onSubmit = e => {
    e.preventDefault();
    if (name === "" || email === "" || password === "" || password2 === "") {
      setAlert("Please enter all fields", "danger");
    } else if (password !== password2) {
      setAlert("Password does not match", "danger");
    } else {
      register({name, email, password});
    }
  };
  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input type='text' name='name' value={name} onChange={onChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' value={email} onChange={onChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password2'>Confirm Password</label>
          <input
            type='password'
            name='password2'
            value={password2}
            onChange={onChange}
          />
        </div>
        <input
          type='submit'
          value='Register'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Register;
