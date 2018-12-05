import { html, render } from 'https://unpkg.com/lit-html?module'
import {InputManager} from '/js/inputmanager.js'
import {boot} from '/js/firmware.js'

let debug = false;
let input = new InputManager();
let powercase_state = 'active';
let firmware = undefined;

function debug_fill_canvas() {
    let c = document.getElementById('gamescreen');
    let ctx = c.getContext('2d');
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, c.width, c.height);
}

function begin_debug() {
    if (debug) {
        // debug_fill_canvas()
        render_debug_readout()
        input.debug_callback = render_debug_readout;
    }
}

function undo_debug() {
    if (!debug) {
        input.debug_callback = function() {
            render(html``, document.querySelector('#debug_point'));
        }
    }
}

function toggle_debug() {
    debug = !debug;
    begin_debug();
    undo_debug();
}

function open_console() {
    powercase_state = 'hidden';
    let can = document.querySelector('#gamescreen')
    setTimeout(() => boot(kontra, can, input), 1000);
    render_controls();
}

function controls() {
    return html`
  <div id="dpad" class="buttongroup">
    <button id="pad-left" name="left"></button>
    <button id="pad-up" name="up"></button>
    <button id="pad-down" name="down"></button>
    <button id="pad-right" name="right"></button>
  </div>
  </div>
  <div id="startselect" class="buttongroup">
    <button id="startbutton" name="start">START</button>
    <button id="selectbutton" name="select" @dblclick='${() => toggle_debug()}'>SELECT</button>
  </div>
  <div id="rightbuttons" class="buttongroup">
    <button id="ybutton" name="y">Y</button>
    <button id="xbutton" name="x">X</button>
    <button id="bbutton" name="b">B</button>
    <button id="abutton" name="a">A</button>
  </div>
  <div id="metabuttons" class="buttongroup">
    <button id="fullscreen" @click='${() => screenfull.toggle()}'>
      Fullscreen
    </button>
  </div>
  <div id="powercase_right" class="${powercase_state}"></div>
  <div id="powercase_left" class="${powercase_state}">
      <button @click='${open_console}'></button>
  </div>
    `
}

function touches_rendered() {
    let allout = ' ';
    let touchentries = input.current_touches.entries();
    input.current_touches.forEach((a) => allout += `[${a.target.id} => ${(a.current || a.target).id}]`);
    return allout;
}

let debug_readout = () => html`
  <div id="debugreadout">
      <div>pressed:${JSON.stringify(input.buttons, null, 2)}</div>
      <div>Touches: </div>
      ${touches_rendered()}
  </div>
`;

function render_controls() {
    render(controls(), document.querySelector('#controls'));
}

async function doasync(cb) {
    return cb();
}

function render_debug_readout() {
    if (debug) {
        doasync(() =>
        render(debug_readout(
            {
                'buttons': input.buttons
            }
        ),
        document.querySelector('#debug_point')))
    };
}


async function main() {
    console.log('testing');
    render_controls();
    input.full_setup();
    begin_debug();
    let can = document.querySelector('#gamescreen')
    can.addEventListener('dblclick', () => screenfull.toggle(can))
    // firmware = await new Firmware(kontra, can, get_cart_location()).init();
    if (powercase_state === 'hidden') {
        // For 'live-server' reloading.
        // firmware.boot();
        boot(kontra, can, input);
    }
    console.log(firmware);
}

main()