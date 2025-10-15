import user from './user.js';
import { v4 as uuidv4 } from 'uuid';
import { setUser } from '../service/map.js';

export const createUserAndStock = async function(req, res) { // The handler always receives (req, res)
   try {
       // 1. Get data from the request *body*
       const { name, email,password , portfolio } = req.body;

  

       const newUser = new user({
           name: name,
           email: email,
           password: password,
           portfolio: portfolio || [] 
       });

       const savedUser = await newUser.save();
       console.log('✅ User created:', savedUser.email);

       const sessionid = uuidv4();
       console.log('🆔 Session ID:', sessionid);
       setUser(sessionid, savedUser);
       res.cookie('uid'  ,sessionid);

       // 2. Send a SUCCESS response back to the client with the created user
       res.status(201).json({ 
           message: 'User created successfully', 
           user: savedUser 
       });

   } catch (error) {
       console.error("❌ Error creating user:", error.message);

       res.status(500).json({ message: "An internal server error occurred." });
   }
};

export const handleLogin = async function(req, res) {
    try {
        const { email, password } = req.body;
        const foundUser = await user.findOne({ email, password });

        if (foundUser) {
            const sessionid = uuidv4();
            console.log('🆔 Session ID:', sessionid);
            setUser(sessionid, foundUser);
            res.cookie('uid', sessionid);
            res.status(200).json({ message: "Login successful", foundUser });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        console.error("❌ Error logging in:", error.message);
        res.status(500).json({ message: "An internal server error occurred." });
    }
};
