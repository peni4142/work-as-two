module.exports=function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t){e.exports=require("vscode")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.Left="left",e.Right="right"}(t.HandSide||(t.HandSide={}))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=n(0),o=n(3);t.activate=function(e){console.log('Congratulations, your extension "work-as-two" is now active!');let t=i.commands.registerCommand("extension.helloWorld",()=>{i.window.showInformationMessage("Hello World!")});o.API.run(),e.subscriptions.push(t)},t.deactivate=function(){}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=n(0),o=n(4),r=n(1);class a{static run(){i.workspace.onDidOpenTextDocument(e=>{let t=this.ph.mapPath(e.fileName);try{t&&t.path!==this.lastOpened&&(i.window.showInformationMessage("should open"),i.workspace.openTextDocument(i.Uri.file(t.path)).then(n=>{var o,a;i.window.showTextDocument(n,(null===(o=t)||void 0===o?void 0:o.handSide)===r.HandSide.Left?1:2),i.window.showTextDocument(e,(null===(a=t)||void 0===a?void 0:a.handSide)===r.HandSide.Right?1:2)}))}finally{this.lastOpened=e.fileName}})}}t.API=a,a.lastOpened="",a.ph=new o.PathHandler({pathRight:{escapedRegex:/^([^.]*)(\.ts)/,result:"$1.test$2"},pathLeft:{escapedRegex:/^([^.]*)\.test(\.ts)/,result:"$1$2"}})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=n(5),o=n(1);t.PathHandler=class{constructor(e){this.pathMapping=e}mapPath(e){if(i.existsSync(e)){if(this.pathMapping.pathLeft.escapedRegex.test(e)){let t=e.replace(this.pathMapping.pathLeft.escapedRegex,this.pathMapping.pathLeft.result);if(i.existsSync(t))return{path:t,handSide:o.HandSide.Left}}if(this.pathMapping.pathRight.escapedRegex.test(e)){let t=e.replace(this.pathMapping.pathRight.escapedRegex,this.pathMapping.pathRight.result);if(i.existsSync(t))return{path:t,handSide:o.HandSide.Right}}}return null}}},function(e,t){e.exports=require("fs")}]);
//# sourceMappingURL=extension.js.map