export const register = (req, res) => {

  const { name, email, password } = req.body; // req.body é o corpo do JSON enviado, ex: name, email, password

  res.json({ // res.json retora um JSON pro frontend
    message: "User registered successfully",
    user: {
      name,
      email
    }
  });

};