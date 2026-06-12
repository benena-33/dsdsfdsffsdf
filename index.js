const mineflayer = require('mineflayer');
const fs = require('fs');

// Конфигурационные константы
const RANDOM_MESSAGES = ["!здарова", "!вайп когда", "!не знаю", "!у меня кд", "!не могу я в кт", "!кт", "!кто пвп тп", "!был вайп?", "!замок пофиксили", "!в лс надо", "!/warp pvp", "!а когда босс будет?", "!когда босс", "!админ босса спавни", "!что по замку", "админы хелперы ау",
"!замок фиксанули?", "!разрешена карта", "!да", "!/wipe status", "!эффекты откуда?", "!откуда у меня эффекты (мат)", "!(мат) кейсы", "!(мат)", "!купите на ауке у меня предметы", "ебать", "мда", "!а куда все пропали", "!нормас", "!я ебал", "!bb", "!кто на груз тепнет", "!лан", "!дс", "!войс включи", "!mq", 
"!у меня лимит купите что-то на ауке", "пульс разрешен?",
"!мб", "!как вы?", "!как сделать (мат)", "!как дела?","тут боты?",  
"!сервер топ?", "!чо", "!как (мат)", "!как дела?", "!у меня есть кеш",  "!зарабатываем",  "!кому ресы?",  "!баля",  "!биля",  "!6ля",  "!эксепт",  "!/mods",  "!go pvp",  "!го пвп",  "!хаха",  "!+",  "!-",  "!эксперт",  "!где админ",  "!блоки есть?",  "!кнч", "!не везет", "!лакер", "!дааааааааааааааааааааа", "!тотем сюда", "!дай тотем", "!тотемы дай",
"!в лс", "!го в лс", "!ку", "!q", "!тп", "!?", "!здаров", "!окак", "!о как", "!хм", "!да", "!/tpa", "!на ах продай", "!выстави на ах", "!/ah", "!агро", 
"!пиздец", "!privet vsem", "!nu", "!хах", "!хехе", "!exept", "exept тут?", "где модеры?",
"!bb", "!poka", "!поxуй", "!пока", "!скоро вернусь", "!завтра еще зайду", "!cerf", "!/event", "!ртп урезали",
"!/rtp base куда?", "!на ивент го?", "!го на ивент", "!на фунтайм пиздуй нищук", "!нищета на фт иди", "тупая баба, тебе место ток на фт",
"!лошара", "!лох", "!сучара", "!и че", "!и чо", "!корды", "!корды дай", "!coords", "!ezzz", "!pve bot", "!нубяра", "!в нулину", "!нулевый", "!меллстройбурмалдасекреткод", "!изичка", "!2x1", "!3x1...", "!езки", "!а как подать заявку?"];

const WARPS = ['pvp', 'casino', 'end', 'mine', 'ah', 'char'];
const MIN_SESSION_TIME = 45 * 60 * 2000;
const MAX_SESSION_TIME = 45 * 60 * 2000;
const BOT_LAUNCH_INTERVAL = { min: 3000, max: 6000 };
const GREETINGS = ['qq', 'q', 'ку', 'прив', 'priv', 'privet', '?', 'салам'];
const DANGER_RESPONSES = ['я тут', 'че', 'че надо', '?', 'чо?', 'чо', 'чего', 'чего?', 'сам ты бот', 'это ты ботяра', 'ты даун?', 'ты тупой?', 'ты че дебил?', 'ты попутал чето'];
const RESPONSE_COOLDOWN = 60000;
const GLOBAL_RESPONSE_COOLDOWN = 60000;

