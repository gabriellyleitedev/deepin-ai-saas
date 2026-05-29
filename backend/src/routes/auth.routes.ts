import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();
const prisma = new PrismaClient();

// Chave secreta usada para assinar o Token JWT
const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_secreta_super_segura';

// ==========================================
// ROTA DE REGISTRO (A QUE JÁ LOGA O USUÁRIO)
// ==========================================
router.post('/register', async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    return res.status(201).json({
      message: 'User created successfully',
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// ==========================================
// ROTA DE LOGIN (CRIANDO AGORA)
// ==========================================
router.post('/login', async (req: Request, res: Response): Promise<any> => {  // esse router login é o cerebro de TODO o login
  try {
    const { email, password } = req.body;

    // 1. Validação básica de entrada
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // 2. Busca o usuário pelo e-mail lá no banco da Neon (OU SUPABASE)
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // 3. Compara a senha enviada com a senha criptografada salva no banco
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // 4. Se a senha bater, gera o Token JWT (passaporte válido por 1 dia)
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    // 5. Devolve os dados básicos do usuário e o Token de acesso
    return res.status(200).json({
      message: 'Login successful',
      user: { id: user.id, name: user.name, email: user.email },
      token
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;