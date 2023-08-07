const express = require('express');
const router = express.Router();

const axios = require('axios');



router.get('/', (req, res) => {
    console.log(req.session.admin_key, "관리자 메인 화면 접속")

    if(req.session.admin_key) {
        res.render("admin/main", {admin_key: req.session.admin_key});
    } else {
        res.send(`<script>location.href='/admin/login';</script>`)
    }
});

router.get('/info_update', (req, res) => {

    if(req.session.admin_key) {
        res.render("admin/info_update", {admin_key: req.session.admin_key});
    } else {
        res.send(`<script>location.href='/admin/login';</script>`)
    }
});




router.get('/login', (req, res) => {

    if(!req.session.admin_key) {
        res.render("admin/login");
    } else {
        res.send(`<script>location.href='/admin';</script>`)
    }
    
});



router.post('/loginProcess', async (req, res) => {

    const body = {
        id: req.body.id,
        pw: req.body.pw,
    }

    const response = await axios.post(
        "https://ocean-gps.com:8000/adminAPI/login",
        {
            id: body.id,
            pw: body.pw
        }
    );

    if(response.data){
        console.log(response.data[0].admin_key, " 관리자 로그인")

        req.session.admin_key = response.data[0].admin_key;

        // req.session.save(function(){
            
        // });

        res.send(true)

    } else {
        res.send(false);
    }
});


router.get('/logoutProcess', async (req, res) => {
    delete req.session.admin_key;
   
    res.send(`<script>location.href='/admin/login';</script>`)
});




module.exports = router;