const DIALOGS = {
    'а как подать заявку?': {
        responses: ['!/anketa', '!хз', '!/anketa пиши', '!заявку?'],
        responseBotCount: 3,
        cooldown: 4000,
        responseChance: 0.9
    },
    'когда босс': {
        response: '!хз',
        cooldown: 60000
    },
    'здарова': {
        responses: ['!ку', '!привет', '!qq', '!йй', '!q', '!qq bro', 'норм?'],
        responseBotCount: 3,
        cooldown: 60000
    },
    'здаров': {
        responses: ['!ку', '!привет', '!qq', '!йй', '!q', '!qq бро', 'норм?'],
        responseBotCount: 3,
        cooldown: 60000
    },
    'как дела?': {
        responses: ['!норм', '!пойдет', '!плохо', '!хорошо'],
        responseBotCount: 2,
        cooldown: 60000
    },
    'qq all': {
        responses: ['!ку','!йй', '!привет', '!qq', '!q', '!qq bro'],
        responseBotCount: 3,
        cooldown: 60000
    },
    'меллстройбурмалдасекреткод': {
        response: '!я гей мы все геи',
        responseBotCount: 999,
        cooldown: 10
    },
    'миникарта разрешена?': {
        response: '!да',
        cooldown: 60000
    },
    'вы боты?': {
        responses: ['!чел мы не боты','!чел ты сам бот)', '!ты кремлебот ебучий', '!ты лизал киску тигру, а я настоящий игрок, совсем не бот)', '!ха-ха-ха этот бро верит что мы боты', '!мда сам бот'],
        cooldown: 60000
    },
    'ты бот?': {
        responses: ['!чел мы не боты','!чел ты сам бот)', '!ты кремлебот ебучий', '!ты лизал киску тигру, а я настоящий игрок, совсем не бот)', '!ха-ха-ха этот бро верит что мы боты', '!мда сам бот'],
        cooldown: 60000
    },
	
    'тут боты?': {
        responses: ['!чел мы не боты','!чел ты сам бот)', '!ты кремлебот ебучий', '!ты лизал киску тигру, а я настоящий игрок, совсем не бот)', '!ха-ха-ха этот бро верит что мы боты', '!мда сам бот'],
        cooldown: 60000
    },
	
	
	
    'тут играют боты?': {
        responses: ['!чел мы не боты','!чел ты сам бот)', '!ты кремлебот ебучий', '!ты лизал киску тигру, а я настоящий игрок, совсем не бот)', '!ха-ха-ха этот бро верит что мы боты', '!мда сам бот'],
        cooldown: 60000
    },
	
    'тут одни боты?': {
        responses: ['!чел мы не боты','!чел ты сам бот)', '!ты кремлебот ебучий', '!ты лизал киску тигру, а я настоящий игрок, совсем не бот)', '!ха-ха-ха этот бро верит что мы боты', '!мда сам бот'],
        cooldown: 60000
    },
	
    'тут только боты?': {
        responses: ['!чел мы не боты','!чел ты сам бот)', '!ты кремлебот ебучий', '!ты лизал киску тигру, а я настоящий игрок, совсем не бот)', '!ха-ха-ха этот бро верит что мы боты', '!мда сам бот'],
        cooldown: 60000
    },
	
    'где боты?': {
        responses: ['!чел мы не боты','!чел ты сам бот)', '!ты кремлебот ебучий', '!ты лизал киску тигру, а я настоящий игрок, совсем не бот)', '!ха-ха-ха этот бро верит что мы боты', '!мда сам бот'],
        cooldown: 60000
    },
	
    'боты?': {
        responses: ['!чел мы не боты','!чел ты сам бот)', '!ты кремлебот ебучий', '!ты лизал киску тигру, а я настоящий игрок, совсем не бот)', '!ха-ха-ха этот бро верит что мы боты', '!мда сам бот'],
        cooldown: 60000
    },
	
    'бот?': {
        responses: ['!чел мы не боты','!чел ты сам бот)', '!ты кремлебот ебучий', '!ты лизал киску тигру, а я настоящий игрок, совсем не бот)', '!ха-ха-ха этот бро верит что мы боты', '!мда сам бот'],
        cooldown: 60000
    },
    'privet vsem': {
        responses: ['!ку','!йй', '!привет', '!qq', '!q', '!qq bro'],
        responseBotCount: 3,
        cooldown: 60000
    },
    'кому ресы?': {
        responses: ['!Я', '!mneeee', '!mneeeeeeeeeeee','!mnee', '!мнееее','!mneeeeee', '!мне', '!mne', '!никому', '!мне'],
        responseBotCount: 8,
        cooldown: 60000
    },
    'кому ресурсы?': {
        responses: ['!Я', '!mneeee', '!mneeeeeeeeeeee','!mnee', '!мнееее','!mneeeeee', '!мне', '!mne', '!никому', '!мнe'],
        responseBotCount: 8,
        cooldown: 60000
    },
    'komy resi': {
        responses: ['!Я', '!mneeee', '!mneeeeeeeeeeee','!mnee', '!мнееее','!mneeeeee', '!мне', '!mne', '!никому', '!мнe'],
        responseBotCount: 8,
        cooldown: 60000
    },
    'кто пвп': {
        response: '!это сервер фармеров какое пвп',
        cooldown: 60000
    },
    'кому дать ресы?': {
        responses: ['!Я', '!mneeee', '!mneeeeeeeeeeee','!mnee', '!мнееее','!mneeeeee', '!мне', '!mne', '!никому', '!мнe'],
        responseBotCount: 8,
        cooldown: 60000
    },
    'кому отдать ресы?': {
        responses: ['!Я', '!mneeee', '!mneeeeeeeeeeee','!mnee', '!мнееее','!mneeeeee', '!мне', '!mne', '!никому', '!мнe'],
        responseBotCount: 8,
        cooldown: 60000
    },
    'говно сервер': {
        response: '!-',
        cooldown: 60000,
        responseChance: 0.5 
    },
    'тут боты': {
        response: '!ага ага пизди больше',
        cooldown: 60000
    },
    'сервер топчик?': {
        responses: ['!+', '!даааа', '!конечно', '!да', '!100%', '!+++++++++', '!+++', '!+++++++++++++', '!++'],
        responseBotCount: 4,
        cooldown: 60000
    },
    'сервер топ?': {
        responses: ['!+', '!даааа', '!конечно', '!да', '!100%', '!+++++++++', '!+++', '!+++++++++++++', '!++'],
        responseBotCount: 4,
        cooldown: 60000
    },
    'new anka топ?': {
        responses: ['!+', '!даааа', '!конечно', '!да', '!100%', '!+++++++++', '!+++', '!+++++++++++++', '!++'],
        responseBotCount: 5,
        cooldown: 60000,
        responseChance: 1
    },
    'exept тут?': {
        responses: ['!мб', '!хз', '!не ебу'],
        cooldown: 60000
    },
    'замок фиксанули': {
        response: '!хз',
        cooldown: 60000
    }
};

