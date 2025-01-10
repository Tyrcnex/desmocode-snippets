# desmocode snippets

This is a collection of useful code snippets/userscripts that I've made or have found useful. There are other script repositories, most notably [Slimrunner's](https://github.com/SlimRunner/desmos-scripts-addons), but it's a bit outdated.

You can find scripts to use in the console to leverage the Desmos API, or you can install userscripts (through Tampermonkey) to accelerate your Desmos workflow.

The userscripts in this repository include:
- `better3d.user.js`: A collection of useful features for Desmos's 3D calculator. This includes appending the `?beta3d` flag (for access to shaders, surface opacity, etc.), adding a background color, changing the specular, etc.
- `desmolocal.user.js`: Allows you to save Desmos graphs as files. Adds two buttons next to the "Save" button - the first is "Save JSON", which saves the graph as a JSON file, and "Import JSON", which imports the saved file into Desmos.
- `godmode.user.js`: Increases the list limit, shader list limit, and tolerance of "nested too deeply" error
- `keyboard_input.user.js`: Adds keyboard input to Desmos. Paste `K_{eys}=[]` into your graph, and keycodes will now be updated in `K_{eys}`.
- `lower_error_message.user.js`: Lowers the dang error message so you can actually see the expression.
- `secret_functions.user.js`: Unlocks some secret functions that are disabled through Mathquill. These functions include `hypot`, `polyGamma`, `argmin`, and more.

The console scripts in this repository include:
- `dispatch.js`: A small tutorial to use Desmos's event listener, useful for making scripts that run when a certain event is triggered (e.g. clicking an expression, moving the graph, graph state change, etc.).
- `get_context.js`: Gets the compute context (compiled version of Desmos functions)
- `graph_history.js`: Desmos doesn't have an easy way to trace the graph history of a certain link, so this script does so.
