const express = require('express');
const router = express.Router();

const axios = require('axios');




router.get('/', (req, res) => {
    console.log(req.session.user_key, "메인 화면 접속")

    if(req.session.user_key) {
        res.render("main");
    } else {
        res.send(`<script>location.href='/login';</script>`)
    }
});


router.get('/login', (req, res) => {

    if(!req.session.user_key) {
        res.render("login");
    } else {
        res.send(`<script>location.href='/';</script>`)
    }
    
});


router.post('/loginProcess', async (req, res) => {

    const body = {
        id: req.body.id,
        pw: req.body.pw,
    }

    const response = await axios.post(
        "https://ocean-gps.com:8000/userAPI/login",
        {
            id: body.id,
            pw: body.pw
        }
    );

    if(response.data){
        console.log(response.data[0].user_key, " 로그인")

        req.session.user_key = response.data[0].user_key;

        req.session.save(function(){
            
        });

        res.send(true)

    } else {
        res.send(false);
    }
});



router.get('/logoutProcess', async (req, res) => {
    delete req.session.user_key;
   
    res.send(`<script>location.href='/login';</script>`)
});


module.exports = router;
