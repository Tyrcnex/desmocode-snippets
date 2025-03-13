# desmocode snippets

This is a collection of useful code snippets/userscripts that I've made or have found useful. There are other script repositories, most notably [Slimrunner's](https://github.com/SlimRunner/desmos-scripts-addons), but it's a bit outdated.

You can find scripts to use in the console to leverage the Desmos API, install userscripts (through Tampermonkey) to accelerate your Desmos workflow, or add some stylesheets (through an extension like Stylus) to make Desmos look more aesthetically pleasing.

The userscripts in this repository are located in `/userscripts`. They include:
- `better3d.user.js`: A collection of useful features for Desmos's 3D calculator. This includes appending the `?beta3d` flag (for access to shaders, surface opacity, etc.), adding a background color, changing the specular, etc.
- `desmolocal.user.js`: Allows you to save Desmos graphs as files. Adds two buttons next to the "Save" button - the first is "Save JSON", which saves the graph as a JSON file, and "Import JSON", which imports the saved file into Desmos.
- `fix_code_golf.js`: Turns off the Desmodder "Code Golf" plugin by default and binds the plugin toggle to "Alt + Q". This is a somewhat niche script and might become obsolete when Desmodder releases some updates.
- `godmode.user.js`: Increases the list limit, shader list limit, and tolerance of "nested too deeply" error
- `keyboard_input.user.js`: Adds keyboard input to Desmos. Paste `K_{eys}=[]` into your graph, and keycodes will now be updated in `K_{eys}`.
- `lower_error_message.user.js`: Lowers the dang error message so you can actually see the expression.
- `secret_functions.user.js`: Unlocks some secret functions that are disabled through Mathquill. These functions include `hypot`, `polyGamma`, `argmin`, and more. Some are unusable, such as `validateSampleCount`.

The console scripts in this repository are located in `/console_scripts`. They include:
- `dispatch.js`: A small tutorial to use Desmos's event listener, useful for making scripts that run when a certain event is triggered (e.g. clicking an expression, moving the graph, graph state change, etc.).
- `get_context.js`: Gets the compute context (compiled version of Desmos functions)
- `graph_history.js`: Desmos doesn't have an easy way to trace the graph history of a certain link, so this script does so.
- `whole_screen_rec.js`: Similar to Desmodder's video capture, but captures the whole screen (including the expression bar, top bar, etc.). Adds to Desmodder's frame creator, so you can modify frames from the UI. You need to modify the `min`, `max`, `step`, and `ID` constants. `ID` is a little hard to obtain, but you can either use Desmodder's "Calculator Settings > Show IDs" (recommended) or add "?showIDs" to the end of your URL, then read off the number that replaced the line number.

The stylesheets in this repository are located in `/styles`. They include:
- `monospace.css`: Changes font of notes and folders to monospace.