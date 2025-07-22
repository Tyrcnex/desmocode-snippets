// Old version by AutisticMofo and modified by Slimrunner
// New version by ne01nvader

function getCompiled(index, extraInfo = false) {
    const ctx = new Desmos.Private.Mathtools.context;
    ctx.processChangeSet(Calc.controller.evaluator.changeSets.cumulativeChangeSet);
    const info = ctx.analysis[Calc.controller.listModel.tabOrder[index - 1]].concreteTree.getCompiledFunction();
    return extraInfo ? info : console.log(info.source);
}

// EXAMPLE: get the compiled instructions for the second expression in a graph
getCompiled(2)
getCompiled(2, true) // this gets additional information

// IMPORTANT NOTE: unless the function depends on x, y, or t,
// expressions compile to a constant. If you want to see the compiled
// information of a function, make it depend on x, y, or t.

// For the following expression
// f(n,x) = {n = 0: 0, join(f(stdev(random(3,n)),x),x^n).random}
// the entire object is:

// {
//     "args": [
//         "n",
//         "x"
//     ],
//     "source": "var _3,_4,_53,_54;\n_54=(() => {\n    var _5,_6,_24_thunk_computed,_24_thunk_function,_24,_27,_29,_30,_31,_44,_51_thunk_computed,_51_thunk_function,_51,_52;\n\n\n    let looping = true;\n    let _54_computationDepth=0;\nlet _54_computationCount=0;\n_5=n;\nlet _5_next=undefined;\n_6=x;\nlet _6_next=undefined;\n\n    while (looping) {\n      looping = false;\n\n      _24_thunk_computed=false;_24_thunk_function=()=>{\n_24_thunk_computed=true;\n\n      _29=[];\nif((3)>10000) throw ErrorMsg.maxListSize();\nfor(_24=1;_24<=(3);_24++){\n_27=BuiltIn.uniformSample((((((_C[1])+'::fc'+_5)+'::fc'+_6)+'::us'+_5)+'::lc'+(_24-(1))),(0),(1));\n_29.push(_27);\n}\n_30=BuiltIn.stdev(_29),\n\nlooping=true,\n_5_next=_30,\n_6_next=_6;\n    };\n_44=1;\n_51_thunk_computed=false;_51_thunk_function=()=>{\n_51_thunk_computed=true;\n\n      if ((((Math.floor(((BuiltIn.uniformSample((((_C[0])+'::fc'+_5)+'::fc'+_6),(0),_44))*(2))))+_44)<=(1))) {\n          const earlyReturn =(_24_thunk_computed ? undefined : _24_thunk_function());\nif (earlyReturn !== undefined) return earlyReturn;\n_51 = _31;\n        } else {\n          _51 = (BuiltIn.pow(_6,_5));\n        }\n    };\nif ((_5===(0))) {\n          _52 = (0);\n        } else {\n          const earlyReturn =(_51_thunk_computed ? undefined : _51_thunk_function());\nif (earlyReturn !== undefined) return earlyReturn;\n_52 = _51;\n        }\n\n      if (looping) {\n        [_54_computationDepth,_54_computationCount,_5,_6]=[_54_computationDepth+1,_54_computationCount+1,_5_next,_6_next]\n      }\n\n      if ((_54_computationDepth > BuiltIn.RECURSIVE_DEPTH_LIMIT) || (_54_computationCount > BuiltIn.RECURSIVE_COMPUTATION_LIMIT)) {\n        return BuiltIn.handleRecursionLimitExceeded(__meta, 1);\n      };\n    }\n\n    return _52\n  })();\nreturn _54;",
//     "constants": [
//         "530b39f6730fb0a5976e04c11149fa31::id1::vc1",
//         "530b39f6730fb0a5976e04c11149fa31::id1::vc0"
//     ],
//     "executionMetadata": {}
// }