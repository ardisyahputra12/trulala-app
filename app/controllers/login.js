import Login from "../models/login.js";

const login = (req, res, next) => {
    let msg = req.session.err || "";
    req.session.err = "";
    res.render("login", { user: req.session.user || "", message: msg });
};

const signup = (req, res, next) => {
    let msg = req.session.err || "";
    req.session.err = "";
    res.render("signup", { user: req.session.user || "", message: msg });
};

const logout = (req, res, next) => {
    req.session.destroy();
    res.redirect("/");
};

const authLogin = (req, res, next) => {
    const data = {
        user_email: req.body.user_email,
        user_password: req.body.user_password
    };
    Login.findOne({ where: { user_email: data.user_email } }).then(results => {
        if (!results) {
            req.session.err = "Coba lagi, email atau password salah!";
            res.redirect("/auth/login");
        } else if (data.user_password != results.user_password) {
            req.session.err = "Coba lagi, password salah!";
            res.redirect("/auth/login");
        } else {
            req.session.user = results;
            res.redirect("/");
        }
    }).catch(err => {
        req.session.err = "Error Database.";
        res.redirect("/auth/login");
    });
};

const authSignup = (req, res, next) => {
    Login.create({
        user_name: req.body.user_name,
        user_email: req.body.user_email,
        user_password: req.body.user_password
    }).then((results) => {
        res.json({
            status: 200,
            error: null,
            Response: results
        });
    }).catch(err => {
        res.json({
            status: 502,
            error: err
        });
    });
};

export default { login, signup, logout, authLogin, authSignup };