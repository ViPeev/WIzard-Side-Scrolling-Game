function start(state,game){
    game.createWizard(state.wizard);
    window.requestAnimationFrame(gameLoop.bind(null,state,game));
}

function gameLoop(state,game){
    //Move Wizard;

    const {wizard} = state;
    const {wizardElement} = game;
    if(state.keys.KeyD){
        wizard.posX = Math.min(wizard.posX + wizard.speed,game.gameScreen.offsetWidth - wizard.width - 30);

    }
    if(state.keys.KeyA){
        wizard.posX = Math.max(wizard.posX - wizard.speed,6);
    }
    if(state.keys.KeyS){
        wizard.posY = Math.min(wizard.posY + wizard.speed,game.gameScreen.offsetHeight - wizard.height - 30);
    }
    if(state.keys.KeyW){
        wizard.posY = Math.max(wizard.posY - wizard.speed,6);
    }
    wizardElement.style.left = wizard.posX+"px";
    wizardElement.style.top = wizard.posY+"px";
    
    window.requestAnimationFrame(gameLoop.bind(null,state,game));
}