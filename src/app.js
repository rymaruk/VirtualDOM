import {h, createProjector} from 'maquette';

var body = document.body,
    projector = createProjector(),
    yourName = '';

// Plain event handler
function handleNameInput(evt) {
  yourName = evt.target.value;
}

// This function uses the 'hyperscript' notation to create the virtual DOM.
function render() {
  return h('div', [
    h('input', {
      type: 'text', placeholder: 'What is your name?',
      value: yourName, oninput: handleNameInput
    }),
    h('p.output', ['Hello ' + (yourName || 'you') + '!'])
  ]);
}

projector.append(body, render);
