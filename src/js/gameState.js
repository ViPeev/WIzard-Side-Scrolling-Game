function initState(){
    let startX = Math.floor(Math.random() * 1000);
    let startY = Math.floor(Math.random() * 500);

    const state = {
         player:"Pesho",
         gameOver:false,
         score:0,
         wizard: {
            width:100,
            height:100,
            posX:startX,
            posY:startY,
            speed:10,
         },
         fireball: {
            width:20,
            height:20,
            speed:12,
            nextSpawnTimeStamp:0,
            fireRate: 500
         },
         keys:{
            KeyA:false,
            KeyS:false,
            KeyW:false,
            KeyD:false,
            Space:false
         },
         bugStats:{
            width:50,
            height:50,
            nextSpawnTimeStamp:0,
            maxSpawnInterval: 1500,
            speed: 8,
         }
    }

    return state;
}