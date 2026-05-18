import express from "express";
import bcrypt from "bcryptjs"; 
import prisma from "../lib/prisma.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Auth route funcionando 🚀"
  });
});

router.post("/register", async (req, res) => {

  try {

    const { name, email, password } = req.body;

    // verifica se usuário já existe
    const userExists = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (userExists) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    // criptografa senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // cria usuário
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Internal server error"
    });

  }

});

export default router;