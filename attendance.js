telegram_attendance();

function telegram_attendance() {
    bot.on('message', (msg) => {
        if (msg.text.toString().toLowerCase().includes('register')) {
            bot.sendMessage(msg.chat.id, '🤓 Please enter your credentials in the given order 🤓\n🧐 Copy -> Paste below message and edit your credentials 🧐').then(() => {
                bot.sendMessage(msg.chat.id, 'id,pass');
            })
        } else if (msg.text.toString().toLowerCase().includes('creds')) {
            checkUserCreds(msg);
        } else if (msg.text.toString().toLowerCase().includes('get my attendance')) {
            read(msg);
        } else if (msg.text.toString().toLowerCase().includes('attendance')) {
            read(msg);
        } else if (msg.text.toString().toLowerCase().includes('hi')) {
            sendDefaultStartMsg(msg);
        } else if (msg.text.toString().toLowerCase().includes('hello')) {
            sendDefaultStartMsg(msg);
        } else if (msg.text.toString().toLowerCase().includes('start')) {
            sendDefaultStartMsg(msg);
        } else if (msg.text.toString().toLowerCase().includes('timetable')) {
            timeTable(msg);
        } else if (msg.text.toString().toLowerCase().includes('fb bday remainder')) {
            if (msg.chat.id === parseInt(ashwinTelegramId)) {
                fb.getFacebookBday();
            }
        }
    });
}

function triggerMsg(element, person) {
    var msg = element.CourseName + ' - ' + element.CoursePercentage;
    triggerMsgToTelegram(person.chat.id, msg);
}

function getAttendance(rollno, pass, msg) {
    var creds = {
        xyz: rollno,
        xyz: pass
    };

    axios.post('http://login', creds).then(result => {
        if (resultSucess) {
            axios.get('http://getDetails').then(result => {
                arr.forEach(element => {
                    triggerMsg(element, msg);
                });
            }).catch(err => {
                console.log(err);
            });
        } else {
            triggerMsgToTelegram(msg.chat.id, '😔 Incorrect Creds 😔')
        }
    }).catch(err => {
        console.log(err);
    });
}

async function read(msg) {
    client.query('select from table user_id=$1', [msg.chat.id], function (err, res) {
        if (res.rows[0]) {
            var decryptedPass = cryptr.decrypt(res.rows[0].passd);
            getAttendance(res.rows[0].rollno, decryptedPass, msg);
        } else {
            triggerMsgToTelegram(msg.chat.id, `Psst! Looks like you've not registered us.
                \nPlease proceed with the following steps to get started\n\n🤩 Tap /register and see the magic 🤩`);
        }
    });
}

async function saveCreds(msg, creds) {
    const encryptedString = cryptr.encrypt(creds.Password);
    client.query(`insert to table`)
}

function checkUserCreds(msg) {
    var credentials = {
        // ....
    }

    axios.post('http://login', creds).then(result => {
        if (resultIsSuccess) {
            saveCreds(msg, credentials);
            triggerMsgToTelegram(msg.chat.id, "❤️ Registered successfully ❤️\nYou can either tap the below inline keyboard or send /attendance to get your attendance details", {
                "reply_markup": {
                    "keyboard": [["🤪 Get my Attendance 🤪"]]
                }
            });
        } else {
            triggerMsgToTelegram(msg.chat.id, '😔 Psst! Incorrect Credentials 😔');
        }
    }).catch(err => {
        triggerMsgToTelegram(msg.chat.id, '😔 Psst! Incorrect Credentials 😔');
        console.log(err);
    });
}

function sendDefaultStartMsg(msg) {
    bot.sendMessage(msg.chat.id, `🙂 Welcome ` + msg.from.first_name + ` 🙂`).then(() => {
        bot.sendMessage(msg.chat.id, `🤩 Tap /register and see the magic 🤩`);
    })
};

function timeTable(msg) {
    var json = [{
        "Mon": "1.Subject 1\n\n2.Subject 2\n\n....",
        "Tue": "1.Subject 1\n\n2.Subject 2\n\n....",
        // .......
        "Sat": "No schedules for today! Weekend! ❤️",
        "Sun": "No schedules for today! Weekend! ❤️"
    }];

    if (daysMatch) {
        // trigger msg
        triggerMsgToTelegram(msg.chat.id, `Today's Timetable: (` + getDay + `)\n\n` + attrValue);
    }

}