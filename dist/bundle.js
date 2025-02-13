(function () {
  'use strict';

  function _assertThisInitialized(e) {
    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
  }
  function _classCallCheck(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
  }
  function _construct(t, e, r) {
    if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments);
    var o = [null];
    o.push.apply(o, e);
    var p = new (t.bind.apply(t, o))();
    return r && _setPrototypeOf(p, r.prototype), p;
  }
  function _defineProperties(e, r) {
    for (var t = 0; t < r.length; t++) {
      var o = r[t];
      o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
    }
  }
  function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
      writable: !1
    }), e;
  }
  function _createSuper(t) {
    var r = _isNativeReflectConstruct();
    return function () {
      var e,
        o = _getPrototypeOf(t);
      if (r) {
        var s = _getPrototypeOf(this).constructor;
        e = Reflect.construct(o, arguments, s);
      } else e = o.apply(this, arguments);
      return _possibleConstructorReturn(this, e);
    };
  }
  function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
      value: t,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[r] = t, e;
  }
  function _getPrototypeOf(t) {
    return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
      return t.__proto__ || Object.getPrototypeOf(t);
    }, _getPrototypeOf(t);
  }
  function _inherits(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
    t.prototype = Object.create(e && e.prototype, {
      constructor: {
        value: t,
        writable: !0,
        configurable: !0
      }
    }), Object.defineProperty(t, "prototype", {
      writable: !1
    }), e && _setPrototypeOf(t, e);
  }
  function _isNativeFunction(t) {
    try {
      return -1 !== Function.toString.call(t).indexOf("[native code]");
    } catch (n) {
      return "function" == typeof t;
    }
  }
  function _isNativeReflectConstruct() {
    try {
      var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    } catch (t) {}
    return (_isNativeReflectConstruct = function () {
      return !!t;
    })();
  }
  function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread2(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
        _defineProperty(e, r, t[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
      });
    }
    return e;
  }
  function _possibleConstructorReturn(t, e) {
    if (e && ("object" == typeof e || "function" == typeof e)) return e;
    if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
    return _assertThisInitialized(t);
  }
  function _setPrototypeOf(t, e) {
    return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
      return t.__proto__ = e, t;
    }, _setPrototypeOf(t, e);
  }
  function _taggedTemplateLiteral(e, t) {
    return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, {
      raw: {
        value: Object.freeze(t)
      }
    }));
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }
  function _wrapNativeSuper(t) {
    var r = "function" == typeof Map ? new Map() : void 0;
    return _wrapNativeSuper = function (t) {
      if (null === t || !_isNativeFunction(t)) return t;
      if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function");
      if (void 0 !== r) {
        if (r.has(t)) return r.get(t);
        r.set(t, Wrapper);
      }
      function Wrapper() {
        return _construct(t, arguments, _getPrototypeOf(this).constructor);
      }
      return Wrapper.prototype = Object.create(t.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), _setPrototypeOf(Wrapper, t);
    }, _wrapNativeSuper(t);
  }

  var umap = _=>({get:key=>_.get(key),set:(key,value)=>(_.set(key,value),value)});

  const attr=/([^\s\\>"'=]+)\s*=\s*(['"]?)$/;const empty=/^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i;const node=/<[a-z][^>]+$/i;const notNode=/>[^<>]*$/;const selfClosing=/<([a-z]+[a-z0-9:._-]*)([^>]*?)(\/>)/ig;const trimEnd=/\s+$/;const isNode=(template,i)=>0<i--&&(node.test(template[i])||!notNode.test(template[i])&&isNode(template,i));const regular=(original,name,extra)=>empty.test(name)?original:`<${name}${extra.replace(trimEnd,"")}></${name}>`;var instrument = (template,prefix,svg)=>{const text=[];const{length}=template;for(let i=1;i<length;i++){const chunk=template[i-1];text.push(attr.test(chunk)&&isNode(template,i)?chunk.replace(attr,(_,$1,$2)=>`${prefix}${i-1}=${$2||"\""}${$1}${$2?"":"\""}`):`${chunk}<!--${prefix}${i-1}-->`);}text.push(template[length-1]);const output=text.join("").trim();return svg?output:output.replace(selfClosing,regular)};

  const{isArray}=Array;const{indexOf,slice}=[];

  const ELEMENT_NODE=1;const nodeType=111;const remove=({firstChild,lastChild})=>{const range=document.createRange();range.setStartAfter(firstChild);range.setEndAfter(lastChild);range.deleteContents();return firstChild};const diffable=(node,operation)=>node.nodeType===nodeType?1/operation<0?operation?remove(node):node.lastChild:operation?node.valueOf():node.firstChild:node;const persistent=fragment=>{const{childNodes}=fragment;const{length}=childNodes;if(length<2)return length?childNodes[0]:fragment;const nodes=slice.call(childNodes,0);const firstChild=nodes[0];const lastChild=nodes[length-1];return {ELEMENT_NODE,nodeType,firstChild,lastChild,valueOf(){if(childNodes.length!==length){let i=0;while(i<length)fragment.appendChild(nodes[i++]);}return fragment}}};

  var udomdiff = (parentNode,a,b,get,before)=>{const bLength=b.length;let aEnd=a.length;let bEnd=bLength;let aStart=0;let bStart=0;let map=null;while(aStart<aEnd||bStart<bEnd){if(aEnd===aStart){const node=bEnd<bLength?bStart?get(b[bStart-1],-0).nextSibling:get(b[bEnd],0):before;while(bStart<bEnd)parentNode.insertBefore(get(b[bStart++],1),node);}else if(bEnd===bStart){while(aStart<aEnd){if(!map||!map.has(a[aStart]))parentNode.removeChild(get(a[aStart],-1));aStart++;}}else if(a[aStart]===b[bStart]){aStart++;bStart++;}else if(a[aEnd-1]===b[bEnd-1]){aEnd--;bEnd--;}else if(a[aStart]===b[bEnd-1]&&b[bStart]===a[aEnd-1]){const node=get(a[--aEnd],-0).nextSibling;parentNode.insertBefore(get(b[bStart++],1),get(a[aStart++],-0).nextSibling);parentNode.insertBefore(get(b[--bEnd],1),node);a[aEnd]=b[bEnd];}else {if(!map){map=new Map;let i=bStart;while(i<bEnd)map.set(b[i],i++);}if(map.has(a[aStart])){const index=map.get(a[aStart]);if(bStart<index&&index<bEnd){let i=aStart;let sequence=1;while(++i<aEnd&&i<bEnd&&map.get(a[i])===index+sequence)sequence++;if(sequence>index-bStart){const node=get(a[aStart],0);while(bStart<index)parentNode.insertBefore(get(b[bStart++],1),node);}else {parentNode.replaceChild(get(b[bStart++],1),get(a[aStart++],-1));}}else aStart++;}else parentNode.removeChild(get(a[aStart++],-1));}}return b};

  const aria=node=>values=>{for(const key in values){const name=key==="role"?key:`aria-${key}`;const value=values[key];if(value==null)node.removeAttribute(name);else node.setAttribute(name,value);}};const attribute=(node,name)=>{let oldValue,orphan=true;const attributeNode=document.createAttributeNS(null,name);return newValue=>{if(oldValue!==newValue){oldValue=newValue;if(oldValue==null){if(!orphan){node.removeAttributeNode(attributeNode);orphan=true;}}else {const value=newValue;if(value==null){if(!orphan)node.removeAttributeNode(attributeNode);orphan=true;}else {attributeNode.value=value;if(orphan){node.setAttributeNodeNS(attributeNode);orphan=false;}}}}}};const boolean=(node,key,oldValue)=>newValue=>{if(oldValue!==!!newValue){if(oldValue=!!newValue)node.setAttribute(key,"");else node.removeAttribute(key);}};const data=({dataset})=>values=>{for(const key in values){const value=values[key];if(value==null)delete dataset[key];else dataset[key]=value;}};const event=(node,name)=>{let oldValue,lower,type=name.slice(2);if(!(name in node)&&(lower=name.toLowerCase())in node)type=lower.slice(2);return newValue=>{const info=isArray(newValue)?newValue:[newValue,false];if(oldValue!==info[0]){if(oldValue)node.removeEventListener(type,oldValue,info[1]);if(oldValue=info[0])node.addEventListener(type,oldValue,info[1]);}}};const ref=node=>{let oldValue;return value=>{if(oldValue!==value){oldValue=value;if(typeof value==="function")value(node);else value.current=node;}}};const setter=(node,key)=>key==="dataset"?data(node):value=>{node[key]=value;};const text=node=>{let oldValue;return newValue=>{if(oldValue!=newValue){oldValue=newValue;node.textContent=newValue==null?"":newValue;}}};

  const reducePath=({childNodes},i)=>childNodes[i];const diff=(comment,oldNodes,newNodes)=>udomdiff(comment.parentNode,oldNodes,newNodes,diffable,comment);const handleAnything=comment=>{let oldValue,text,nodes=[];const anyContent=newValue=>{switch(typeof newValue){case"string":case"number":case"boolean":if(oldValue!==newValue){oldValue=newValue;if(!text)text=document.createTextNode("");text.data=newValue;nodes=diff(comment,nodes,[text]);}break;case"object":case"undefined":if(newValue==null){if(oldValue!=newValue){oldValue=newValue;nodes=diff(comment,nodes,[]);}break}if(isArray(newValue)){oldValue=newValue;if(newValue.length===0)nodes=diff(comment,nodes,[]);else if(typeof newValue[0]==="object")nodes=diff(comment,nodes,newValue);else anyContent(String(newValue));break}if(oldValue!==newValue&&"ELEMENT_NODE"in newValue){oldValue=newValue;nodes=diff(comment,nodes,newValue.nodeType===11?slice.call(newValue.childNodes):[newValue]);}break;case"function":anyContent(newValue(comment));break}};return anyContent};const handleAttribute=(node,name)=>{switch(name[0]){case"?":return boolean(node,name.slice(1),false);case".":return setter(node,name.slice(1));case"@":return event(node,"on"+name.slice(1));case"o":if(name[1]==="n")return event(node,name)}switch(name){case"ref":return ref(node);case"aria":return aria(node)}return attribute(node,name)};function handlers(options){const{type,path}=options;const node=path.reduceRight(reducePath,this);return type==="node"?handleAnything(node):type==="attr"?handleAttribute(node,options.name):text(node)}

  var createContent=function(document){var FRAGMENT="fragment";var TEMPLATE="template";var HAS_CONTENT="content"in create(TEMPLATE);var createHTML=HAS_CONTENT?function(html){var template=create(TEMPLATE);template.innerHTML=html;return template.content}:function(html){var content=create(FRAGMENT);var template=create(TEMPLATE);var childNodes=null;if(/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(html)){var selector=RegExp.$1;template.innerHTML="<table>"+html+"</table>";childNodes=template.querySelectorAll(selector);}else {template.innerHTML=html;childNodes=template.childNodes;}append(content,childNodes);return content};return function createContent(markup,type){return (type==="svg"?createSVG:createHTML)(markup)};function append(root,childNodes){var length=childNodes.length;while(length--)root.appendChild(childNodes[0]);}function create(element){return element===FRAGMENT?document.createDocumentFragment():document.createElementNS("http://www.w3.org/1999/xhtml",element)}function createSVG(svg){var content=create(FRAGMENT);var template=create("div");template.innerHTML="<svg xmlns=\"http://www.w3.org/2000/svg\">"+svg+"</svg>";append(content,template.firstChild.childNodes);return content}}(document);

  const isImportNodeLengthWrong=document.importNode.length!=1;const createFragment=isImportNodeLengthWrong?(text,type,normalize)=>document.importNode(createContent(text,type,normalize),true):createContent;const createWalker=isImportNodeLengthWrong?fragment=>document.createTreeWalker(fragment,1|128,null,false):fragment=>document.createTreeWalker(fragment,1|128);

  const createPath=node=>{const path=[];let{parentNode}=node;while(parentNode){path.push(indexOf.call(parentNode.childNodes,node));node=parentNode;parentNode=node.parentNode;}return path};const prefix="is\xB5";const cache=umap(new WeakMap);const textOnly=/^(?:plaintext|script|style|textarea|title|xmp)$/i;const createCache=()=>({stack:[],entry:null,wire:null});const createEntry=(type,template)=>{const{content,updates}=mapUpdates(type,template);return {type,template,content,updates,wire:null}};const mapTemplate=(type,template)=>{const text=instrument(template,prefix,type==="svg");const content=createFragment(text,type);const tw=createWalker(content);const nodes=[];const length=template.length-1;let i=0;let search=`${prefix}${i}`;while(i<length){const node=tw.nextNode();if(!node)throw `bad template: ${text}`;if(node.nodeType===8){if(node.data===search){nodes.push({type:"node",path:createPath(node)});search=`${prefix}${++i}`;}}else {while(node.hasAttribute(search)){nodes.push({type:"attr",path:createPath(node),name:node.getAttribute(search)});node.removeAttribute(search);search=`${prefix}${++i}`;}if(textOnly.test(node.tagName)&&node.textContent.trim()===`<!--${search}-->`){node.textContent="";nodes.push({type:"text",path:createPath(node)});search=`${prefix}${++i}`;}}}return {content,nodes}};const mapUpdates=(type,template)=>{const{content,nodes}=cache.get(template)||cache.set(template,mapTemplate(type,template));const fragment=document.importNode(content,true);const updates=nodes.map(handlers,fragment);return {content:fragment,updates}};const unroll=(info,{type,template,values})=>{const{length}=values;unrollValues(info,values,length);let{entry}=info;if(!entry||entry.template!==template||entry.type!==type)info.entry=entry=createEntry(type,template);const{content,updates,wire}=entry;for(let i=0;i<length;i++)updates[i](values[i]);return wire||(entry.wire=persistent(content))};const unrollValues=({stack},values,length)=>{for(let i=0;i<length;i++){const hole=values[i];if(hole instanceof Hole)values[i]=unroll(stack[i]||(stack[i]=createCache()),hole);else if(isArray(hole))unrollValues(stack[i]||(stack[i]=createCache()),hole,hole.length);else stack[i]=null;}if(length<stack.length)stack.splice(length);};function Hole(type,template,values){this.type=type;this.template=template;this.values=values;}

  const{create,defineProperties}=Object;const tag=type=>{const keyed=umap(new WeakMap);const fixed=cache=>(template,...values)=>unroll(cache,{type,template,values});return defineProperties((template,...values)=>new Hole(type,template,values),{for:{value(ref,id){const memo=keyed.get(ref)||keyed.set(ref,create(null));return memo[id]||(memo[id]=fixed(createCache()))}},node:{value:(template,...values)=>unroll(createCache(),{type,template,values}).valueOf()}})};const cache$1=umap(new WeakMap);const render=(where,what)=>{const hole=typeof what==="function"?what():what;const info=cache$1.get(where)||cache$1.set(where,createCache());const wire=hole instanceof Hole?unroll(info,hole):hole;if(wire!==info.wire){info.wire=wire;where.textContent="";where.appendChild(wire.valueOf());}return where};const html=tag("html");const svg=tag("svg");

  var saveDataLocal=function saveDataLocal(data,key){if(typeof data!=="string"){data=JSON.stringify(data);}localStorage.setItem(key,data);};var loadLocalStorage=function loadLocalStorage(key){var data=localStorage.getItem(key);if(data){data=JSON.parse(data);}return data};

  var uuidv4=function uuidv4(){return "10000000-1000-4000-8000-100000000000".replace(/[018]/g,function(c){return (+c^crypto.getRandomValues(new Uint8Array(1))[0]&15>>+c/4).toString(16)})};

  var store=function(){var state={};return {addStore:function addStore(storeName){if(state[storeName]===undefined){state=_objectSpread2(_defineProperty({},storeName,{name:storeName,items:[]}),state);}else {throw new Error("Store j\xE1 existe.")}},getItems:function getItems(storeName){var storeLocal=loadLocalStorage(storeName);if(storeLocal!==null){state=_objectSpread2(_objectSpread2({},state),{},_defineProperty({},storeName,storeLocal));return storeLocal["items"]}else {var _store=state[storeName];if(_store!==undefined){return _store.items}else {throw new Error("Store n\xE3o existe.")}}},clear:function clear(storeName){var store=state[storeName];if(store!==undefined){store.items=[];saveDataLocal(store,storeName);window.dispatchEvent(new CustomEvent(STORE_CLEARED,{detail:{store:storeName}}));}else {throw new Error("Store n\xE3o existe.")}},addItem:function addItem(storeName,item){var store=state[storeName];if(store!==undefined){item.id=uuidv4();store.items.push(item);saveDataLocal(store,storeName);window.dispatchEvent(new CustomEvent(STORE_ADDED_ITEM,{detail:{store:storeName,item:item,items:store.items}}));}else {throw new Error("Store n\xE3o existe.")}},removeItemById:function removeItemById(storeName,itemId){var store=state[storeName];var item;if(store!==undefined){for(var i=0;i<store.items.length;i++){item=store.items[i];if(item.id===itemId){store.items.splice(i,1);saveDataLocal(store,storeName);window.dispatchEvent(new CustomEvent(STORE_REMOVED_ITEM,{detail:{store:storeName,item:item,items:store.items}}));}}}else {throw new Error("Store n\xE3o existe.")}},onAddedItem:function onAddedItem(storeName,func){window.addEventListener(STORE_ADDED_ITEM,function(e){if(e.detail.store!==storeName){return}func(e);});},onRemovedItem:function onRemovedItem(storeName,func){window.addEventListener(STORE_REMOVED_ITEM,function(e){if(e.detail.store!==storeName){return}func(e);});},onCleared:function onCleared(storeName,func){window.addEventListener(STORE_CLEARED,function(e){if(e.detail.store!==storeName){return}func(e);});}}}();var STORE_ADDED_ITEM="STORE_ADDED_ITEM";var STORE_REMOVED_ITEM="STORE_REMOVED_ITEM";var STORE_CLEARED="STORE_CLEARED";

  var INGREDIENTES_STORE="INGREDIENTES_STORE";var CARDAPIO_STORE="CARDAPIO_STORE";(function(){store.addStore(INGREDIENTES_STORE);store.addStore(CARDAPIO_STORE);})();

  var timedoutshowMessage=0;var removeWindow=function removeWindow(){var msgWindow=document.getElementById("msgWindow");if(msgWindow){msgWindow.remove();}var main=document.getElementById("main");if(main){main.classList.remove("blur");}};var createWindow=function createWindow(type){var win=document.getElementById("msgWindow");if(win!==null){win.remove();clearTimeout(timedoutshowMessage);}var msgWindow=document.createElement("div");msgWindow.id="msgWindow";msgWindow.classList.add("alert");msgWindow.classList.add(type);var body=document.getElementsByTagName("body");body[0].appendChild(msgWindow);var element=document.getElementById("main");if(element){element.classList.add("blur");}return msgWindow};var showMessage=function showMessage(msg,type){var msgWindow=createWindow(type);var msgNode=document.createTextNode(msg);msgWindow.appendChild(msgNode);timedoutshowMessage=setTimeout(function(){removeWindow();},msg.length*150);};var showConfirm=function showConfirm(msg,callback){var msgWindow=createWindow("warning");var msgNode=document.createTextNode(msg);msgWindow.appendChild(msgNode);var barActions=document.createElement("div");barActions.classList.add("bar-actions");msgWindow.appendChild(barActions);var btnConfirm=document.createElement("button");btnConfirm.innerText="Ok";btnConfirm.classList.add("btn-ok");btnConfirm.onclick=function(){removeWindow();callback();};barActions.appendChild(btnConfirm);var btnCancelar=document.createElement("button");btnCancelar.innerText="Cancelar";btnCancelar.classList.add("btn-cancelar");btnCancelar.classList.add("delay1");btnCancelar.onclick=function(){removeWindow();};barActions.appendChild(btnCancelar);};var showWarning=function showWarning(msg){showMessage(msg,"warning");};

  var produtoCalculo;var buscarProdutoPorId=function buscarProdutoPorId(idProduto){for(var i=0;i<listaAlimentos.length;i++){var produto=listaAlimentos[i];if(produto.id===idProduto){return produto}}return undefined};var calcularAlimento=function calcularAlimento(peso,idxResultado,idProduto){if(produtoCalculo===undefined||produtoCalculo.id!==idProduto){produtoCalculo=buscarProdutoPorId(idProduto);}var itemResultadoCalorias=document.getElementById("itemResultadoCalorias"+idxResultado);var itemResultadoProteinas=document.getElementById("itemResultadoProteinas"+idxResultado);if(peso!==""&&peso!==null&&!isNaN(parseFloat(peso))&&parseFloat(peso)>0&&produtoCalculo!==undefined){var pesoNum=parseFloat(peso);var proteinas=Math.round(pesoNum*produtoCalculo.proteina/100);var calorias=Math.round(pesoNum*produtoCalculo.calorias/100);if(itemResultadoCalorias!==null&&itemResultadoProteinas!==null){itemResultadoCalorias.innerHTML=calorias.toString();itemResultadoProteinas.innerHTML=proteinas.toString();}}else {if(itemResultadoCalorias!==null&&itemResultadoProteinas!==null){itemResultadoCalorias.innerHTML="-";itemResultadoProteinas.innerHTML="-";}}};var adicionarCalculo=function adicionarCalculo(idxResultado,idProduto){try{var elementPeso=document.getElementById("itemResultadoPeso"+idxResultado);var pesoValue=parseFloat(elementPeso===null?"":elementPeso.value);if(isNaN(pesoValue)){throw new Error("Informe o peso do ingrediente.")}if(pesoValue<=0){throw new Error("Peso deve ser maior que zero.")}var produto=buscarProdutoPorId(idProduto);var elementCaloria=document.getElementById("itemResultadoCalorias"+idxResultado);var elementProteina=document.getElementById("itemResultadoProteinas"+idxResultado);var caloriasValue=parseFloat(elementCaloria.innerText);var proteinasValue=parseFloat(elementProteina.innerText);if(produto!==undefined){store.addItem(INGREDIENTES_STORE,{"nome":produto.nome,"calorias":caloriasValue,"proteinas":proteinasValue,"peso":pesoValue,"unidade":produto.unidade});}}catch(e){showWarning(e.message);}};

  var Base=function(_HTMLElement){_inherits(Base,_HTMLElement);var _super=_createSuper(Base);function Base(){_classCallCheck(this,Base);return _super.call(this)}_createClass(Base,[{key:"p",value:function p(prop){var value=this.getAttribute(prop);if(value!==null){if(isNaN(parseFloat(value))){return value}else {return parseFloat(value)}}}}]);return Base}(_wrapNativeSuper(HTMLElement));

  var _templateObject;var PesquisaItem=function(_Base){_inherits(PesquisaItem,_Base);var _super=_createSuper(PesquisaItem);function PesquisaItem(){var _this;_classCallCheck(this,PesquisaItem);_this=_super.call(this);_defineProperty(_assertThisInitialized(_this),"props",void 0);return _this}_createClass(PesquisaItem,[{key:"attributeChangedCallback",value:function attributeChangedCallback(name,oldValue,newValue){console.log("Attribute ".concat(name," has changed."));}},{key:"connectedCallback",value:function connectedCallback(){var _this2=this;this.props={idx:this.p("idx"),id:this.p("id"),nome:this.p("nome"),unidade:this.p("unidade"),peso:this.p("peso"),calorias:this.p("calorias")};var className="listItem filtro delay".concat(this.props.idx);var idItemResultadoCalorias="itemResultadoCalorias".concat(this.props.idx);var idItemResultadoProteinas="itemResultadoProteinas".concat(this.props.idx);var idItemResultadoPeso="itemResultadoPeso".concat(this.props.idx);var unidade=this.props.unidade?this.props.unidade:"g";render(this,html(_templateObject||(_templateObject=_taggedTemplateLiteral(["\n            <link rel=\"stylesheet\" href=\"css/animations.delay.css\" crossorigin=\"\" />\n            <!-- <link rel=\"stylesheet\" href=\"css/components/pesquisa-item.css\" crossorigin=\"\" />   -->\n\n        <div class=",">\n            <div class='title'> "," <div><span>","</span> cal por <span> 100 ","</span></div></div> \n            <div class='actions'>\n                <input type='number' id="," style='width: 85px;height: 40px;' placeholder='peso' oninput="," />\n                <div class='action'><b>Calorias</b><div id=",">-</div></div>\n                <div class='action'><b>Prote\xEDnas</b><div id=",">-</div></div>\n                <button class='btn-selecionar' onclick=","> Selecionar </button>\n            </div>\n        </div>\n\n        <style>\n            .listItem .title {\n                color: var(--primary-color);\n                border-bottom-color: var(--border-color);\n            }\n\n            .listItem .title div {\n                color: var(--destaque-color);\n            }\n\n            .listItem .title div span {\n                color: var(--secondary-color);\n            }\n\n            .listItem {\n                display: flex;\n                position: relative;\n                justify-content: flex-start;\n                align-items: stretch;\n                flex-direction: column;\n                padding-bottom: 8px;\n\n                padding: 15px;\n                border-radius: 21px;\n\n                transition: all 0.3s ease-in-out;\n                animation-name: slide-in;\n                animation-timing-function: ease-in-out;\n                animation-duration: 0.5s;\n            }\n\n            @keyframes slide-in {\n                from {\n                    translate: 0 10vw;\n                    /* scale: 50% 1; */\n                    opacity: 0; \n                }\n\n                to {\n                    translate: 0 0;\n                    /* scale: 100% 1; */\n                    opacity: 1;\n                }\n            }\n\n           \n            </style>\n        \n        "])),className,this.props.nome,this.props.calorias,unidade,idItemResultadoPeso,function(e){return calcularAlimento(e.currentTarget.value,_this2.props.idx,_this2.props.id)},idItemResultadoCalorias,idItemResultadoProteinas,function(){return adicionarCalculo(_this2.props.idx,_this2.props.id)}));}}]);return PesquisaItem}(Base);window.customElements.define("app-pesquisa-alimento-item",PesquisaItem);

  var isNullOrEmpty=function isNullOrEmpty(obj){if(obj===undefined||obj===null||obj===""){return true}else {return false}};var removeCarecEspec=function removeCarecEspec(str){if(isNullOrEmpty(str)){throw new Error("Par\xE2metro vazio ao remover os caracteres especiais.")}return str.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase()};

  var _templateObject$1,_templateObject2;var PesquisaAlimento=function(_Base){_inherits(PesquisaAlimento,_Base);var _super=_createSuper(PesquisaAlimento);function PesquisaAlimento(){var _this;_classCallCheck(this,PesquisaAlimento);_this=_super.call(this);_defineProperty(_assertThisInitialized(_this),"props",void 0);_defineProperty(_assertThisInitialized(_this),"resultList",[]);store.onAddedItem(INGREDIENTES_STORE,function(e){var ele=_this.querySelector("#txtPesquisa");ele.value="";_this.resultList=[];_this.render();});return _this}_createClass(PesquisaAlimento,[{key:"txtPequisaAlterado",value:function txtPequisaAlterado(target){this.resultList=[];this.render();var values=target.value.toLowerCase().split(" ");for(var i=0;i<listaAlimentos.length;i++){if(this.resultList.length<20){var nome=listaAlimentos[i].nome;nome=removeCarecEspec(nome);var cont=0;for(var s=0;s<values.length;s++){if(nome.indexOf(values[s])>-1){cont++;}}if(cont===values.length){this.resultList.push(listaAlimentos[i]);}}}this.render();}},{key:"attributeChangedCallback",value:function attributeChangedCallback(name,oldValue,newValue){console.log("Attribute ".concat(name," has changed."));}},{key:"connectedCallback",value:function connectedCallback(){this.props={idx:this.p("idx"),id:this.p("id")};this.render();}},{key:"render",value:function render$1(){var _this2=this;render(this,html(_templateObject$1||(_templateObject$1=_taggedTemplateLiteral(["\n\n            <style>\n                </style>\n                <label>Digite o nome do alimento</label>\n                <input type=\"text\" class=\"textForm\" id=\"txtPesquisa\" oninput="," />  \n                ","\n           "])),function(e){return _this2.txtPequisaAlterado(e.currentTarget)},this.resultList.map(function(item,idx){return html(_templateObject2||(_templateObject2=_taggedTemplateLiteral(["<app-pesquisa-alimento-item \n                                nome=","\n                                id=","\n                                idx=","\n                                calorias=","\n                                unidade="," />"])),item.nome,item.id,idx,item.calorias,item.unidade)})));}}]);return PesquisaAlimento}(Base);window.customElements.define("app-pesquisa-alimento",PesquisaAlimento);

  var getRadiosCheck=function getRadiosCheck(id){var field=document.querySelector("input[name="+id+"]:checked");if(field!==null){return field.value}else {return null}};function getTab(tabId){var tabs=document.getElementsByClassName("tab");for(var i=0;i<tabs.length;i++){if(tabs[i].id===tabId){return tabs[i]}}}function closeForm(tabId){var tab=getTab(tabId);if(isNullOrEmpty(tab)){return}if(tab!==undefined&&tab.classList.contains("open")){tab.classList.remove("open");tab.style.height=(tab.children[1].clientHeight+60).toString();setTimeout(function(){tab.style.height=42 .toString();tab.classList.add("close");},150);}}function openForm(tabId){var tab=getTab(tabId);if(isNullOrEmpty(tab)){return}var newHeight=tab.children[1].clientHeight;setTimeout(function(){tab.style.height=newHeight.toString();tab.classList.add("open");tab.classList.remove("close");setTimeout(function(){tab.style.height="auto";},250);},150);}

  var _templateObject$2,_templateObject2$1,_templateObject3,_templateObject4;var IngredientesSelecionados=function(_Base){_inherits(IngredientesSelecionados,_Base);var _super=_createSuper(IngredientesSelecionados);function IngredientesSelecionados(){var _this;_classCallCheck(this,IngredientesSelecionados);_this=_super.call(this);_defineProperty(_assertThisInitialized(_this),"props",void 0);_defineProperty(_assertThisInitialized(_this),"listaIngredientes",[]);store.onAddedItem(INGREDIENTES_STORE,function(e){_this.listaIngredientes=e.detail.items;_this.render();});store.onRemovedItem(INGREDIENTES_STORE,function(e){if(e.detail.items.length===0){_this.listaIngredientes=[];render(_assertThisInitialized(_this),html(_templateObject$2||(_templateObject$2=_taggedTemplateLiteral([""]))));}else {_this.listaIngredientes=e.detail.items;_this.render();}});store.onCleared(INGREDIENTES_STORE,function(e){_this.listaIngredientes=[];render(_assertThisInitialized(_this),html(_templateObject2$1||(_templateObject2$1=_taggedTemplateLiteral([""]))));});return _this}_createClass(IngredientesSelecionados,[{key:"connectedCallback",value:function connectedCallback(){this.props={idx:this.p("idx"),id:this.p("id")};this.listaIngredientes=store.getItems(INGREDIENTES_STORE);if(this.listaIngredientes.length>0){this.render();}}},{key:"render",value:function render$1(){var _this2=this;var totalCalorias=0;var totalProteinas=0;var totalPeso=0;var items=[];for(var i=0;i<this.listaIngredientes.length;i++){var itemCalculo=this.listaIngredientes[i];var unidade=this.listaIngredientes[i].unidade===undefined?"g":this.listaIngredientes[i].unidade;var itemClass="item delay"+i;items.push(html(_templateObject3||(_templateObject3=_taggedTemplateLiteral(["<div class=","> <b> "," </b> "," calorias e "," prote\xEDnas em "," ","\n                <button class='btn-remove' onclick=","> x </button>\n                </div>"])),itemClass,itemCalculo.nome,itemCalculo.calorias,itemCalculo.proteinas,itemCalculo.peso,unidade,function(){return _this2.removerCalculo(itemCalculo.id)}));totalCalorias+=itemCalculo.calorias;totalProteinas+=itemCalculo.proteinas;totalPeso+=itemCalculo.peso;}render(this,html(_templateObject4||(_templateObject4=_taggedTemplateLiteral(["<div class='list selecionados'>\n            <div class='title'>Ingredientes selecionados</div>\n                    ","\n            <div class='cols total'>\n                <div>Calorias <span class='text'> "," </span></div>\n                <div>Prote\xEDnas <span class='text'>"," </span></div>\n                <div>Peso <span class='text'>"," </span></div>\n            </div>\n                    <div class='cols bar-add-ingredientes'>\n                        <div class='options'>\n                            <label><input type=\"radio\" name=\"inputTipoCardapio\" value=\"CA\" /> Caf\xE9 da manh\xE3/tarde </label>\n                            <label><input type=\"radio\" name=\"inputTipoCardapio\" value=\"AJ\" /> Almo\xE7o/Jantar </label>\n                            <label><input type=\"radio\" name=\"inputTipoCardapio\" value=\"LC\" /> Lanches </label>\n                            <label><input type=\"radio\" name=\"inputTipoCardapio\" value=\"SM\" /> Sobremesas </label>\n                        </div>\n                        <div><button class='btn-main' onclick=","> Adicionar ao card\xE1pio </button></div>\n                    </div>\n            </div>\n      "])),items.map(function(item){return item}),totalCalorias,totalProteinas,totalPeso,function(){return _this2.adicionarItemCardapio()}));}},{key:"adicionarItemCardapio",value:function adicionarItemCardapio(){try{if(this.listaIngredientes.length>0){var nomeItemCardapio="";var tipoItemCardapio=getRadiosCheck("inputTipoCardapio");if(tipoItemCardapio===null){throw new Error("Selecione o tipo.")}var totalCalorias=0;var totalProteinas=0;var totalPeso=0;for(var i=0;i<this.listaIngredientes.length;i++){var itemCalculo=this.listaIngredientes[i];if(i===0){nomeItemCardapio+=itemCalculo.nome;}else if(i===this.listaIngredientes.length-1){nomeItemCardapio+=" e "+itemCalculo.nome.toLowerCase();}else {nomeItemCardapio+=", "+itemCalculo.nome.toLowerCase();}totalCalorias+=itemCalculo.calorias;totalProteinas+=itemCalculo.proteinas;totalPeso+=itemCalculo.peso;}var itemCardapio={"id":uuidv4(),"nome":nomeItemCardapio,"tipo":tipoItemCardapio,"calorias":totalCalorias,"proteinas":totalProteinas,"peso":totalPeso,"itens":this.listaIngredientes,"created":new Date};store.addItem(CARDAPIO_STORE,itemCardapio);this.reiniciarListaIngredientes();closeForm("tabHomeCalculadora");openForm("tabHomeCardapio");}}catch(e){showWarning(e.message);}}},{key:"removerCalculo",value:function removerCalculo(id){store.removeItemById(INGREDIENTES_STORE,id);}},{key:"reiniciarListaIngredientes",value:function reiniciarListaIngredientes(){store.clear(INGREDIENTES_STORE);}}]);return IngredientesSelecionados}(Base);window.customElements.define("app-ingredientes-selecionados",IngredientesSelecionados);

  var _templateObject$3,_templateObject2$2,_templateObject3$1,_templateObject4$1,_templateObject5,_templateObject6,_templateObject7;var Cardapio=function(_Base){_inherits(Cardapio,_Base);var _super=_createSuper(Cardapio);function Cardapio(){var _this;_classCallCheck(this,Cardapio);_this=_super.call(this);_defineProperty(_assertThisInitialized(_this),"props",void 0);_defineProperty(_assertThisInitialized(_this),"list",[]);store.onAddedItem(CARDAPIO_STORE,function(e){console.log(e);_this.list=e.detail.items;_this.render();});store.onRemovedItem(CARDAPIO_STORE,function(e){console.log(e);_this.list=e.detail.items;_this.render();});return _this}_createClass(Cardapio,[{key:"attributeChangedCallback",value:function attributeChangedCallback(name,oldValue,newValue){console.log("Attribute ".concat(name," has changed."));}},{key:"connectedCallback",value:function connectedCallback(){this.props={idx:this.p("idx"),id:this.p("id")};this.list=store.getItems(CARDAPIO_STORE);this.render();}},{key:"removerItemCardapio",value:function removerItemCardapio(id){showConfirm("Voc\xEA tem certeza que deseja remover este item do seu card\xE1rio?",function(){store.removeItemById(CARDAPIO_STORE,id);});}},{key:"render",value:function render$1(){var _this2=this;var listCA=[];var listAJ=[];var listLC=[];var listSM=[];var _loop=function _loop(){var id=_this2.list[i].id;var h=html(_templateObject6||(_templateObject6=_taggedTemplateLiteral(["\n                <div class='listItem cardapio delay'>\n                   <div class='title'>","</div>\n                        ","\n                        \n                <div class='total'> Total de <span> "," g</span>, <span>"," calorias </span> e <span> ","g de prote\xEDnas</span>.</div>\n                <div class='actions right'>\n                <div class=\"btn-trash\" @click=","></div>\n                </div>\n                </div>"])),_this2.list[i].nome,_this2.list[i].itens.map(function(item,idx){var peso=item.peso===undefined?"100":item.peso;var unidade=item.unidade===undefined?"g":item.unidade;return html(_templateObject7||(_templateObject7=_taggedTemplateLiteral(["<div class='list mini'>\n                                            <div class='item mini'>\n                                                    - <span> ","  "," </span> de ","\n                                            </div>\n                                        </div>"])),peso,unidade,item.nome)}),_this2.list[i].peso,_this2.list[i].calorias,_this2.list[i].proteinas,function(){return _this2.removerItemCardapio(id)});switch(_this2.list[i].tipo){case"CA":listCA.push(h);break;case"AJ":listAJ.push(h);break;case"LC":listLC.push(h);break;case"SM":listSM.push(h);break}};for(var i=0;i<this.list.length;i++){_loop();}render(this,html(_templateObject$3||(_templateObject$3=_taggedTemplateLiteral(["\n            <style>\n                .text-intro {\n                    color: var(--destaque-color);\n                }\n                .total span{\n                    color: var(--secondary-color);\n                }\n                </style>\n            <h4>Caf\xE9 da manh\xE3/tarde</h4>\n            ","\n\n            <h4>Almo\xE7o/jantar</h4>\n            ","\n\n            <h4>Lanches</h4>\n            ","\n\n            <h4>Sobremesas</h4>\n            ","\n\n            "])),listCA.length===0?html(_templateObject2$2||(_templateObject2$2=_taggedTemplateLiteral(["<span class='text-intro'> Nenhum item adicionado nesta categoria. </span>"]))):listCA.map(function(item,idx){return item}),listAJ.length===0?html(_templateObject3$1||(_templateObject3$1=_taggedTemplateLiteral(["<span class='text-intro'> Nenhum item adicionado nesta categoria. </span>"]))):listAJ.map(function(item,idx){return item}),listLC.length===0?html(_templateObject4$1||(_templateObject4$1=_taggedTemplateLiteral(["<span class='text-intro'> Nenhum item adicionado nesta categoria. </span>"]))):listLC.map(function(item,idx){return item}),listSM.length===0?html(_templateObject5||(_templateObject5=_taggedTemplateLiteral(["<span class='text-intro'> Nenhum item adicionado nesta categoria. </span>"]))):listSM.map(function(item,idx){return item})));}}]);return Cardapio}(Base);window.customElements.define("app-cardapio",Cardapio);

}());
