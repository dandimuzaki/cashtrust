import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { createUser, deleteUser, getUser, getUserById, updateUser } from "../models/user.js";

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: '15m' }
  )
}

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  )
}

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body
    const existingUser = await getUser(email)

    if (existingUser) return res.status(409).json({
      success: false,
      message: "Email already exists",
    })

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser({ name, email, password: hashedPassword})
    const { password: _, ...safeUser } = newUser;

    const accessToken = generateAccessToken(newUser)
    const refreshToken = generateRefreshToken(newUser)

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    })

    res.status(201).json({
      accessToken,
      user: safeUser
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to register",
      errors: err.message
    })
  }
}

export const login = async (req, res) => {
  console.log(req.body)
  try {
    const { email, password } = req.body;
    const user = await getUser(email);
    if (!user) return res.status(401).json({ 
      success: false,
      message: 'Email does not exist'
    });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({
      success: false,
      message: 'Incorrect password'
    });

    const { password: _, ...safeUser } = user;

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    });

    res.status(200).json({
      accessToken,
      user: safeUser
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      message: 'Failed to login', 
      errors: err.message
    });
  }
};

export const silentLogin = (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_REFRESH_SECRET, async (err, decoded) => {
    if (err) return res.sendStatus(403);

    try {
      const dbUser = await getUserById(decoded.id);
      if (!dbUser) return res.sendStatus(404);

      const { password: _, ...safeUser } = dbUser;

      const newRefreshToken = generateRefreshToken(dbUser);
      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      });

      const accessToken = generateAccessToken(dbUser);

      res.status(200).json({
        accessToken,
        user: safeUser
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Failed to silent login', 
        errors: err.message
      });
    }
  });
};

export const logout = (req, res) => {
  try {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    });
    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Failed to logout', 
        errors: err.message
      });
    }
};

export const updateAccount = async (req, res) => {
  try {
    const {id} = req.user
    const {name, email, password, oldPassword} = req.body
    
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "Account not found" });
    }

    if (password) {
      const isMatch = await bcrypt.compare(oldPassword || "", user.password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Current password is incorrect"
        });
      }
    }

    let data = {};
    if (name) data.name = name;
    if (email) data.email = email;
    if (password) data.password = await bcrypt.hash(password, 10);
    const updated = await updateUser(id, data)
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Account not found', 
      })
    }
    const { password: _, ...safeUser } = updated;
    res.status(200).json({
      success: true,
      message: 'Success updating account', 
      data: safeUser
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to update account', 
      errors: err.message
    })
  }
}

export const deleteAccount = async (req, res) => {
  try {
    const {id} = req.user

    const { password } = req.body;

    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "Account not found" });
    }

    const isMatch = await bcrypt.compare(password || "", user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect"
      });
    }

    await deleteUser(id)
    
    res.status(200).json({
      success: true,
      message: 'Success deleting account', 
      data: deleted
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete account', 
      errors: err.message
    })
  }
}