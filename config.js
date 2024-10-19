const config = {
    database: {
        url: 'mongodb://localhost:27017/Cards',
    },
    server: {
        PORT: 3000,
        host: 'localhost',
    },
    mailer: {
        host: 'gmail',
        user: 'yarikxan2@gmail.com',
        pass: 'qxux scya apuk annz',
    },
    secret: '40eca18c4bd340dc028165a8913e26a1416d5f272928ce96936788104321825753328c6e301d774e94220bf3a1f42fc5a6661a58717228f8214351543af4a261',
    other: {
        pagination: {
            pagesize: 12 //amount of cards on single page
        },
        saltRounds: 10,
    },
};

module.exports = config;
