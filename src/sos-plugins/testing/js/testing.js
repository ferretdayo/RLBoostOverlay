const SOSTesting = {
    game: {
        __players: [],
        __teams: [],
        match_created: function () {
            WsSubscribers.triggerSubscribers("game", "match_created", "game_match_created");
        },
        initialized: function () {
            WsSubscribers.triggerSubscribers("game", "initialized", "initialized");
        },
        podium_start: function () {
            WsSubscribers.triggerSubscribers("game", "podium_start", "game_podium_start");
        },
        pre_game_countdown_begin: function () {
            WsSubscribers.triggerSubscribers("game", "pre_countdown_begin", "pre_game_countdown_begin");
        },
        post_game_countdown_begin: function () {
            WsSubscribers.triggerSubscribers("game", "post_countdown_begin", "post_game_countdown_begin");
        },
        goal_scored: function () {
            let idx = SOSTesting.utils.random_int(SOSTesting.game.__players.length-1);
            let player = SOSTesting.game.__players[idx];
            let team = SOSTesting.game.__teams[player.TeamNum];

            player.Goals += 1;
            player.Score += SOSTesting.utils.random_int(150);
            player.Score += 100;
            player.Shots += SOSTesting.utils.random_int(2);
            player.BallTouches += SOSTesting.utils.random_int(8);
            team.Goals += 1;

            SOSTesting.game.__players[idx] = player;
            SOSTesting.game.__teams[player.TeamNum] = team;

            SOSTesting.game.update_tick(true);

            WsSubscribers.triggerSubscribers("game", "goal_scored", player);
        },
        match_ended: function () {
            let winner = -1;
            let winnerGoals = -1;
            for (let i = 0; i < SOSTesting.game.__teams.length; i++) {
                let team = SOSTesting.game.__teams[i];
                if (winnerGoals < team.Goals) {
                    winner = i;
                    winnerGoals = team.Goals;
                }
            }

            let data = {
                winner_team_num: winner
            };
            WsSubscribers.triggerSubscribers("game", "match_ended", data);
        },
        update_tick: function (update_with_random_data) {
            if (update_with_random_data) {
                for (let i = 0; i < SOSTesting.game.__players.length; i++) {
                    let player = SOSTesting.game.__players[i];
                    player.Score += SOSTesting.utils.random_int(50);
                    player.Shots += SOSTesting.utils.random_int(3);
                    player.Saves += SOSTesting.utils.random_int(2);
                    player.Demolishes += SOSTesting.utils.random_int(1);
                    player.BallTouches += SOSTesting.utils.random_int(8);

                    SOSTesting.game.__players[i] = player;
                }
            }
            WsSubscribers.triggerSubscribers("game", "update_tick", SOSTesting.game.__players);
        },
        player_team_data: function (gen_players) {
            gen_players = gen_players || false;
            if (gen_players) {
                let leftPlayers = SOSTesting.utils.generate_players(3, 0);
                let rightPlayers = SOSTesting.utils.generate_players(3, 1);

                SOSTesting.game.__teams = SOSTesting.utils.generate_teams();
                SOSTesting.game.__players = [].concat(leftPlayers).concat(rightPlayers);
            }
            let data = {
                players: SOSTesting.game.__players,
                teams: SOSTesting.game.__teams
            };
            WsSubscribers.triggerSubscribers("game", "player_team_data", data);
        },
        team_data: function () {
            //TODO: TBD

            // WsSubscribers.triggerSubscribers("game", "team_data", data);
        },
        collection_start_match: function() {
            SOSTesting.utils.hide_ws();
            // SOSTesting.utils.set_body_black();
            SOSTesting.game.match_created();
            SOSTesting.game.initialized();
            SOSTesting.game.player_team_data(true);
            SOSTesting.game.pre_game_countdown_begin();
            SOSTesting.game.post_game_countdown_begin();
        },
        collection_end_match: function () {
            SOSTesting.game.match_ended();
            SOSTesting.game.podium_start();
        },
        collection_play_full_match: function (num_to_play) {
            num_to_play = num_to_play || 1;
            console.log("Remaining games to play: " + num_to_play);

            SOSTesting.game.collection_start_match();
            SOSTesting.utils.promiseTimeOut(1000, SOSTesting.game.goal_scored).then(function () {
                SOSTesting.utils.promiseTimeOut(10000, SOSTesting.game.collection_end_match);
            });
            if (--num_to_play > 0) {
                setTimeout(function () {
                    SOSTesting.game.collection_play_full_match(num_to_play);
                }, 20000);
            } else {
                console.log("Matches finished");
            }
        }
    },
    utils: {
        player_names: ["Armstrong","Bandit","Beast","Boomer","Buzz","C-Block","Casper","Caveman","Centice","Chipper","Cougar","Dude","Foamer","Fury","Gerwin","Goose","Heater","Hollywood","Hound","Iceman","Imp","Jester","Junker","Khan","Marley","Maverick","Merlin","Middy","Mountain","Myrtle","Outlaw","Poncho","Rainmaker","Raja","Rex","Roundhouse","Sabretooth","Saltie","Samara","Scout","Shepard","Slider","Squall","Sticks","Stinger","Storm","Sultan","Sundow","Swabbie","Hog Tex","Tusk","Viper","Wolfman","Yuri"],
        team_names: ["Calm Pigs","Angry Dogs","Wild Mambas","Powerful Deer","Fast Sparrows","Quick Dodgers","Deadly Riddles","True","Rough Gnomes","Infamous Swallows","Crows","Clever Leopards","Robins","Quiet Kings","Fabulous Vultures","Pure Bears","Big Comets","Clever Doves","Brave Serpents","Stark Chimpanzees","Grand Raccoons","Bitter Pandas","Brave Dinos","Iron Pythons","Crusaders","Major Lobsters","Big Bad Camels","Dapper Birds","Extraordinary Enigmas","Stark Prowlers","Monstrous Boomers","Crunchers","Black Pelicans","Cats","Majestic Chimpanzees","Seals","Storm Wolves","Careless Crusaders","Infamous Mammoths","Creative Camels"],
        generate_player: function() {
            return {
                "Assists": 0,
                "BallTouches": 0,
                "CurrentBoostAmount": 0.333,
                "Demolishes": 0,
                "Goals": 0,
                "IsBot": false,
                "Kills": 0,
                "MMR": 1337,
                "Ping": 0,
                "PlayerID": 270,
                "PlayerName": SOSTesting.utils.player_names[SOSTesting.utils.random_int(53)],
                "PlayerUniqueID": SOSTesting.utils.generate_player_id(),
                "Saves": 0,
                "Score": 0,
                "Shots": 0,
                "TeamNum": 0,
            }
        },
        generate_team: function() {
            return {
                "Goals": 0,
                "Name": SOSTesting.utils.team_names[SOSTesting.utils.random_int(40)]
            }
        },
        generate_player_id: function() {
            let id = "";
            let exit = false;
            while (!exit) {
                if (id.length < 17) {
                    id += SOSTesting.utils.random_int( 99)
                } else {
                    exit = true;
                }
            }
            return id;
        },
        generate_players: function(num_to_gen, team_num) {
            let players = [];
            for (let i = 0; i < num_to_gen; i++) {
                let player = SOSTesting.utils.generate_player();
                player.TeamNum = team_num;
                players.push(player);
            }
            return players;
        },
        generate_teams: function() {
            return [
                SOSTesting.utils.generate_team(),
                SOSTesting.utils.generate_team()
            ];
        },
        hide_ws: function() {
            $('.waiting-for-websocket').remove();
        },
        set_body_black: function() {
            $("body").css("background-color", "black");
        },
        random_int: function (max) {
            return Math.floor(Math.random() * Math.floor(max))
        },
        promiseTimeOut: function (milliseconds, callback) {
            return new Promise(function (resolve) {
                setTimeout(function () {
                    callback();
                    resolve();
                }, milliseconds);
            });
        }
    }
};