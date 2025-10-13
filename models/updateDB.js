import user from './user.js';

export const createUserAndStock = async function(req, res) { // The handler always receives (req, res)
   try {
       // 1. Get data from the request *body*
       const { name, email, portfolio } = req.body;

  

       const newUser = new user({
           name: name,
           email: email,
           portfolio: portfolio || [] 
       });

       const savedUser = await newUser.save();
       console.log('✅ User created:', savedUser.email);

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