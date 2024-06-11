import express from 'express';
import User from '../database/models/app/user';
import hash from '../utils/hash';

const router = express.Router();

router.get('/me', async (req, res) => {
    if (req.session.user) {
        res.status(200).send( req.session.user );
    } else {
        res.status(401).send({ message: 'Unauthenticated' });
    }
})

router.all('/logout', async (req, res) => {
    req.session.destroy( (err) => {
        if (!err) return res.status(200).send({ message: 'Logged out' });
        else return res.status(500).send({ message: 'Internal error' });
    });
})

router.post('/login', async (req, res) => {
    if (req.session.user) return res.status(202).send({ message: 'Already logged in' });

    const username_or_email = req.body.username;
    const password = req.body.password;

    if (!username_or_email) return res.status(400).send({ message: 'No email or username provided' });
    if (!password) return res.status(400).send({ message: 'No password provided' });

    let user = await User.findOne({ username: username_or_email, password: hash(password) });
    if (!user) await User.findOne({ email: username_or_email, password: hash(password) });
    if (!user) return res.status(400).send({ message: 'User doesnt exists' });

    req.session.user = user;

    res.status(200).send({ message: 'Logged in', user: user });
});

router.post('/register', async (req, res) => {
    if (req.session.user) return res.status(400).send({ message: 'User already logged in'})

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    if (!username || !email || !password) return res.status(400).send({ message: 'Bad content' });

    if (await User.exists({ username: username}) || await User.exists({ email: email}))
        return res.status(409).send({ message: 'User already exists' });

    await User.create({
        username: username,
        email: email,
        password: hash(password),
    });

    res.status(200).send({ message: 'Success' });
})

export default router;