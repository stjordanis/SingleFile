!function(){"use strict";const t=33554432;async function e(e,n){if(n.includeInfobar&&await infobar.includeScript(e),n.includeBOM&&(e.content="\ufeff"+e.content),n.backgroundSave||n.openEditor||n.saveToGDrive)for(let o=0;o*t<e.content.length;o++){const r={method:"downloads.download",taskId:n.taskId,confirmFilename:n.confirmFilename,filenameConflictAction:n.filenameConflictAction,filename:e.filename,saveToClipboard:n.saveToClipboard,saveToGDrive:n.saveToGDrive,forceWebAuthFlow:n.forceWebAuthFlow,extractAuthCode:n.extractAuthCode,filenameReplacementCharacter:n.filenameReplacementCharacter,openEditor:n.openEditor,openSavedPage:n.openSavedPage,compressHTML:n.compressHTML,backgroundSave:n.backgroundSave,bookmarkId:n.bookmarkId,replaceBookmarkURL:n.replaceBookmarkURL,applySystemTheme:n.applySystemTheme,defaultEditorMode:n.defaultEditorMode,includeInfobar:n.includeInfobar,warnUnsavedPage:n.warnUnsavedPage};r.truncated=e.content.length>t,r.truncated?(r.finished=(o+1)*t>e.content.length,r.content=e.content.substring(o*t,(o+1)*t)):r.content=e.content,await browser.runtime.sendMessage(r)}else n.saveToClipboard?function(t){const e="copy";function n(e){e.clipboardData.setData("text/html",t.content),e.clipboardData.setData("text/plain",t.content),e.preventDefault()}document.addEventListener(e,n),document.execCommand(e),document.removeEventListener(e,n)}(e):await async function(t){if(t.filename&&t.filename.length){const e=document.createElement("a");e.download=t.filename,e.href=URL.createObjectURL(new Blob([t.content],{type:"text/html"})),e.dispatchEvent(new MouseEvent("click")),URL.revokeObjectURL(e.href)}return new Promise((t=>setTimeout(t,1)))}(e),n.openSavedPage&&open(URL.createObjectURL(new Blob([e.content],{type:"text/html"}))),browser.runtime.sendMessage({method:"ui.processEnd"});await browser.runtime.sendMessage({method:"downloads.end",taskId:n.taskId,hash:e.hash})}const n="single-file-response-fetch",o=window.fetch;async function r(t){const e=await browser.runtime.sendMessage(t);if(!e||e.error)throw new Error(e&&e.error&&e.error.toString());return e}function a(t){return new Promise(((e,o)=>{var r,a,s,i;r=new CustomEvent("single-file-request-fetch",{detail:t}),window.dispatchEvent(r),a=n,s=function r(a){var s,i,l;a.detail?a.detail.url==t&&(s=n,i=r,l=!1,window.removeEventListener(s,i,l),a.detail.response?e({status:a.detail.status,headers:new Map(a.detail.headers),arrayBuffer:async()=>a.detail.response}):o(a.detail.error)):o()},i=!1,window.addEventListener(a,s,i)}))}browser.runtime.onMessage.addListener((t=>{if("singlefile.fetchFrame"==t.method&&window.frameId&&window.frameId==t.frameId)return async function(t){try{let e=await o(t.url,{cache:"force-cache"});return 401!=e.status&&403!=e.status&&404!=e.status||(e=await Promise.race([a(t.url),new Promise(((t,e)=>setTimeout((()=>e()),5e3)))])),{status:e.status,headers:[...e.headers],array:Array.from(new Uint8Array(await e.arrayBuffer()))}}catch(t){return{error:t&&t.toString()}}}(t)}));const s=globalThis.singlefile,i=s.helper.SELECTED_CONTENT_ATTRIBUTE_NAME,l="singlefile-mask",c="singlefile-mask-content",d="singlefile-progress-bar",f="singlefile-progress-bar-content",u="single-file-selection-zone",p="singlefile-logs-window",m="singlefile-logs",g="singlefile-logs-line",h="singlefile-logs-line-text",y="singlefile-logs-line-icon",E=s.helper.SINGLE_FILE_UI_ELEMENT_CLASS,w=browser.i18n.getMessage("logPanelDeferredImages"),b=browser.i18n.getMessage("logPanelFrameContents"),v=browser.i18n.getMessage("logPanelStep"),S=browser.i18n.getMessage("logPanelWidth"),C=new Set(Array.from(getComputedStyle(document.body)));let x,A;function P(t,e){return prompt(t,e)}function T(t){if(!document.querySelector(l)&&(t.logsEnabled&&document.body.appendChild(A),t.shadowEnabled)){const e=function(){try{let t=document.querySelector(l);if(!t){t=F(l,document.body);const e=t.attachShadow({mode:"open"}),n=document.createElement("style");n.textContent="\n\t\t\t\t@keyframes single-file-progress { \n\t\t\t\t\t0% { \n\t\t\t\t\t\tleft: -50px;\n\t\t\t\t\t} \n\t\t\t\t\t100% { \n\t\t\t\t\t\tleft: 0;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\t.singlefile-progress-bar {\n\t\t\t\t\tposition: fixed;\n\t\t\t\t\ttop: 0;\n\t\t\t\t\tleft: 0;\n\t\t\t\t\twidth: 0;\n\t\t\t\t\theight: 8px;\n\t\t\t\t\tz-index: 2147483646;\n\t\t\t\t\topacity: .5;\n\t\t\t\t\toverflow: hidden;\t\t\t\t\t\n\t\t\t\t\ttransition: width 200ms ease-in-out;\n\t\t\t\t}\n\t\t\t\t.singlefile-progress-bar-content {\n\t\t\t\t\tposition: absolute;\n\t\t\t\t\tleft: 0;\n\t\t\t\t\tanimation: single-file-progress 3s linear infinite reverse;\n\t\t\t\t\tbackground: \n\t\t\t\t\t\twhite \n\t\t\t\t\t\tlinear-gradient(-45deg, rgba(0, 0, 0, 0.075) 25%, \n\t\t\t\t\t\t\ttransparent 25%, \n\t\t\t\t\t\t\ttransparent 50%, \n\t\t\t\t\t\t\trgba(0, 0, 0, 0.075) 50%, \n\t\t\t\t\t\t\trgba(0, 0, 0, 0.075) 75%, \n\t\t\t\t\t\t\ttransparent 75%, transparent)\n\t\t\t\t\t\trepeat scroll 0% 0% / 50px 50px padding-box border-box;\n\t\t\t\t\twidth: calc(100% + 50px);\n\t\t\t\t\theight: 100%;\t\t\t\t\t\n\t\t\t\t}\n\t\t\t\t.singlefile-mask-content {\n\t\t\t\t\tposition: fixed;\n\t\t\t\t\ttop: 0;\n\t\t\t\t\tleft: 0;\n\t\t\t\t\twidth: 100%;\n\t\t\t\t\theight: 100%;\n\t\t\t\t\tz-index: 2147483646;\n\t\t\t\t\topacity: 0;\n\t\t\t\t\tbackground-color: black;\n\t\t\t\t\ttransition: opacity 250ms;\n\t\t\t\t}\n\t\t\t",e.appendChild(n);let o=document.createElement("div");o.classList.add(c),e.appendChild(o),t.offsetWidth,o.style.setProperty("opacity",.3),t.offsetWidth}return t}catch(t){}}();t.progressBarEnabled&&function(t){try{if(!t.shadowRoot.querySelector("."+d)){let e=document.createElement("div");e.classList.add(d),t.shadowRoot.appendChild(e);const n=document.createElement("div");n.classList.add(f),e.appendChild(n)}}catch(t){}}(e)}}function L(){const t=document.querySelector(l);t&&t.remove(),A.remove(),O()}function R(t,e,n){n.shadowEnabled&&n.progressBarEnabled&&function(t,e){try{const n=document.querySelector(l);if(n){const o=n.shadowRoot.querySelector("."+d);if(o&&e){const n=Math.floor(t/e*100)+"%";o.style.getPropertyValue("width")!=n&&(o.style.setProperty("width",n),o.offsetWidth)}}}catch(t){}}(t,e)}function I(){let t;const e=[],n=getSelection();for(let o=0;o<n.rangeCount;o++){let r=n.getRangeAt(o);if(r&&r.commonAncestorContainer){const n=document.createTreeWalker(r.commonAncestorContainer);let o=!1,a=!1;for(;!a;)(o||n.currentNode==r.startContainer||n.currentNode==r.endContainer)&&(o=!0,r.startContainer==r.endContainer&&r.startOffset==r.endOffset||(t=!0,"A"==n.currentNode.tagName&&n.currentNode.href&&e.push(n.currentNode.href))),n.currentNode==r.endContainer?a=!0:n.nextNode();t&&n.currentNode==r.endContainer&&n.currentNode.querySelectorAll&&n.currentNode.querySelectorAll("*").forEach((t=>{"A"==t.tagName&&t.href&&e.push(n.currentNode.href)}))}}return Array.from(new Set(e))}async function k(t){let e=N();return e||t?e:(e=await new Promise((t=>{let e=[];function n(t){e=[],i(),t.preventDefault()}function o(t){const e=function(t){let e,n=t.target,o=n.getBoundingClientRect();for(e=B("floor",n,t.clientX-o.left,q(n,"left")),e==n&&(e=B("ceil",n,o.left+o.width-t.clientX,q(n,"right"))),e==n&&(e=B("floor",n,t.clientY-o.top,q(n,"top"))),e==n&&(e=B("ceil",n,o.top+o.height-t.clientY,q(n,"bottom"))),n=e;n&&n.clientWidth<=8&&n.clientHeight<=8;)n=n.parentElement;return n}(t);var n;e&&(x=e,n=e,requestAnimationFrame((()=>{const t=_(),e=n.getBoundingClientRect(),o=document.scrollingElement||document.documentElement;t.style.setProperty("top",o.scrollTop+e.top-10+"px"),t.style.setProperty("left",o.scrollLeft+e.left-10+"px"),t.style.setProperty("width",e.width+20+"px"),t.style.setProperty("height",e.height+20+"px")})))}function r(t){t.preventDefault(),t.stopPropagation(),0==t.button?i(x,t.ctrlKey):s()}function a(t){"Escape"==t.key&&s()}function s(){e.length&&getSelection().removeAllRanges(),e=[],c()}function i(t,e){if(t){e||d();const n=document.createRange();n.selectNodeContents(t),l(),getSelection().addRange(n),f(),e||c()}else c()}function l(){const t=getSelection();for(let e=t.rangeCount-1;e>=0;e--){const n=t.getRangeAt(e);n.startOffset==n.endOffset&&(t.removeRange(n),e--)}}function c(){_().remove(),removeEventListener("mousemove",o,!0),removeEventListener("click",r,!0),removeEventListener("keyup",a,!0),x=null,t(Boolean(e.length)),setTimeout((()=>document.removeEventListener("contextmenu",n,!0)),0)}function d(){getSelection().removeAllRanges(),e.forEach((t=>getSelection().addRange(t)))}function f(){e=[];for(let t=0;t<getSelection().rangeCount;t++){const n=getSelection().getRangeAt(t);e.push(n)}}addEventListener("mousemove",o,!0),addEventListener("click",r,!0),addEventListener("keyup",a,!0),document.addEventListener("contextmenu",n,!0),getSelection().removeAllRanges()})),e?N():void 0)}function N(){const t=getSelection();let e;for(let n=0;n<t.rangeCount;n++){let o=t.getRangeAt(n);if(o&&o.commonAncestorContainer){const t=document.createTreeWalker(o.commonAncestorContainer);let n=!1,r=!1;for(;!r;)(n||t.currentNode==o.startContainer||t.currentNode==o.endContainer)&&(n=!0,o.startContainer==o.endContainer&&o.startOffset==o.endOffset||(e=!0,D(t.currentNode))),e&&t.currentNode==o.startContainer&&M(t.currentNode),t.currentNode==o.endContainer?r=!0:t.nextNode();e&&t.currentNode==o.endContainer&&t.currentNode.querySelectorAll&&t.currentNode.querySelectorAll("*").forEach((t=>D(t)))}}return e}function D(t){(t.nodeType==Node.ELEMENT_NODE?t:t.parentElement).setAttribute(i,"")}function M(t){t.parentElement&&(D(t),M(t.parentElement))}function _(){let t=document.querySelector(u);return t||(t=F(u,document.body),t.style.setProperty("box-sizing","border-box","important"),t.style.setProperty("background-color","#3ea9d7","important"),t.style.setProperty("border","10px solid #0b4892","important"),t.style.setProperty("border-radius","2px","important"),t.style.setProperty("opacity",".25","important"),t.style.setProperty("pointer-events","none","important"),t.style.setProperty("position","absolute","important"),t.style.setProperty("transition","all 100ms","important"),t.style.setProperty("cursor","pointer","important"),t.style.setProperty("z-index","2147483647","important"),t.style.removeProperty("border-inline-end"),t.style.removeProperty("border-inline-start"),t.style.removeProperty("inline-size"),t.style.removeProperty("block-size"),t.style.removeProperty("inset-block-start"),t.style.removeProperty("inset-inline-end"),t.style.removeProperty("inset-block-end"),t.style.removeProperty("inset-inline-start")),t}function O(){try{if(A=document.querySelector(p),!A){A=F(p);const t=A.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=`\n\t\t\t\t@keyframes single-file-pulse { \n\t\t\t\t\t0% { \n\t\t\t\t\t\topacity: .25;\n\t\t\t\t\t} \n\t\t\t\t\t100% { \n\t\t\t\t\t\topacity: 1;\n\t\t\t\t\t} \n\t\t\t\t}\n\t\t\t\t.singlefile-logs {\n\t\t\t\t\tposition: fixed;\n\t\t\t\t\tbottom: 24px;\n\t\t\t\t\tleft: 8px;\n\t\t\t\t\tz-index: 2147483647;\n\t\t\t\t\topacity: 0.9;\n\t\t\t\t\tpadding: 4px;\n\t\t\t\t\tbackground-color: white;\n\t\t\t\t\tmin-width: ${S}px;\n\t\t\t\t\tmin-height: 16px;\n\t\t\t\t\ttransition: height 100ms;\n\t\t\t\t}\n\t\t\t\t.singlefile-logs-line {\n\t\t\t\t\tdisplay: flex;\n\t\t\t\t\tjustify-content: space-between;\n\t\t\t\t\tpadding: 2px;\n\t\t\t\t\tfont-family: arial, sans-serif;\n\t\t\t\t\tcolor: black;\n\t\t\t\t\tbackground-color: white;\n\t\t\t\t}\n\t\t\t\t.singlefile-logs-line-text {\n\t\t\t\t\tfont-size: 13px;\n\t\t\t\t\topacity: 1;\n\t\t\t\t\ttransition: opacity 200ms;\n\t\t\t\t}\n\t\t\t\t.singlefile-logs-line-icon {\n\t\t\t\t\tfont-size: 11px;\n\t\t\t\t\tmin-width: 15px;\n\t\t\t\t\ttext-align: center;\n\t\t\t\t\tposition: relative;\n\t\t\t\t\ttop: 1px;\n\t\t\t\t}\n\t\t\t`,t.appendChild(e);const n=document.createElement("div");n.classList.add(m),t.appendChild(n)}}catch(t){}}function U(t,e,n,o){try{if(o.logsEnabled){const o=A.shadowRoot.querySelector(".singlefile-logs");let r=o.querySelector("[data-id='"+t+"']");if(!r){r=document.createElement("div"),r.classList.add(g),o.appendChild(r),r.setAttribute("data-id",t);const n=document.createElement("div");n.classList.add(h),r.appendChild(n),n.textContent=e;const a=document.createElement("div");a.classList.add(y),r.appendChild(a)}!function(t,e,n){const o=t.childNodes[0],r=t.childNodes[1];o.textContent=e,r.style.setProperty("color","✓"==n?"#055000":"black"),"✓"==n?(o.style.setProperty("opacity",".5"),r.style.setProperty("opacity",".5"),r.style.setProperty("animation","none")):r.style.setProperty("animation","1s ease-in-out 0s infinite alternate none running single-file-pulse");r.textContent=n}(r,e,n)}}catch(t){}}function q(t,e){let n,o=t,r=[];do{const t=o.getBoundingClientRect();if(o.parentElement){const a=o.parentElement.getBoundingClientRect();n=Math.abs(a[e]-t[e])<=8,n&&(o.parentElement.clientWidth>8&&o.parentElement.clientHeight>8&&(o.parentElement.clientWidth-o.clientWidth>8||o.parentElement.clientHeight-o.clientHeight>8)&&r.push(o.parentElement),o=o.parentElement)}else n=!1}while(n&&o);return r}function B(t,e,n,o){return Math[t](n/8)<=o.length&&(e=o[o.length-Math[t](n/8)-1]),e}function F(t,e){const n=document.createElement(t);return n.className=E,e&&e.appendChild(n),C.forEach((t=>n.style.setProperty(t,"initial","important"))),n}O();const z=globalThis.singlefile,G=globalThis.singlefileBootstrap,W="moz-extension:";let H,j;z.init({fetch:async function(t,e={}){try{let e=await o(t,{cache:"force-cache"});return 401!=e.status&&403!=e.status&&404!=e.status||(e=await a(t)),e}catch(n){const o=await r({method:"singlefile.fetch",url:t,referrer:e.referrer});return{status:o.status,headers:{get:t=>o.headers&&o.headers[t]},arrayBuffer:async()=>new Uint8Array(o.array).buffer}}},frameFetch:async function(t,e){const n=await r({method:"singlefile.fetchFrame",url:t,frameId:e.frameId,referrer:e.referrer});return{status:n.status,headers:new Map(n.headers),arrayBuffer:async()=>new Uint8Array(n.array).buffer}}}),browser.runtime.onMessage.addListener((t=>{if("content.save"==t.method||"content.cancelSave"==t.method||"content.getSelectedLinks"==t.method)return async function(t){if(!location.href.startsWith(W)){if("content.save"==t.method)return await async function(t){const n=t.options;let o;(n.selected||n.optionallySelected)&&(o=await k(n.optionallySelected));if(!(j||G&&G.pageInfo.processing)){if(n.updatedResources=G?G.pageInfo.updatedResources:{},n.visitDate=G?G.pageInfo.visitDate:new Date,Object.keys(n.updatedResources).forEach((t=>n.updatedResources[t].retrieved=!1)),n.optionallySelected&&o&&(n.selected=!0),!n.selected||o){G&&(G.pageInfo.processing=!0);try{const t=await async function(t){const e=z.processors.frameTree;let n;z.helper.initDoc(document),T(t),H=new z.SingleFile(t);const o=[];if(t.insertCanonicalLink=!0,!t.saveRawPage){if(!t.removeFrames&&e&&globalThis.frames&&globalThis.frames.length){let n;n=t.loadDeferredImages?new Promise((n=>setTimeout((()=>n(e.getAsync(t))),t.loadDeferredImagesMaxIdleTime-e.TIMEOUT_INIT_REQUEST_MESSAGE))):e.getAsync(t),function(t){U("load-frames",b,"…",t)}(t),n.then((()=>{H.cancelled||function(t){U("load-frames",b,"✓",t)}(t)})),o.push(n)}if(t.loadDeferredImages){const e=z.processors.lazy.process(t);!function(t){U("load-deferred-images",w,"…",t)}(t),e.then((()=>{H.cancelled||function(t){U("load-deferred-images",w,"✓",t)}(t)})),o.push(e)}}let r=0,a=0;t.onprogress=e=>{H.cancelled||(e.type==e.RESOURCES_INITIALIZED&&(a=e.detail.max,t.loadDeferredImages&&z.processors.lazy.resetZoomLevel(t)),e.type==e.RESOURCES_INITIALIZED||e.type==e.RESOURCE_LOADED?(e.type==e.RESOURCE_LOADED&&r++,browser.runtime.sendMessage({method:"ui.processProgress",index:r,maxIndex:a}),R(r,a,t)):e.detail.frame||e.type==e.PAGE_LOADING||e.type==e.PAGE_LOADED||(e.type==e.STAGE_STARTED?e.detail.step<3&&function(t,e){U("step-"+t,`${v} ${t+1} / 3`,"…",e)}(e.detail.step,t):e.type==e.STAGE_ENDED?e.detail.step<3&&function(t,e){U("step-"+t,`${v} ${t+1} / 3`,"✓",e)}(e.detail.step,t):(e.type==e.STAGE_TASK_STARTED||e.type==e.STAGE_TASK_ENDED)&&(e.detail.step,e.detail.task)))},[t.frames]=await new Promise((t=>{const e=Promise.all(o),n=H.cancel.bind(H);H.cancel=function(){n(),t([[]])},e.then((()=>t(e)))})),n=t.frames&&t.frames.sessionId;const s=t.frames&&t.frames.find((t=>t.requestedFrame));t.win=globalThis,s?(t.content=s.content,t.url=s.baseURI,t.canvases=s.canvases,t.fonts=s.fonts,t.stylesheets=s.stylesheets,t.images=s.images,t.posters=s.posters,t.usedFonts=s.usedFonts,t.shadowRoots=s.shadowRoots,t.imports=s.imports):t.doc=document;H.cancelled||await H.run();n&&e.cleanup(n);let l;H.cancelled||(t.confirmInfobarContent&&(t.infobarContent=P("Infobar content",t.infobarContent)||""),l=await H.getPageData(),(t.selected||t.optionallySelected)&&document.querySelectorAll("["+i+"]").forEach((t=>t.removeAttribute(i))),L(),t.displayStats&&(console.log("SingleFile stats"),console.table(l.stats)));return l}(n);t&&((!n.backgroundSave&&!n.saveToClipboard||n.saveToGDrive)&&n.confirmFilename&&(t.filename=P("Save as",t.filename)||t.filename),await e(t,n))}catch(t){H.cancelled||(console.error(t),browser.runtime.sendMessage({method:"ui.processError",error:t}))}}else browser.runtime.sendMessage({method:"ui.processCancelled"});j=!1,G&&(G.pageInfo.processing=!1)}}(t),{};if("content.cancelSave"==t.method)return H&&(H.cancel(),L(),browser.runtime.sendMessage({method:"ui.processCancelled"})),t.options.loadDeferredImages&&z.processors.lazy.resetZoomLevel(t.options),{};if("content.getSelectedLinks"==t.method)return{urls:I()}}}(t)}))}();