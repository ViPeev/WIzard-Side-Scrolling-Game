function start(state, game) {
  game.createWizard(state.wizard);
  window.requestAnimationFrame((timestamp) => gameLoop(state, game, timestamp));
}

function gameLoop(state, game, timestamp) {
  const { wizard } = state;
  const { wizardElement } = game;

  modifyWizardPosition(state, game);

  //Spawn Bugs
  if (timestamp > state.bugStats.nextSpawnTimeStamp) {
    game.createBug(state.bugStats);
    state.bugStats.nextSpawnTimeStamp = timestamp + Math.random() * state.bugStats.maxSpawnInterval;
  }
  //render Wizard
  wizardElement.style.left = wizard.posX + "px";
  wizardElement.style.top = wizard.posY + "px";

  //render Bugs
  document.querySelectorAll(".bug").forEach(bug => {
    let posX = parseInt(bug.style.left);
    if(posX > 0){
        bug.style.left = posX - state.bugStats.speed + "px";
    } else {
        bug.remove();
    }

  })


  window.requestAnimationFrame(gameLoop.bind(null, state, game));
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
