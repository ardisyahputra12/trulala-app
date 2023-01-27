import Backlog from "../models/backlog.js";

const all = (req, res, next) => {
    Backlog.findAll().then((results) => {
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

const add = (req, res, next) => {
    Backlog.create({
        title: req.body.title,
        desc: req.body.desc,
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

const edit = (req, res, next) => {
    Backlog.update({
        title: req.body.title,
        desc: req.body.desc,
    }, {
        where: {
            id: req.params.id
        }
    }).then((results) => res.json({
        status: 200,
        error: null,
        Response: results
    })).catch(err => res.json({
        status: 502,
        error: err
    }))
};

const move = (req, res, next) => {
    Backlog.update({
        card: req.body.card,
    }, {
        where: {
            id: req.params.id
        }
    }).then((results) => res.json({
        status: 200,
        error: null,
        Response: results
    })).catch(err => res.json({
        status: 502,
        error: err
    }))
};

const del = (req, res, next) => {
    Backlog.destroy({
        where: {
            id: req.params.id
        }
    }).then((results) => res.json({
        status: 200,
        error: null,
        Response: results
    })).catch(err => res.json({
        status: 500,
        error: err
    }))
};

export default { all, add, edit, move, del };