class AdvancedBotManager {
    constructor() {
        this.config = {
            nicknames: fs.readFileSync('nicknames.txt', 'utf8').split('\n').filter(Boolean),
            warps: WARPS,
            randomMessages: RANDOM_MESSAGES,
            minSessionTime: MIN_SESSION_TIME,
            maxSessionTime: MAX_SESSION_TIME,
            botLaunchInterval: BOT_LAUNCH_INTERVAL,
            dialogs: DIALOGS
        };

        this.state = {
            activeBots: 0,
            usedNicks: new Set(),
            spamProtection: new Map(),
            maxConcurrentBots: 153,
            botSessions: new Map(),
            dangerPhrases: ['бот', 'читер', 'скрипт', 'авто', 'afk'],

            dialogCooldowns: new Map(),
            messageCooldowns: new Map(),
            botMessageCooldowns: new Map(),
            lastUsedMessages: new Set(),
            dialogResponsesUsed: new Map()
        };
    }

    startSystem() {
        console.log('=== БОТ-СИСТЕМА ЗАПУЩЕНА ===');
        this.updateMaxBots();

        setInterval(() => {
            this.updateMaxBots();
            console.log(`Статус: ${this.state.activeBots}/${this.state.maxConcurrentBots} активных, ${this.state.usedNicks.size}/${this.config.nicknames.length} использовано`);

            if (this.state.activeBots < this.state.maxConcurrentBots && this.state.usedNicks.size < this.config.nicknames.length) {
                this.scheduleNextBot();
            }
        }, 60000);

        this.scheduleNextBot();
    }

