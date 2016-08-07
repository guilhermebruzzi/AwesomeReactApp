const assert = require('assert');

const copyCompiler = {
  callbacks: {},
  plugin: function(type, callback) {
    this.callbacks[type] = callback;
  }
}

function WebPackExtendPlugin(plugin) {
  assert.notEqual(plugin, null, 'The WebPackExtendPlugin needs a plugin as parameter');
  plugin.apply(copyCompiler);
  plugin.compilerCallbacks = copyCompiler.callbacks;
  return plugin;
}

module.exports = WebPackExtendPlugin;
