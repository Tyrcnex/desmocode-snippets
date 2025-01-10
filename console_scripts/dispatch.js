// To detect any event (expression click, graph movement, color/equation change, anything):
Calc.controller.dispatcher.register(console.log);

// and to use the information:
Calc.controller.dispatch({
    // type, id, etc.
});