    scheduleNextBot() {
        if (this.botLaunchTimer) clearTimeout(this.botLaunchTimer);

        if (this.state.activeBots >= this.state.maxConcurrentBots) return;

        const availableNicks = this.config.nicknames.filter(n => !this.state.usedNicks.has(n));
        if (availableNicks.length === 0) return;

        const delay = getRandomInt(this.config.botLaunchInterval.min, this.config.botLaunchInterval.max);
        this.botLaunchTimer = setTimeout(() => {
            const randomNick = availableNicks[Math.floor(Math.random() * availableNicks.length)];
            this.createBot(randomNick);
            this.scheduleNextBot();
        }, delay);
    }

    createBot(username) {
        if (this.state.usedNicks.has(username) || this.state.activeBots >= this.state.maxConcurrentBots) return;
        console.log(`Запуск бота ${username}`);
        this.state.usedNicks.add(username);
        this.state.activeBots++;

        const bot = mineflayer.createBot({
            host: 'de3.netrix.pw',
            port: 19330,
            version: '1.16.5',
            username,
            hideErrors: false,
            checkTimeoutInterval: 60000
        });

        const botData = {
            bot,
            timer: null,
            isActive: true,
            lastActivity: Date.now(),
            talkedPlayers: new Map(),
            lastResponseTimes: new Map()
        };

        this.state.botSessions.set(username, botData);
        const sessionTime = getRandomInt(this.config.minSessionTime, this.config.maxSessionTime);

        botData.timer = setTimeout(() => {
            this.endBotSession(username, `Сессия завершена (${Math.round(sessionTime / 60000)} мин)`);
        }, sessionTime);

        bot.once('login', () => {
            console.log(`${username}: авторизовался`);
        });

        bot.on('spawn', () => {
            this.handleSpawn(bot, username);
        });

        bot.on('end', (reason) => {
            this.endBotSession(username, `Соединение закрыто: ${reason}`);
        });

        bot.on('error', (err) => {
            this.endBotSession(username, `Ошибка: ${err.message}`);
        });

        bot.on('kicked', (reason) => {
            this.endBotSession(username, `Кик: ${reason}`);
        });

        bot.on('messagestr', (msg) => {
            this.handleMessage(msg, bot, username);
        });
    }

    handleSpawn(bot, username) {
        const botData = this.state.botSessions.get(username);
        if (!botData || !botData.isActive) return;

        // Регистрация и вход
        setTimeout(() => {
            if (botData.isActive) bot.chat('/server NewGrief-1');
        }, getRandomInt(1000, 3000));

        setTimeout(() => {
            if (botData.isActive) bot.chat('/tutorialreset sfw');
        }, getRandomInt(3000, 5000));

        setTimeout(() => {
            if (botData.isActive) {
                bot.chat('/aboba888d');
                console.log(`${username}: написал /aboba888d`);
            }
        }, getRandomInt(5000, 7000));

        // Начать отправлять сообщения
        setTimeout(() => {
            this.handleRandomMessages(bot, username);
        }, getRandomInt(20000, 40000));
    }

    handleMessage(msg, bot, username) {
        const botData = this.state.botSessions.get(username);
        if (!botData || !botData.isActive) return;
         console.log(`[MSG] ${username} ← "${msg}"`);
        // Регистрация
        if (
    msg.includes('/register <пароль> <повторите пароль>') ||
    msg.includes('Пожалуйста, зарегистрируйтесь')
) {
    setTimeout(() => {
        if (botData.isActive) {
            bot.chat('/register lalka lalka');
            console.log(`${username}: зарегистрировался`);
        }
    }, getRandomInt(1000, 3000));

    return;
}

        if (msg.includes('Команда авторизации: /login')) {
            setTimeout(() => {
                if (botData.isActive) bot.chat('/login lalka');
            }, getRandomInt(1000, 3000));
            return;
        }

        this.handleDialogs(msg, bot, username);

        const privateMsg = this.parsePrivateMessage(msg);
        if (privateMsg) {
            this.handlePrivateMessage(bot, username, privateMsg.sender, privateMsg.message);
        }
    }


