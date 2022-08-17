function start(state, game) {
  game.createWizard(state.wizard);
  window.requestAnimationFrame(gameLoop.bind(null, state, game));
}

function gameLoop(state, game, timestamp) {
  const { wizard } = state;
  const { wizardElement } = game;

  modifyWizardPosition(state, game);

  if (state.keys.Space) {
    game.wizardElement.style.background = ` url("./images/wizard-fire.png") no-repeat rgba(255, 255, 255, 0.5) center`;
    if (timestamp > state.fireball.nextSpawnTimeStamp) {
      game.createFireball(wizard, state.fireball);
      state.fireball.nextSpawnTimeStamp = timestamp + state.fireball.fireRate;
    }
  } else {
    game.wizardElement.style.background = ` url("./images/wizard.png") no-repeat rgba(255, 255, 255, 0.5) center`;
  }

  //Spawn Bugs
  if (timestamp > state.bugStats.nextSpawnTimeStamp) {
    game.createBug(state.bugStats);
    state.bugStats.nextSpawnTimeStamp =
      timestamp + Math.random() * state.bugStats.maxSpawnInterval;
  }

  //render Bugs
  let bugElements = document.querySelectorAll(".bug");
  bugElements.forEach((bug) => {
    let posX = parseInt(bug.style.left);

    if (detectCollision(wizardElement, bug)) {
      state.gameOver = true;
    }

    if (posX > 0) {
      bug.style.left = posX - state.bugStats.speed + "px";
    } else {
      bug.remove();
    }
  });

  //render Fireballs
  document.querySelectorAll(".fireball").forEach((fireball) => {
    let posX = parseInt(fireball.style.left);

    bugElements.forEach((bug) => {
      if (detectCollision(bug, fireball)) {
        state.score++;
        game.scoreScreen.classList.add("score-vibrate");
        game.scoreScreen.textContent = `${state.score} Points`;
        bug.remove();
        fireball.remove();

        setTimeout(()=> {
            game.scoreScreen.classList.remove("score-vibrate");
        },300);
      }
    });
    if (posX > game.gameScreen.offsetWidth) {
      fireball.remove();
    } else {
      fireball.style.left = posX + state.fireball.speed + "px";
    }
  });

  //render Wizard
  wizardElement.style.left = wizard.posX + "px";
  wizardElement.style.top = wizard.posY + "px";

  if (state.gameOver) {
    alert(`Game Over!\nYou made ${state.score} points.`);
    document.location.reload();
  } else {
    window.requestAnimationFrame(gameLoop.bind(null, state, game));
  }
}

function modifyWizardPosition(state, game) {
  const { wizard } = state;

  if (state.keys.KeyD) {
    wizard.posX = Math.min(
      wizard.posX + wizard.speed,
      game.gameScreen.offsetWidth - wizard.width - 30
    );
  }
  if (state.keys.KeyA) {
    wizard.posX = Math.max(wizard.posX - wizard.speed, 6);
  }
  if (state.keys.KeyS) {
    wizard.posY = Math.min(
      wizard.posY + wizard.speed,
      game.gameScreen.offsetHeight - wizard.height - 30
    );
  }
  if (state.keys.KeyW) {
    wizard.posY = Math.max(wizard.posY - wizard.speed, 6);
  }
}

function detectCollision(objectA, objectB) {
  let first = objectA.getBoundingClientRect();
  let second = objectB.getBoundingClientRect();

  let hasCollision = !(
    first.top > second.bottom ||
    first.bottom < second.top ||
    first.right < second.left ||
    first.left > second.right
  );

  return hasCollision;
}
