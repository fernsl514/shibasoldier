kaboom({
    global: true,
    fullscreen: true,
    scale: 1,
    debug: true,
    clearColor: [0, 0, 0, 1],

});

loadRoot("https://i.imgur.com/");
loadSprite("shiba_standing", "OAtbmRt.png");
loadSprite("shiba_jumping", "JTLGibi.png");
loadSprite("shiba_coins", "kYkuKBG.png");
loadSprite("shiba_shooting", "dKBL5YK.png");
loadSprite("shiba_down", "LBsQssi.png");
loadSprite("enemy_snake", "cfU3lo4.png");
loadSprite("enemy_bee", "Zmx8SuG.png")
loadSprite("background", "0tuQwYB.png");
loadSprite("grass", "Ib0Xe2w.png");
loadSprite("shiba_step1", "Rk68dvE.png");
loadSprite("shiba_step2", "c9ViIl0.png");
loadSprite("shiba_step3", "YEhs9XX.png");
loadSprite("shiba_step4", "0KVu62v.png");


scene("game", () => {

    gravity(1200);


    let score = 0;

    //Background 
    add([
        sprite("background", { width: width(), height: height(), }),

    ]);

    //Platform 
    add([
        // sprite("grass", { width: width(), height: 30 }),
        rect(width(), 20),
        pos(0, height() - 65),
        area(),
        solid(),
    ]);

    // Score Label
    const scoreLabel = add([
        text(score, 32),
        pos(12, 12),
    ]);

    //Shiba standing
    const player = add([
        sprite("shiba_standing"),
        pos(80, 80),
        area(),
        body(),
    ]);

    //Shiba hopping
    const player_hop = add([
        sprite("shiba_jumping"),
        pos(80, 80),
        area(),
        body(),
    ]);

    //Shiba shooting
    const player_shoot = add([
        sprite("shiba_shooting"),
        pos(80, 80),
        area(),
        body(),
    ]);

    // enemy_snake
    loop(5, () => {
        add([
            sprite("enemy_snake"),
            pos(width(20), 600),
            area(),
            "enemy",
        ]);
    });

    // enemy_bee
    loop(4, () => {
        add([
            sprite("enemy_bee"),
            pos(vec2(width() / 2, rand(-height() / 2, height() / 2))),
            area(),
            "enemy",
        ]);
    });



    //shiba_coins 
    loop(2, () => {
        add([
            sprite("shiba_coins"),
            pos(vec2(width() / 2, rand(-height() / 2, height() / 2))),
            area(),
            "shiba_coins",
        ]);
    });


    //Key Press 
    keyPress("space", () => {
        player_hop.hidden = false;
        player.jump();
        player_hop.jump();
        player_shoot.jump();
    });


    keyDown("right", () => {
        player.move(200, 0);
        player_hop.move(200, 0);
        player_shoot.move(200, 0);

    });

    keyDown("left", () => {
        player.move(-200, 0);
        player_hop.move(-200, 0);
        player_shoot.move(-200, 0);

    });


    //Player Actions

    player_hop.hidden = true;
    player_shoot.hidden = true;

    action(() => {
        if (keyIsReleased("space")) {

            player_hop.hidden = true;
        }
    });


    player.action(() => {
        if (player.pos.y > height()) {
            go("lose", score);
        }
    });

    player.collides("enemy", () => {
        go("lose", score);
    });

    player.collides("shiba_coins", (c) => {
        score += 1;
        scoreLabel.text = score;
        destroy(c);
    })

    const enemy_speed = -500;


    action("enemy", (enemy) => {
        enemy.move(enemy_speed, 0);
        // destroy if it's out of view
        if (enemy.pos.x < -enemy.width) {
            destroy(enemy);
        }
    })





    action("shiba_coins", (shiba_coins) => {
        shiba_coins.move(-100, 0);
        // destroy if it's out of view
        if (shiba_coins.pos.x < -shiba_coins.width) {
            destroy(shiba_coins);
        }
    })

    // end of scene    
});


// Scene GameOver 
scene("lose", (score) => {
    add([
        text("GAME OVER\n" + score, 64),
        pos(center()),
        origin("center"),
    ]);

    keyPress("space", () => {
        go("game");
    });

});



go("game");