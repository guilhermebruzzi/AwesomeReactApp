const StaticSiteGeneratorWebpackPlugin = require("static-site-generator-webpack-plugin");
const WebPackExtendPlugin = require("./webpack-extend-plugin");

const EventEmitter = require('events');
class HtmlTemplateEmitter extends EventEmitter {}
const htmlTemplateEmitter = new HtmlTemplateEmitter();

Function.prototype.inheritsFrom = function( parentClassOrObject ){
  this.prototype = new parentClassOrObject;
  this.prototype.constructor = this;
  this.prototype.parent = parentClassOrObject.prototype;
  return this;
};

function StaticPagesWebpackPlugin() {
  this.parent.constructor.apply(this.parent, arguments);
  const compilerCallbacks = WebPackExtendPlugin(this.parent).compilerCallbacks;
  this.emitStaticFiles = compilerCallbacks['emit'];
}

StaticPagesWebpackPlugin.inheritsFrom(StaticSiteGeneratorWebpackPlugin);

StaticPagesWebpackPlugin.prototype.apply = function(compiler) {
  var self = this;

  compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (htmlPluginData, callback) {
      htmlTemplateEmitter.emit('html-plugin-data', htmlPluginData);
    });
  });

  compiler.plugin('emit', function(compiler, done) {
    htmlTemplateEmitter.on('html-plugin-data', function(htmlPluginData) {
      self.parent.locals.templateContent = htmlPluginData.html.source();
      self.emitStaticFiles(compiler, done);
    });
    done();
  });
};

module.exports = StaticPagesWebpackPlugin;
