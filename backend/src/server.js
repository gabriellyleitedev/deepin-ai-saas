import express from "express"; // Importa o express, framework do node. Facilita criar APIs e rotas.
import cors from "cors"; // Cors libera que o front-end se comunique com o back-end

const app = express(); // cria aplicação backend, tudo vai sair dele

app.use(cors()); // ativa cors global, basicamente: “frontend pode acessar backend”
app.use(express.json()); // permite receber e entender o json

app.get("/", (req, res) => { // rota principal
  res.json({ // retorna um json 
    message: "Backend Deepin AI running 🚀"
  });
});

const PORT = 3000;

app.listen(PORT, () => { // liga o servidor
  console.log(`Server running on port ${PORT}`); // mensagem pra confirmar que iniciou
});