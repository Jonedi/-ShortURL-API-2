export const signup = (req, res) => {
    console.log(req.body);
    res.json({ok: "SignUp Ok"})
}

export const login = (req, res) => {
    console.log(req.body);
    res.json({ok: "Login OK"})
}