    handleDialogs(msg, bot, username) {
        const lowerMsg = msg.toLowerCase();
        const now = Date.now();

        // Пропускаем исходящие сообщения (чтобы бот не реагировал на свои же фразы)
        if (
            msg.startsWith(bot.username + ' »') ||
            msg.startsWith(username + ' »') ||
            msg.startsWith(bot.username + ' ->') ||
            msg.startsWith(username + ' ->')
        ) {
            return; // ← ВАЖНО: не просто пустой блок, а return!
        }

        for (const [phrase, dialog] of Object.entries(this.config.dialogs)) {
            if (lowerMsg.includes(phrase.toLowerCase())) {
                if (now - (this.state.dialogCooldowns.get(phrase) || 0) < (dialog.cooldown || 60000)) {
                    continue;
                }

                if (Math.random() > (dialog.responseChance || 1)) {
                    continue;
                }

                const activeBots = Array.from(this.state.botSessions.entries())
                    .filter(([name, data]) => data.isActive && name !== username);

                if (activeBots.length === 0) continue;

                const responseCount = dialog.responseBotCount || 1;
                const availableResponses = dialog.responses ? [...dialog.responses] : [dialog.response];
                const usedResponses = this.state.dialogResponsesUsed.get(phrase) || [];
                const filteredResponses = availableResponses.filter(r => !usedResponses.includes(r));

                if (filteredResponses.length === 0) continue;

                const actualResponseCount = Math.min(responseCount, filteredResponses.length, activeBots.length);
                const shuffledBots = [...activeBots].sort(() => 0.5 - Math.random());
                const selectedResponses = [...filteredResponses]
                    .sort(() => 0.5 - Math.random())
                    .slice(0, actualResponseCount);

                this.state.dialogCooldowns.set(phrase, now);
                this.state.dialogResponsesUsed.set(phrase, [...usedResponses, ...selectedResponses]);

                selectedResponses.forEach((response, i) => {
                    if (i < shuffledBots.length) {
                        const [botName, botData] = shuffledBots[i];
                        setTimeout(() => {
                            if (botData.isActive) {
                                botData.bot.chat(response);
                            }
                        }, getRandomInt(2000, 6000) * (i + 1));
                    }
                });

                setTimeout(() => {
                    this.state.dialogResponsesUsed.delete(phrase);
                }, 5000);

                return;
            }
        }
    }

