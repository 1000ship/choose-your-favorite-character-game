(this.webpackJsonpcyfc=this.webpackJsonpcyfc||[]).push([[0],{14:function(e,n,t){e.exports=t.p+"static/media/cyfc_top_logo.5562f7f2.png"},18:function(e,n,t){e.exports=t.p+"static/media/game_chat_box.008fe626.png"},21:function(e,n,t){e.exports=t(31)},26:function(e,n,t){},27:function(e,n,t){},31:function(e,n,t){"use strict";t.r(n);var r=t(0),c=t.n(r),a=t(13),o=t.n(a),i=(t(26),t(3)),u=(t(27),t(10)),l=t(2),s=t(1),f=t(14),p=t.n(f),m={getText:function(e){var n,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{name:"\uc131\ud601"},r=e,c=null!==(n=r.match(/{\w*}/g))&&void 0!==n?n:[],a=c.map((function(e){return e.match(/\w*/g).join("").trim()}));return c.forEach((function(e,n){return r=r.replace(e,t[a[n]])})),r=(r=r.replace(/{input:\w*}/g,"<input type='text'/>")).replace(/{\w*:.+\.?\w*}/g,"")},getSpecials:function(e){var n,t={};return(null!==(n=e.match(/{\w*:.+\.?\w*}/g))&&void 0!==n?n:[]).map((function(e){return e.match(/[^{:}]+/g)})).forEach((function(e){return t[e[0]]=e[1]})),t}};function d(){var e=Object(l.a)(["\n  cursor: pointer;\n  &:hover {\n    font-weight: 600;\n  }\n"]);return d=function(){return e},e}function g(){var e=Object(l.a)([""]);return g=function(){return e},e}function v(){var e=Object(l.a)(["\n  align-self: flex-end;\n  margin: 15px;\n  padding: 12px;\n  border: 3px solid #a21ccb;\n  border-radius: 15px 15px 3px 15px;\n  border-image-slice: 1;\n  color: #662d91;\n"]);return v=function(){return e},e}var h=s.c.span(v()),b=s.c.ul(g()),x=s.c.li(d()),S=function(e){var n=e.selectOption,t=e.options,r=void 0===t?[{answer:"\u314e\u3147",reaction:"?",nextId:""}]:t;return c.a.createElement(h,null,c.a.createElement(b,null,r.map((function(e,t){return c.a.createElement(x,{key:t,onClick:function(e){return n(t)},dangerouslySetInnerHTML:{__html:m.getText(e.answer)}})}))))};function O(){var e=Object(l.a)(["\n  align-self: flex-end;\n  margin: 5px;\n  padding: 12px;\n  border: 3px solid #a21ccb;\n  border-radius: 15px 15px 3px 15px;\n  border-image-slice: 1;\n  color: #662d91;\n"]);return O=function(){return e},e}function w(){var e=Object(l.a)(["\n  align-self: flex-start;\n  margin: 5px;\n  padding: 15px;\n  border-radius: 15px 15px 15px 3px;\n  background-image: linear-gradient(#e86ecb, #a21ccb);\n  color: white;\n"]);return w=function(){return e},e}function j(){var e=Object(l.a)(["\n  color: #939393;\n  margin: 10px;\n"]);return j=function(){return e},e}function y(){var e=Object(l.a)(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  margin-top: ","px;\n"]);return y=function(){return e},e}function E(){var e=Object(l.a)(["\n  height: 70%;\n"]);return E=function(){return e},e}function I(){var e=Object(l.a)(["\n  position: fixed;\n  left: 0;\n  top: 0;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n  height: ","px;\n  border-bottom: 2px solid #bcbcbc;\n  background-color: white;\n"]);return I=function(){return e},e}function k(){var e=Object(l.a)([""]);return k=function(){return e},e}var T=s.c.div(k()),_=s.c.div(I(),64),N=s.c.img(E()),M=s.c.div(y(),64),F=s.c.span(j()),H=s.c.span(w()),L=s.c.span(O()),C=function(e){var n,t=e.chatList,r=e.scene,a=e.selectOption;return c.a.createElement(T,null,c.a.createElement(_,null,c.a.createElement(N,{src:p.a,alt:"CYFC"})),c.a.createElement(M,null,c.a.createElement(F,null,"\uc624\ub298"),t.map((function(e,n){var t=e.who,r=e.message;return"left"===t?c.a.createElement(H,{key:n,dangerouslySetInnerHTML:{__html:m.getText(r)}}):c.a.createElement(L,{key:n,dangerouslySetInnerHTML:{__html:m.getText(r)}})})),(null===(n=r.options)||void 0===n?void 0:n.length)>0&&"ending"!==r.sceneType&&c.a.createElement(S,{options:r.options,selectOption:a})))},z=function(e){var n=e.scriptInterpreter,t=e.setSceneType,a=Object(r.useState)([{who:"left",message:"\ub2f9\uc2e0\uc758 \uc774\ub984\uc740?"},{who:"right",message:"\ub098\uc758 \uc774\ub984\uc740 ..."}]),o=Object(i.a)(a,2),l=o[0],s=o[1];Object(r.useEffect)((function(){return f()}),[]);var f=function e(){var r=n.currentScene,c=r.sceneType,a=r.sceneScript,o=r.options,i=r.nextSceneId;"meet"!==c?(s((function(e){var n=Object(u.a)(e);return(null===a||void 0===a?void 0:a.length)>0&&n.push({who:"left",message:a}),n})),0===(null===o||void 0===o?void 0:o.length)&&(n.getNextScene(i),e())):setTimeout((function(){return t("meet")}),2e3)};return c.a.createElement(C,{chatList:l,scene:n.currentScene,selectOption:function(e){var t=n.currentScene.options[e],r=t.answer,c=t.reaction,a=t.nextId;s((function(e){var n=Object(u.a)(e);return(null===r||void 0===r?void 0:r.length)>0&&n.push({who:"right",message:r}),(null===c||void 0===c?void 0:c.length)>0&&n.push({who:"left",message:c}),n})),n.getNextScene(a),f()}})},B=t(5);function G(){var e=Object(l.a)(["\n  font-size: 2.2vw;\n  cursor: pointer;\n  font-weight: 400;\n  margin-bottom: 0.5vw;\n  &:hover {\n    font-weight: 600;\n  }\n"]);return G=function(){return e},e}function D(){var e=Object(l.a)([""]);return D=function(){return e},e}function A(){var e=Object(l.a)([""]);return A=function(){return e},e}var J=s.c.div(A()),P=s.c.ul(D()),R=s.c.li(G()),U=function(e){var n=e.options,t=e.selectOption,r=function(e){return function(n){t(e),n.stopPropagation()}};return c.a.createElement(J,null,c.a.createElement(P,null,n.map((function(e,n){var t=e.answer;return c.a.createElement(R,{key:n,onClick:r(n),dangerouslySetInnerHTML:{__html:m.getText(t)}})}))))},W=t(18),Y=t.n(W);function $(){var e=Object(l.a)(["\n  font-size: 2vw;\n  margin-left: 10px;\n  color: black;\n"]);return $=function(){return e},e}function q(){var e=Object(l.a)(["\n  font-weight: bolder;\n  font-size: 3vw;\n  margin-bottom: 10px;\n  color: #662d91;\n"]);return q=function(){return e},e}function K(){var e=Object(l.a)(["\n  position: absolute;\n  left: 0;\n  top: 0;\n  display: flex;\n  flex-direction: column;\n  padding: 3% 10%;\n"]);return K=function(){return e},e}function Q(){var e=Object(l.a)(["\n  width: 100%;\n"]);return Q=function(){return e},e}function V(){var e=Object(l.a)(["\n  position: absolute;\n  left: 10%;\n  bottom: 30px;\n  width: 80%;\n"]);return V=function(){return e},e}var X=s.c.div(V()),Z=s.c.img(Q()),ee=s.c.div(K()),ne=s.c.span(q()),te=s.c.span($()),re=function(e){var n=e.meetData,t=e.selectOption;return c.a.createElement(X,null,c.a.createElement(Z,{src:Y.a}),c.a.createElement(ee,null,"option"!==n.step?c.a.createElement(c.a.Fragment,null,c.a.createElement(ne,{dangerouslySetInnerHTML:{__html:m.getText(n.characterName)}}),c.a.createElement(te,{dangerouslySetInnerHTML:{__html:m.getText("reaction"===n.step?n.options[n.optionIndex].reaction:n.sceneScript)}})):c.a.createElement(U,{options:n.options,selectOption:t})))};function ce(){var e=Object(l.a)(["\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  background-image: url('","');\n  background-position: bottom;\n  background-size: contain;\n  background-repeat: no-repeat;\n  transform-origin: bottom center;\n  transform: scale(0.9);\n"]);return ce=function(){return e},e}function ae(){var e=Object(l.a)(["\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  left: 0;\n  top: 0;\n  background-image: url('","');\n  background-position: center;\n  background-size: cover;\n"]);return ae=function(){return e},e}function oe(){var e=Object(l.a)([""]);return oe=function(){return e},e}var ie=s.c.div(oe()),ue=s.c.div(ae(),(function(e){return e.imageSrc})),le=s.c.div(ce(),(function(e){return e.imageSrc})),se=function(e){var n=e.meetData,t=e.stepEvent,r=e.selectOption,a=n.folderName,o=n.backgroundImage,i=n.characterImage;return c.a.createElement(ie,{onClick:t},(null===o||void 0===o?void 0:o.length)>0&&c.a.createElement(ue,{imageSrc:"./res/img/background/".concat(a,"/").concat(o)},o),(null===i||void 0===i?void 0:i.length)>0&&c.a.createElement(le,{imageSrc:"./res/img/character/".concat(a,"/").concat(i)},i),c.a.createElement(re,{meetData:n,selectOption:r}))},fe=function(e){var n=e.scriptInterpreter,t=e.setSceneType,a=Object(r.useState)({step:"script",characterName:"",sceneScript:"",options:[],optionIndex:0,folderName:n.folderName}),o=Object(i.a)(a,2),u=o[0],l=o[1];Object(r.useEffect)((function(){return f()}),[]);var s=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t=e.characterName,r=e.sceneScript,c=e.backgroundImage,a=e.characterImage,o=e.sceneType,i=e.options,u=e.nextSceneId,l={step:"script",characterName:t,sceneScript:r,options:i,nextSceneId:u};return(null===c||void 0===c?void 0:c.length)>0&&(l.backgroundImage=c.trim()),(null===a||void 0===a?void 0:a.length)>0&&(l.characterImage=a.trim()),"ending"===o&&(l.characterImage=""),0===(null===r||void 0===r?void 0:r.length)&&(l.step="option"),Object.assign(Object.assign({},n),l)},f=function(){"text"!==n.currentScene.sceneType?l((function(e){return s(n.currentScene,e)})):setTimeout((function(){return t("text")}),2e3)};return c.a.createElement(se,{meetData:u,stepEvent:"script"===u.step?function(){l((function(e){var t;return 0===(null===(t=e.options)||void 0===t?void 0:t.length)?(n.getNextScene(e.nextSceneId),s(n.currentScene,e)):Object(B.a)(Object(B.a)({},e),{},{step:"option"})}))}:"reaction"===u.step?function(){l((function(e){var t,r=e.optionIndex,c=(null===(t=e.options)||void 0===t?void 0:t.length)>0?e.options[r].nextId:e.nextSceneId;return n.getNextScene(c),s(n.currentScene,e)}))}:null,selectOption:function(e){l((function(t){var r,c=Object(B.a)(Object(B.a)({},t),{},{step:"reaction",optionIndex:e});if(0===(null===(r=t.options[e].reaction)||void 0===r?void 0:r.length)){var a,o=(null===(a=t.options)||void 0===a?void 0:a.length)>0?t.options[e].nextId:t.nextSceneId;return n.getNextScene(o),s(n.currentScene,t)}var i=t.options[e].reaction,u=m.getSpecials(i);return u&&console.log(u),(null===u||void 0===u?void 0:u.img)&&(c.characterImage=u.img),(null===u||void 0===u?void 0:u.bg)&&(c.backgroundImage=u.bg),c}))}})},pe=t(19);function me(){var e=Object(l.a)(["\n  ","\n  @font-face {\n    font-family: \"GmarketSans\";\n    src: url(./res/fonts/GmarketSansTTFMedium.ttf);\n    font-weight: 400;\n  }\n  @font-face {\n    font-family: \"GmarketSans\";\n    src: url(./res/fonts/GmarketSansTTFBold.ttf);\n    font-weight: 600;\n  }\n  a {\n      text-decoration: none;\n      color: inherit;\n  }\n  body {\n    font-family: \"GmarketSans\", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\n  }\n"]);return me=function(){return e},e}var de=Object(s.a)(me(),pe.a),ge=function(){var e=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";this.folderName=n,this.scenes=[],this.currentScene=null,this.setFolderName=function(n){e.folderName=n},this.setScenes=function(n){e.scenes=n,e.currentScene=e.scenes[0]},this.getNextScene=function(n){var t=e.scenes.findIndex((function(e){return e.sceneId===n}));if(-1!==t)return e.currentScene=e.scenes[t],console.log(e.currentScene),e.currentScene;alert("".concat(n,"\uc774 \uc874\uc7ac\ud558\uc9c0 \uc54a\uc74c"))}},ve=t(9),he=t.n(ve),be=t(20),xe=function(){var e=Object(be.a)(he.a.mark((function e(n){var t,r,c;return he.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t="./res/scenes/".concat(n),e.next=3,fetch(t);case 3:return r=e.sent,e.next=6,r.json();case 6:return c=e.sent,e.abrupt("return",c);case 8:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();console.log("PARSE:",m.getText("{name} Hello {world} {img:07 \ubfcc\ub4ef.png}"));var Se=new ge;var Oe=function(){var e=Object(r.useState)("text"),n=Object(i.a)(e,2),t=(n[0],n[1]),a=Object(r.useState)(!1),o=Object(i.a)(a,2),u=o[0],l=o[1];return Object(r.useEffect)((function(){var e,n,r="";switch(0===(null===(e=r=window.prompt("amy_male.txt/amy_female.txt/bella.txt/clair.txt"))||void 0===e?void 0:e.length)&&(r="amy_male.txt"),r){case"amy_male.txt":case"amy_female.txt":n="Amy";break;case"bella.txt":n="Bella";break;case"clair.txt":n="Clair"}xe(r).then((function(e){Se.setScenes(e),Se.setFolderName(n),l(!0),t(Se.currentScene.sceneType)}))}),[]),c.a.createElement(c.a.Fragment,null,c.a.createElement(de,null),u&&("text"===Se.currentScene.sceneType?c.a.createElement(z,{scriptInterpreter:Se,setSceneType:t}):c.a.createElement(fe,{scriptInterpreter:Se,setSceneType:t})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(Oe,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[21,1,2]]]);
//# sourceMappingURL=main.8639d70f.chunk.js.map