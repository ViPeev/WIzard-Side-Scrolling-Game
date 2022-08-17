function initState(){
    let startX = Math.floor(Math.random() * 1000);
    let startY = Math.floor(Math.random() * 500);

    const state = {
         player:"Pesho",
         wizard: {
            width:100,
            height:100,
            posX:startX,
            posY:startY,
            speed:10,
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
            speed: 15,
         }
    }

    return state;
}