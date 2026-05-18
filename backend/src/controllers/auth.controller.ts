export const register = (req: { body: { name: any; email: any; password: any; }; }, res: {
    json: (arg0: { // res.json retora um JSON pro frontend
      message: string; user: { name: any; email: any; };
    }) => void;
  }) => {

  const { name, email, password } = req.body; // req.body é o corpo do JSON enviado, ex: name, email, password

  res.json({ // res.json retora um JSON pro frontend
    message: "User registered successfully",
    user: {
      name,
      email
    }
  });

};