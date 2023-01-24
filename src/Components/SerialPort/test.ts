const listeners = new Map();

function on(type, _cb){
    if(!listeners.has(type)){
        listeners.set(type, _cb);
    }
}

function dispatchEvent(event){
    if(!listeners.has(event.type)){
        return
    }
    listeners.get(event.type)(event.data);
}

on("render", (data) => {
    console.log("rendering", data);
});

dispatchEvent({
    type: "renderer",
    data: { user:  {name: "durand"}}
});