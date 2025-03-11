(function () {
  'use strict';

  function _assertThisInitialized(e) {
    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
  }
  function asyncGeneratorStep(n, t, e, r, o, a, c) {
    try {
      var i = n[a](c),
        u = i.value;
    } catch (n) {
      return void e(n);
    }
    i.done ? t(u) : Promise.resolve(u).then(r, o);
  }
  function _asyncToGenerator(n) {
    return function () {
      var t = this,
        e = arguments;
      return new Promise(function (r, o) {
        var a = n.apply(t, e);
        function _next(n) {
          asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
        }
        function _throw(n) {
          asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
        }
        _next(void 0);
      });
    };
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
  function _regeneratorRuntime() {
    _regeneratorRuntime = function () {
      return e;
    };
    var t,
      e = {},
      r = Object.prototype,
      n = r.hasOwnProperty,
      o = Object.defineProperty || function (t, e, r) {
        t[e] = r.value;
      },
      i = "function" == typeof Symbol ? Symbol : {},
      a = i.iterator || "@@iterator",
      c = i.asyncIterator || "@@asyncIterator",
      u = i.toStringTag || "@@toStringTag";
    function define(t, e, r) {
      return Object.defineProperty(t, e, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }), t[e];
    }
    try {
      define({}, "");
    } catch (t) {
      define = function (t, e, r) {
        return t[e] = r;
      };
    }
    function wrap(t, e, r, n) {
      var i = e && e.prototype instanceof Generator ? e : Generator,
        a = Object.create(i.prototype),
        c = new Context(n || []);
      return o(a, "_invoke", {
        value: makeInvokeMethod(t, r, c)
      }), a;
    }
    function tryCatch(t, e, r) {
      try {
        return {
          type: "normal",
          arg: t.call(e, r)
        };
      } catch (t) {
        return {
          type: "throw",
          arg: t
        };
      }
    }
    e.wrap = wrap;
    var h = "suspendedStart",
      l = "suspendedYield",
      f = "executing",
      s = "completed",
      y = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    var p = {};
    define(p, a, function () {
      return this;
    });
    var d = Object.getPrototypeOf,
      v = d && d(d(values([])));
    v && v !== r && n.call(v, a) && (p = v);
    var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
    function defineIteratorMethods(t) {
      ["next", "throw", "return"].forEach(function (e) {
        define(t, e, function (t) {
          return this._invoke(e, t);
        });
      });
    }
    function AsyncIterator(t, e) {
      function invoke(r, o, i, a) {
        var c = tryCatch(t[r], t, o);
        if ("throw" !== c.type) {
          var u = c.arg,
            h = u.value;
          return h && "object" == typeof h && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
            invoke("next", t, i, a);
          }, function (t) {
            invoke("throw", t, i, a);
          }) : e.resolve(h).then(function (t) {
            u.value = t, i(u);
          }, function (t) {
            return invoke("throw", t, i, a);
          });
        }
        a(c.arg);
      }
      var r;
      o(this, "_invoke", {
        value: function (t, n) {
          function callInvokeWithMethodAndArg() {
            return new e(function (e, r) {
              invoke(t, n, e, r);
            });
          }
          return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
        }
      });
    }
    function makeInvokeMethod(e, r, n) {
      var o = h;
      return function (i, a) {
        if (o === f) throw Error("Generator is already running");
        if (o === s) {
          if ("throw" === i) throw a;
          return {
            value: t,
            done: !0
          };
        }
        for (n.method = i, n.arg = a;;) {
          var c = n.delegate;
          if (c) {
            var u = maybeInvokeDelegate(c, n);
            if (u) {
              if (u === y) continue;
              return u;
            }
          }
          if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
            if (o === h) throw o = s, n.arg;
            n.dispatchException(n.arg);
          } else "return" === n.method && n.abrupt("return", n.arg);
          o = f;
          var p = tryCatch(e, r, n);
          if ("normal" === p.type) {
            if (o = n.done ? s : l, p.arg === y) continue;
            return {
              value: p.arg,
              done: n.done
            };
          }
          "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
        }
      };
    }
    function maybeInvokeDelegate(e, r) {
      var n = r.method,
        o = e.iterator[n];
      if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
      var i = tryCatch(o, e.iterator, r.arg);
      if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
      var a = i.arg;
      return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
    }
    function pushTryEntry(t) {
      var e = {
        tryLoc: t[0]
      };
      1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
    }
    function resetTryEntry(t) {
      var e = t.completion || {};
      e.type = "normal", delete e.arg, t.completion = e;
    }
    function Context(t) {
      this.tryEntries = [{
        tryLoc: "root"
      }], t.forEach(pushTryEntry, this), this.reset(!0);
    }
    function values(e) {
      if (e || "" === e) {
        var r = e[a];
        if (r) return r.call(e);
        if ("function" == typeof e.next) return e;
        if (!isNaN(e.length)) {
          var o = -1,
            i = function next() {
              for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
              return next.value = t, next.done = !0, next;
            };
          return i.next = i;
        }
      }
      throw new TypeError(typeof e + " is not iterable");
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
      value: GeneratorFunctionPrototype,
      configurable: !0
    }), o(GeneratorFunctionPrototype, "constructor", {
      value: GeneratorFunction,
      configurable: !0
    }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
      var e = "function" == typeof t && t.constructor;
      return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
    }, e.mark = function (t) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
    }, e.awrap = function (t) {
      return {
        __await: t
      };
    }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
      return this;
    }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
      void 0 === i && (i = Promise);
      var a = new AsyncIterator(wrap(t, r, n, o), i);
      return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
        return t.done ? t.value : a.next();
      });
    }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
      return this;
    }), define(g, "toString", function () {
      return "[object Generator]";
    }), e.keys = function (t) {
      var e = Object(t),
        r = [];
      for (var n in e) r.push(n);
      return r.reverse(), function next() {
        for (; r.length;) {
          var t = r.pop();
          if (t in e) return next.value = t, next.done = !1, next;
        }
        return next.done = !0, next;
      };
    }, e.values = values, Context.prototype = {
      constructor: Context,
      reset: function (e) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
      },
      stop: function () {
        this.done = !0;
        var t = this.tryEntries[0].completion;
        if ("throw" === t.type) throw t.arg;
        return this.rval;
      },
      dispatchException: function (e) {
        if (this.done) throw e;
        var r = this;
        function handle(n, o) {
          return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
        }
        for (var o = this.tryEntries.length - 1; o >= 0; --o) {
          var i = this.tryEntries[o],
            a = i.completion;
          if ("root" === i.tryLoc) return handle("end");
          if (i.tryLoc <= this.prev) {
            var c = n.call(i, "catchLoc"),
              u = n.call(i, "finallyLoc");
            if (c && u) {
              if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
              if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
            } else if (c) {
              if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            } else {
              if (!u) throw Error("try statement without catch or finally");
              if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
            }
          }
        }
      },
      abrupt: function (t, e) {
        for (var r = this.tryEntries.length - 1; r >= 0; --r) {
          var o = this.tryEntries[r];
          if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
            var i = o;
            break;
          }
        }
        i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
        var a = i ? i.completion : {};
        return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
      },
      complete: function (t, e) {
        if ("throw" === t.type) throw t.arg;
        return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
      },
      finish: function (t) {
        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
          var r = this.tryEntries[e];
          if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
        }
      },
      catch: function (t) {
        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
          var r = this.tryEntries[e];
          if (r.tryLoc === t) {
            var n = r.completion;
            if ("throw" === n.type) {
              var o = n.arg;
              resetTryEntry(r);
            }
            return o;
          }
        }
        throw Error("illegal catch attempt");
      },
      delegateYield: function (e, r, n) {
        return this.delegate = {
          iterator: values(e),
          resultName: r,
          nextLoc: n
        }, "next" === this.method && (this.arg = t), y;
      }
    }, e;
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

  var Base=function(_HTMLElement){_inherits(Base,_HTMLElement);var _super=_createSuper(Base);function Base(){var _this;_classCallCheck(this,Base);_this=_super.call(this);_defineProperty(_assertThisInitialized(_this),"debug",false);_defineProperty(_assertThisInitialized(_this),"childrenHTML",void 0);_this.childrenHTML=_this.innerHTML;return _this}_createClass(Base,[{key:"p",value:function p(prop){var value=this.getAttribute(prop);if(value!==null){return value}}},{key:"renderChildren",value:function renderChildren(){var children=this.querySelector("#children");if(children&&this.childrenHTML!==undefined&&this.childrenHTML!==null)children.innerHTML=this.childrenHTML;}}]);return Base}(_wrapNativeSuper(HTMLElement));

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

  var isNullOrEmpty=function isNullOrEmpty(obj){if(obj===undefined||obj===null||obj===""){return true}else {return false}};var removeCarecEspec=function removeCarecEspec(str){if(!isNullOrEmpty(str)){return str.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase()}};var formatDate=function formatDate(date,format){if(date===undefined||date===null){throw new Error("Par\xE2metro date n\xE3o informado.")}if(typeof date==="string"){date=new Date(date.substring(0,19));}var day=date.getDate()<10?"0".concat(date.getDate()):date.getDate().toString();var month=date.getMonth()+1<10?"0".concat(date.getMonth()+1):(date.getMonth()+1).toString();var year=date.getFullYear().toString();var hour=date.getHours()<10?"0".concat(date.getHours()):date.getHours().toString();var minutes=date.getMinutes()<10?"0".concat(date.getMinutes()):date.getMinutes().toString();if(format==="dd/mm/yyyy"){return "".concat(day,"/").concat(month,"/").concat(year)}if(format==="dd/mm"){return "".concat(day,"/").concat(month)}if(format==="hh:MM"){return "".concat(hour,":").concat(minutes)}return "".concat(year,"-").concat(month,"-").concat(day)};var localISOString=function localISOString(){var tzoffset=new Date().getTimezoneOffset()*60000;return new Date(Date.now()-tzoffset).toISOString()};var parseBool=function parseBool(v){if(v==="true"||v==="1"){return true}else {return false}};

  var uuidv4=function uuidv4(){return "10000000-1000-4000-8000-100000000000".replace(/[018]/g,function(c){return (+c^crypto.getRandomValues(new Uint8Array(1))[0]&15>>+c/4).toString(16)})};

  var store=function(){var getItemByField=function getItemByField(storeName,query){var store=loadLocalStorage(storeName);var item;if(store===null)return undefined;for(var i=0;i<store.items.length;i++){item=store.items[i];if(item[query.key]===query.value){return item}}};var addItem=function addItem(storeName,item){return new Promise(function(resolve,reject){try{var _store=loadLocalStorage(storeName);if(_store===null){_store={name:storeName,items:[]};}item["id"]=uuidv4();item["created"]=localISOString();_store.items.push(item);saveDataLocal(_store,storeName);window.dispatchEvent(new CustomEvent(STORE_ADDED_ITEM,{detail:{store:storeName,item:item,items:_store.items}}));resolve(item);}catch(e){reject(e);}})};var updateItemsByFields=function updateItemsByFields(storeName,conditions,values){var store=loadLocalStorage(storeName);var item={};if(store===null){store={name:storeName,items:[]};}if(store.items.length===0){for(var q=0;q<conditions.length;q++){item[conditions[q].key]=conditions[q].value;}for(var v=0;v<values.length;v++){item[values[v].key]=values[v].value;}addItem(storeName,item);}else {for(var i=0;i<store.items.length;i++){item=store.items[i];var cont=0;for(var _q=0;_q<conditions.length;_q++){if(item[conditions[_q].key]===conditions[_q].value){cont++;}}if(cont===conditions.length){for(var _v=0;_v<values.length;_v++){item[values[_v].key]=values[_v].value;}item["updated"]=localISOString();saveDataLocal(store,storeName);window.dispatchEvent(new CustomEvent(STORE_UPDATED_ITEM,{detail:{store:storeName,item:item,items:store.items}}));}}}saveHistorico(storeName,item);return item};var saveHistorico=function saveHistorico(storeName,item){var storeNameHistorico="".concat(storeName,"_HISTORICO");var storeHistorico=loadLocalStorage(storeNameHistorico);if(storeHistorico===null){storeHistorico={name:storeNameHistorico,items:[]};}storeHistorico.items.push(item);saveDataLocal(storeHistorico,storeNameHistorico);};return {addItem:addItem,getItemByField:getItemByField,updateItemsByFields:updateItemsByFields,getItems:function getItems(storeName){var store=loadLocalStorage(storeName);if(store!==null){return store["items"]}else {return []}},clear:function clear(storeName){var store=loadLocalStorage(storeName);if(store!==null){store.items=[];saveDataLocal(store,storeName);window.dispatchEvent(new CustomEvent(STORE_CLEARED,{detail:{store:storeName}}));}else {throw new Error("Store n\xE3o existe.")}},getItemById:function getItemById(storeName,itemId){return getItemByField(storeName,{key:"id",value:itemId})},getItemsByFields:function getItemsByFields(storeName,query){var store=loadLocalStorage(storeName);var item;var result=[];if(store!==null){for(var i=0;i<store.items.length;i++){item=store.items[i];var cont=0;for(var q=0;q<query.length;q++){if(item[query[q].key]===query[q].value){cont++;}}if(cont===query.length){result.push(item);}}return result}else {return []}},removeItemById:function removeItemById(storeName,itemId){var store=loadLocalStorage(storeName);var item;if(store!==null){for(var i=0;i<store.items.length;i++){item=store.items[i];if(item.id===itemId){store.items.splice(i,1);saveDataLocal(store,storeName);window.dispatchEvent(new CustomEvent(STORE_REMOVED_ITEM,{detail:{store:storeName,item:item,items:store.items}}));}}}else {throw new Error("Store n\xE3o existe.")}},onAddedItem:function onAddedItem(storeName,func){window.addEventListener(STORE_ADDED_ITEM,function(e){if(e.detail.store!==storeName){return}func(e);});},onRemovedItem:function onRemovedItem(storeName,func){window.addEventListener(STORE_REMOVED_ITEM,function(e){if(e.detail.store!==storeName){return}func(e);});},onCleared:function onCleared(storeName,func){window.addEventListener(STORE_CLEARED,function(e){if(e.detail.store!==storeName){return}func(e);});},onUpdatedItem:function onUpdatedItem(storeName,func){window.addEventListener(STORE_UPDATED_ITEM,function(e){if(e.detail.store!==storeName){return}func(e);});}}}();var STORE_ADDED_ITEM="STORE_ADDED_ITEM";var STORE_REMOVED_ITEM="STORE_REMOVED_ITEM";var STORE_CLEARED="STORE_CLEARED";var STORE_UPDATED_ITEM="STORE_UPDATED_ITEM";

  var INGREDIENTES_STORE="INGREDIENTES_STORE";var CARDAPIO_STORE="CARDAPIO_STORE";var ALIMENTACAO_STORE="ALIMENTACAO_STORE";var CONFIG_STORE="CONFIG_STORE";var META_DIARIA_STORE="META_DIARIA_STORE";var LOGIN_STORE="LOGIN_STORE";var API_BASE_URL_SERVER="API_BASE_URL_SERVER";var swapTheme=function swapTheme(){var link=document.getElementById("styTheme");if(link){var current=link.getAttribute("href");if(current&&current.indexOf("light")>-1){setTheme("dark");}else {setTheme("light");}}};var getenv=function getenv(key){if(key===API_BASE_URL_SERVER){if(window.location.host.toLowerCase().indexOf("192.168")>-1){return "http://localhost:3005"}else {return "https://".concat(window.location.host,"/api")}}};var setTheme=function setTheme(theme){var link=document.getElementById("styTheme");if(link)link.setAttribute("href","css/theme."+theme+".css");store.updateItemsByFields(CONFIG_STORE,[{key:"key",value:"theme"}],[{key:"value",value:theme}]);};var loadTheme=function loadTheme(){var theme=store.getItemByField(CONFIG_STORE,{key:"key",value:"theme"});if(theme===undefined||theme.value===undefined){setTheme("light");}else {if(typeof theme.value==="string")setTheme(theme.value);}};

  var timedoutshowMessage=0;var removeWindow=function removeWindow(){var msgWindow=document.getElementById("msgWindow");if(msgWindow){msgWindow.classList.remove("show-top");msgWindow.classList.add("close-bottom");timedoutshowMessage=setTimeout(function(){msgWindow.remove();var main=document.getElementById("main");if(main){main.classList.remove("blur");}},400);}};var createWindow=function createWindow(type){var win=document.getElementById("msgWindow");if(win!==null){win.remove();clearTimeout(timedoutshowMessage);}var msgWindow=document.createElement("div");msgWindow.id="msgWindow";msgWindow.classList.add("alert");msgWindow.classList.add("show-top");msgWindow.classList.add(type);var body=document.getElementsByTagName("body");body[0].appendChild(msgWindow);if(type!=="success"){var element=document.getElementById("main");if(element){element.classList.add("blur");}}return msgWindow};var configActions=function configActions(msgWindow,callback){var barActions=document.createElement("div");barActions.classList.add("bar-actions");msgWindow.appendChild(barActions);var btnConfirm=document.createElement("button");btnConfirm.innerText="Ok";btnConfirm.classList.add("btn-ok");btnConfirm.onclick=function(){removeWindow();callback();};barActions.appendChild(btnConfirm);var btnCancelar=document.createElement("button");btnCancelar.innerText="Cancelar";btnCancelar.classList.add("btn-cancelar");btnCancelar.classList.add("delay1");btnCancelar.onclick=function(){removeWindow();};barActions.appendChild(btnCancelar);};var showPopup=function showPopup(html,onConfirm,onRender){var msgWindow=createWindow("default");render(msgWindow,html);configActions(msgWindow,onConfirm);if(onRender){onRender();}return msgWindow};var showMessage=function showMessage(msg,type){var msgWindow=createWindow(type);var msgNode=document.createElement("div");msgWindow.appendChild(msgNode);msgNode.innerHTML=msg;var barActions=document.createElement("div");barActions.classList.add("bar-actions");msgWindow.appendChild(barActions);var btnConfirm=document.createElement("button");btnConfirm.innerText="Ok";btnConfirm.classList.add("btn-ok");btnConfirm.onclick=function(){removeWindow();};barActions.appendChild(btnConfirm);timedoutshowMessage=setTimeout(function(){removeWindow();},msg.length*150);return msgWindow};var showConfirm=function showConfirm(msg,callback){var msgWindow=createWindow("warning");var msgNode=document.createTextNode(msg);msgWindow.appendChild(msgNode);configActions(msgWindow,callback);};var showOk=function showOk(msg){var window=showMessage(msg,"success");window.onclick=function(){removeWindow();};};var showWarning=function showWarning(msg){var window=showMessage(msg,"warning");window.onclick=function(){removeWindow();};};var showError=function showError(msg){var window=showMessage(msg,"error");window.onclick=function(){removeWindow();};};

  var produtoCalculo;var buscarProdutoPorId=function buscarProdutoPorId(idProduto){for(var i=0;i<listaAlimentos.length;i++){var produto=listaAlimentos[i];if(produto.id===idProduto){return produto}}return undefined};var calcularAlimentoColher=function calcularAlimentoColher(unidade,idxResultado,idProduto,rating){if(unidade!==""&&unidade!==null&&!isNaN(parseFloat(unidade))&&parseFloat(unidade)>0){var pesoNum=parseInt(unidade)*rating;var inputPeso=document.getElementById("inputPeso"+idxResultado);if(inputPeso){inputPeso.value=pesoNum.toString();}calcularAlimento(pesoNum,idxResultado,idProduto);}};var calcularAlimentoPeso=function calcularAlimentoPeso(peso,idxResultado,idProduto,rating){if(peso!==""&&peso!==null&&!isNaN(parseFloat(peso))&&parseFloat(peso)>0){var pesoNum=parseInt(peso);var inputQuantidade=document.getElementById("inputQuantidade"+idxResultado);calcularAlimento(pesoNum,idxResultado,idProduto);if(inputQuantidade){inputQuantidade.value=Math.round(pesoNum/rating).toString();}}};var calcularAlimento=function calcularAlimento(peso,idxResultado,idProduto){if(produtoCalculo===undefined||produtoCalculo.id!==idProduto){produtoCalculo=buscarProdutoPorId(idProduto);}var itemResultadoCalorias=document.getElementById("itemResultadoCalorias"+idxResultado);var itemResultadoProteinas=document.getElementById("itemResultadoProteinas"+idxResultado);if(produtoCalculo!==undefined){var proteinas=Math.round(peso*produtoCalculo.proteina/100);var calorias=Math.round(peso*produtoCalculo.calorias/100);if(itemResultadoCalorias!==null&&itemResultadoProteinas!==null){itemResultadoCalorias.innerHTML=calorias.toString();itemResultadoProteinas.innerHTML=proteinas.toString();}}else {if(itemResultadoCalorias!==null&&itemResultadoProteinas!==null){itemResultadoCalorias.innerHTML="-";itemResultadoProteinas.innerHTML="-";}}};var adicionarCalculo=function adicionarCalculo(idxResultado,idProduto){try{var elementPeso=document.getElementById("inputPeso"+idxResultado);var pesoValue=parseFloat(elementPeso===null?"":elementPeso.value);if(isNaN(pesoValue)){throw new Error("Informe o peso do ingrediente.")}if(pesoValue<=0){throw new Error("Peso deve ser maior que zero.")}var produto=buscarProdutoPorId(idProduto);var elementCaloria=document.getElementById("itemResultadoCalorias"+idxResultado);var elementProteina=document.getElementById("itemResultadoProteinas"+idxResultado);var caloriasValue=parseFloat(elementCaloria.innerText);var proteinasValue=parseFloat(elementProteina.innerText);if(produto!==undefined){store.addItem(INGREDIENTES_STORE,{"nome":produto.nome,"calorias":caloriasValue,"proteinas":proteinasValue,"peso":pesoValue,"unidade":produto.unidade});}}catch(e){showWarning(e.message);}};

  var _templateObject,_templateObject2,_templateObject3,_templateObject4,_templateObject5;var PesquisaItem=function(_Base){_inherits(PesquisaItem,_Base);var _super=_createSuper(PesquisaItem);function PesquisaItem(){var _this;_classCallCheck(this,PesquisaItem);_this=_super.call(this);_defineProperty(_assertThisInitialized(_this),"props",void 0);_defineProperty(_assertThisInitialized(_this),"showFormCalculo",false);return _this}_createClass(PesquisaItem,[{key:"attributeChangedCallback",value:function attributeChangedCallback(name,oldValue,newValue){if(oldValue!==null){this.render();}}},{key:"connectedCallback",value:function connectedCallback(){this.render();}},{key:"showCalculo",value:function showCalculo(){var _this2=this;var idItemResultadoCalorias="itemResultadoCalorias".concat(this.props.idx);var idItemResultadoProteinas="itemResultadoProteinas".concat(this.props.idx);var inputPeso="inputPeso".concat(this.props.idx);var inputQuantidade="inputQuantidade".concat(this.props.idx);var rating=0;var label="";for(var i=0;i<listaAlimentosUnidades.length;i++){if(this.props.item.id===listaAlimentosUnidades[i].idAlimento){rating=listaAlimentosUnidades[i].rating;label=listaAlimentosUnidades[i].label;break}}showPopup(html(_templateObject||(_templateObject=_taggedTemplateLiteral(["<div class='title'> "," <div>\n            <div class='actions pesquisa-alimento-item-actions'>   \n                <div class='action'> \n                    <b>","</b>\n                    <input type='number' class=\"input-number\" id="," placeholder='Qtd' \n                        oninput="," />\n                </div>\n\n                ","\n\n                <div class=\"bar\">\n                    <div class='action'><b>Calorias</b><div id=",">-</div></div>\n                    <div class='action'><b>Prote\xEDnas</b><div id=",">-</div></div>\n                </div>\n              </div>"])),this.props.item.nome,this.props.item.unidade&&this.props.item.unidade==="ml"?html(_templateObject2||(_templateObject2=_taggedTemplateLiteral(["Quantidade ml"]))):html(_templateObject3||(_templateObject3=_taggedTemplateLiteral(["Peso em gramas"]))),inputPeso,function(e){return calcularAlimentoPeso(e.currentTarget.value,_this2.props.idx,_this2.props.item.id,rating)},rating>0?html(_templateObject4||(_templateObject4=_taggedTemplateLiteral(["<div class='action'> <b>","</b>\n                    <input type='number' class=\"input-number\" id="," placeholder="," \n                        oninput="," />    \n                </div>"])),label,inputQuantidade,label,function(e){return calcularAlimentoColher(e.currentTarget.value,_this2.props.idx,_this2.props.item.id,rating)}):null,idItemResultadoCalorias,idItemResultadoProteinas),function(){adicionarCalculo(_this2.props.idx,_this2.props.item.id);});}},{key:"render",value:function render$1(){var _this3=this;this.props={idx:this.p("idx"),item:JSON.parse(this.p("item"))};var className="listItem pesquisa - alimento - item filtro delay".concat(this.props.idx);var unidade=this.props.item.unidade?this.props.item.unidade:"g";render(this,html(_templateObject5||(_templateObject5=_taggedTemplateLiteral(["<div class= ",">\n                                <div class='title'> "," <div> <span>"," </span> cal por <span> 100","</span > </div></div>\n                                <button class='btn-selecionar' onclick=","> Calcular </button>\n                            </div>"])),className,this.props.item.nome,this.props.item.calorias,unidade,function(){return _this3.showCalculo()}));}}],[{key:"observedAttributes",get:function get(){return ["item","idx"]}}]);return PesquisaItem}(Base);window.customElements.define("app-pesquisa-alimento-item",PesquisaItem);

  var searchList=function searchList(list,search,field){var resultList=[];var value=removeCarecEspec(search.toLowerCase());if(value===undefined){return []}var values=value.split(" ");for(var i=0;i<list.length;i++){if(resultList.length<20){var item=list[i];var fieldValue=item[field];fieldValue=removeCarecEspec(fieldValue);var cont=0;for(var s=0;s<values.length;s++){if(fieldValue.indexOf(values[s])>-1){cont++;}}if(cont===values.length){resultList.push(list[i]);}}}return resultList};

  var consultaAlimento=function consultaAlimento(search){return searchList(listaAlimentos,search,"nome")};

  var _templateObject$1,_templateObject2$1;var PesquisaAlimento=function(_Base){_inherits(PesquisaAlimento,_Base);var _super=_createSuper(PesquisaAlimento);function PesquisaAlimento(){var _this;_classCallCheck(this,PesquisaAlimento);_this=_super.call(this);_defineProperty(_assertThisInitialized(_this),"props",void 0);_defineProperty(_assertThisInitialized(_this),"resultList",[]);store.onAddedItem(INGREDIENTES_STORE,function(e){var ele=_this.querySelector("#txtPesquisa");ele.value="";_this.resultList=[];_this.render();});return _this}_createClass(PesquisaAlimento,[{key:"onTxtPesquisaInput",value:function onTxtPesquisaInput(target){this.resultList=consultaAlimento(target.value.toLowerCase());this.render();}},{key:"attributeChangedCallback",value:function attributeChangedCallback(name,oldValue,newValue){console.log("Attribute ".concat(name," has changed."));}},{key:"connectedCallback",value:function connectedCallback(){this.props={idx:this.p("idx"),id:this.p("id")};this.render();}},{key:"render",value:function render$1(){var _this2=this;render(this,html(_templateObject$1||(_templateObject$1=_taggedTemplateLiteral(["\n        \n                <label>Digite o nome do alimento</label>\n                <input type=\"text\" class=\"textForm\" id=\"txtPesquisa\" oninput="," />  \n                <div class=\"list-space-around\">\n                ","\n                </div>\n           "])),function(e){return _this2.onTxtPesquisaInput(e.currentTarget)},this.resultList.map(function(item,idx){return html(_templateObject2$1||(_templateObject2$1=_taggedTemplateLiteral(["<app-pesquisa-alimento-item \n                                item=","\n                                idx="," />"])),JSON.stringify(item),idx)})));}}]);return PesquisaAlimento}(Base);window.customElements.define("app-pesquisa-alimento",PesquisaAlimento);

  var getInputValue=function getInputValue(str){var element=document.getElementById(str);if(element===null||element===undefined){element=document.querySelector(str);if(element===null||element===undefined){return}}if(element.value){return element.value}if(element.valueAsNumber){return element.valueAsNumber}};var validateFields=function validateFields(fields){var errors="Verifique e tente novamente: <br/><br/>";var valid=true;if(fields&&fields.length>0){for(var i=0;i<fields.length;i++){if(fields[i].msg){errors+="- ".concat(fields[i].msg," <br/>");valid=false;}}if(!valid){showError(errors);}}return valid};var getInputString=function getInputString(id,msg){var value=getInputValue(id);if(value){return {value:value.toString()}}return {msg:msg}};var getInputNumber=function getInputNumber(id,msg){var value=getInputValue(id);if(value){if(typeof value==="string"){value=value.split(",").join(".");if(isNaN(parseFloat(value))){return {msg:msg}}return {value:parseFloat(value)}}else if(typeof value==="number"){return {value:value}}}return {msg:msg}};var getInputInt=function getInputInt(id,msg){var value=getInputValue(id);if(value){if(typeof value==="string"){if(isNaN(parseInt(value))){return {msg:msg}}return {value:parseInt(value)}}else if(typeof value==="number"){return {value:value}}}return {msg:msg}};var getRadiosCheck=function getRadiosCheck(id){var field=document.querySelector("input[name="+id+"]:checked");if(field!==null){return field.value}else {return null}};var setRadiosCheck=function setRadiosCheck(id,value){var radios=document.querySelectorAll("input[name=\""+id+"\"]");for(var i=0;i<radios.length;i++){if(value&&value!==null&&radios[i].value===value.toString()){radios[i].checked=true;}}};var setNumberField=function setNumberField(id,value){var input=document.getElementById(id);if(input!==null){input.value=value;}};

  var startAnimation=function startAnimation(startValue,endValue,onFrame,onEnd){var start=Date.now();var now=0;var duration=1000;var _goAnime=function goAnime(){now=Date.now();if(now-start>=duration){if(onEnd){onEnd();}return}onFrame(startValue+(endValue-startValue)*inOutCube((now-start)/duration));frameAnime(_goAnime);};var frameAnime=function frameAnime(callback){setTimeout(callback,1000/60);};var inOutCube=function inOutCube(n){n*=2;if(n<1)return 0.5*n*n*n;return 0.5*((n-=2)*n*n+2)};_goAnime();};

  var scrollBodyTop=function scrollBodyTop(to){var body=document.querySelector("body");scrollElementTo(body,to);};var scrollElementTo=function scrollElementTo(element,to){if(element){startAnimation(element.scrollTop,to,function(value){element.scrollTop=value;});}};

  var SCREEN_HEIGHT=80;var resizeScreens=function resizeScreens(){var screens=document.getElementsByClassName("screen");for(var t=0;t<screens.length;t++){screens[t].style.height=(window.innerHeight-SCREEN_HEIGHT).toString();}};var detectPathScreen=function detectPathScreen(){var hashPaths=window.location.hash.split("/");if(hashPaths.length===2){var screens=document.getElementsByClassName("screen");for(var t=0;t<screens.length;t++){if(screens[t].id===hashPaths[1]){swapScreen(hashPaths[1]);return}}swapScreen("notfound");}};var swapScreen=function swapScreen(id){var screens=document.getElementsByClassName("screen");for(var t=0;t<screens.length;t++){var screen=screens[t];if(screen.id===id){if(!screen.classList.contains("open")){var navBtns=document.querySelectorAll(".btn-screen-switch");for(var i=0;i<navBtns.length;i++){if(navBtns[i].id==="".concat(id,"Nav")){navBtns[i].classList.add("open");}else {navBtns[i].classList.remove("open");}}window.history.pushState(null,"","#/"+id);execOpen(screen);}}else {closeScreen(screens[t]);}}};var execOpen=function execOpen(element){setTimeout(function(){element.classList.add("open");element.classList.remove("close");element.style.height=(window.innerHeight-SCREEN_HEIGHT).toString();scrollElementTo(element,0);},150);};var closeScreen=function closeScreen(screen){if(screen!==undefined&&screen.classList.contains("open")){screen.classList.remove("open");setTimeout(function(){screen.classList.add("close");},150);}};

  var _templateObject$2,_templateObject2$2,_templateObject3$1,_templateObject4$1,_templateObject5$1,_templateObject6;var IngredientesSelecionados=function(_Base){_inherits(IngredientesSelecionados,_Base);var _super=_createSuper(IngredientesSelecionados);function IngredientesSelecionados(){var _this;_classCallCheck(this,IngredientesSelecionados);_this=_super.call(this);_defineProperty(_assertThisInitialized(_this),"props",void 0);_defineProperty(_assertThisInitialized(_this),"listaIngredientes",[]);_defineProperty(_assertThisInitialized(_this),"listaCardapio",[]);store.onAddedItem(INGREDIENTES_STORE,function(e){_this.listaIngredientes=e.detail.items;_this.render();});store.onRemovedItem(INGREDIENTES_STORE,function(e){if(e.detail.items.length===0){_this.listaIngredientes=[];render(_assertThisInitialized(_this),html(_templateObject$2||(_templateObject$2=_taggedTemplateLiteral([""]))));}else {_this.listaIngredientes=e.detail.items;_this.render();}});store.onCleared(INGREDIENTES_STORE,function(e){_this.listaIngredientes=[];render(_assertThisInitialized(_this),html(_templateObject2$2||(_templateObject2$2=_taggedTemplateLiteral([""]))));});return _this}_createClass(IngredientesSelecionados,[{key:"connectedCallback",value:function connectedCallback(){this.props={idx:this.p("idx"),id:this.p("id")};this.listaIngredientes=store.getItems(INGREDIENTES_STORE);this.listaCardapio=store.getItems(CARDAPIO_STORE);if(this.listaIngredientes.length>0){this.render();}}},{key:"render",value:function render$1(){var totalCalorias=0;var totalProteinas=0;var totalPeso=0;var items=[];for(var i=0;i<this.listaIngredientes.length;i++){var itemCalculo=this.listaIngredientes[i];items.push(html(_templateObject3$1||(_templateObject3$1=_taggedTemplateLiteral(["<app-ingredientes-selecionados-item \n                                ingrediente="," />"])),JSON.stringify(this.listaIngredientes[i])));totalCalorias+=itemCalculo.calorias;totalProteinas+=itemCalculo.proteinas;totalPeso+=itemCalculo.peso;}render(this,html(_templateObject4$1||(_templateObject4$1=_taggedTemplateLiteral(["\n        <div class='list selecionados'>\n            <div class='title'>Ingredientes selecionados</div>\n                           ","\n                <div class=\"list-space-around\">\n                    ","\n                </div>\n            <div class='cols total'>\n                <div>Calorias <span class='text'> "," </span></div>\n                <div>Prote\xEDnas <span class='text'>"," </span></div>\n                <div>Peso <span class='text'>","g</span></div>\n            </div>\n\n            ","\n\n                            \n                <div class='cols bar-add-ingredientes'>\n                    <div class='radio-col-2'>\n                        <div class='radio'><input type=\"radio\" name=\"inputTipoCardapio\" value=\"CA\" /> <span>Caf\xE9 da manh\xE3/tarde</span> </div>\n                        <div class='radio'><input type=\"radio\" name=\"inputTipoCardapio\" value=\"AJ\" /> <span>Almo\xE7o/Jantar</span> </div>\n                        <div class='radio'><input type=\"radio\" name=\"inputTipoCardapio\" value=\"LC\" /> <span>Lanches</span> </div>\n                        <div class='radio'><input type=\"radio\" name=\"inputTipoCardapio\" value=\"SM\" /> <span>Sobremesas</span> </div>\n                    </div>\n                </div>\n        </div>\n      "])),this.listaCardapio.length===0&&this.listaIngredientes.length===1?html(_templateObject5$1||(_templateObject5$1=_taggedTemplateLiteral(["<div class=\"wizard-message\">\n                                  <h1>Dica</h1>\n                                <p>\n                                    Fa\xE7a uma outra consulta e adicione novos ingredientes para compor a sua refei\xE7\xE3o. <br/>\n                                     Exemplo: Arroz cozido, Feij\xE3o preto cozido, Ovo de galinha inteiro cozido e Batata inglesa cozida.\n                                </p>\n\n                            </div>"]))):null,items.map(function(item){return item}),totalCalorias,totalProteinas,totalPeso,this.listaCardapio.length===0&&this.listaIngredientes.length>1?html(_templateObject6||(_templateObject6=_taggedTemplateLiteral(["<div class=\"wizard-message\">\n                                  <h1>Dica</h1>\n                                <p>\n                                    Ap\xF3s selecionar os ingredientes da refei\xE7\xE3o, selecione a categoria adequada e clique em <b>\"Adicionar ao card\xE1pio\"</b>.\n                                </p>\n                                \n                            </div>"]))):null));}},{key:"adicionarItemCardapio",value:function adicionarItemCardapio(){try{if(this.listaIngredientes.length>0){var nomeItemCardapio="";var tipoItemCardapio=getRadiosCheck("inputTipoCardapio");if(tipoItemCardapio===null){throw new Error("Selecione o tipo.")}var totalCalorias=0;var totalProteinas=0;var totalPeso=0;for(var i=0;i<this.listaIngredientes.length;i++){var itemCalculo=this.listaIngredientes[i];if(i===0){nomeItemCardapio+=itemCalculo.nome;}else if(i===this.listaIngredientes.length-1){nomeItemCardapio+=" e "+itemCalculo.nome.toLowerCase();}else {nomeItemCardapio+=", "+itemCalculo.nome.toLowerCase();}totalCalorias+=itemCalculo.calorias;totalProteinas+=itemCalculo.proteinas;totalPeso+=itemCalculo.peso;}var itemCardapio={"id":uuidv4(),"nome":nomeItemCardapio,"tipo":tipoItemCardapio,"calorias":totalCalorias,"proteinas":totalProteinas,"peso":totalPeso,"itens":this.listaIngredientes,"created":localISOString()};store.addItem(CARDAPIO_STORE,itemCardapio);this.reiniciarListaIngredientes();swapScreen("cardapio");}}catch(e){showWarning(e.message);}}},{key:"reiniciarListaIngredientes",value:function reiniciarListaIngredientes(){store.clear(INGREDIENTES_STORE);}}]);return IngredientesSelecionados}(Base);window.customElements.define("app-ingredientes-selecionados",IngredientesSelecionados);

  var _templateObject$3;var IngredientesSelecionadosItem=function(_Base){_inherits(IngredientesSelecionadosItem,_Base);var _super=_createSuper(IngredientesSelecionadosItem);function IngredientesSelecionadosItem(){var _this;_classCallCheck(this,IngredientesSelecionadosItem);_this=_super.call(this);_defineProperty(_assertThisInitialized(_this),"props",void 0);_defineProperty(_assertThisInitialized(_this),"listaIngredientes",[]);return _this}_createClass(IngredientesSelecionadosItem,[{key:"connectedCallback",value:function connectedCallback(){this.props={idx:this.p("idx"),id:this.p("id"),ingrediente:JSON.parse(this.p("ingrediente"))};this.render();}},{key:"attributeChangedCallback",value:function attributeChangedCallback(name,oldValue,newValue){if(name==="ingrediente"){this.props=_objectSpread2(_objectSpread2({},this.props),{},{ingrediente:JSON.parse(newValue)});this.render();}}},{key:"render",value:function render$1(){var _this2=this;var unidade=this.props.ingrediente.unidade===undefined?"g":this.props.ingrediente.unidade;render(this,html(_templateObject$3||(_templateObject$3=_taggedTemplateLiteral(["\n        \n        <div class='item'> <b> "," </b> "," calorias e "," prote\xEDnas em ","","\n            <button class='btn-remove' onclick=","> x </button>\n            </div>"])),this.props.ingrediente.nome,this.props.ingrediente.calorias,this.props.ingrediente.proteinas,this.props.ingrediente.peso,unidade,function(){return _this2.removerCalculo(_this2.props.ingrediente.id)}));}},{key:"removerCalculo",value:function removerCalculo(id){store.removeItemById(INGREDIENTES_STORE,id);}}],[{key:"observedAttributes",get:function get(){return ["ingrediente"]}}]);return IngredientesSelecionadosItem}(Base);window.customElements.define("app-ingredientes-selecionados-item",IngredientesSelecionadosItem);

  var _templateObject$4,_templateObject2$3,_templateObject3$2,_templateObject4$2,_templateObject5$2,_templateObject6$1,_templateObject7,_templateObject8,_templateObject9,_templateObject10,_templateObject11;var Cardapio=function(_Base){_inherits(Cardapio,_Base);var _super=_createSuper(Cardapio);function Cardapio(){var _this;_classCallCheck(this,Cardapio);_this=_super.call(this);_defineProperty(_assertThisInitialized(_this),"items",[]);_defineProperty(_assertThisInitialized(_this),"itemsView",[]);_defineProperty(_assertThisInitialized(_this),"showSearch",false);store.onAddedItem(CARDAPIO_STORE,function(e){_this.defineList(e.detail.items);});store.onRemovedItem(CARDAPIO_STORE,function(e){_this.defineList(e.detail.items);});return _this}_createClass(Cardapio,[{key:"defineList",value:function defineList(items){this.items=items;this.itemsView=this.items;this.render();}},{key:"swapSearch",value:function swapSearch(){this.showSearch=!this.showSearch;this.itemsView=this.items;this.render();}},{key:"connectedCallback",value:function connectedCallback(){this.defineList(store.getItems(CARDAPIO_STORE));}},{key:"onTxtPesquisaInput",value:function onTxtPesquisaInput(target){if(target.value===""){this.itemsView=this.items;}else {this.itemsView=searchList(this.items,target.value,"nome");}this.render();}},{key:"render",value:function render$1(){var _this2=this;var listCA=[];var listAJ=[];var listLC=[];var listSM=[];for(var i=0;i<this.itemsView.length;i++){var h=html(_templateObject$4||(_templateObject$4=_taggedTemplateLiteral(["<app-cardapio-item \n                            idx=","\n                            item="," />"])),i,JSON.stringify(this.itemsView[i]));switch(this.itemsView[i].tipo){case"CA":listCA.push(h);break;case"AJ":listAJ.push(h);break;case"LC":listLC.push(h);break;case"SM":listSM.push(h);break}}render(this,html(_templateObject2$3||(_templateObject2$3=_taggedTemplateLiteral(["\n                ","\n\n            <h4>Caf\xE9 da manh\xE3/tarde</h4>\n            ","\n\n            <h4>Almo\xE7o/jantar</h4>\n            ","\n\n            <h4>Lanches</h4>\n            ","\n\n            <h4>Sobremesas</h4>\n            ","\n\n            "])),this.showSearch?html(_templateObject3$2||(_templateObject3$2=_taggedTemplateLiteral(["<input type=\"text\" class=\"textForm\" id=\"txtPesquisa\" placeholder=\"Pesquise no seu card\xE1pio.\" oninput="," />"])),function(e){return _this2.onTxtPesquisaInput(e.currentTarget)}):null,listCA.length===0?html(_templateObject4$2||(_templateObject4$2=_taggedTemplateLiteral(["<span class='text-intro'> Nenhum item encontrado nesta categoria. </span>"]))):html(_templateObject5$2||(_templateObject5$2=_taggedTemplateLiteral(["<div class=\"list-space-around\">","</div>"])),listCA.map(function(item,idx){return item})),listAJ.length===0?html(_templateObject6$1||(_templateObject6$1=_taggedTemplateLiteral(["<span class='text-intro'> Nenhum item encontrado nesta categoria. </span>"]))):html(_templateObject7||(_templateObject7=_taggedTemplateLiteral(["<div class=\"list-space-around\">","</div>"])),listAJ.map(function(item,idx){return item})),listLC.length===0?html(_templateObject8||(_templateObject8=_taggedTemplateLiteral(["<span class='text-intro'> Nenhum item encontrado nesta categoria. </span>"]))):html(_templateObject9||(_templateObject9=_taggedTemplateLiteral(["<div class=\"list-space-around\">","</div>"])),listLC.map(function(item,idx){return item})),listSM.length===0?html(_templateObject10||(_templateObject10=_taggedTemplateLiteral(["<span class='text-intro'> Nenhum item encontrado nesta categoria. </span>"]))):html(_templateObject11||(_templateObject11=_taggedTemplateLiteral(["<div class=\"list-space-around\">","</div>"])),listSM.map(function(item,idx){return item}))));}}]);return Cardapio}(Base);window.customElements.define("app-cardapio",Cardapio);

  var _templateObject$5,_templateObject2$4,_templateObject3$3;var AppCardapioItem=function(_Base){_inherits(AppCardapioItem,_Base);var _super=_createSuper(AppCardapioItem);function AppCardapioItem(){var _this;_classCallCheck(this,AppCardapioItem);_this=_super.call(this);_defineProperty(_assertThisInitialized(_this),"props",void 0);_defineProperty(_assertThisInitialized(_this),"proteinas",0);_defineProperty(_assertThisInitialized(_this),"calorias",0);_defineProperty(_assertThisInitialized(_this),"pesoInicial",0);return _this}_createClass(AppCardapioItem,[{key:"attributeChangedCallback",value:function attributeChangedCallback(name,oldValue,newValue){if(oldValue!==null){this.render();}}},{key:"connectedCallback",value:function connectedCallback(){this.render();}},{key:"calcularAlimento",value:function calcularAlimento(value){var pesoCalorias=document.querySelector("#pesoCalorias");if(pesoCalorias){pesoCalorias.innerText=Math.round(parseFloat(value)*this.props.item.calorias/this.props.item.peso).toString();}var pesoProteinas=document.querySelector("#pesoProteinas");if(pesoProteinas){pesoProteinas.innerText=Math.round(parseFloat(value)*this.props.item.proteinas/this.props.item.peso).toString();}}},{key:"selecionarItem",value:function selecionarItem(){var _this2=this;this.pesoInicial=this.props.item.peso>800?100:this.props.item.peso;showPopup(html(_templateObject$5||(_templateObject$5=_taggedTemplateLiteral(["<div class=''>\n                        <div class='title'>","</div>\n                        <h3 class='text'>Qual foi o peso?</h3>\n                            <div class='info'>\n                                <input type='number' id='intPesoAlimento' \n                                        class='input-number' \n                                        value=","\n                                        placeholder='peso em gramas'\n                                        oninput=","  />\n                                        <div class=\"text\">\n                                            <span id=\"pesoCalorias\"></span> calorias e <span id=\"pesoProteinas\"></span>g de prote\xEDnas.\n                                        </div>\n                            </div>\n                    </div>"])),this.props.item.nome,this.pesoInicial,function(e){return _this2.calcularAlimento(e.currentTarget.value)}),function(){var ele=document.querySelector("#intPesoAlimento");var peso=parseFloat(ele.value);var cardapioItem=store.getItemById(CARDAPIO_STORE,_this2.props.item.id);if(cardapioItem){var calorias=Math.round(peso*cardapioItem.calorias/cardapioItem.peso);var proteinas=Math.round(peso*cardapioItem.proteinas/cardapioItem.peso);var itemAlimentacao={"id":uuidv4(),"idCardapio":cardapioItem.id,"nome":cardapioItem.nome,"tipo":cardapioItem.tipo,"calorias":calorias,"proteinas":proteinas,"peso":peso,"created":localISOString()};store.addItem(ALIMENTACAO_STORE,itemAlimentacao).then(function(info){_this2.reiniciarAlimentacao();});}},function(){_this2.calcularAlimento(_this2.pesoInicial.toString());});}},{key:"reiniciarAlimentacao",value:function reiniciarAlimentacao(){this.render();}},{key:"removerItemCardapio",value:function removerItemCardapio(){var _this3=this;showConfirm("Voc\xEA tem certeza que deseja remover este item do seu card\xE1rio?",function(){store.removeItemById(CARDAPIO_STORE,_this3.props.item.id);});}},{key:"render",value:function render$1(){var _this4=this;this.props={idx:JSON.parse(this.p("idx")),item:JSON.parse(this.p("item"))};render(this,html(_templateObject2$4||(_templateObject2$4=_taggedTemplateLiteral(["\n                <div class='listItem cardapio delay'>\n                   <div class='title'>","</div>\n                        ","\n                        \n                <div class='total'> Total de <span> ","g</span>, <span>"," calorias </span> e <span> ","g de prote\xEDnas</span>.</div>\n                <div class='actions right'>\n                    <div class=\"btn-trash\" @click=","></div>\n                </div>\n                <div class='actions center'>\n                    <button class='btn-selecionar' onclick=","> Consumi este alimento </button>\n                </div>\n                </div>"])),this.props.item.nome,this.props.item.itens.map(function(item,idx){var peso=item.peso===undefined?"100":item.peso;var unidade=item.unidade===undefined?"g":item.unidade;return html(_templateObject3$3||(_templateObject3$3=_taggedTemplateLiteral(["<div class='list mini'>\n                        <div class='item mini'>\n                                <span> ",""," </span> de ","\n                        </div>\n                    </div>"])),peso,unidade,item.nome)}),this.props.item.peso,this.props.item.calorias,this.props.item.proteinas,function(){return _this4.removerItemCardapio()},function(){return _this4.selecionarItem()}));}}],[{key:"observedAttributes",get:function get(){return ["item","idx"]}}]);return AppCardapioItem}(Base);window.customElements.define("app-cardapio-item",AppCardapioItem);

  var agrupaDias=function agrupaDias(items){var ordenado=items.sort(function(a,b){return new Date(b.created).getTime()-new Date(a.created).getTime()});var diasGroup=[];var diasGroupItem={dia:localISOString(),registros:[]};diasGroup.push(diasGroupItem);var dia=diasGroupItem.dia.substring(0,10);for(var i=0;i<ordenado.length;i++){var diaLoop=ordenado[i].created.substring(0,10);if(dia!==diaLoop){diasGroupItem={dia:ordenado[i].created,registros:[]};diasGroup.push(diasGroupItem);dia=diaLoop;}diasGroupItem.registros.push(ordenado[i]);}return diasGroup};

  var _templateObject$6,_templateObject2$5,_templateObject3$4,_templateObject4$3,_templateObject5$3,_templateObject6$2,_templateObject7$1;var RegistroAlimentos=function(_Base){_inherits(RegistroAlimentos,_Base);var _super=_createSuper(RegistroAlimentos);function RegistroAlimentos(){var _this;_classCallCheck(this,RegistroAlimentos);_this=_super.call(this);_defineProperty(_assertThisInitialized(_this),"props",void 0);_defineProperty(_assertThisInitialized(_this),"itemsShow",[]);store.onAddedItem(ALIMENTACAO_STORE,function(e){_this.itemsShow=[];render(_assertThisInitialized(_this),html(_templateObject$6||(_templateObject$6=_taggedTemplateLiteral([""]))));_this.render(e.detail.items);swapScreen("registro");});store.onRemovedItem(ALIMENTACAO_STORE,function(e){_this.itemsShow=[];render(_assertThisInitialized(_this),html(_templateObject2$5||(_templateObject2$5=_taggedTemplateLiteral([""]))));_this.render(e.detail.items);});store.onCleared(ALIMENTACAO_STORE,function(e){_this.itemsShow=[];render(_assertThisInitialized(_this),html(_templateObject3$4||(_templateObject3$4=_taggedTemplateLiteral([""]))));});return _this}_createClass(RegistroAlimentos,[{key:"connectedCallback",value:function connectedCallback(){this.props={idx:this.p("idx"),id:this.p("id")};this.render();}},{key:"render",value:function render$1(items){if(items===undefined){items=store.getItems(ALIMENTACAO_STORE);}this.itemsShow=agrupaDias(items);render(this,html(_templateObject4$3||(_templateObject4$3=_taggedTemplateLiteral(["\n\n        <div class='list selecionados'>\n            <!-- <div class='title'>Alimentos consumidos</div> -->\n                    ","\n       \n            </div>\n      "])),this.itemsShow.length===0?html(_templateObject5$3||(_templateObject5$3=_taggedTemplateLiteral(["<b class=\"text\"> Nada aqui ainda. Utilize o seu card\xE1pio para selecionar as refei\xE7\xF5es que voc\xEA consumiu no dia.</b>"]))):html(_templateObject6$2||(_templateObject6$2=_taggedTemplateLiteral([" <app-mini-slide total-slides="," reverso=\"true\">\n                            ","\n                    </app-mini-slide>"])),this.itemsShow.length,this.itemsShow.map(function(item){return html(_templateObject7$1||(_templateObject7$1=_taggedTemplateLiteral(["<app-registro-alimentos-item class=\"mini-slide-item\" refeicao-dia="," />"])),JSON.stringify(item))}))));}}]);return RegistroAlimentos}(Base);window.customElements.define("app-registro-alimentos",RegistroAlimentos);

  var _templateObject$7,_templateObject2$6,_templateObject3$5,_templateObject4$4;var RegistroAlimentosItem=function(_Base){_inherits(RegistroAlimentosItem,_Base);var _super=_createSuper(RegistroAlimentosItem);function RegistroAlimentosItem(){var _this;_classCallCheck(this,RegistroAlimentosItem);_this=_super.call(this);_defineProperty(_assertThisInitialized(_this),"refeicaoDia",void 0);return _this}_createClass(RegistroAlimentosItem,[{key:"connectedCallback",value:function connectedCallback(){this.refeicaoDia=JSON.parse(this.p("refeicao-dia"));this.render();}},{key:"removerItemCardapio",value:function removerItemCardapio(id){showConfirm("Voc\xEA tem certeza que deseja remover este item do seu registro di\xE1rio?",function(){store.removeItemById(ALIMENTACAO_STORE,id);});}},{key:"render",value:function render$1(){var _this2=this;var totalCalorias=0;var totalProteinas=0;var totalPeso=0;var itemsShow=[];var _loop=function _loop(){itemCalculo=_this2.refeicaoDia.registros[i];var itemIdCalculo=_this2.refeicaoDia.registros[i].id;itemsShow.push(html(_templateObject4$4||(_templateObject4$4=_taggedTemplateLiteral(["\n                <div class='listItem cardapio delay'>\n                    <div class='title'>","</div>\n                    <div class='total'> Total de <span> ","g</span>, <span>"," calorias </span> e <span> ","g de prote\xEDnas</span>.</div>\n                \n                    <div class=\"hora\">","</div>\n\n                    <div class='actions right'>\n                        <div class=\"btn-trash\" @click=","></div>\n                    </div>\n                </div>"])),itemCalculo.nome,itemCalculo.peso,itemCalculo.calorias,itemCalculo.proteinas,formatDate(itemCalculo.created,"hh:MM"),function(){return _this2.removerItemCardapio(itemIdCalculo)}));totalCalorias+=itemCalculo.calorias;totalProteinas+=itemCalculo.proteinas;totalPeso+=itemCalculo.peso;},itemCalculo;for(var i=0;i<this.refeicaoDia.registros.length;i++){_loop();}render(this,html(_templateObject$7||(_templateObject$7=_taggedTemplateLiteral(["<div class=\"data\">","</div> ","\n           "])),formatDate(this.refeicaoDia.dia,"dd/mm"),itemsShow.length===0?html(_templateObject2$6||(_templateObject2$6=_taggedTemplateLiteral(["<b class=\"info-none text\"> Voc\xEA ainda n\xE3o registrou nenhuma refei\xE7\xE3o hoje.</b>"]))):html(_templateObject3$5||(_templateObject3$5=_taggedTemplateLiteral([" <div class='cols total'>\n                        <div>Total de calorias<span class='text'>","</span></div>\n                        <div>Prote\xEDnas<span class='text'>","</span></div>\n                        <div>Volume <span class='text'>","g </span></div>\n                    </div>\n                    <div class=\"list-space-around\">\n                        ","\n                    </div>\n                    "])),totalCalorias,totalProteinas,totalPeso,itemsShow.map(function(item){return item}))));}}]);return RegistroAlimentosItem}(Base);window.customElements.define("app-registro-alimentos-item",RegistroAlimentosItem);

  var calcularMetaDiaria=function calcularMetaDiaria(){var numPeso=getInputNumber("inputPeso","Preencha o seu peso");var opcaoAtividadeFisica=getInputInt("input[name=inputAtividadeFisica]:checked","Selecione o n\xEDvel de atividade f\xEDsica");var genero=getInputString("input[name=inputGenero]:checked","Selecione o seu g\xEAnero");var objetivo=getInputString("input[name=inputObjetivo]:checked","Selecione o seu objetivo");var altura=getInputNumber("inputAltura","Preencha a sua altura");var idade=getInputInt("inputIdade","Forne\xE7a a sua idade");try{if(validateFields([idade,numPeso,altura,genero,objetivo,opcaoAtividadeFisica])&&genero.value&&opcaoAtividadeFisica.value&&objetivo.value&&altura.value&&idade.value&&numPeso.value){var numTMB=0;if(altura.value&&altura.value.toString().indexOf(".")>-1){altura.value=altura.value*100;}if(genero.value==="M"){numTMB=88.362+13.397*numPeso.value+4.799*altura.value-5.677*idade.value;}if(genero.value==="F"){numTMB=447.593+9.247*numPeso.value+3.098*altura.value-4.33*idade.value;}numTMB=Math.round(numTMB);if(opcaoAtividadeFisica.value>=1&&opcaoAtividadeFisica.value<=3){var resultadoCaloriasPorDia=0;if(opcaoAtividadeFisica.value===1){resultadoCaloriasPorDia=numTMB*1.4;}if(opcaoAtividadeFisica.value===2){resultadoCaloriasPorDia=numTMB*1.6;}if(opcaoAtividadeFisica.value===3){resultadoCaloriasPorDia=numTMB*1.8;}resultadoCaloriasPorDia=Math.round(resultadoCaloriasPorDia);var resultadoParaEmagrecer=Math.round(resultadoCaloriasPorDia-resultadoCaloriasPorDia*0.2);var resultadoParaGanharMassa=Math.round(resultadoCaloriasPorDia+resultadoCaloriasPorDia*0.1);var resultadoProteinas=Math.round(numPeso.value*1.6);var data=[];if(genero&&altura){data.push({key:"genero",value:genero.value});data.push({key:"altura",value:altura.value});data.push({key:"idade",value:idade.value});data.push({key:"tmb",value:numTMB});data.push({key:"peso",value:numPeso.value});data.push({key:"atividadeFisica",value:opcaoAtividadeFisica.value});data.push({key:"manterPeso",value:resultadoCaloriasPorDia});data.push({key:"perderPeso",value:resultadoParaEmagrecer});data.push({key:"ganharMassa",value:resultadoParaGanharMassa});data.push({key:"proteinas",value:resultadoProteinas});data.push({key:"objetivo",value:objetivo.value});}var items=store.getItems(META_DIARIA_STORE);var conditions=[];if(items.length>0){conditions.push({key:"id",value:items[0].id});}store.updateItemsByFields(META_DIARIA_STORE,conditions,data);showOk("Meta Di\xE1ria cadastrada com sucesso.");}else {showWarning("Digite de 1 a 3");}}}catch(e){showError(e.message+" "+altura);}};

  var _templateObject$8,_templateObject2$7;var AppMetaDiaria=function(_Base){_inherits(AppMetaDiaria,_Base);var _super=_createSuper(AppMetaDiaria);function AppMetaDiaria(){var _this;_classCallCheck(this,AppMetaDiaria);_this=_super.call(this);_defineProperty(_assertThisInitialized(_this),"boxResumo",null);return _this}_createClass(AppMetaDiaria,[{key:"save",value:function save(){calcularMetaDiaria();}},{key:"connectedCallback",value:function connectedCallback(){var _this2=this;store.onUpdatedItem(META_DIARIA_STORE,function(e){_this2.showMetaDiaria(e.detail.item);});store.onAddedItem(META_DIARIA_STORE,function(e){_this2.showMetaDiaria(e.detail.item);swapScreen("calculadora");});var items=store.getItems(META_DIARIA_STORE);if(items.length>0){this.showMetaDiaria(items[0]);}else {this.render();}}},{key:"showMetaDiaria",value:function showMetaDiaria(resultado){this.boxResumo=html(_templateObject$8||(_templateObject$8=_taggedTemplateLiteral(["<app-meta-diaria-resumo resultado="," />"])),JSON.stringify(resultado));this.render();setRadiosCheck("inputGenero",resultado.genero);setRadiosCheck("inputAtividadeFisica",resultado.atividadeFisica);setNumberField("inputPeso",resultado.peso);setNumberField("inputAltura",resultado.altura);setNumberField("inputIdade",resultado.idade);setRadiosCheck("inputObjetivo",resultado.objetivo);}},{key:"render",value:function render$1(){render(this,html(_templateObject2$7||(_templateObject2$7=_taggedTemplateLiteral([" \n            <div class=\"form form-bar-bottom\">\n              \n                ","\n                <div class=\"col-2\">\n                    <div>\n                        <label>Digite a sua idade:</label>\n                        <input type=\"number\" class=\"textForm delay1\" id=\"inputIdade\" />\n                    </div>\n                    <div>\n                        <label>Digite o seu peso:</label>\n                        <input type=\"number\" class=\"textForm delay2\" id=\"inputPeso\" />\n                        <div class=\"descricao\">Em quilogramas.</div>\n                    </div>\n                    <div>\n                        <label>Digite a sua altura:</label>\n                        <input type=\"text\" class=\"delay3\" pattern=\"([0-9]+.{0,1}[0-9]*,{0,1})*[0-9]\" id=\"inputAltura\" />\n                        <div class=\"descricao\">Em cent\xEDmetros.</div>\n                    </div>\n                    <div>\n                        <label>Seu g\xEAnero:</label>\n                        <div class=\"radio-group\">\n                            <div class=\"radio\">\n                                <input type=\"radio\" name=\"inputGenero\" value=\"M\" /> <span class=\"delay4\">Masculino</span>\n                            </div>\n                            <div class=\"radio\">\n                                <input type=\"radio\" name=\"inputGenero\" value=\"F\" /> <span class=\"delay5\">Feminino</span>\n                            </div>\n                         </div>\n                    </div>\n                </div>\n                <div class=\"col-2\">\n                    <div>\n                        <label>Seu objetivo:</label>\n                        <div class=\"radio-group\">\n                            <div class=\"radio\">\n                                <input type=\"radio\" name=\"inputObjetivo\" value=\"MM\" /> <span class=\"delay6\">Ganhar massa magra</span>\n                            </div>\n                            <div class=\"radio\">\n                                <input type=\"radio\" name=\"inputObjetivo\" value=\"PP\" /> <span class=\"delay7\">Perder peso</span>\n                            </div>\n                        </div>\n                    </div>\n                  \n                    <div>\n                        <label>N\xEDvel de atividade f\xEDsica:</label>\n                        <div class=\"radio-group\">\n                            <div class=\"radio\">\n                                <input type=\"radio\" name=\"inputAtividadeFisica\" value=\"1\" /> <span class=\"delay8\">Sedent\xE1rio</span>\n                            </div>\n                            <div class=\"radio\">\n                                <input type=\"radio\" name=\"inputAtividadeFisica\" value=\"2\" /> <span class=\"delay9\">Ativo </span>\n                            </div>\n                            <div class=\"radio\">\n                                <input type=\"radio\" name=\"inputAtividadeFisica\" value=\"3\" /> <span class=\"delay10\">Muito ativo </span>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n        \n            </div>\n           "])),this.boxResumo));}}]);return AppMetaDiaria}(Base);window.customElements.define("app-meta-diaria",AppMetaDiaria);

  var _templateObject$9;var AppMetaDiariaResumo=function(_Base){_inherits(AppMetaDiariaResumo,_Base);var _super=_createSuper(AppMetaDiariaResumo);function AppMetaDiariaResumo(){var _this;_classCallCheck(this,AppMetaDiariaResumo);_this=_super.call(this);_defineProperty(_assertThisInitialized(_this),"props",void 0);return _this}_createClass(AppMetaDiariaResumo,[{key:"attributeChangedCallback",value:function attributeChangedCallback(name,oldValue,newValue){if(name==="resultado"){this.props={resultado:JSON.parse(newValue)};this.render();}}},{key:"connectedCallback",value:function connectedCallback(){this.props={resultado:JSON.parse(this.p("resultado"))};this.render();}},{key:"render",value:function render$1(){var calorias=0;var objetivo="";if(this.props.resultado.objetivo==="PP"){objetivo="Emagrecimento";calorias=this.props.resultado.perderPeso;}else {objetivo="Ganhanho de massa";calorias=this.props.resultado.ganharMassa;}render(this,html(_templateObject$9||(_templateObject$9=_taggedTemplateLiteral(["\n                    <div class='list resumo-calorias-diarias'>\n                            <div class='cols'>\n                            <div class='title-objetivo'>","</div>\n                            <div><div class='title'>Calorias por dia</div> <div><b>"," cal </b> </div></div>\n                            <div><div class='title'>Prote\xEDnas por dia</div> <div><b>","g </b> </div></div>\n                            </div>\n                   </div>"])),objetivo,calorias,this.props.resultado.proteinas));}}],[{key:"observedAttributes",get:function get(){return ["resultado"]}}]);return AppMetaDiariaResumo}(Base);window.customElements.define("app-meta-diaria-resumo",AppMetaDiariaResumo);

  var _templateObject$a,_templateObject2$8,_templateObject3$6;var AppMiniSlide=function(_Base){_inherits(AppMiniSlide,_Base);var _super=_createSuper(AppMiniSlide);function AppMiniSlide(){var _this;_classCallCheck(this,AppMiniSlide);_this=_super.call(this);_defineProperty(_assertThisInitialized(_this),"container",void 0);_defineProperty(_assertThisInitialized(_this),"props",void 0);_defineProperty(_assertThisInitialized(_this),"currentIndex",0);_defineProperty(_assertThisInitialized(_this),"touchMove",{startPosX:0,startPosY:0,endPosX:0,endPosY:0,direction:"next"});_defineProperty(_assertThisInitialized(_this),"currentHeight",0);_defineProperty(_assertThisInitialized(_this),"dotsList",[]);_defineProperty(_assertThisInitialized(_this),"REDUCE_HEIGHT",205);_defineProperty(_assertThisInitialized(_this),"setIndex",function(pIdx){if(pIdx>_this.currentIndex){_this.touchMove=_objectSpread2(_objectSpread2({},_this.touchMove),{},{direction:"next"});}else {_this.touchMove=_objectSpread2(_objectSpread2({},_this.touchMove),{},{direction:"prev"});}_this.setCurrentIndex(pIdx);});_defineProperty(_assertThisInitialized(_this),"prev",function(){_this.touchMove=_objectSpread2(_objectSpread2({},_this.touchMove),{},{direction:"prev"});if(_this.currentIndex>0){_this.setCurrentIndex(_this.currentIndex-1);return}_this.setCurrentIndex(_this.props.totalSlides-1);});_defineProperty(_assertThisInitialized(_this),"next",function(){_this.touchMove=_objectSpread2(_objectSpread2({},_this.touchMove),{},{direction:"next"});if(_this.currentIndex<_this.props.totalSlides-1){_this.setCurrentIndex(_this.currentIndex+1);return}_this.setCurrentIndex(0);});_defineProperty(_assertThisInitialized(_this),"onTouchStart",function(e){if(e.touches&&e.touches.length>0){_this.touchMove=_objectSpread2(_objectSpread2({},_this.touchMove),{},{startPosX:e.touches[0].screenX,startPosY:e.touches[0].screenY});}});_defineProperty(_assertThisInitialized(_this),"onTouchMove",function(e){if(e.touches&&e.touches.length>0){_this.touchMove=_objectSpread2(_objectSpread2({},_this.touchMove),{},{endPosX:e.touches[0].screenX,endPosY:e.touches[0].screenY});}});_defineProperty(_assertThisInitialized(_this),"diferencaX",void 0);_defineProperty(_assertThisInitialized(_this),"onTouchEnd",function(e){if(_this.touchMove.endPosX>0){_this.diferencaX=_this.touchMove.startPosX-_this.touchMove.endPosX;var diferencaY=_this.touchMove.startPosY-_this.touchMove.endPosY;if(_this.diferencaX<0){_this.diferencaX=_this.diferencaX*-1;}if(diferencaY<0){diferencaY=diferencaY*-1;}if(_this.diferencaX>diferencaY){if(_this.diferencaX>110){if(_this.touchMove.endPosX<_this.touchMove.startPosX){_this.prev();}else if(_this.touchMove.endPosX>_this.touchMove.startPosX){_this.next();}}}_this.touchMove=_objectSpread2(_objectSpread2({},_this.touchMove),{},{endPosX:0,endPosY:0});}});return _this}_createClass(AppMiniSlide,[{key:"connectedCallback",value:function connectedCallback(){this.props={totalSlides:parseInt(this.p("total-slides")),reverso:parseBool(this.p("reverso"))};this.render();this.renderContainer();if(window.location.href.toString().indexOf("192.168")>0){this.debug=true;}this.container.style.height=(window.innerHeight-this.REDUCE_HEIGHT).toString();}},{key:"setCurrentIndex",value:function setCurrentIndex(newIndex){var newIndexElement=this.container.children[newIndex];this.container.style.height=(window.innerHeight-this.REDUCE_HEIGHT).toString();newIndexElement.classList.remove("close");newIndexElement.classList.remove("close-left");switch(this.touchMove.direction){case"prev":newIndexElement.classList.add("show-right");break;case"next":newIndexElement.classList.add("show");break}if(this.currentIndex!==newIndex){var oldIndexElement=this.container.children[this.currentIndex];oldIndexElement.classList.remove("show");oldIndexElement.classList.remove("show-right");switch(this.touchMove.direction){case"prev":oldIndexElement.classList.add("close-left");break;case"next":oldIndexElement.classList.add("close");break}}this.currentIndex=newIndex;this.render();}},{key:"renderContainer",value:function renderContainer(){var _this2=this;this.container=this.querySelector("#container");if(this.container&&this.childrenHTML!==undefined&&this.childrenHTML!==null){this.container.innerHTML=this.childrenHTML;this.container.addEventListener("touchstart",function(e){return _this2.onTouchStart(e)});this.container.addEventListener("touchmove",function(e){return _this2.onTouchMove(e)});this.container.addEventListener("touchend",function(e){return _this2.onTouchEnd(e)});this.setCurrentIndex(0);}}},{key:"slideDotsClick",value:function slideDotsClick(e){this.setIndex(e.detail.idx);}},{key:"render",value:function render$1(){var _this3=this;this.childrenHTML=this.innerHTML;this.dotsList=[];for(var d=0;d<this.props.totalSlides;d++){this.dotsList.push(d);}if(this.props.reverso){this.dotsList=this.dotsList.sort(function(a,b){return b-a});}render(this,html(_templateObject$a||(_templateObject$a=_taggedTemplateLiteral(["\n        \n             <div class=\"points-bar\">\n                ","\n            </div>\n\n            <div id=\"container\"></div>\n\n            <div class=\"btn-slide-nav left\" onclick=",">\n                <div class=\"text\">\n                    <div class=\"ico-arrow\">\n                    </div>\n                </div>\n            </div>\n\n            <div class=\"btn-slide-nav right\" onclick=",">\n                <div class=\"text\">\n                    <div class=\"ico-arrow\">\n                    </div>\n                </div>\n            </div>\n             \n             "])),this.dotsList.map(function(item,idx){return html(_templateObject2$8||(_templateObject2$8=_taggedTemplateLiteral(["<app-mini-slide-dots  idx="," current-idx="," @updateclick="," />"])),item,_this3.currentIndex,function(e){return _this3.slideDotsClick(e)})}),function(e){return _this3.prev()},function(e){return _this3.next()}));}}]);return AppMiniSlide}(Base);window.customElements.define("app-mini-slide",AppMiniSlide);var AppMiniSlideDots=function(_Base2){_inherits(AppMiniSlideDots,_Base2);var _super2=_createSuper(AppMiniSlideDots);function AppMiniSlideDots(){var _this4;_classCallCheck(this,AppMiniSlideDots);_this4=_super2.call(this);_defineProperty(_assertThisInitialized(_this4),"props",void 0);return _this4}_createClass(AppMiniSlideDots,[{key:"attributeChangedCallback",value:function attributeChangedCallback(name,oldValue,newValue){if(name==="current-idx"){this.props=_objectSpread2(_objectSpread2({},this.props),{},{currentIdx:parseInt(newValue)});}this.render();}},{key:"connectedCallback",value:function connectedCallback(){this.props={idx:parseInt(this.p("idx")),currentIdx:parseInt(this.p("current-idx"))};this.render();}},{key:"setDotIndex",value:function setDotIndex(e){if(e.currentTarget!==null){this.dispatchEvent(new CustomEvent("updateclick",{detail:{idx:this.props.idx}}));}}},{key:"render",value:function render$1(){var _this5=this;render(this,html(_templateObject3$6||(_templateObject3$6=_taggedTemplateLiteral(["<div class="," idx="," onClick=","></div>"])),"point ".concat(this.props.currentIdx===this.props.idx?"show":""),0,function(e){return _this5.setDotIndex(e)}));}}],[{key:"observedAttributes",get:function get(){return ["current-idx"]}}]);return AppMiniSlideDots}(Base);window.customElements.define("app-mini-slide-dots",AppMiniSlideDots);

  var _templateObject$b;var AppConfig=function(_Base){_inherits(AppConfig,_Base);var _super=_createSuper(AppConfig);function AppConfig(){_classCallCheck(this,AppConfig);return _super.call(this)}_createClass(AppConfig,[{key:"connectedCallback",value:function connectedCallback(){this.render();}},{key:"render",value:function render$1(){render(this,html(_templateObject$b||(_templateObject$b=_taggedTemplateLiteral(["\n         <div class=\"form\">\n            <div class=\"row\">\n                <h4> Tema do app </h4>\n                <button class=\"btn-mini\" onclick=",">Trocar tema</button>\n            </div>\n        </div>\n        "])),function(){return swapTheme()}));}}]);return AppConfig}(Base);window.customElements.define("app-config",AppConfig);

  var _templateObject$c,_templateObject2$9,_templateObject3$7,_templateObject4$5,_templateObject5$4,_templateObject6$3,_templateObject7$2,_templateObject8$1,_templateObject9$1,_templateObject10$1,_templateObject11$1,_templateObject12,_templateObject13;var AppMain=function(_Base){_inherits(AppMain,_Base);var _super=_createSuper(AppMain);function AppMain(){var _this;_classCallCheck(this,AppMain);_this=_super.call(this);_defineProperty(_assertThisInitialized(_this),"showTabCaloriaDiaria",false);_defineProperty(_assertThisInitialized(_this),"showTabCalculadora",false);_defineProperty(_assertThisInitialized(_this),"showTabCardapio",false);_defineProperty(_assertThisInitialized(_this),"showView","perfil");return _this}_createClass(AppMain,[{key:"connectedCallback",value:function connectedCallback(){var _this2=this;this.render();window.addEventListener("resize",function(){resizeScreens();});store.onAddedItem(META_DIARIA_STORE,function(e){swapScreen("calculadora");_this2.render();});store.onAddedItem(INGREDIENTES_STORE,function(e){_this2.render();});store.onRemovedItem(INGREDIENTES_STORE,function(e){_this2.render();});store.onCleared(INGREDIENTES_STORE,function(e){_this2.render();});store.onAddedItem(ALIMENTACAO_STORE,function(e){if(e.detail.items.length===1){_this2.render();}});store.onAddedItem(CARDAPIO_STORE,function(e){_this2.render();if(e.detail.items.length===1){swapScreen("cardapio");scrollBodyTop(0);}});}},{key:"btnShowSearchCardapio",value:function btnShowSearchCardapio(){var element=this.querySelector("#appCardapio");if(element){element.swapSearch();}}},{key:"btnAdicionarIngredientesCardapio",value:function btnAdicionarIngredientesCardapio(){var element=this.querySelector("#appIngredientesSelecionados");if(element){element.adicionarItemCardapio();}}},{key:"btnMetaDiariaSaveClick",value:function btnMetaDiariaSaveClick(){var element=this.querySelector("#appMetaDiaria");if(element){element.save();}}},{key:"btnSwitchView",value:function btnSwitchView(param){if(this.showView===param){this.showView="perfil";}else {this.showView=param;}this.render();}},{key:"render",value:function render$1(){var _this3=this;var metaDiariaItems=store.getItems(META_DIARIA_STORE);var cardapioItems=store.getItems(CARDAPIO_STORE);var alimentacaoItems=store.getItems(ALIMENTACAO_STORE);var ingredientesItems=store.getItems(INGREDIENTES_STORE);if(metaDiariaItems.length===0){this.showTabCaloriaDiaria=true;swapScreen("perfil");}else if(cardapioItems.length===0){this.showTabCalculadora=true;}else {this.showTabCardapio=true;this.showTabCaloriaDiaria=true;this.showTabCalculadora=true;}render(this,html(_templateObject$c||(_templateObject$c=_taggedTemplateLiteral(["\n   \n                <div id=\"main\">\n                \n                ","\n\n                 ","\n\n           \n                    <div \n                        class=\"screen close\"\n                        id=\"calculadora\">\n\n                         <div class=\"title\">Calculadora de alimentos</div>\n\n                          ","\n       \n\n                    <div class=\"form\">\n                        <div class=\"full\">\n                            <app-pesquisa-alimento />\n                        </div>\n                        <div class=\"full\">\n                            <app-ingredientes-selecionados id=\"appIngredientesSelecionados\" />\n                        </div>\n                    </div>\n\n                    ","\n                </div>\n                <div class=\"screen close\" id=\"perfil\">\n                    <div class=\"screen-header\">\n                            <div> \n                                <img src=\"img/login.svg\" class=\"btn-icon\" @click=","/>\n                            </div>\n                            <div class=\"title\">Perfil</div>\n                            <div> \n                                <img src=\"img/configuracoes.svg\" class=\"btn-icon\" @click=","/>\n                            </div>\n                        </div>\n                \n                    ","\n\n                    ","\n\n                      ","\n                 \n                </div>\n\n                <div class=\"screen close\" id=\"notfound\">\n                    <div class=\"form\">\n                        <div class=\"row\">\n                            <h4> 404 Se\xE7\xE3o n\xE3o encontrada. </h4>\n                        </div>\n                    </div>\n                </div>\n            </div>\n<!--  https://www.svgrepo.com/collection/solar-outline-icons/10 -->\n\n        <div class=\"screens-nav\">\n            <div>\n                ","\n\n                 ","\n\n                 ","\n\n                <div class=\"btn-screen-switch\" id=\"perfilNav\" onclick=",">     \n                    <img src=\"img/perfil.svg\" /> \n                    <div class=\"btn\">Perfil</div>\n                </div>\n            </div>\n        </div>\n        "])),metaDiariaItems.length>0&&cardapioItems.length>=1?html(_templateObject2$9||(_templateObject2$9=_taggedTemplateLiteral(["\n                    <div \n                    class=\"screen close\" \n                    id=\"cardapio\">\n                        <div class=\"screen-header\">\n                            <div></div>\n                            <div class=\"title\">Meu card\xE1pio</div>\n                            <div> \n                                <img src=\"img/busca.svg\" class=\"btn-icon\" @click=","/>\n                            </div>\n                        </div>\n\n                            ","\n                            \n                       \n                    <div class=\"form\">\n                        <div class=\"full\">\n                            <app-cardapio id=\"appCardapio\" />\n                        </div>\n                    </div>\n                </div>\n                "])),function(e){return _this3.btnShowSearchCardapio()},cardapioItems.length===1&&alimentacaoItems.length===0?html(_templateObject3$7||(_templateObject3$7=_taggedTemplateLiteral([" <div class=\"wizard-message\">\n                                <h1>\xDAltimo passo</h1>\n                                <p>\n                                    Ap\xF3s o cadastro da sua refei\xE7\xE3o, basta informar\n                                    quais consumiu utilizando o bot\xE3o \"Consumi este alimento\". \n                                    <br/>Fa\xE7a diariamente para acompanhar e comparar com a sua meta \n                                    di\xE1ria de calorias e de prote\xEDnas.\n                                </p>\n                            </div>"]))):null):null,alimentacaoItems.length>0?html(_templateObject4$5||(_templateObject4$5=_taggedTemplateLiteral(["\n                <div class=\"screen close\" id=\"registro\">\n                     <div class=\"title\">Minhas refei\xE7\xF5es</div>\n                    <div class=\"form\">\n                        <app-registro-alimentos />\n                    </div>\n                </div>\n                "]))):null,metaDiariaItems.length>0&&ingredientesItems.length===0&&cardapioItems.length===0?html(_templateObject5$4||(_templateObject5$4=_taggedTemplateLiteral([" <div class=\"wizard-message\">\n                                    <h1>Segundo passo</h1>\n                                    <p>\n                                        Fa\xE7a consultas no campo abaixo para descobrir alimentos e compor \n                                        refei\xE7\xF5es que voc\xEA mais consome. \n                                        <br/> Voc\xEA pode separar em 4 categorias:<br/>\n                                        <b>Caf\xE9 da manh\xE3/tarde</b> -  <b>Almo\xE7o/jantar</b> -  <b>Lanches</b> -  <b>Sobremesas</b>. <br/>                        \n                                        Depois do seu Card\xE1pio pronto, basta registrar diariamente quais\n                                        itens voc\xEA consumiu.\n                                    </p>\n                                </div>"]))):null,ingredientesItems.length>0?html(_templateObject6$3||(_templateObject6$3=_taggedTemplateLiteral(["<div class=\"action-bar-bottom\"><button class='btn-main' onclick=","> Adicionar ao card\xE1pio </button></div>"])),function(e){return _this3.btnAdicionarIngredientesCardapio()}):null,function(e){return _this3.btnSwitchView("login")},function(e){return _this3.btnSwitchView("config")},this.showView==="perfil"?html(_templateObject7$2||(_templateObject7$2=_taggedTemplateLiteral(["\n                        ","\n\n                        <app-meta-diaria id=\"appMetaDiaria\" class=\"form-bar-bottom\" />\n\n                        <div class=\"action-bar-bottom\">\n                            <button class=\"btn-main delay11\" onclick=",">Salvar</button>\n                        </div>\n                    "])),this.showTabCaloriaDiaria&&!this.showTabCalculadora&&!this.showTabCardapio?html(_templateObject8$1||(_templateObject8$1=_taggedTemplateLiteral([" <div class=\"wizard-message\">\n                            <h1>Primeiro passo</h1>\n                            <p>\n                                Vamos descobrir a sua meta de consumo de calorias e prote\xEDnas por dia. \n                                Insira as informa\xE7\xF5es no formul\xE1rio abaixo e pressione \"<b>Calcular</b>\". <br/>\n                                N\xE3o se preocupe... voc\xEA poder\xE1 atualizar depois.\n                            </p>\n                        </div>"]))):null,function(){return _this3.btnMetaDiariaSaveClick()}):null,this.showView==="config"?html(_templateObject9$1||(_templateObject9$1=_taggedTemplateLiteral(["\n                        <app-config />\n                    "]))):null,this.showView==="login"?html(_templateObject10$1||(_templateObject10$1=_taggedTemplateLiteral(["\n                        <app-login />\n                    "]))):null,metaDiariaItems.length>0&&cardapioItems.length>=1?html(_templateObject11$1||(_templateObject11$1=_taggedTemplateLiteral(["<div class=\"btn-screen-switch open\" id=\"cardapioNav\" onclick=",">\n                    <img src=\"img/cardapio.svg\" /> \n                    <div class=\"btn\">Card\xE1pio</div>\n                </div>"])),function(e){return swapScreen("cardapio")}):null,alimentacaoItems.length>0?html(_templateObject12||(_templateObject12=_taggedTemplateLiteral(["<div class=\"btn-screen-switch\" id=\"registroNav\" onclick=",">\n                    <img src=\"img/registro.svg\" /> \n                    <div class=\"btn\">Registro</div>\n                </div>"])),function(e){return swapScreen("registro")}):null,metaDiariaItems.length>0?html(_templateObject13||(_templateObject13=_taggedTemplateLiteral(["<div class=\"btn-screen-switch\" id=\"calculadoraNav\" onclick=",">\n                    <img src=\"img/calculadora.svg\" /> \n                    <div class=\"btn\">Calculadora</div>\n                </div>"])),function(e){return swapScreen("calculadora")}):null,function(e){return swapScreen("perfil")}));if(metaDiariaItems.length===0){swapScreen("perfil");}else if(window.location.hash===""&&(this.showTabCaloriaDiaria||this.showTabCalculadora)&&cardapioItems.length>0){swapScreen("cardapio");}else {detectPathScreen();}window.addEventListener("popstate",function(e){detectPathScreen();});}}]);return AppMain}(Base);window.customElements.define("app-main",AppMain);

  var useRequest=function useRequest(error,logout){var post=function post(url,body){return request(url,"POST",JSON.stringify(body))};var get=function(){var _ref=_asyncToGenerator(_regeneratorRuntime().mark(function _callee(url){return _regeneratorRuntime().wrap(function _callee$(_context){while(1)switch(_context.prev=_context.next){case 0:_context.prev=0;_context.next=3;return request(url,"GET",null);case 3:return _context.abrupt("return",_context.sent);case 6:_context.prev=6;_context.t0=_context["catch"](0);showError(_context.t0);case 9:case"end":return _context.stop()}},_callee,null,[[0,6]])}));return function get(_x){return _ref.apply(this,arguments)}}();var del=function(){var _ref2=_asyncToGenerator(_regeneratorRuntime().mark(function _callee2(url){return _regeneratorRuntime().wrap(function _callee2$(_context2){while(1)switch(_context2.prev=_context2.next){case 0:_context2.prev=0;_context2.next=3;return request(url,"DELETE",null);case 3:return _context2.abrupt("return",_context2.sent);case 6:_context2.prev=6;_context2.t0=_context2["catch"](0);showError(_context2.t0);case 9:case"end":return _context2.stop()}},_callee2,null,[[0,6]])}));return function del(_x2){return _ref2.apply(this,arguments)}}();var upload=function(){var _ref3=_asyncToGenerator(_regeneratorRuntime().mark(function _callee3(url,file){var formData;return _regeneratorRuntime().wrap(function _callee3$(_context3){while(1)switch(_context3.prev=_context3.next){case 0:_context3.prev=0;formData=new FormData;_context3.next=4;return formData.append("image",file);case 4:_context3.next=6;return request(url,"POST",formData,"");case 6:return _context3.abrupt("return",_context3.sent);case 9:_context3.prev=9;_context3.t0=_context3["catch"](0);showError(_context3.t0);case 12:case"end":return _context3.stop()}},_callee3,null,[[0,9]])}));return function upload(_x3,_x4){return _ref3.apply(this,arguments)}}();var put=function(){var _ref4=_asyncToGenerator(_regeneratorRuntime().mark(function _callee4(url,body){return _regeneratorRuntime().wrap(function _callee4$(_context4){while(1)switch(_context4.prev=_context4.next){case 0:_context4.prev=0;_context4.next=3;return request(url,"PUT",JSON.stringify(body));case 3:return _context4.abrupt("return",_context4.sent);case 6:_context4.prev=6;_context4.t0=_context4["catch"](0);showError(_context4.t0);case 9:case"end":return _context4.stop()}},_callee4,null,[[0,6]])}));return function put(_x5,_x6){return _ref4.apply(this,arguments)}}();var patch=function(){var _ref5=_asyncToGenerator(_regeneratorRuntime().mark(function _callee5(url,body){return _regeneratorRuntime().wrap(function _callee5$(_context5){while(1)switch(_context5.prev=_context5.next){case 0:_context5.prev=0;_context5.next=3;return request(url,"PATCH",JSON.stringify(body));case 3:return _context5.abrupt("return",_context5.sent);case 6:_context5.prev=6;_context5.t0=_context5["catch"](0);showError(_context5.t0);case 9:case"end":return _context5.stop()}},_callee5,null,[[0,6]])}));return function patch(_x7,_x8){return _ref5.apply(this,arguments)}}();var showError=function showError(obj){try{if(obj){if(error){var msg="";if(obj.error){msg=obj.error.message;}else {msg=obj;}error(msg);if(obj.error&&logout){if(obj.error.statusCode==401||obj.error.statusCode==403){logout();}}}}}catch(er){console.log("er",er);}};var request=function(){var _ref6=_asyncToGenerator(_regeneratorRuntime().mark(function _callee7(url,method){var body,contentType,_args7=arguments;return _regeneratorRuntime().wrap(function _callee7$(_context7){while(1)switch(_context7.prev=_context7.next){case 0:body=_args7.length>2&&_args7[2]!==undefined?_args7[2]:null;contentType=_args7.length>3&&_args7[3]!==undefined?_args7[3]:"application/json";return _context7.abrupt("return",new Promise(function(){var _ref7=_asyncToGenerator(_regeneratorRuntime().mark(function _callee6(resolve,reject){var items,token,config;return _regeneratorRuntime().wrap(function _callee6$(_context6){while(1)switch(_context6.prev=_context6.next){case 0:items=store.getItems(LOGIN_STORE);token=undefined;if(items&&items.length>0){token=items[0].token;}if(token){if(url.indexOf("?")>0){url="".concat(url,"&");}else {url="".concat(url,"?");}url="".concat(url,"access_token=").concat(token);}config={method:method,headers:{}};if(contentType!==""){config.headers={"Content-Type":contentType};}if(method!=="GET"){config["body"]=body;}fetch("".concat(getenv(API_BASE_URL_SERVER)).concat(url),config).then(function(response){if(response.status>=400&&response.status!=412&&response.status!=451&&response.status!=404){return response.json()}else {resolve(response);}}).then(function(object){reject(object);});case 8:case"end":return _context6.stop()}},_callee6)}));return function(_x11,_x12){return _ref7.apply(this,arguments)}}()));case 3:case"end":return _context7.stop()}},_callee7)}));return function request(_x9,_x10){return _ref6.apply(this,arguments)}}();return {del:del,post:post,get:get,put:put,patch:patch,upload:upload,showError:showError}};

  var sendCreate=function sendCreate(email,senha,token){var promise=new Promise(function(resolve,reject){var items=store.getItems(LOGIN_STORE);var data=[];var conditions=[];var _useRequest=useRequest(),post=_useRequest.post;post("/login/create-user/".concat(token),{"email":email,"password":senha}).then(function(){var _ref=_asyncToGenerator(_regeneratorRuntime().mark(function _callee(resp){return _regeneratorRuntime().wrap(function _callee$(_context){while(1)switch(_context.prev=_context.next){case 0:console.log("resp",resp);if(resp){if(resp.error){console.log("resp Err",resp);}else {console.log("resp OK",resp);data.push({key:"email",value:email});data.push({key:"senha",value:senha});data.push({key:"token",value:resp.token});if(items.length>0){conditions.push({key:"id",value:items[0].id});}store.updateItemsByFields(LOGIN_STORE,conditions,data);resolve("ok");}}case 2:case"end":return _context.stop()}},_callee)}));return function(_x){return _ref.apply(this,arguments)}}())["catch"](function(e){console.log(e);showWarning(e.error.message);reject("error");});});return promise};var login=function login(){var promise=new Promise(function(resolve,reject){var email=getInputString("#inputEmail","Insira o seu email");var senha=getInputString("#inputSenha","Insira a sua senha");try{if(validateFields([email,senha])){grecaptcha.ready(function(){grecaptcha.execute("6LcxsKoUAAAAANcv1ELzcW54Yh9SWoLuPMdSdStN",{action:"submit"}).then(function(token){if(email.value&&senha.value){sendCreate(email.value,senha.value,token).then(function(ok){resolve(ok);})["catch"](function(err){reject(err);});}},function(err){showError(err.message);console.log(err);});});}}catch(e){showError(e.message);}});return promise};

  var _templateObject$d;var AppLogin=function(_Base){_inherits(AppLogin,_Base);var _super=_createSuper(AppLogin);function AppLogin(){var _this;_classCallCheck(this,AppLogin);_this=_super.call(this);_defineProperty(_assertThisInitialized(_this),"items",[]);_defineProperty(_assertThisInitialized(_this),"itemsView",[]);_defineProperty(_assertThisInitialized(_this),"showSearch",false);_defineProperty(_assertThisInitialized(_this),"loading",false);return _this}_createClass(AppLogin,[{key:"connectedCallback",value:function connectedCallback(){console.log("fired");this.render();}},{key:"btnLogin",value:function btnLogin(element){element.disabled=true;login().then(function(){element.disabled=false;})["catch"](function(err){element.disabled=false;});}},{key:"render",value:function render$1(){var _this2=this;var disabled=this.loading?"disabled":"";render(this,html(_templateObject$d||(_templateObject$d=_taggedTemplateLiteral(["\n\n           \n              <div class=\"form\">\n              <div class=\"col-1\">\n                  <div>\n                      <label>Seu email:</label>\n                      <input type=\"email\" class=\"textForm delay1\" id=\"inputEmail\" />\n                  </div>\n                  <div>\n                      <label>Senha:</label>\n                      <input type=\"password\" class=\"textForm delay2\" id=\"inputSenha\" />\n                  </div>\n              </div>    \n\n              <div class=\"col-1\">\n                <div class=\"text-mini\">\n                        Este site est\xE1 protegido pelo reCAPTCHA e pela <a href=\"https://policies.google.com/privacy?hl=pt-BR\" target=\"_blank\" rel=\"noreferrer\">Pol\xEDtica de Privacidade</a> e a aplica\xE7\xE3o dos <a href=\"https://policies.google.com/terms\" target=\"_blank\" rel=\"noreferrer\"> Termos de Servi\xE7o</a> do Google.\n                    </div>\n              </div>\n              \n\n              <div class=\"col-1\">\n                <button class=\"btn-main delay4\" @click=",">Salvar</button>\n            </div>\n\n            \n          </div>\n            "])),function(e){return _this2.btnLogin(e)}));}}]);return AppLogin}(Base);window.customElements.define("app-login",AppLogin);

  (function(){loadTheme();})();

}());