    parsePrivateMessage(msg) {
        // Поддержка разных регистров, языков и опечаток:
        // [Exept -> я], [Exept -> Я], [Exept -> me], [Exept -> Me], [Exept -> you], и даже [Exept -> Вас]
        const formats = [
            /\[([^\]]+) ->\s*[яЯyYmMeEвВаАсСuU]\w*\] (.+)/i,  // ✅ ловит "я", "Я", "me", "Me", "вас", "you" и др.
            /<([^>]+)> ->\s*[яЯyYmMeEвВаАсСuU]\w*:?\s*(.+)/i,
            /([^ ]+) ->\s*[яЯyYmMeEвВаАсСuU]\w*:?\s*(.+)/i,
            /\[([^\]]+)\]: (.+)/i,  // fallback: [Exept]: ты бот
            /([^\s]+) whispers to you: (.+)/i, // vanilla
        ];

        for (const regex of formats) {
            const match = msg.match(regex);
            if (match) {
                const sender = match[1].trim();
                const message = (match[2] || '').trim();
                console.log(`[ПАРСЕР] ✅ "${msg}" → sender="${sender}", msg="${message}"`);
                return { sender, message };
            }
        }

        console.log(`[ПАРСЕР] ❌ Не распознано: "${msg}"`);
        return null;
    }

    async handlePrivateMessage(bot, username, sender, message) {
        console.log(`[ЛС] ${username} ← от ${sender}: "${message}"`);
        
        const botData = this.state.botSessions.get(username);
        if (!botData) {
            console.log(`[ЛС] ${username} — сессия не найдена`);
            return;
        }

        const now = Date.now();
        const spamKey = `${username}_${sender}`;
        const spamData = this.state.spamProtection.get(spamKey) || { count: 0, lastTime: 0 };

        if (now - spamData.lastTime < 5000 && spamData.count >= 1) {
            console.log(`[ЛС] ${username} ← СПАМ-ФИЛЬТР: ${sender} заблокирован`);
            return;
        }

        const lastResponseTime = botData.lastResponseTimes.get(sender) || 0;
        if (now - lastResponseTime < RESPONSE_COOLDOWN) {
            console.log(`[ЛС] ${username} ← КД: ${Math.round((RESPONSE_COOLDOWN - (now - lastResponseTime))/1000)} сек осталось`);
            return;
        }

        const lowerMsg = message.toLowerCase();
        if (this.state.dangerPhrases.some(phrase => lowerMsg.includes(phrase))) {
            console.log(`[ЛС] ${username} ← ОПАСНОЕ СЛОВО: "${message}" → жду 5 сек...`);
            
            await delay(5000);
            
            if (this.state.spamProtection.get(spamKey)?.responded) {
                console.log(`[ЛС] ${username} ← УЖЕ ОТВЕТИЛ ранее`);
                return;
            }

            const response = DANGER_RESPONSES[Math.floor(Math.random() * DANGER_RESPONSES.length)];
            console.log(`[ЛС] ${username} → /msg ${sender} "${response}"`);
            bot.chat(`/msg ${sender} ${response}`);
            botData.lastResponseTimes.set(sender, now);

            const currentData = this.state.spamProtection.get(spamKey) || {};
            this.state.spamProtection.set(spamKey, { ...currentData, responded: true });
            return;
        }

        console.log(`[ЛС] ${username} ← НЕТ ОТВЕТА: нет опасных фраз`);
    }

async handleRandomMessages(bot, username) {
    const botData = this.state.botSessions.get(username);
    if (!botData || !botData.isActive) return;

    const now = Date.now();

    // 🔥 Глобальная очистка старых сообщений (раз в вызов)
    for (const [msg, timestamp] of this.state.messageCooldowns) {
        if (now - timestamp > 600000) { // 10 минут = 600 000 мс
            this.state.messageCooldowns.delete(msg);
        }
    }

    // Проверка кд по боту (чтобы один бот не спамил слишком часто)
    const botCooldown = this.state.botMessageCooldowns.get(username) || 0;
    if (now - botCooldown < 2000) {
        setTimeout(() => this.handleRandomMessages(bot, username), 2500);
        return;
    }

    // Шанс отправить сообщение
    if (Math.random() > 0.35) {
        setTimeout(() => this.handleRandomMessages(bot, username), getRandomInt(10000, 20000));
        return;
    }

    // Фильтруем сообщения, которые сейчас на кулдауне
    const availableMessages = this.config.randomMessages.filter(
        msg => !this.state.messageCooldowns.has(msg)
    );

    if (availableMessages.length === 0) {
        console.log(`Нет доступных сообщений для ${username} — все на кд`);
        setTimeout(() => this.handleRandomMessages(bot, username), 30000);
        return;
    }

    // Выбираем случайное сообщение
    const selectedMessage = availableMessages[Math.floor(Math.random() * availableMessages.length)];

    // Отправляем
    bot.chat(selectedMessage);
    console.log(`${username}: отправил "${selectedMessage}"`);

    // 🔥 Устанавливаем глобальный кулдаун на 10 минут
    this.state.messageCooldowns.set(selectedMessage, now);

    // Устанавливаем кулдаун на бота (20 сек)
    this.state.botMessageCooldowns.set(username, now);

    // Автоматическая очистка через 10 минут
    setTimeout(() => {
        this.state.messageCooldowns.delete(selectedMessage);
        console.log(`[КД] Сообщение "${selectedMessage}" снова доступно`);
    }, 600000); // 10 минут

    // Повтор через 20-40 сек
    setTimeout(() => {
        this.handleRandomMessages(bot, username);
    }, getRandomInt(20000, 40000));
}

