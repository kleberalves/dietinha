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

  var _templateObject,_templateObject2;var Menu=function(_HTMLElement){_inherits(Menu,_HTMLElement);var _super=_createSuper(Menu);function Menu(){var _this;_classCallCheck(this,Menu);_this=_super.call(this);_defineProperty(_assertThisInitialized(_this),"shadow",void 0);_defineProperty(_assertThisInitialized(_this),"itemsLst",[]);_this.shadow=_this.attachShadow({mode:"closed"});return _this}_createClass(Menu,[{key:"addItem",value:function addItem(item){this.itemsLst.push(item);console.log(this.itemsLst);this.render();}},{key:"connectedCallback",value:function connectedCallback(){this.setAttribute("role","listbox");var itemsAttr=this.getAttribute("items");if(itemsAttr!==null&&itemsAttr!==undefined){this.itemsLst=JSON.parse(itemsAttr);}this.render();}},{key:"render",value:function render$1(){var itemsTemplate=[];for(var i=0;i<this.itemsLst.length;i++){itemsTemplate.push(html(_templateObject||(_templateObject=_taggedTemplateLiteral(["<ipp-menu-item>","</ipp-menu-item>"])),this.itemsLst[i]));}render(this.shadow,function(){return html(_templateObject2||(_templateObject2=_taggedTemplateLiteral([" \n          <style>\n          :host {\n            display: flex;\n            contain: content;\n            overflow-x: hidden;\n            overflow-y: auto;\n            border-radius: 10px;\n            max-width: 200px;\n            padding: 10px;\n            margin: 10px;\n            margin-top: 10px;\n            box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);\n            flex-direction: column;\n          }\n        </style>\n        ","\n        <slot>\n        </slot>\n      "])),itemsTemplate.map(function(value){return value}))});}}]);return Menu}(_wrapNativeSuper(HTMLElement));window.customElements.define("ipp-menu",Menu);

  var _templateObject$1;var MenuItem=function(_HTMLElement){_inherits(MenuItem,_HTMLElement);var _super=_createSuper(MenuItem);function MenuItem(){var _this;_classCallCheck(this,MenuItem);_this=_super.call(this);_defineProperty(_assertThisInitialized(_this),"shadow",void 0);_this.shadow=_this.attachShadow({mode:"open"});return _this}_createClass(MenuItem,[{key:"connectedCallback",value:function connectedCallback(){var template=html(_templateObject$1||(_templateObject$1=_taggedTemplateLiteral(["\n          <style>\n            :host {\n              border: 0px;\n              border-bottom: 1px solid #e9e9e9;\n              border-radius: 20px;\n              margin-bottom: 2px;\n              font-family: Arial;\n              font-size: 13px;\n              padding: 10px 0px;\n              padding-left: 12px;\n              cursor: pointer;\n            }\n            :host:hover{\n              opacity: 0.5;\n              backgroung-color: #f2f2f2;\n            }\n          </style>\n              <slot>\n              </slot>\n        "])));render(this.shadow,template);}}]);return MenuItem}(_wrapNativeSuper(HTMLElement));window.customElements.define("ipp-menu-item",MenuItem);

  var listaIngredientes=new Array;var outputListaAlimentos=document.querySelector("#outputListaAlimentos");var outputHistoricoCalculos=document.querySelector("#outputHistoricoCalculos");var buscarProdutoPorId=function buscarProdutoPorId(idProduto){for(var i=0;i<listaAlimentos.length;i++){var produto=listaAlimentos[i];if(produto.id===idProduto){return produto}}return null};var calcularCaloriaProduto=function calcularCaloriaProduto(dom,peso,idxResultado,idProduto){var itemResultadoCalorias=dom.getElementById("itemResultadoCalorias"+idxResultado);var itemResultadoProteinas=dom.getElementById("itemResultadoProteinas"+idxResultado);if(produtoCalculo.id!==idProduto){produtoCalculo=buscarProdutoPorId(idProduto);}if(peso!==""&&peso!==null&&!isNaN(parseFloat(peso))&&parseFloat(peso)>0){var pesoNum=parseFloat(peso);var proteinas=Math.round(pesoNum*produtoCalculo.proteina/100);var calorias=Math.round(pesoNum*produtoCalculo.calorias/100);if(itemResultadoCalorias!==null&&itemResultadoProteinas!==null){itemResultadoCalorias.innerHTML=calorias.toString();itemResultadoProteinas.innerHTML=proteinas.toString();}}else {if(itemResultadoCalorias!==null&&itemResultadoProteinas!==null){itemResultadoCalorias.innerHTML="-";itemResultadoProteinas.innerHTML="-";}}};var adicionarCalculo=function adicionarCalculo(dom,idxResultado,idProduto){try{var elementPeso=dom.getElementById("itemResultadoPeso"+idxResultado);var pesoValue=parseFloat(elementPeso===null?"":elementPeso.value);if(isNaN(pesoValue)){throw new Error("Informe o peso do ingrediente.")}if(pesoValue<=0){throw new Error("Peso deve ser maior que zero.")}var produto=buscarProdutoPorId(idProduto);var elementCaloria=dom.getElementById("itemResultadoCalorias"+idxResultado);var elementProteina=dom.getElementById("itemResultadoProteinas"+idxResultado);var caloriasValue=parseFloat(elementCaloria.innerText);var proteinasValue=parseFloat(elementProteina.innerText);listaIngredientes.push({"nome":produto.nome,"calorias":caloriasValue,"proteinas":proteinasValue,"peso":pesoValue,"unidade":produto.unidade});listaHistoricoCalculos();var ele=document.getElementById("txtPesquisa");ele.value="";outputListaAlimentos.innerHTML="";}catch(e){}};function listaHistoricoCalculos(){if(listaIngredientes.length===0){outputHistoricoCalculos.innerHTML="";}else {var strOutput="<div class='list selecionados'>";strOutput+="<div class='title'>Ingredientes selecionados</div>";var totalCalorias=0;var totalProteinas=0;var totalPeso=0;for(var i=0;i<listaIngredientes.length;i++){var itemCalculo=listaIngredientes[i];var unidade=listaIngredientes[i].unidade===undefined?"g":listaIngredientes[i].unidade;strOutput+="<div class='item delay"+i+"'><b>"+itemCalculo.nome+"</b> "+itemCalculo.calorias+" calorias e ";strOutput+=itemCalculo.proteinas+" prote\xEDnas em "+itemCalculo.peso+unidade;strOutput+="<button class='btn-remove' onclick='removerCalculo("+i+")'>x</button>";strOutput+="</div>";totalCalorias+=itemCalculo.calorias;totalProteinas+=itemCalculo.proteinas;totalPeso+=itemCalculo.peso;}strOutput+="<div class='cols total'>";strOutput+="  <div>Calorias <span class='text'>"+totalCalorias;strOutput+="  </span></div>";strOutput+="  <div>Prote\xEDnas <span class='text'>"+totalProteinas;strOutput+="  </span></div>";strOutput+="  <div>Peso <span class='text'>"+totalPeso;strOutput+="  </span></div>";strOutput+="</div>";strOutput+="<div class='cols bar-add-ingredientes'>";strOutput+="  <div class='options'>";strOutput+="      <label><input type=\"radio\" name=\"inputTipoCardapio\" value=\"CA\" /> Caf\xE9 da manh\xE3/tarde </label>";strOutput+="      <label><input type=\"radio\" name=\"inputTipoCardapio\" value=\"AJ\" /> Almo\xE7o/Jantar </label>";strOutput+="      <label><input type=\"radio\" name=\"inputTipoCardapio\" value=\"LC\" /> Lanches </label>";strOutput+="      <label><input type=\"radio\" name=\"inputTipoCardapio\" value=\"SM\" /> Sobremesas </label>";strOutput+="  </div>";strOutput+="  <div><button class='btn-main' onclick=\"adicionarItemCardapio()\"> Adicionar ao card\xE1pio </button></div>";strOutput+="</div>";strOutput+="</div>";outputHistoricoCalculos.innerHTML=strOutput;}}

  var Base=function(_HTMLElement){_inherits(Base,_HTMLElement);var _super=_createSuper(Base);function Base(){_classCallCheck(this,Base);return _super.call(this)}_createClass(Base,[{key:"getProp",value:function getProp(prop){var value=this.getAttribute(prop);if(value!==null){if(isNaN(parseFloat(value))){return value}else {return parseFloat(value)}}}}]);return Base}(_wrapNativeSuper(HTMLElement));

  var _templateObject$2;var PesquisaItem=function(_Base){_inherits(PesquisaItem,_Base);var _super=_createSuper(PesquisaItem);function PesquisaItem(){var _this;_classCallCheck(this,PesquisaItem);_this=_super.call(this);_defineProperty(_assertThisInitialized(_this),"shadow",void 0);_defineProperty(_assertThisInitialized(_this),"props",void 0);_this.shadow=_this.attachShadow({mode:"open"});return _this}_createClass(PesquisaItem,[{key:"connectedCallback",value:function connectedCallback(){var _this2=this;this.props={idx:this.getProp("idx"),id:this.getProp("id"),cont:this.getProp("cont"),nome:this.getProp("nome"),unidade:this.getProp("unidade"),peso:this.getProp("peso")};var className="listItem filtro delay".concat(this.props.cont);var idItemResultadoCalorias="itemResultadoCalorias".concat(this.props.idx);var idItemResultadoProteinas="itemResultadoProteinas".concat(this.props.idx);var idItemResultadoPeso="itemResultadoPeso".concat(this.props.idx);render(this.shadow,function(){return html(_templateObject$2||(_templateObject$2=_taggedTemplateLiteral([" \n              <link rel=\"stylesheet\" href=\"css/animations.delay.css\" crossorigin=\"\" />\n            <div class="," part=\"listItem\">\n            <div class='title' part=\"title\"> "," <div><span>","</span> cal por <span> "," ","</span></div></div> \n            <div class='actions'>\n                <input type='number' id="," style='width: 85px;height: 40px;' placeholder='peso' oninput="," />\n        \n            <div class='action'><b>Calorias</b><div id=",">-</div></div>\n            <div class='action'><b>Prote\xEDnas</b><div id=",">-</div></div>\n        \n            <button class='btn-selecionar' onclick=","> Selecionar </button></div>\n        </div>"])),className,_this2.props.nome,_this2.props.calorias,_this2.props.peso,_this2.props.unidade,idItemResultadoPeso,function(e){return calcularCaloriaProduto(_this2.shadow,e.currentTarget.value,_this2.props.idx,_this2.props.id)},idItemResultadoCalorias,idItemResultadoProteinas,adicionarCalculo(_this2.shadow,_this2.props.idx,_this2.props.id))});}}]);return PesquisaItem}(Base);window.customElements.define("ka-pesquisa-item",PesquisaItem);

}());
