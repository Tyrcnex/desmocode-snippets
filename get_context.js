// Get compute context (compiled version of functions)
// Made by AutisticMofo and modified by Slimrunner
// Paste this into your browser console

function computeContext() {
    // Emulate what happens in the web worker
    const context = new Desmos.Private.Mathtools.context();
    var { product, beta3d } = Calc._calc.graphSettings.config;
    context.inner.beta3d = beta3d;
    context.inner.product = product;
    context.processChangeSet(Calc.controller.evaluator.cumulativeChangeSet);
    context.updateAnalysis();
    return context;
}
function fnsFromAnalysis(analysis) {
    // this is also an old list and might be broader now
    const symbolExprTypes = new Set([
        "Assignment",
        "FunctionDefinition",
        "Slider",
    ]);
    const getExprName = (rawTree) =>
        symbolExprTypes.has(rawTree.type)
            ? rawTree._symbol
            : rawTree.userData.latex;
    return Object.entries(ctx.analysis)
        .filter(
            ([
                _,
                {
                    concreteTree: { type, _chunk },
                },
            ]) =>
                // only IRExpressions can get compiled functions i belive
                type === "IRExpression" &&
                // 40 is the opcode for DeferredListAccess, i dont remember why i put this in but
                // ig that instruction breaks things? might warrant some testing
                !_chunk.instructions.find(({ type }) => type === 40),
        )
        .map((x) => [...x, x[1].concreteTree.getCompiledFunction()])
        .reduce((prev, [id, data, f]) => {
            return {
                ...prev,
                [getExprName(data.rawTree)]: {
                    id: id,
                    f: f,
                    ...data,
                },
            };
        }, {});
}
var ctx = computeContext();
var fns = fnsFromAnalysis(ctx);
fns