endBotSession(username, reason) {
    if (!this.state.botSessions.has(username)) return;
    const botData = this.state.botSessions.get(username);
    if (!botData.isActive) return;

    console.log(`${username}: ${reason}`);

    clearTimeout(botData.timer);
    botData.isActive = false;

    if (botData.bot) {
        try {
            botData.bot.end();
        } catch (e) {
            // Игнорируем
        }
    }

    this.state.botSessions.delete(username);
    this.state.usedNicks.delete(username);
    this.state.activeBots--;

    console.log(`Статус: ${this.state.activeBots}/${this.state.maxConcurrentBots} активных`);

    this.scheduleNextBot();
}

updateMaxBots() {
    const now = this.getCurrentMoscowTime();
    const hours = now.getHours();

    if (hours < 1) {
        this.state.maxConcurrentBots = 22;
    } else if (hours < 2) {
        this.state.maxConcurrentBots = 19;
    } else if (hours < 5) {
        this.state.maxConcurrentBots = 14;
    } else if (hours < 6) {
        this.state.maxConcurrentBots = 12;
    } else if (hours < 7) {
        this.state.maxConcurrentBots = 9;
    } else if (hours < 8) {
        this.state.maxConcurrentBots = 16;
    } else if (hours < 9) {
        this.state.maxConcurrentBots = 15;
    } else if (hours < 10) {
        this.state.maxConcurrentBots = 20;
    } else if (hours < 11) {
        this.state.maxConcurrentBots = 22;
    } else if (hours < 12) {
        this.state.maxConcurrentBots = 34;
    } else if (hours < 13) {
        this.state.maxConcurrentBots = 39;
    } else if (hours < 14) {
        this.state.maxConcurrentBots = 45;
    } else if (hours < 15) {
        this.state.maxConcurrentBots = 39;
    } else if (hours < 16) {
        this.state.maxConcurrentBots = 40;
    } else if (hours < 17) {
        this.state.maxConcurrentBots = 38;
    } else if (hours < 18) {
        this.state.maxConcurrentBots = 32;
    } else if (hours < 19) {
        this.state.maxConcurrentBots = 29;
    } else if (hours < 20) {
        this.state.maxConcurrentBots = 24;
    } else if (hours < 21) {
        this.state.maxConcurrentBots = 19;
    } else if (hours < 22) {
        this.state.maxConcurrentBots = 10;
    } else if (hours < 23) {
        this.state.maxConcurrentBots = 8;
    } else {
        this.state.maxConcurrentBots = 22;
    }

    console.log(`Лимит ботов: ${this.state.maxConcurrentBots}`);
}

getCurrentMoscowTime() {
    return new Date(
        new Date().toLocaleString('en-US', {
            timeZone: 'Europe/Moscow'
        })
    );
}

getCurrentMoscowTime() {
    return new Date(
        new Date().toLocaleString('en-US', {
            timeZone: 'Europe/Moscow'
        })
    );
}

    getCurrentMoscowTime() {
        return new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Moscow' }));
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const botManager = new AdvancedBotManager();
botManager.startSystem();

process.on('SIGINT', () => {
    console.log('\nЗавершение работы...');
    botManager.state.botSessions.forEach((data, username) => {
        botManager.endBotSession(username, 'Принудительное завершение');
    });
    process.exit();
});
