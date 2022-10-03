
const jwt = require('jsonwebtoken')
const pool = require('./sqlconnect');

const bcrypt = require('bcrypt')
const validator = require('validator')



const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '1d' })
}

// login a user
const loginUser = async (req, res) => {
    const {email, password} = req.body;

    const login = async(email,password) => {
        if (!email || !password) {
            throw Error('All fields must be filled')
          }
        
          const user = await pool.query('SELECT * FROM users WHERE email = \''+email+'\'');

          if (!user.rows[0]) {
            throw Error('Incorrect email')
          }
        
          const match = await bcrypt.compare(password, user.rows[0].password)
          if (!match) {
            throw Error('Incorrect password')
          }
        
          return user
        }

  try {
    const user = await login(email, password)

    // create a token
    const token = createToken(user.rows[0].user_id)
    const name = user.rows[0].name ;

    res.status(200).json({name, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}







// signup a user
const signupUser = async (req, res) => {
  const {name,email, password,role} = req.body;
  const signup = async(name,email,password,role) => {
      // validation
        if (!email || !password || !name) {
            throw Error('All fields must be filled')
        }
        if (!validator.isEmail(email)) {
            throw Error('Email not valid')
        }
        if (!validator.isStrongPassword(password)) {
            throw Error('Password not strong enough')
        }

        const exists = await pool.query('SELECT email FROM users WHERE email = \''+email+'\'');

        if (exists.rows[0]) {
            throw Error('Email already in use')
        }

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const query = await pool.query('INSERT INTO users (user_id ,name,email,password,role) VALUES (uuid_generate_v4(),\''
                                     + name + '\',\''
                                     + email+ '\',\''
                                     + hash + '\''
                                     + (role? (', \''
                                     +role+ '\''):'\'USER\'')
                                     +')');
        const response = await pool.query('SELECT * FROM users WHERE email = \''+email+'\'');

        return response
  }

  try {
    const response = await signup(name,email, password,role)

    // create a token
    const token = createToken(response.rows[0].user_id)

    res.status(200).json({name, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = { signupUser, loginUser }