var TWEEN = TWEEN || function () {
        var r, t, u = 60, i = !1, n = [], f;
        return {
            setFPS: function (n) {
                u = n || 60
            }, start: function (n) {
                arguments.length != 0 && this.setFPS(n), t = setInterval(this.update, 1e3 / u)
            }, stop: function () {
                clearInterval(t)
            }, setAutostart: function (n) {
                i = n, i && !t && this.start()
            }, add: function (r) {
                n.push(r), i && !t && this.start()
            }, getAll: function () {
                return n
            }, removeAll: function () {
                n = []
            }, remove: function (t) {
                r = n.indexOf(t), r !== -1 && n.splice(r, 1)
            }, update: function (t) {
                for (var r = 0, u = t || Date.now(); r < n.length;)n[r].update(u) ? r++ : n.splice(r, 1);
                f == 0 && i == !0 && this.stop()
            }
        }
    }(), lastTime, vendors, x;
for (TWEEN.Tween = function (n) {
    var t = n, h = {}, i = {}, r = {}, c = 1e3, u = 0, f = null, l = TWEEN.Easing.Linear.EaseNone, e = null, o = null,
        s = null;
    this.to = function (n, i) {
        i !== null && (c = i);
        for (var u in n)t[u] !== null && (r[u] = n[u]);
        return this
    }, this.start = function (n) {
        TWEEN.add(this), f = n ? n + u : Date.now() + u;
        for (var e in r)t[e] !== null && (h[e] = t[e], i[e] = r[e] - t[e]);
        return this
    }, this.stop = function () {
        return TWEEN.remove(this), this
    }, this.delay = function (n) {
        return u = n, this
    }, this.easing = function (n) {
        return l = n, this
    }, this.chain = function (n) {
        e = n
    }, this.onUpdate = function (n) {
        return o = n, this
    }, this.onComplete = function (n) {
        return s = n, this
    }, this.update = function (n) {
        var u, r, a;
        if (n < f)return !0;
        r = (n - f) / c, r = r > 1 ? 1 : r, a = l(r);
        for (u in i)t[u] = h[u] + i[u] * a;
        return (o !== null && o.call(t, a), r == 1) ? (s !== null && s.call(t), e !== null && e.start(), !1) : !0
    }
}, TWEEN.Easing = {
    Linear: {},
    Quadratic: {},
    Cubic: {},
    Quartic: {},
    Quintic: {},
    Sinusoidal: {},
    Exponential: {},
    Circular: {},
    Elastic: {},
    Back: {},
    Bounce: {}
}, TWEEN.Easing.Linear.EaseNone = function (n) {
    return n
}, TWEEN.Easing.Quadratic.EaseIn = function (n) {
    return n * n
}, TWEEN.Easing.Quadratic.EaseOut = function (n) {
    return -n * (n - 2)
}, TWEEN.Easing.Quadratic.EaseInOut = function (n) {
    return (n *= 2) < 1 ? .5 * n * n : -.5 * (--n * (n - 2) - 1)
}, TWEEN.Easing.Cubic.EaseIn = function (n) {
    return n * n * n
}, TWEEN.Easing.Cubic.EaseOut = function (n) {
    return --n * n * n + 1
}, TWEEN.Easing.Cubic.EaseInOut = function (n) {
    return (n *= 2) < 1 ? .5 * n * n * n : .5 * ((n -= 2) * n * n + 2)
}, TWEEN.Easing.Quartic.EaseIn = function (n) {
    return n * n * n * n
}, TWEEN.Easing.Quartic.EaseOut = function (n) {
    return -(--n * n * n * n - 1)
}, TWEEN.Easing.Quartic.EaseInOut = function (n) {
    return (n *= 2) < 1 ? .5 * n * n * n * n : -.5 * ((n -= 2) * n * n * n - 2)
}, TWEEN.Easing.Quintic.EaseIn = function (n) {
    return n * n * n * n * n
}, TWEEN.Easing.Quintic.EaseOut = function (n) {
    return (n = n - 1) * n * n * n * n + 1
}, TWEEN.Easing.Quintic.EaseInOut = function (n) {
    return (n *= 2) < 1 ? .5 * n * n * n * n * n : .5 * ((n -= 2) * n * n * n * n + 2)
}, TWEEN.Easing.Sinusoidal.EaseIn = function (n) {
    return -Math.cos(n * Math.PI / 2) + 1
}, TWEEN.Easing.Sinusoidal.EaseOut = function (n) {
    return Math.sin(n * Math.PI / 2)
}, TWEEN.Easing.Sinusoidal.EaseInOut = function (n) {
    return -.5 * (Math.cos(Math.PI * n) - 1)
}, TWEEN.Easing.Exponential.EaseIn = function (n) {
    return n == 0 ? 0 : Math.pow(2, 10 * (n - 1))
}, TWEEN.Easing.Exponential.EaseOut = function (n) {
    return n == 1 ? 1 : -Math.pow(2, -10 * n) + 1
}, TWEEN.Easing.Exponential.EaseInOut = function (n) {
    return n == 0 ? 0 : n == 1 ? 1 : (n *= 2) < 1 ? .5 * Math.pow(2, 10 * (n - 1)) : .5 * (-Math.pow(2, -10 * (n - 1)) + 2)
}, TWEEN.Easing.Circular.EaseIn = function (n) {
    return -(Math.sqrt(1 - n * n) - 1)
}, TWEEN.Easing.Circular.EaseOut = function (n) {
    return Math.sqrt(1 - --n * n)
}, TWEEN.Easing.Circular.EaseInOut = function (n) {
    return (n /= .5) < 1 ? -.5 * (Math.sqrt(1 - n * n) - 1) : .5 * (Math.sqrt(1 - (n -= 2) * n) + 1)
}, TWEEN.Easing.Elastic.EaseIn = function (n) {
    var r, t = .1, i = .4;
    return n == 0 ? 0 : n == 1 ? 1 : (i || (i = .3), !t || t < 1 ? (t = 1, r = i / 4) : r = i / (2 * Math.PI) * Math.asin(1 / t), -(t * Math.pow(2, 10 * (n -= 1)) * Math.sin((n - r) * 2 * Math.PI / i)))
}, TWEEN.Easing.Elastic.EaseOut = function (n) {
    var r, t = .1, i = .4;
    return n == 0 ? 0 : n == 1 ? 1 : (i || (i = .3), !t || t < 1 ? (t = 1, r = i / 4) : r = i / (2 * Math.PI) * Math.asin(1 / t), t * Math.pow(2, -10 * n) * Math.sin((n - r) * 2 * Math.PI / i) + 1)
}, TWEEN.Easing.Elastic.EaseInOut = function (n) {
    var r, t = .1, i = .4;
    return n == 0 ? 0 : n == 1 ? 1 : (i || (i = .3), !t || t < 1 ? (t = 1, r = i / 4) : r = i / (2 * Math.PI) * Math.asin(1 / t), (n *= 2) < 1) ? -.5 * t * Math.pow(2, 10 * (n -= 1)) * Math.sin((n - r) * 2 * Math.PI / i) : t * Math.pow(2, -10 * (n -= 1)) * Math.sin((n - r) * 2 * Math.PI / i) * .5 + 1
}, TWEEN.Easing.Back.EaseIn = function (n) {
    var t = 1.70158;
    return n * n * ((t + 1) * n - t)
}, TWEEN.Easing.Back.EaseOut = function (n) {
    var t = 1.70158;
    return (n = n - 1) * n * ((t + 1) * n + t) + 1
}, TWEEN.Easing.Back.EaseInOut = function (n) {
    var t = 1.70158 * 1.525;
    return (n *= 2) < 1 ? .5 * n * n * ((t + 1) * n - t) : .5 * ((n -= 2) * n * ((t + 1) * n + t) + 2)
}, TWEEN.Easing.Bounce.EaseIn = function (n) {
    return 1 - TWEEN.Easing.Bounce.EaseOut(1 - n)
}, TWEEN.Easing.Bounce.EaseOut = function (n) {
    return (n /= 1) < 1 / 2.75 ? 7.5625 * n * n : n < 2 / 2.75 ? 7.5625 * (n -= 1.5 / 2.75) * n + .75 : n < 2.5 / 2.75 ? 7.5625 * (n -= 2.25 / 2.75) * n + .9375 : 7.5625 * (n -= 2.625 / 2.75) * n + .984375
}, TWEEN.Easing.Bounce.EaseInOut = function (n) {
    return n < .5 ? TWEEN.Easing.Bounce.EaseIn(n * 2) * .5 : TWEEN.Easing.Bounce.EaseOut(n * 2 - 1) * .5 + .5
}, window.Aroma = {version: 2, author: "Averta group"}, Aroma.Engine = function (n) {
    this._tweenList = [], this._view = n, this._view.engine = this, this.startEff = function () {
        var o, h, t, c, n, l;
        this._effect.prepare(), this._part_duration = this._duration / (this._selector.getCount() - (1 - this._overlapping) * (this._selector.getCount() - 1)), this._part_delay = this._part_duration * this._overlapping;
        var u = [], i, r, s = 0, f = [], a, e = null;
        for (o = 0, h = this._selector.getCount(); o < h; ++o) {
            for (u = this._selector.getPieceList(), t = 0, c = u.length; t < c; ++t) {
                for (f = this._effect.getToData(), a = this._effect.getFromData(), n = 0, l = f.length; n < l; ++n) {
                    if (r = CloneObject.clone(f[n].options), n == 0 && (r.delay == null ? r.delay = this._part_delay + s + this._startDelay : r.delay += this._part_delay + s + this._startDelay), this.applyFromProperties(u[t], a), i = new TWEEN.Tween(u[t].proxy).delay(r.delay * 1e3 || 0).to(f[n].to, this._part_duration * f[n].time * 1e3).easing(r.ease || TWEEN.Easing.Linear.EaseNone).onUpdate(u[t].proxyUpdate), n == 0 && i.start(), e != null && e.chain(i), e = i, t + 1 == c && o + 1 == h && n + 1 == l) i.onComplete(this.effComp);
                    this._tweenList.push(i)
                }
                e = null
            }
            s += this._part_delay
        }
        this._view.sort && this._view.sortParts(), this._view.prepare()
    }, this.applyFromProperties = function (n, t) {
        for (var i in t)n.proxy[i] = t[i];
        n.proxyUpdate.call(n.proxy)
    }, this.effComp = function () {
        this.piece.view.engine.onComplete && this.piece.view.engine.onComplete.listener.call(this.piece.view.engine.onComplete.ref)
    }
}, Aroma.Engine.prototype.start = function (n, t, i, r, u) {
    this._selector = t, this._effect = n, this._duration = i, this._overlapping = r || .5, this._startDelay = u || 0, this._selector.setup(this._effect, this._view), this.startEff()
}, Aroma.Engine.prototype.reset = function () {
    this._selector = null, this._effect = null, this._duration = 0, this._overlapping = 0, this._startDelay = 0, this._tweenList = []
}, Aroma.Engine.prototype.removeTweens = function () {
    for (var n = 0, t = this._tweenList.length; n < t; n++)TWEEN.remove(this._tweenList[n]), this._tweenList[n] = null
}, Aroma.Engine.prototype.getView = function () {
    return this._view
}, Aroma.AbstractView = function (n, t) {
    this.sort = !1, this.col = t, this.row = n, this.part_width = 0, this.part_height = 0, this._pieceList = [], this.width = 0, this.height = 0, this.vpWidth = 0, this.vpHeight = 0, this.needRendering = !1, this.extra_part_width = 0, this.extra_part_height = 0, this.posToID = function (n, t) {
        return t * this.col + n
    }, this.getPieceBounds = function (n, t) {
        var i = {width: 0, height: 0, x: 0, y: 0};
        return this.extra_part_width == 0 ? (i.x = n * this.part_width, i.width = this.part_width) : (i.width = n > this.extra_part_width ? this.part_width : this.part_width + 1, i.x = n > this.extra_part_width ? (this.part_width + 1) * this.extra_part_width + (n - this.extra_part_width) * this.part_width : (this.part_width + 1) * n), this.extra_part_height == 0 ? (i.y = t * this.part_height, i.height = this.part_height) : (i.height = t > this.extra_part_height ? this.part_height : this.part_height + 1, i.y = t > this.extra_part_height ? (this.part_height + 1) * this.extra_part_height + (t - this.extra_part_height) * this.part_height : (this.part_height + 1) * t), i
    }, this.swapchildren_col = function (n, t) {
        for (var u, i = 0,
                 r = (t - n) / 2; i < r; ++i)u = this._pieceList[n + i], this._pieceList[n + i] = this._pieceList[t - i], this._pieceList[t - i] = u
    }, this.swapchildren_row = function (n) {
        for (var r, t = 0,
                 i = n.length; t < i / 2; ++t)r = this._pieceList[n[t]], this._pieceList[n[t]] = this._pieceList[n[i - t - 1]], this._pieceList[n[i - t - 1]] = r
    }, this.sortInCols = function () {
        var t, i, n;
        if (this.col != 1)for (t = Math.floor(this.col >> 1), i = this._pieceList.length, n = t; n < i; n += this.col)this.swapchildren_col(n, n + (this.col - t) - 1)
    }, this.sortInRows = function () {
        var r, n, t, i;
        if (this.row != 1)for (r = Math.floor(this.row >> 1), n = [], t = 0; t < this.col; ++t) {
            for (i = 0; i < this.row - r; ++i)n.push(r * this.col + t + i * this.col);
            this.swapchildren_row(n), n = []
        }
    }
}, Aroma.AbstractView.prototype.getCount = function () {
    return this.row * this.col
}, Aroma.AbstractView.prototype.prepare = function () {
}, Aroma.AbstractView.prototype.setSize = function (n, t) {
    this.part_height = Math.floor(t / this.row), this.extra_part_height = t % this.row, this.part_width = Math.floor(n / this.col), this.extra_part_width = n % this.col, this.width = n, this.height = t
}, Aroma.AbstractView.prototype.setViewPortSize = function (n, t) {
    this.vpWidth = n, this.vpHeight = t
}, Aroma.AbstractView.prototype.dispose = function () {
    for (var n = 0,
             t = this._pieceList.length; n < t; ++n)this._pieceList[n] && this._pieceList[n].dispose(), this._pieceList[n] = null;
    this._pieceList = []
}, Aroma.AbstractView.prototype.sortParts = function () {
    this.sortInCols(), this.sortInRows()
}, window.CloneObject = window.ConcatObject || {}, CloneObject.clone = function (n) {
    var t, i;
    if (n == null)return {};
    t = {};
    for (i in n)t[i] = n[i];
    return t
}, ConcatObject = {}, ConcatObject.concat = function (n, t) {
    for (var i in t)n[i] = t[i];
    return n
}, window.setOpacity = function (n, t) {
    n.style.filter = "alpha(opacity=" + t + ")", n.style.opacity = t * .01, n.style.MozOpacity = t * .01, n.style.KhtmlOpacity = t * .01, n.style.MSOpacity = t * .01
}, Aroma.AbstractSelector = function () {
    this.selectNum = 1
}, Aroma.AbstractSelector.prototype.getCount = function () {
    return Math.floor(this.view.getCount() / this.selectNum)
}, Aroma.AbstractSelector.prototype.setup = function (n, t) {
    this.effect = n, this.view = t, n.selector = this, n.view = t
}, Aroma.AbstractSelector.prototype.reset = function () {
}, Aroma.SerialSelector = function (n, t, i) {
    this.row = 0, this.col = 0, this.row_len = 0, this.col_len = 0, this.selectNum = i || 1, this.zigzag = t, this.dir = n || "tlr", this.convertPoint = function (n, t) {
        switch (this.dir) {
            case"tlr":
                return {row: n, col: t};
            case"tld":
                return {row: t, col: n};
            case"trl":
                return {row: n, col: this.col_len - t - 1};
            case"trd":
                return {row: t, col: this.row_len - n - 1};
            case"brl":
                return {row: this.row_len - n - 1, col: this.col_len - t - 1};
            case"bru":
                return {row: this.col_len - t - 1, col: this.row_len - n - 1};
            case"blr":
                return {row: row_len - n - 1, col: t};
            case"blu":
                return {row: this.col_len - t - 1, col: n}
        }
        return {row: n, col: t}
    }
}, Aroma.SerialSelector.prototype = new Aroma.AbstractSelector, Aroma.SerialSelector.prototype.constructor = Aroma.SerialSelector, Aroma.SerialSelector.prototype.getPieceList = function () {
    var i = [], n = {}, t;
    for (this.dir.charAt(2) == "u" || this.dir.charAt(2) == "d" ? (this.col_len = this.view.row, this.row_len = this.view.col) : (this.col_len = this.view.col, this.row_len = this.view.row), t = 0; t < this.selectNum; t++)n = this.convertPoint(this.row, this.zigzag && this.row % 2 != 0 ? this.col_len - this.col - 1 : this.col), i.push(this.view.getPieceAt(n.col, n.row, this.effect)), this.col++, this.col == this.col_len && (this.col = 0, this.row++);
    return i
}, Aroma.SerialSelector.prototype.reset = function () {
    this.row = 0, this.col = 0
}, Aroma.DiagonalSelector = function (n, t) {
    this.selectNum = t || 1, this.startPoint = n || "tl";
    var r = 0, i = 0, f = 0, o = 0, e = 0, u = !0;
    this.getList = function () {
        for (var t = [], n = 0; n < this.selectNum; n++) {
            switch (this.startPoint) {
                case"tl":
                    u ? u = !1 : i != 0 && r != this.view.row - 1 ? (i--, r++) : (i = ++f, i > this.view.col - 1 ? (r = ++e, i = this.view.col - 1) : r = 0);
                    break;
                case"tr":
                    u ? (u = !1, i = this.view.col - 1) : i != this.view.col - 1 && r != this.view.row - 1 ? (i++, r++) : (i = this.view.col - 1 - ++f, i < 0 ? (r = ++e, i = 0) : r = 0);
                    break;
                case"bl":
                    u ? (u = !1, r = this.view.row - 1) : i != 0 && r != 0 ? (i--, r--) : (i = ++f, i > this.view.col - 1 ? (r = this.view.row - 1 - ++e, i = this.view.col - 1) : r = this.view.row - 1);
                    break;
                case"br":
                    u ? (u = !1, r = this.view.row - 1, i = this.view.col - 1) : i != this.view.col - 1 && r != 0 ? (i++, r--) : (i = this.view.col - 1 - ++f, i < 0 ? (r = this.view.row - 1 - ++e, i = 0) : r = this.view.row - 1)
            }
            t[n] = this.view.getPieceAt(i, r, this.effect)
        }
        return t
    }, this._reset = function () {
        r = 0, i = 0, f = 0, o = 0, e = 0, u = !0
    }
}, Aroma.DiagonalSelector.prototype = new Aroma.AbstractSelector, Aroma.DiagonalSelector.prototype.constructor = Aroma.DiagonalSelector, Aroma.DiagonalSelector.TOP_LEFT = "tl", Aroma.DiagonalSelector.BOTTOM_LEFT = "bl", Aroma.DiagonalSelector.TOP_RIGHT = "tr", Aroma.DiagonalSelector.BOTTOM_RIGHT = "br", Aroma.DiagonalSelector.prototype.getPieceList = function () {
    return this.getList()
}, Aroma.DiagonalSelector.prototype.reset = function () {
    return this._reset()
}, Aroma.RandSelector = function (n) {
    this.selectNum = n || 1, this.id_rand_list = [], this.shuffle = function (n) {
        var t = Math.floor(Math.random() * n.length), i = n[t];
        return n.splice(t, 1), i
    }
}, Aroma.RandSelector.prototype = new Aroma.AbstractSelector, Aroma.RandSelector.prototype.constructor = Aroma.RandSelector, Aroma.RandSelector.prototype.setup = function (n, t) {
    Aroma.AbstractSelector.prototype.setup.call(this, n, t);
    for (var i = 0, r = t.col * t.row; i < r; ++i)this.id_rand_list[i] = i
}, Aroma.RandSelector.prototype.getPieceList = function () {
    for (var i = [], t = 0,
             n = 0; n < this.selectNum; ++n)t = this.shuffle(this.id_rand_list), i[n] = this.view.getPieceAt(Math.floor(t / this.view.row), t % this.view.row, this.effect);
    return i
}, Aroma.Piece = function () {
    this.col = 0, this.row = 0, this.bounds = {}, this.origin_x = 0, this.origin_y = 0, this.origin_z = 0, this.options = {}
}, Aroma.Effect = function () {
    this.pieceOptions = {}, this.isStatic = !1
}, Aroma.Effect.prototype.addFrame = function (n, t, i) {
    this.data.push({time: n, to: t, options: i})
}, Aroma.Effect.prototype.getToData = function () {
    return this.data != null && this.isStatic ? this.data : (this.data = [], this.getTo(), this.data)
}, Aroma.Effect.prototype.getFromData = function () {
    return this.fromData != null && this.isStatic ? this.fromData : this.isStatic ? (this.fromData = this.getFrom(), this.fromData) : this.getFrom()
}, Aroma.Effect.prototype.prepare = function () {
}, Aroma.Effect.prototype.getPieceOptions = function () {
    return this.pieceOptions
}, !function (n, t) {
    "use strict";
    var it = "", nt = "?", d = "function", b = "undefined", g = "object", o = "major", u = "model", i = "name",
        f = "type", e = "vendor", r = "version", a = "architecture", tt = "console", h = "mobile", c = "tablet", k = {
            has: function (n, t) {
                return t.toLowerCase().indexOf(n.toLowerCase()) !== -1
            }, lowerize: function (n) {
                return n.toLowerCase()
            }
        }, s = {
            rgx: function () {
                for (var r, o, l, u, n, s, i, c, e, f = 0, h = arguments; f < h.length; f += 2) {
                    if (c = h[f], e = h[f + 1], typeof r === b) {
                        r = {};
                        for (u in e)n = e[u], typeof n === g ? r[n[0]] = t : r[n] = t
                    }
                    for (o = l = 0; o < c.length; o++)if (s = c[o].exec(this.getUA()), !!s) {
                        for (u = 0; u < e.length; u++)i = s[++l], n = e[u], typeof n === g && n.length > 0 ? n.length == 2 ? r[n[0]] = typeof n[1] == d ? n[1].call(this, i) : n[1] : n.length == 3 ? r[n[0]] = typeof n[1] !== d || n[1].exec && n[1].test ? i ? i.replace(n[1], n[2]) : t : i ? n[1].call(this, i, n[2]) : t : n.length == 4 && (r[n[0]] = i ? n[3].call(this, i.replace(n[1], n[2])) : t) : r[n] = i ? i : t;
                        break
                    }
                    if (!!s)break
                }
                return r
            }, str: function (n, i) {
                var r, u;
                for (r in i)if (typeof i[r] === g && i[r].length > 0) {
                    for (u = 0; u < i[r].length; u++)if (k.has(i[r][u], n))return r === nt ? t : r
                } else if (k.has(i[r], n))return r === nt ? t : r;
                return n
            }
        }, v = {
            browser: {
                oldsafari: {
                    major: {1: ["/8", "/1", "/3"], 2: "/4", "?": "/"},
                    version: {
                        "1.0": "/8",
                        1.2: "/1",
                        1.3: "/3",
                        "2.0": "/412",
                        "2.0.2": "/416",
                        "2.0.3": "/417",
                        "2.0.4": "/419",
                        "?": "/"
                    }
                }
            },
            device: {sprint: {model: {"Evo Shift 4G": "7373KT"}, vendor: {HTC: "APA", Sprint: "Sprint"}}},
            os: {
                windows: {
                    version: {
                        ME: "4.90",
                        "NT 3.11": "NT3.51",
                        "NT 4.0": "NT4.0",
                        2e3: "NT 5.0",
                        XP: ["NT 5.1", "NT 5.2"],
                        Vista: "NT 6.0",
                        7: "NT 6.1",
                        8: "NT 6.2",
                        RT: "ARM"
                    }
                }
            }
        }, y = {
            browser: [[/(opera\smini)\/((\d+)?[\w\.-]+)/i, /(opera\s[mobiletab]+).+version\/((\d+)?[\w\.-]+)/i, /(opera).+version\/((\d+)?[\w\.]+)/i, /(opera)[\/\s]+((\d+)?[\w\.]+)/i], [i, r, o], [/\s(opr)\/((\d+)?[\w\.]+)/i], [[i, "Opera"], r, o], [/(kindle)\/((\d+)?[\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?((\d+)?[\w\.]+)*/i, /(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?((\d+)?[\w\.]*)/i, /(?:ms|\()(ie)\s((\d+)?[\w\.]+)/i, /(rekonq)((?:\/)[\w\.]+)*/i, /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron)\/((\d+)?[\w\.-]+)/i], [i, r, o], [/(trident).+rv[:\s]((\d+)?[\w\.]+).+like\sgecko/i], [[i, "IE"], r, o], [/(yabrowser)\/((\d+)?[\w\.]+)/i], [[i, "Yandex"], r, o], [/(comodo_dragon)\/((\d+)?[\w\.]+)/i], [[i, /_/g, " "], r, o], [/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?((\d+)?[\w\.]+)/i], [i, r, o], [/(dolfin)\/((\d+)?[\w\.]+)/i], [[i, "Dolphin"], r, o], [/((?:android.+)crmo|crios)\/((\d+)?[\w\.]+)/i], [[i, "Chrome"], r, o], [/version\/((\d+)?[\w\.]+).+?mobile\/\w+\s(safari)/i], [r, o, [i, "Mobile Safari"]], [/version\/((\d+)?[\w\.]+).+?(mobile\s?safari|safari)/i], [r, o, i], [/webkit.+?(mobile\s?safari|safari)((\/[\w\.]+))/i], [i, [o, s.str, v.browser.oldsafari.major], [r, s.str, v.browser.oldsafari.version]], [/(konqueror)\/((\d+)?[\w\.]+)/i, /(webkit|khtml)\/((\d+)?[\w\.]+)/i], [i, r, o], [/(navigator|netscape)\/((\d+)?[\w\.-]+)/i], [[i, "Netscape"], r, o], [/(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?((\d+)?[\w\.\+]+)/i, /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix)\/((\d+)?[\w\.-]+)/i, /(mozilla)\/((\d+)?[\w\.]+).+rv\:.+gecko\/\d+/i, /(uc\s?browser|polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|qqbrowser)[\/\s]?((\d+)?[\w\.]+)/i, /(links)\s\(((\d+)?[\w\.]+)/i, /(gobrowser)\/?((\d+)?[\w\.]+)*/i, /(ice\s?browser)\/v?((\d+)?[\w\._]+)/i, /(mosaic)[\/\s]((\d+)?[\w\.]+)/i], [i, r, o]],
            cpu: [[/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i], [[a, "amd64"]], [/((?:i[346]|x)86)[;\)]/i], [[a, "ia32"]], [/windows\s(ce|mobile);\sppc;/i], [[a, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i], [[a, /ower/, "", k.lowerize]], [/(sun4\w)[;\)]/i], [[a, "sparc"]], [/(ia64(?=;)|68k(?=\))|arm(?=v\d+;)|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i], [a, k.lowerize]],
            device: [[/\((ipad|playbook);[\w\s\);-]+(rim|apple)/i], [u, e, [f, c]], [/(hp).+(touchpad)/i, /(kindle)\/([\w\.]+)/i, /\s(nook)[\w\s]+build\/(\w+)/i, /(dell)\s(strea[kpr\s\d]*[\dko])/i], [e, u, [f, c]], [/\((ip[honed]+);.+(apple)/i], [u, e, [f, h]], [/(blackberry)[\s-]?(\w+)/i, /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|huawei|meizu|motorola)[\s_-]?([\w-]+)*/i, /(hp)\s([\w\s]+\w)/i, /(asus)-?(\w+)/i], [e, u, [f, h]], [/\((bb10);\s(\w+)/i], [[e, "BlackBerry"], u, [f, h]], [/android.+((transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+))/i], [[e, "Asus"], u, [f, c]], [/(sony)\s(tablet\s[ps])/i], [e, u, [f, c]], [/(nintendo)\s([wids3u]+)/i], [e, u, [f, tt]], [/((playstation)\s[3portablevi]+)/i], [[e, "Sony"], u, [f, tt]], [/(sprint\s(\w+))/i], [[e, s.str, v.device.sprint.vendor], [u, s.str, v.device.sprint.model], [f, h]], [/(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i, /(zte)-(\w+)*/i, /(alcatel|geeksphone|huawei|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]+)*/i], [e, [u, /_/g, " "], [f, h]], [/\s((milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?(:?\s4g)?))[\w\s]+build\//i, /(mot)[\s-]?(\w+)*/i], [[e, "Motorola"], u, [f, h]], [/android.+\s((mz60\d|xoom[\s2]{0,2}))\sbuild\//i], [[e, "Motorola"], u, [f, c]], [/android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n8000|sgh-t8[56]9))/i], [[e, "Samsung"], u, [f, c]], [/((s[cgp]h-\w+|gt-\w+|galaxy\snexus))/i, /(sam[sung]*)[\s-]*(\w+-?[\w-]*)*/i, /sec-((sgh\w+))/i], [[e, "Samsung"], u, [f, h]], [/(sie)-(\w+)*/i], [[e, "Siemens"], u, [f, h]], [/(maemo|nokia).*(n900|lumia\s\d+)/i, /(nokia)[\s_-]?([\w-]+)*/i], [[e, "Nokia"], u, [f, h]], [/android\s3\.[\s\w-;]{10}((a\d{3}))/i], [[e, "Acer"], u, [f, c]], [/android\s3\.[\s\w-;]{10}(lg?)-([06cv9]{3,4})/i], [[e, "LG"], u, [f, c]], [/((nexus\s4))/i, /(lg)[e;\s-\/]+(\w+)*/i], [[e, "LG"], u, [f, h]], [/(mobile|tablet);.+rv\:.+gecko\//i], [f, e, u]],
            engine: [[/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i, /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i, /(icab)[\/\s]([23]\.[\d\.]+)/i], [i, r], [/rv\:([\w\.]+).*(gecko)/i], [r, i]],
            os: [[/(windows)\snt\s6\.2;\s(arm)/i, /(windows\sphone(?:\sos)*|windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i], [i, [r, s.str, v.os.windows.version]], [/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i], [[i, "Windows"], [r, s.str, v.os.windows.version]], [/\((bb)(10);/i], [[i, "BlackBerry"], r], [/(blackberry)\w*\/?([\w\.]+)*/i, /(tizen)\/([\w\.]+)/i, /(android|webos|palm\os|qnx|bada|rim\stablet\sos|meego)[\/\s-]?([\w\.]+)*/i], [i, r], [/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]+)*/i], [[i, "Symbian"], r], [/mozilla.+\(mobile;.+gecko.+firefox/i], [[i, "Firefox OS"], r], [/(nintendo|playstation)\s([wids3portablevu]+)/i, /(mint)[\/\s\(]?(\w+)*/i, /(joli|[kxln]?ubuntu|debian|[open]*suse|gentoo|arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk)[\/\s-]?([\w\.-]+)*/i, /(hurd|linux)\s?([\w\.]+)*/i, /(gnu)\s?([\w\.]+)*/i], [i, r], [/(cros)\s[\w]+\s([\w\.]+\w)/i], [[i, "Chromium OS"], r], [/(sunos)\s?([\w\.]+\d)*/i], [[i, "Solaris"], r], [/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]+)*/i], [i, r], [/(ip[honead]+)(?:.*os\s*([\w]+)*\slike\smac|;\sopera)/i], [[i, "iOS"], [r, /_/g, "."]], [/(mac\sos\sx)\s?([\w\s\.]+\w)*/i], [i, [r, /_/g, "."]], [/(haiku)\s(\w+)/i, /(aix)\s((\d)(?=\.|\)|\s)[\w\.]*)*/i, /(macintosh|mac(?=_powerpc)|plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos)/i, /(unix)\s?([\w\.]+)*/i], [i, r]]
        }, l = function (t) {
            var i = t || (n && n.navigator && n.navigator.userAgent ? n.navigator.userAgent : it);
            if (!(this instanceof l))return new l(t).getResult();
            this.getBrowser = function () {
                return s.rgx.apply(this, y.browser)
            }, this.getCPU = function () {
                return s.rgx.apply(this, y.cpu)
            }, this.getDevice = function () {
                return s.rgx.apply(this, y.device)
            }, this.getEngine = function () {
                return s.rgx.apply(this, y.engine)
            }, this.getOS = function () {
                return s.rgx.apply(this, y.os)
            }, this.getResult = function () {
                return {
                    ua: this.getUA(),
                    browser: this.getBrowser(),
                    engine: this.getEngine(),
                    os: this.getOS(),
                    device: this.getDevice(),
                    cpu: this.getCPU()
                }
            }, this.getUA = function () {
                return i
            }, this.setUA = function (n) {
                return i = n, this
            }, this.setUA(i)
        }, p, w;
    typeof exports !== b ? (typeof module !== b && module.exports && (exports = module.exports = l), exports.UAParser = l) : (n.UAParser = l, typeof define === d && define.amd && define(function () {
        return l
    }), typeof n.jQuery !== b && (p = n.jQuery, w = new l, p.ua = w.getResult(), p.ua.get = function () {
        return w.getUA()
    }, p.ua.set = function (n) {
        var t, i;
        w.setUA(n), t = w.getResult();
        for (i in t)p.ua[i] = t[i]
    }))
}(this), window.Cute = {version: "2.4.2", name: "Cute Slider", author: "Averta Ltd."}, Cute.Effect1 = function (n) {
    Aroma.Effect.prototype.constructor.call(this), n = n || {}, this.ease = n.ease || TWEEN.Easing.Linear, this.isStatic = !0
}, Cute.Effect1.prototype = new Aroma.Effect, Cute.Effect1.prototype.constructor = Cute.Effect1, Cute.Effect1.prototype.getToVars = function () {
    this.addFrame(1, {opacity: 100}, {ease: this.ease.EaseOut})
}, Cute.Effect1.prototype.getFromVars = function () {
    return {opacity: 0, slide: 100}
}, Cute.Effect1.prototype.prepare = function () {
    this.getFrom = this.getFrom || this.getFromVars, this.getTo = this.getTo || this.getToVars
}, Cute.Effect2 = function (n) {
    Aroma.Effect.prototype.constructor.call(this), n = n || {}, this.pieceOptions.dir = n.dir || "r", this.pieceOptions.push = n.push, this.ease = n.ease || TWEEN.Easing.Linear, this.fade = n.fade, this.isStatic = !0
}, Cute.Effect2.prototype = new Aroma.Effect, Cute.Effect2.prototype.constructor = Cute.Effect2, Cute.Effect2.prototype.getToVars = function () {
    this.addFrame(1, this.fade ? {opacity: 100, slide: 100} : {slide: 100}, {ease: this.ease.EaseInOut})
}, Cute.Effect2.prototype.getFromVars = function () {
    return this.fade ? {opacity: 0, slide: 0} : {slide: 0}
}, Cute.Effect2.prototype.prepare = function () {
    this.getFrom = this.getFrom || this.getFromVars, this.getTo = this.getTo || this.getToVars
}, Cute.Effect3 = function (n) {
    Cute.Effect2.prototype.constructor.call(this, n), this.dir_name_arr = ["r", "l", "t", "b"]
}, Cute.Effect3.prototype = new Cute.Effect2, Cute.Effect3.prototype.constructor = Cute.Effect3, Cute.Effect3.prototype.getPieceOptions = function () {
    return this.pieceOptions.dir = this.dir_name_arr[Math.round(parseInt(Math.random() * 3))], this.pieceOptions
}, Cute.Effect4 = function (n) {
    Cute.Effect3.prototype.constructor.call(this, n), this.counter = 0, this.rotation_dir = n.dir || "vertical"
}, Cute.Effect4.prototype = new Cute.Effect3,Cute.Effect4.prototype.constructor = Cute.Effect4,Cute.Effect4.prototype.getPieceOptions = function () {
    return this.pieceOptions.dir = this.dir_name_arr[(this.counter++ % 2 ? 0 : 1) + (this.rotation_dir == "vertical" ? 2 : 0)], this.pieceOptions
},Cute.Effect5 = function (n) {
    Aroma.Effect.prototype.constructor.call(this), n = n || {}, this.side = n.side || "r", this.zmove = n.zmove || 0, this.rotation_axis = "y", this.rotation_dir = 1, this.xspace = n.xspace || 0, this.yspace = n.yspace || 0, this.stack = n.stack || !1, this.balance = n.blance || .5, this.ease = n.ease || TWEEN.Easing.Linear, this.isStatic = !1
},Cute.Effect5.prototype = new Aroma.Effect,Cute.Effect5.prototype.constructor = Cute.Effect5,Cute.Effect5.prototype.createFrames = function (n, t) {
    if (this.stack) {
        var i = {};
        i.x = (this.piece.col - Math.floor(this.view.col * .5)) * this.xspace, i.y = (this.piece.row - Math.floor(this.view.row * .5)) * this.yspace, i.z = this.zmove, this.addFrame(this.balance * .5, i, {ease: this.ease.EaseInOut}), this.addFrame(1 - this.balance, t, {ease: this.ease.EaseInOut}), this.addFrame(this.balance * .5, {
            z: 0,
            x: 0,
            y: 0
        }, {ease: this.ease.EaseInOut})
    } else n.z = this.zmove, t.z = 0, n.x = (this.piece.col - Math.floor(this.view.col * .5)) * this.xspace, n.y = (this.piece.row - Math.floor(this.view.row * .5)) * this.yspace, t.y = t.x = 0, this.addFrame(.5, n, {ease: this.ease.EaseIn}), this.addFrame(.5, t, {ease: this.ease.EaseOut})
},Cute.Effect5.prototype.getToVars = function () {
    var n = {}, t = {};
    this.rotation_axis == "y" ? (n.rotationY = 45 * this.rotation_dir, t.rotationY = 90 * this.rotation_dir) : (n.rotationX = 45 * this.rotation_dir, t.rotationX = 90 * this.rotation_dir), this.createFrames(n, t)
},Cute.Effect5.prototype.getFromVars = function () {
    return {}
},Cute.Effect5.prototype.checkSidePos = function () {
    switch (this.side) {
        case"r":
            this.pieceOptions.newImageLocation = this.piece.side_dic.right, this.pieceOptions.depth = this.piece.bounds.width, this.rotation_axis = "y", this.rotation_dir = 1;
            break;
        case"l":
            this.pieceOptions.newImageLocation = this.piece.side_dic.left, this.pieceOptions.depth = this.piece.bounds.width, this.rotation_axis = "y", this.rotation_dir = -1;
            break;
        case"t":
            this.pieceOptions.newImageLocation = this.piece.side_dic.top, this.pieceOptions.depth = this.piece.bounds.height, this.rotation_axis = "x", this.rotation_dir = 1;
            break;
        case"b":
            this.pieceOptions.newImageLocation = this.piece.side_dic.bottom, this.pieceOptions.depth = this.piece.bounds.height, this.rotation_axis = "x", this.rotation_dir = -1
    }
},Cute.Effect5.prototype.prepare = function () {
    this.getFrom = this.getFrom || this.getFromVars, this.getTo = this.getTo || this.getToVars
},Cute.Effect5.prototype.getPieceOptions = function () {
    return this.checkSidePos(), this.pieceOptions
},Cute.Effect6 = function (n) {
    Cute.Effect5.prototype.constructor.call(this, n), this.slide_name_arr = ["l", "r", "b", "t"]
},Cute.Effect6.prototype = new Cute.Effect5,Cute.Effect6.prototype.constructor = Cute.Effect6,Cute.Effect6.prototype.getPieceOptions = function () {
    return this.side = this.slide_name_arr[Math.round(parseInt(Math.random() * 3))], this.checkSidePos(), this.pieceOptions
},Cute.Effect7 = function (n) {
    Cute.Effect6.prototype.constructor.call(this, n), this.counter = 0, this._move = n.dir || "vertical"
},Cute.Effect7.prototype = new Cute.Effect6,Cute.Effect7.prototype.constructor = Cute.Effect7,Cute.Effect7.prototype.getPieceOptions = function () {
    return this.side = this.slide_name_arr[(this.counter++ % 2 ? 0 : 1) + (this._move == "vertical" ? 2 : 0)], this.checkSidePos(), this.pieceOptions
},Cute.Effect8 = function (n) {
    n = n || {}, Cute.Effect5.prototype.constructor.call(this, n), this.sideColor = n.sidecolor || 0, this.depth = n.depth || -1, this.dir = n.dir || "u", this.rotation_axis = "x", this.rotation_dir = 1
},Cute.Effect8.prototype = new Cute.Effect5,Cute.Effect8.prototype.constructor = Cute.Effect8,Cute.Effect8.prototype.getToVars = function () {
    var n = {}, t = {};
    this.rotation_axis == "y" ? (n.rotationY = 90 * this.rotation_dir, t.rotationY = 180 * this.rotation_dir) : (n.rotationX = 90 * this.rotation_dir, t.rotationX = 180 * this.rotation_dir), this.createFrames(n, t)
},Cute.Effect8.prototype.updateConfig = function () {
    this.pieceOptions.sideColor = this.sideColor, this.pieceOptions.depth = this.depth <= 0 ? this.dir == "u" || this.dir == "d" ? this.piece.bounds.height : this.piece.bounds.width : this.depth, this.rotation_axis = this.dir == "u" || this.dir == "d" ? "x" : "y", this.rotation_dir = this.dir == "u" || this.dir == "r" ? 1 : -1, this.pieceOptions.flipX = this.pieceOptions.flipY = this.dir == "u" || this.dir == "d"
},Cute.Effect8.prototype.getPieceOptions = function () {
    return this.updateConfig(), this.pieceOptions
},Cute.Effect9 = function (n) {
    Cute.Effect8.prototype.constructor.call(this, n), this.dir_name_arr = ["l", "r", "u", "d"]
},Cute.Effect9.prototype = new Cute.Effect8,Cute.Effect9.prototype.constructor = Cute.Effect9,Cute.Effect9.prototype.getPieceOptions = function () {
    return this.dir = this.dir_name_arr[Math.round(parseInt(Math.random() * 3))], this.updateConfig(), this.pieceOptions
},Cute.Effect10 = function (n) {
    Cute.Effect9.prototype.constructor.call(this, n), this.counter = 0, this._move = n.dir || "vertical"
},Cute.Effect10.prototype = new Cute.Effect9,Cute.Effect10.prototype.constructor = Cute.Effect10,Cute.Effect10.prototype.getPieceOptions = function () {
    return this.dir = this.dir_name_arr[(this.counter++ % 2 ? 0 : 1) + (this._move == "vertical" ? 2 : 0)], this.updateConfig(), this.pieceOptions
},Cute.Effect11 = function (n) {
    Cute.Effect8.call(this, n), n = n || {}, this.rotation_x = 0, this.rotation_y = 0, this.dir = n.dir || "tr", this.pieceOptions.flipX = this.pieceOptions.flipY = !0
},Cute.Effect11.prototype = new Cute.Effect8,Cute.Effect11.prototype.constructor = Cute.Effect11,Cute.Effect11.prototype.getToVars = function () {
    var n = {}, t = {};
    this.rotation_x != 0 && (n.rotationX = 90 * this.rotation_x, t.rotationX = 180 * this.rotation_x), this.rotation_y != 0 && (n.rotationY = 180 * this.rotation_y, t.rotationY = 360 * this.rotation_y), this.createFrames(n, t)
},Cute.Effect11.prototype.updateConfig = function () {
    this.pieceOptions.sideColor = this.sideColor, this.pieceOptions.depth = this.depth <= 0 ? 10 : this.depth;
    switch (this.dir.charAt(0)) {
        case"t":
            this.rotation_x = -1;
            break;
        case"b":
            this.rotation_x = 1
    }
    switch (this.dir.charAt(1)) {
        case"r":
            this.rotation_y = -1;
            break;
        case"l":
            this.rotation_y = 1
    }
},Cute.Effect12 = function (n) {
    Cute.Effect11.prototype.constructor.call(this, n), this.dir_name_arr = ["tl", "tr", "bl", "br"]
},Cute.Effect12.prototype = new Cute.Effect11,Cute.Effect12.prototype.constructor = Cute.Effect12,Cute.Effect12.prototype.getPieceOptions = function () {
    return this.dir = this.dir_name_arr[Math.round(parseInt(Math.random() * 3))], this.updateConfig(), this.pieceOptions
},function () {
    function n() {
        for (var n = 0,
                 t = window.resizeListeners.length; n < t; ++n)window.resizeListeners[n].listener.call(window.resizeListeners[n].ref)
    }

    window.resizeListeners = [], window.addEventListener ? window.addEventListener("resize", n) : window.attachEvent && window.attachEvent("onresize", n), window.addResizeListener = function (n, t) {
        window.resizeListeners.push({listener: n, ref: t})
    }, window.removeResizeListener = function (n, t) {
        for (var i = 0; i < window.resizeListeners.length; ++i)window.resizeListeners[i].listener == n && window.resizeListeners[i].ref == t && window.resizeListeners.splice(i, 1)
    }
}(),Averta = {},Averta.Timer = function (n, t) {
    this.delay = n, this.currentCount = 0, this.paused = !1, this.onTimer = null, this.refrence = null, t && this.start()
},Averta.Timer.prototype = {
    constructor: Averta.Timer, start: function () {
        this.paused = !1, this.lastTime = Date.now()
    }, stop: function () {
        this.paused = !0
    }, reset: function () {
        this.currentCount = 0, this.paused = !0, this.lastTime = Date.now()
    }, update: function () {
        this.paused || Date.now() - this.lastTime < this.delay || (this.currentCount++, this.lastTime = Date.now(), this.onTimer && this.onTimer.call(this.refrence, this.getTime()))
    }, getTime: function () {
        return this.delay * this.currentCount
    }
},lastTime = 0,vendors = ["ms", "moz", "webkit", "o"],x = 0; x < vendors.length && !window.requestAnimationFrame; ++x)window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[vendors[x] + "CancelAnimationFrame"] || window[vendors[x] + "CancelRequestAnimationFrame"];
window.requestAnimationFrame || (window.requestAnimationFrame = function (n) {
    var t = (new Date).getTime(), i = Math.max(0, 16 - (t - lastTime)), r = window.setTimeout(function () {
        n(t + i)
    }, i);
    return lastTime = t + i, r
}), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (n) {
    clearTimeout(n)
}), Cute.Ticker = Cute.Ticker || {
        list: [], __stoped: !0, add: function (n, t) {
            return Cute.Ticker.list.push([n, t]), Cute.Ticker.list.length
        }, remove: function (n, t) {
            for (var i = 0,
                     r = Cute.Ticker.list.length; i < r; ++i)Cute.Ticker.list[i] && Cute.Ticker.list[i][0] == n && Cute.Ticker.list[i][1] == t && Cute.Ticker.list.splice(i, 1)
        }, start: function () {
            Cute.Ticker.__stoped && (Cute.Ticker.__stoped = !1, Cute.Ticker.__tick())
        }, stop: function () {
            Cute.Ticker.__stoped = !0
        }, __tick: function () {
            if (!Cute.Ticker.__stoped) {
                for (var n = 0; n < Cute.Ticker.list.length; ++n)Cute.Ticker.list[n][0].call(Cute.Ticker.list[n][1]);
                requestAnimationFrame(Cute.Ticker.__tick)
            }
        }
    }, Cute.FallBack = function () {
}, Cute.FallBack.CANVAS = "canvas", Cute.FallBack.CSS3D = "css3d", Cute.FallBack.DOM2D = "dom2d", Cute.FallBack.ua = (new UAParser).getResult(), Cute.FallBack.prototype = {
    force: null,
    __result: null,
    getType: function () {
        if (this.__result)return this.__result;
        if (this.force) {
            switch (this.force.toLowerCase()) {
                case"2d":
                    this.__result = Cute.FallBack.DOM2D;
                    break;
                case"canvas":
                    this.__result = Cute.FallBack.CANVAS;
                    break;
                case"css":
                    this.__result = Cute.FallBack.CSS3D
            }
            if (this.__result)return this.__result
        }
        var i = Cute.FallBack.ua, n = Cute.FallBack.DOM2D, r = i.os.name.toLowerCase(),
            t = i.browser.name.toLowerCase(), u = !1;
        switch (r) {
            case"windows":
            case"mac os":
            case"linux":
            case"ubuntu":
                t == "chrome" || t == "safari" || t == "chromium" || i.engine.name == "AppleWebKit" ? n = Cute.FallBack.CSS3D : (t == "ie" && parseInt(i.browser.major) >= 9 || t == "firefox" || t == "opera") && (n = Cute.FallBack.CANVAS);
                break;
            case"ios":
                n = Cute.FallBack.CSS3D;
                break;
            case"android":
                parseInt(i.os.version.charAt(0)) >= 4 && (n = Cute.FallBack.CSS3D);
                break;
            case"windows phone os":
                n = Cute.FallBack.DOM2D;
                break;
            default:
                u = !0
        }
        return window.Modernizr && (n != Cute.FallBack.CANVAS || Modernizr.canvas ? n != Cute.FallBack.CSS3D || Modernizr.csstransforms3d ? u && (Modernizr.csstransforms3d ? n = Cute.FallBack.CSS3D : Modernizr.canvas && (n = Cute.FallBack.CANVAS)) : n = Cute.FallBack.DOM2D : n = Cute.FallBack.DOM2D), r == "android" && t == "mobile safari" && (n = Cute.FallBack.DOM2D), this.__result = n, n
    }
}, Cute.FallBack.isIE = Cute.FallBack.ua.browser.name == "IE", Cute.FallBack.isIE7 = Cute.FallBack.isIE && Cute.FallBack.ua.browser.major == 7, Cute.FallBack.isIE8 = Cute.FallBack.isIE && Cute.FallBack.ua.browser.major == 8, Cute.FallBack.isMobileDevice = Cute.FallBack.ua.os.name.toLowerCase() == "android" || Cute.FallBack.ua.os.name.toLowerCase() == "ios" || Cute.FallBack.ua.os.name.toLowerCase() == "windows phone os", function () {
    Cute.FallBack.ua.browser.name == "IE" && parseInt(Cute.FallBack.ua.browser.major) < 9 && (Date.now = function () {
        return (new Date).getTime()
    }, Array.prototype.indexOf = function (n) {
        for (var t = 0, i = this.length; t < i; ++t)if (this[t] == n)return t;
        return -1
    })
}(), Cute.ModuleLoader = function (n) {
    this.fallBack = n
}, Cute.ModuleLoader.loadedModules = {
    css3d: !1,
    canvas: !1,
    dom2d: !1
}, Cute.ModuleLoader.css3d_files = ["js/cute/cute.css3d.module.js"], Cute.ModuleLoader.canvas_files = ["js/cute/cute.canvas.module.js"], Cute.ModuleLoader.dom2d_files = ["js/cute/cute.2d.module.js"], Cute.ModuleLoader.prototype = {
    onComplete: null,
    loadModule: function () {
        var t = this.fallBack.getType(), n, i;
        if (Cute.ModuleLoader.loadedModules[t]) {
            this.onComplete && (Cute.ModuleLoader.loadedModules[t] = !0, this.onComplete.listener.call(this.onComplete.ref));
            return
        }
        n = [];
        switch (t) {
            case Cute.FallBack.CSS3D:
                n = Cute.ModuleLoader.css3d_files;
                break;
            case Cute.FallBack.CANVAS:
                n = Cute.ModuleLoader.canvas_files;
                break;
            case Cute.FallBack.DOM2D:
                n = Cute.ModuleLoader.dom2d_files
        }
        i = this, yepnope({
            load: n, complete: function () {
                i.onComplete && (Cute.ModuleLoader.loadedModules[t] = !0, i.onComplete.listener.call(i.onComplete.ref))
            }
        })
    }
}, window.Averta = window.Averta || {}, Averta.EventDispatcher = function () {
    this.listeners = {}
}, Averta.EventDispatcher.extend = function (n) {
    var i = new Averta.EventDispatcher, t;
    for (t in i)t != "constructor" && (n[t] = Averta.EventDispatcher.prototype[t])
}, Averta.EventDispatcher.prototype = {
    constructor: Averta.EventDispatcher, addEventListener: function (n, t, i) {
        this.listeners[n] || (this.listeners[n] = []), this.listeners[n].push({listener: t, ref: i})
    }, removeEventListener: function (n, t, i) {
        if (this.listener[n.type]) {
            for (var r = 0,
                     u = this.listeners[n].length; r < u; ++r)t == this.listeners[n][r].listener && i == this.listeners[n][r].ref && this.listeners[n].splice(r);
            this.listeners[n].length == 0 && delete this.listeners[n]
        }
    }, dispatchEvent: function (n) {
        if (n.target = this, this.listeners[n.type])for (var t = 0,
                                                             i = this.listeners[n.type].length; t < i; ++t)this.listeners[n.type][t].listener.call(this.listeners[n.type][t].ref, n)
    }
}, Cute.SliderEvent = function (n) {
    this.type = n
}, Cute.SliderEvent.CHANGE_START = "changeStart", Cute.SliderEvent.CHANGE_END = "changeEnd", Cute.SliderEvent.WATING = "wating", Cute.SliderEvent.AUTOPLAY_CHANGE = "autoplayChange", Cute.SliderEvent.CHANGE_NEXT_SLIDE = "changeNextSlide", Cute.SliderEvent.WATING_FOR_NEXT = "watingForNextSlide", window.Averta = window.Averta || {}, Averta.ScrollContainer = function (n, t) {
    this.element = n, this.scrollStartPosY = 0, this.scrollStartPosX = 0, this.content = t, this.lastX = 0, this.lastY = 0, this.moved = !1, this.isTouch = function () {
        return "ontouchstart" in document
    }
}, Averta.ScrollContainer.prototype = {
    constrcutor: Averta.ScrollContainer, setup: function () {
        function i(i) {
            t ? (n.scrollStartPosX = i.touches[0].pageX, n.scrollStartPosY = i.touches[0].pageY) : (n.scrollStartPosX = i.clientX, n.scrollStartPosY = i.clientY), n.mouseDown = !0, n.moved = !1, window.addEventListener && i.preventDefault()
        }

        function r(i) {
            if (n.mouseDown) {
                if (t) {
                    var r = i.touches[0].pageX, u = i.touches[0].pageY;
                    n.move(r - n.scrollStartPosX + n.lastX, u - n.scrollStartPosY + n.lastY), n.scrollStartPosX = r, n.scrollStartPosY = u
                } else n.move(i.clientX - n.scrollStartPosX + n.lastX, i.clientY - n.scrollStartPosY + n.lastY), n.scrollStartPosX = i.clientX, n.scrollStartPosY = i.clientY;
                window.addEventListener && i.preventDefault()
            }
        }

        function u(i) {
            if (n.mouseDown) {
                if (n.mouseDown = !1, window.addEventListener && i.preventDefault(), t) {
                    document.removeEventListener("touchend", n.element, !1);
                    return
                }
                document.detachEvent ? document.detachEvent("onmousemove", n.element) : document.removeEventListener("mousemove", n.element, !1)
            }
        }

        if (!Cute.FallBack.isIE8 && !Cute.FallBack.isIE7) {
            var n = this, t = this.isTouch();
            if (t) {
                this.element.addEventListener("touchstart", i), this.element.addEventListener("touchmove", r);
                return
            }
            if (window.addEventListener) {
                this.element.addEventListener("mousedown", i, !1), document.addEventListener("mousemove", r, !1), document.addEventListener("mouseup", u, !1);
                return
            }
            this.element.attachEvent("onmousedown", i, !1), document.attachEvent("onmousemove", r, !1), document.attachEvent("onmouseup", u, !1)
        }
    }, move: function (n, t) {
        this.moved = !0, this.element.scrollTop = -t, this.element.scrollLeft = -n, this.lastX = -this.element.scrollLeft, this.lastY = -this.element.scrollTop
    }, translate: function (n, t) {
        this.move(this.lastX + (n || 0), this.lastY + (t || 0))
    }
}, Cute.ItemList = function (n) {
    this.frame = document.createElement("div"), this.frame.className = "il-frame", this.content = document.createElement("div"), this.content.className = "il-content", this.type = "vertical", this.items = [], this.sc = new Averta.ScrollContainer(this.frame, this.content);
    var t = this, i = 0, r = !1, u = this.sc.isTouch();
    this.__scrollnext = function (n) {
        r = !0, i = 2, Cute.Ticker.add(t.__scrolling, t), u && n.preventDefault()
    }, this.__scrollprev = function (n) {
        r = !0, i = -2, Cute.Ticker.add(t.__scrolling, t), u && n.preventDefault()
    }, this.__stopscroll = function (n) {
        r && (r = !1, Cute.Ticker.remove(t.__scrolling, t), t.sc.moved = !1, u && n.preventDefault())
    }, this.__scrolling = function () {
        t.type == "vertical" ? t.sc.translate(0, i) : t.sc.translate(-i, 0)
    }, this.upleft = document.createElement("div"), this.upleft.onmousedown = this.__scrollprev, this.downright = document.createElement("div"), this.downright.onmousedown = this.__scrollnext, document.onmouseup = this.__stopscroll, u && (this.upleft.addEventListener("touchstart", this.__scrollprev, !1), this.downright.addEventListener("touchstart", this.__scrollnext, !1), document.addEventListener("touchend", this.__stopscroll, !1)), n.appendChild(this.frame), n.appendChild(this.downright), n.appendChild(this.upleft), this.frame.appendChild(this.content), this.addItem = function (n) {
        this.content.appendChild(n), this.items.push(n)
    }
}, Cute.Slide = function (n) {
    this.src = "", this.delay = 0, this.slider = n, this.ready = !1, this._index = 0, this.autoPlay = !0, this.pluginData = {}, this.opacity = 100, this.domElement = document.createElement("div"), this.domElement.style.width = "100%", this.domElement.style.height = "auto", this.domElement.style.overflow = "hidden", this.domElement.style.position = "absolute", this.domElement.style.zIndex = "1"
}, Cute.Slide.prototype = {
    constructor: Cute.Slide, loadContent: function () {
        this.src != null ? (this.image = new Image, this.image.slide = this, this.image.onload = this.contentLoaded, this.image.src = this.src, this.image.style.width = "100%", this.image.style.height = "auto") : (this.ready = !0, this.onReady.listener.call(this.onReady.ref))
    }, killLoading: function () {
        this.image.onload = null
    }, addContent: function (n) {
        this.domElement.appendChild(n), this.image = n, this.image.style.width = "100%", this.image.style.height = "auto", this.ready = !0, this.onReady && this.onReady.listener.call(this.onReady.ref), this.prepareToShow(), this.showIsDone()
    }, showIsDone: function () {
    }, hideIsDone: function () {
    }, prepareToShow: function () {
    }, prepareToHide: function () {
    }, contentLoaded: function () {
        this.slide.domElement.appendChild(this), this.slide.ready = !0, this.slide.onReady && this.slide.onReady.listener.call(this.slide.onReady.ref)
    }, opacityUpdate: function () {
        setOpacity(this.domElement, this.opacity)
    }
}, Cute.SlideManager = function () {
    Averta.EventDispatcher.prototype.constructor.call(this), this.width = 0, this.height = 0, this._timer = new Averta.Timer(100), this._slideList = [], this._currentSlideIndex = 0, this._delayProgress = 0, this._autoPlay = !0, this._status = "", this.domElement = document.createElement("div"), this.domElement.style.position = "relative", this._timer.onTimer = this.onTimer, this._timer.refrence = this
}, Cute.SlideManager.prototype = {
    constructor: Cute.SlideManager, startTimer: function () {
        return this._autoPlay ? (this._timer.start(), !0) : !1
    }, skipTimer: function () {
        this._timer.reset(), this._delayProgress = 100, this.dispatchEvent(new Cute.SliderEvent(Cute.SliderEvent.WATING))
    }, onTimer: function () {
        this._timer.getTime() >= this._currentSlide.delay * 1e3 && (this._timer.stop(), this._nextSlide.ready ? this.showSlide(this._nextSlide) : this.waitForNext()), this._delayProgress = this._timer.getTime() / (this._currentSlide.delay * 10), this.dispatchEvent(new Cute.SliderEvent(Cute.SliderEvent.WATING))
    }, prepareTransition: function (n) {
        return this.rotator.fallBack.getType() == Cute.FallBack.DOM2D ? n.transitions2D[parseInt(Math.random() * n.transitions2D.length)] : n.transitions3D[parseInt(Math.random() * n.transitions3D.length)]
    }, showSlide: function (n) {
        var t = this.prepareTransition(n);
        this._oldSlide = this._currentSlide, this._currentSlide = n, this._oldSlide.prepareToHide(), n.prepareToShow(), this._view = new this._viewClass(t.row, t.col), this._view.setSize(this.width, this.height), this._view.setViewPortSize(this.vpWidth, this.vpHeight), this._view.oldSource = this._oldSlide.image, this._view.newSource = n.image, this._view.setup(), this._view.needRendering && Cute.Ticker.add(this._view.render, this._view), this._engine = new Aroma.Engine(this._view), t.selector.reset(), this._engine.start(t.effect, t.selector, t.duration, t.overlapping, .45), this._engine.onComplete = {
            ref: this,
            listener: this.transitionCl
        }, this._replaceTween = new TWEEN.Tween(this._oldSlide).to({opacity: 0}, 450).onUpdate(this._oldSlide.opacityUpdate).start(), this._replaceTween.slider = this, this.newSlide = n;
        this._replaceTween.onComplete(function () {
            this.slider.domElement.removeChild(this.domElement)
        });
        this.domElement.appendChild(this._view.viewport), this._view.viewport.style.position = "absolute", this._view.viewport.style.zIndex = "0", this._view.viewport.style.marginLeft = -(this.vpWidth - this.width) / 2 + "px", this._view.viewport.style.marginTop = -(this.vpHeight - this.height) / 2 + "px", this._currentSlideIndex = n.index, this._timer.reset(), this._delayProgress = 0, this._status = "changing", this.dispatchEvent(new Cute.SliderEvent(Cute.SliderEvent.WATING)), this.dispatchEvent(new Cute.SliderEvent(Cute.SliderEvent.CHANGE_START))
    }, transitionCl: function () {
        this._engine.reset(), this._currentSlide.opacity = 0, this.domElement.appendChild(this._currentSlide.domElement), this._replaceTween2 = new TWEEN.Tween(this._currentSlide).to({opacity: 100}, 450).onUpdate(this._currentSlide.opacityUpdate), TWEEN.add(this._replaceTween2), this._replaceTween2.start();
        this._replaceTween2.onComplete(function () {
            this.slider._view.needRendering && Cute.Ticker.remove(this.slider._view.render, this.slider._view), TWEEN.remove(this.slider._replaceTween2), this.slider.domElement.removeChild(this.slider._view.viewport), this.slider._view.dispose(), this.slider._view = null, this.slider._currentSlide.showIsDone(), this.slider._oldSlide.hideIsDone(), this.slider._status = "wating", this.slider.dispatchEvent(new Cute.SliderEvent(Cute.SliderEvent.CHANGE_END))
        });
        this._engine = null, this.startTimer(), this.gotoSlide(this.getNextIndex())
    }, readyToShow: function () {
        this._delayProgress == 100 && this.showSlide(this._nextSlide)
    }, waitForNext: function () {
        this._status = "loading", this.dispatchEvent(new Cute.SliderEvent(Cute.SliderEvent.WATING_FOR_NEXT))
    }, resize: function () {
        this._status == "changing" && (this._engine && (this._engine.removeTweens(), this._engine.reset()), this._view && (this._view.needRendering && Cute.Ticker.remove(this._view.render, this._view), this.domElement.removeChild(this._view.viewport), this._view.dispose(), this._view = null, this._engine = null), this._replaceTween2 && (this._replaceTween2.stop(), TWEEN.remove(this._replaceTween2)), this._currentSlide.domElement.parentElement || this.domElement.appendChild(this._currentSlide.domElement), this._currentSlide.opacity = 100, this._currentSlide.opacityUpdate(), this._currentSlide.showIsDone(), this._replaceTween && (this._replaceTween.stop(), TWEEN.remove(this._replaceTween)), this._oldSlide.domElement.parentElement || this.domElement.appendChild(this._oldSlide.domElement), this._oldSlide.opacity = 0, this._oldSlide.opacityUpdate(), this._oldSlide.hideIsDone(), this._status = "wating", this.dispatchEvent(new Cute.SliderEvent(Cute.SliderEvent.CHANGE_END)), this.startTimer(), this.gotoSlide(this.getNextIndex()))
    }, getNextIndex: function () {
        return this._currentSlideIndex + 1 == this._slideList.length ? 0 : this._currentSlideIndex + 1
    }, getPreviousIndex: function () {
        return this._currentSlideIndex - 1 == -1 ? this._slideList.length - 1 : this._currentSlideIndex - 1
    }, gotoSlide: function (n, t) {
        if (t && (this.skipTimer(), this._nextSlide && this._nextSlide.index == n)) {
            this._nextSlide.ready ? this.showSlide(this._nextSlide) : this.waitForNext();
            return
        }
        this._nextSlide && this._nextSlide.index == n || (this._nextSlide && (this._nextSlide.killLoading(), this._nextSlide = null), this._nextSlide = this._slideList[n], this._nextSlide.ready ? this._delayProgress == 100 && this.showSlide(this._slideList[n]) : (t && this.waitForNext(), this._nextSlide.onReady = {
            listener: this.readyToShow,
            ref: this
        }, this._nextSlide.loadContent()), this.dispatchEvent(new Cute.SliderEvent(Cute.SliderEvent.CHANGE_NEXT_SLIDE)))
    }, start: function () {
        this._currentSlide = this._slideList[this._currentSlideIndex], this.domElement.appendChild(this._currentSlide.domElement), this.dispatchEvent(new Cute.SliderEvent(Cute.SliderEvent.CHANGE_END)), this.startTimer(), this.gotoSlide(this.getNextIndex()), this.vpWidth = this.vpWidth || this.width, this.vpHeight = this.vpHeight || this.height
    }, next: function () {
        this._status != "changing" && this.gotoSlide(this.getNextIndex(), !0)
    }, previous: function () {
        this._status != "changing" && this.gotoSlide(this.getPreviousIndex(), !0)
    }, pushSlide: function (n) {
        return this._slideList.push(n), n.index = this._slideList.length - 1, this._slideList.length - 1
    }, pause: function () {
        this._timer.stop()
    }, play: function () {
        this._timer.start()
    }, getTimer: function () {
        return this._timer
    }, getSlideList: function () {
        return this._slideList
    }, getNextSlide: function () {
        return this._nextSlide
    }, getCurrentSlide: function () {
        return this._currentSlide
    }, getCurrentSlideIndex: function () {
        return this._currentSlideIndex
    }, delayProgress: function () {
        return this._delayProgress
    }, getAutoPlay: function () {
        return this._autoPlay
    }, setAutoPlay: function (n) {
        this._autoPlay != n && (this._autoPlay = n, this._autoPlay ? this._timer.start() : this._timer.stop(), this.dispatchEvent(new Cute.SliderEvent(Cute.SliderEvent.AUTOPLAY_CHANGE)))
    }
}, Averta.EventDispatcher.extend(Cute.SlideManager.prototype), Cute.rotatorControls = {}, Cute.AbstractControl = function (n) {
    this.config = null, this.slider = n, this.domElement = null, this.disable = !1, this.name = "", this.config = {}, this.opacity = 100, this.showTween = null
}, Cute.AbstractControl.prototype = {
    constructor: Cute.AbstractControl, setup: function (n) {
        this.config_ele = n, this.domElement.className = n.className || this.config.css_class, n.getAttribute("style") && this.domElement.setAttribute("style", n.getAttribute("style")), this.slider.addEventListener(Cute.SliderEvent.CHANGE_START, this.__effStart, this), this.slider.addEventListener(Cute.SliderEvent.CHANGE_END, this.__effEnd, this)
    }, opacityUpdate: function () {
        setOpacity(this.domElement, this.opacity)
    }, visible: function (n) {
        this.domElement.style.display = n ? "" : "none"
    }, show: function () {
        this.showTween && this.showTween.stop(), this.showTween = new TWEEN.Tween(this).to({opacity: 100}, 450).onUpdate(this.opacityUpdate).start(), TWEEN.add(this.showTween)
    }, hide: function () {
        this.showTween && this.showTween.stop(), this.showTween = new TWEEN.Tween(this).to({opacity: 0}, 450).onUpdate(this.opacityUpdate).start(), TWEEN.add(this.showTween)
    }, __effEnd: function () {
        this.visible(!0), this.config.autoHide || this.show(), this.ap && this.slider.setAutoPlay(!0)
    }, __effStart: function () {
        this.hide()
    }
}, Cute.Next = function (n) {
    Cute.AbstractControl.prototype.constructor.call(this, n), this.domElement = document.createElement("div"), this.config = {css_class: "br-next"}
}, Cute.rotatorControls.next = Cute.Next, Cute.Next.prototype = new Cute.AbstractControl, Cute.Next.prototype.constructor = Cute.Next, Cute.Next.prototype.setup = function (n) {
    Cute.AbstractControl.prototype.setup.call(this, n), this.domElement.control = this, this.domElement.onclick = function () {
        this.control.slider.next()
    }
}, Cute.Next.prototype.show = function () {
    Cute.AbstractControl.prototype.show.call(this), this.domElement.style.cursor = "pointer"
}, Cute.Next.prototype.hide = function () {
    Cute.AbstractControl.prototype.hide.call(this), this.domElement.style.cursor = ""
}, Cute.Previous = function (n) {
    Cute.Next.call(this, n), this.config = {css_class: "br-previous"}
}, Cute.rotatorControls.previous = Cute.Previous, Cute.Previous.prototype = new Cute.Next, Cute.Previous.prototype.constructor = Cute.Previous, Cute.Previous.prototype.setup = function (n) {
    Cute.Next.prototype.setup.call(this, n), this.domElement.onclick = function () {
        this.control.slider.previous()
    }
}, Cute.CircleTimer = function (n) {
    (Cute.AbstractControl.call(this, n), this.domElement = document.createElement("div"), this.lbrowser = Cute.FallBack.ua.browser.name.toLowerCase() == "ie" && parseInt(Cute.FallBack.ua.browser.major) < 9, this.lbrowser) || (this.config = {
        color: "#A2A2A2",
        stroke: 10,
        radius: 4,
        css_class: "br-circle-timer"
    }, this.overpause = !1, this.canvas = document.createElement("canvas"), this.dot = document.createElement("div"), this.ctx = this.canvas.getContext("2d"), this.prog = 0, this.drawTween = null)
}, Cute.rotatorControls.circletimer = Cute.CircleTimer, Cute.CircleTimer.prototype = new Cute.AbstractControl, Cute.CircleTimer.prototype.constructor = Cute.CircleTimer, Cute.CircleTimer.prototype.setup = function (n) {
    this.lbrowser || (Cute.AbstractControl.prototype.setup.call(this, n), this.config.color = n.getAttribute("data-color") || this.config.color, n.getAttribute("data-stroke") && (this.config.stroke = parseInt(n.getAttribute("data-stroke"))), n.getAttribute("data-radius") && (this.config.radius = parseInt(n.getAttribute("data-radius"))), this.__w = (this.config.radius + this.config.stroke) * 2, this.canvas.width = this.__w, this.canvas.height = this.__w, this.canvas.className = "br-timer-stroke", this.canvas.style.position = "absolute", this.dot.className = "br-timer-dot", this.dot.style.position = "relative", this.dot.style.left = (this.__w - 10) * .5 + "px", this.dot.style.top = (this.__w - 12) * .5 + "px", this.domElement.slider = this.slider, this.domElement.onclick = function () {
        Cute.AbstractControl.paused ? (Cute.AbstractControl.paused = !1, this.slider.setAutoPlay(!0)) : (Cute.AbstractControl.paused = !0, this.slider.setAutoPlay(!1))
    }, this.slider.addEventListener(Cute.SliderEvent.WATING, this.update, this), this.domElement.appendChild(this.canvas), this.domElement.appendChild(this.dot))
}, Cute.CircleTimer.prototype.update = function () {
    this.drawTween && this.drawTween.stop(), this.drawTween = new TWEEN.Tween(this).to({prog: this.slider.delayProgress() * .01}, 300).easing(TWEEN.Easing.Circular.EaseOut).onUpdate(this.draw).start()
}, Cute.CircleTimer.prototype.draw = function () {
    this.ctx.clearRect(0, 0, this.__w, this.__w), this.ctx.beginPath(), this.ctx.arc(this.__w * .5, this.__w * .5, this.config.radius, Math.PI * 1.5, Math.PI * 1.5 + 2 * Math.PI * this.prog, !1), this.ctx.strokeStyle = this.config.color, this.ctx.lineWidth = this.config.stroke, this.ctx.stroke()
}, Cute.CircleTimer.prototype.show = function () {
    Cute.AbstractControl.prototype.show.call(this), this.domElement.style.cursor = "pointer"
}, Cute.CircleTimer.prototype.hide = function () {
    Cute.AbstractControl.prototype.hide.call(this), this.domElement.style.cursor = ""
}, Cute.Thumb = function (n, t) {
    this.domElement = document.createElement("div"), this.domElement.className = "br-thumb-" + t, this.imgCont = document.createElement("div"), this.imgCont.className = "br-thumb-img", this.imgCont.style.overflow = "hidden", this.img = new Image, this.img.thumb = this, this.img.onload = this.thumbLoaded, this.img.src = n, this.img.style.position = "absolute", this.img.style.filter = "inherit", this.frame = document.createElement("div"), this.frame.style.position = "absolute", this.frame.style.zIndex = "1", this.frame.className = "br-thumb-frame", this.frame.style.filter = "inherit", this.thumb_pos = 1, this.imgCont.appendChild(this.img), this.domElement.appendChild(this.imgCont), this.domElement.appendChild(this.frame)
}, Cute.Thumb.prototype = {
    constructor: Cute.Thumb, thumbLoaded: function () {
        this.thumb.imgLoaded = !0, this.thumb.rts && this.thumb.show()
    }, ut: function () {
        this.img.style.transform = "scale(" + this.thumb_pos + ")", this.img.style.webkitTransform = "scale(" + this.thumb_pos + ")", this.img.style.MozTransform = "scale(" + this.thumb_pos + ") rotate(0.1deg)", this.img.style.msTransform = "scale(" + this.thumb_pos + ")", this.img.style.OTransform = "scale(" + this.thumb_pos + ")"
    }, show: function () {
        if (!this.imgLoaded) {
            this.rts = !0;
            return
        }
    }, reset: function () {
        this.rts = !1, this.st && (this.st.stop(), this.st = null)
    }
}, Cute.SlideControl = function (n) {
    Cute.AbstractControl.call(this, n), this.config = {
        css_class: "br-slidecontrol",
        thumb: !0,
        thumb_align: "bottom"
    }, this.domElement = document.createElement("div"), this.points_ul = document.createElement("ul"), this.points = []
}, Cute.rotatorControls.slidecontrol = Cute.SlideControl, Cute.SlideControl.prototype = new Cute.AbstractControl, Cute.SlideControl.prototype.constructor = Cute.SlideControl, Cute.SlideControl.prototype.setup = function (n) {
    var t, i, r;
    for (Cute.AbstractControl.prototype.setup.call(this, n), this.domElement.appendChild(this.points_ul), this.slider.addEventListener(Cute.SliderEvent.CHANGE_NEXT_SLIDE, this.update, this), this.config.thumb = n.getAttribute("data-thumb") != "false", this.config.thumb_align = n.getAttribute("data-thumbalign") || "bottom", i = 0, r = this.slider.getSlideList().length; i < r; ++i)t = new Cute.SlideControl.Point(this.slider, this.slider.getSlideList()[i], this), i == this.slider.getCurrentSlideIndex() && (this.selectedPoint = t, t.select()), t.index = i, this.points_ul.appendChild(t.domElement), this.points.push(t)
}, Cute.SlideControl.prototype.update = function () {
    this.selectedPoint && this.slider.getCurrentSlideIndex() == this.selectedPoint.index || (this.selectedPoint && this.selectedPoint.unselect(), this.selectedPoint = this.points[this.slider.getCurrentSlideIndex()], this.selectedPoint.select())
}, Cute.SlideControl.prototype.show = function () {
    Cute.AbstractControl.prototype.show.call(this), this.disable = !1, this.domElement.style.cursor = "pointer"
}, Cute.SlideControl.prototype.hide = function () {
    Cute.AbstractControl.prototype.hide.call(this), this.disable = !0, this.domElement.style.cursor = "default"
}, Cute.SlideControl.Point = function (n, t, i) {
    this.domElement = document.createElement("li"), this.slider = n, this.index = 0, this.domElement.point = this, this.sc = i, this.domElement.onclick = function () {
        this.point.sc.disable || this.point.changeSlide()
    }, Cute.FallBack.ua.browser.name == "IE" && (this.domElement.style.filter = "inherit"), this.selectedElement = document.createElement("span"), this.selectedElement.className = "br-control-selected", this.selectOpacity = 0, this.uo(), i.config.thumb && (this.thumb = new Cute.Thumb(t.thumb, i.config.thumb_align), this.domElement.onmouseover = function () {
        this.point.showThumb()
    }, this.domElement.onmouseout = function () {
        this.point.hideThumb()
    }, this.thumb_pos = 0, this.drawThumb(), this.thumb.domElement.style.display = "none", this.domElement.appendChild(this.thumb.domElement), this.thumb.align = i.config.thumb_align), this.domElement.appendChild(this.selectedElement), this.selectTween = null
}, Cute.SlideControl.Point.prototype = {
    constructor: Cute.SlideControl.Point,
    align: "bottom",
    changeSlide: function () {
        this.slider.gotoSlide(this.index, !0)
    },
    uo: function () {
        setOpacity(this.selectedElement, this.selectOpacity)
    },
    select: function () {
        this.selectTween && this.selectTween.stop(), this.selectTween = new TWEEN.Tween(this).to({selectOpacity: 100}, 450).onUpdate(this.uo).start(), TWEEN.add(this.selectTween)
    },
    unselect: function () {
        this.selectTween && this.selectTween.stop(), this.selectTween = new TWEEN.Tween(this).to({selectOpacity: 0}, 450).onUpdate(this.uo).start(), TWEEN.add(this.selectTween)
    },
    drawThumb: function () {
        setOpacity(this.thumb.domElement, this.thumb_pos), this.thumb.domElement.style.top = this.sc.config.thumb_align == "up" ? 10 - this.thumb.frame.offsetHeight + -this.thumb_pos * .1 + "px" : 24 + -this.thumb_pos * .1 + "px"
    },
    showThumb: function () {
        this.domElement.style.zIndex = this.slider.getSlideList().length, this.thumbTween && this.thumbTween.stop(), this.thumb.show(), this.thumb.domElement.style.display = "", this.thumbTween = new TWEEN.Tween(this).to({thumb_pos: 100}, 700).onUpdate(this.drawThumb).easing(TWEEN.Easing.Quartic.EaseOut).start()
    },
    hideThumb: function () {
        this.domElement.style.zIndex = 0, this.thumbTween && this.thumbTween.stop(), this.thumb.reset(), this.thumbTween = new TWEEN.Tween(this).to({thumb_pos: 0}, 250).onUpdate(this.drawThumb).start().onComplete(function () {
            this.thumb.domElement.style.display = "none"
        })
    }
}, Cute.SlideInfo = function (n) {
    Cute.AbstractControl.call(this, n), this.config = {
        css_class: "br-slideinfo",
        align: "bottom"
    }, this.domElement = document.createElement("div"), this.content = document.createElement("div"), this.poition = 0
}, Cute.rotatorControls.slideinfo = Cute.SlideInfo, Cute.SlideInfo.prototype = new Cute.AbstractControl, Cute.SlideInfo.prototype.constructor = Cute.SlideInfo, Cute.SlideInfo.prototype.setup = function (n) {
    Cute.AbstractControl.prototype.setup.call(this, n), this.domElement.style.overflow = "hidden", this.domElement.style.position = "absolute", this.domElement.style.display = "none", this.content.className = "br-infocontent", this.content.style.position = "relative", this.eff = n.getAttribute("data-effect") || "slide", this.domElement.appendChild(this.content)
}, Cute.SlideInfo.prototype.update = function () {
    this.data && (this.eff == "fade" ? setOpacity(this.content, this.position) : this.content.style[this.data.align] = this.position + "px")
}, Cute.SlideInfo.prototype.show = function () {
    if (this.domElement.style.display = "", this.showTween && this.showTween.stop(), this.data = this.slider.getCurrentSlide().pluginData.info, this.data) this.disable = !1; else {
        this.disable = !0, this.content.className = "", this.content.innerHTML = "";
        return
    }
    this.content.innerHTML = this.data.text, this.content.className = "br-infocontent " + this.data.align + " " + this.data._class || "", this.domElement.style.width = this.data.align == "left" || this.data.align == "right" ? "auto" : "100%", this.domElement.style.height = this.data.align == "bottom" || this.data.align == "top" ? "auto" : "100%", this.domElement.style.left = "", this.domElement.style.right = "", this.domElement.style.bottom = "", this.domElement.style.top = "", this.content.style.left = "", this.content.style.right = "", this.content.style.bottom = "", this.content.style.top = "", this.position = this.eff == "slide" ? -(this.data.align == "bottom" || this.data.align == "top" ? this.content.offsetHeight : this.content.offsetWidth) : 0, this.domElement.style[this.data.align] = "0px", this.update(), this.showTween = new TWEEN.Tween(this).to({position: this.eff == "slide" ? 0 : 100}, 950).delay(this.data.delay).easing(TWEEN.Easing.Quartic.EaseInOut).onUpdate(this.update).start(), TWEEN.add(this.showTween)
}, Cute.SlideInfo.prototype.hide = function () {
    this.disable || (this.showTween && this.showTween.stop(), this.showTween = new TWEEN.Tween(this).to({position: this.eff != "slide" ? 0 : -(this.data.align == "bottom" || this.data.align == "top" ? this.content.offsetHeight : this.content.offsetWidth)}, 850).easing(TWEEN.Easing.Quartic.EaseInOut).onUpdate(this.update).start(), TWEEN.add(this.showTween))
}, Cute.BarTimer = function (n) {
    Cute.AbstractControl.call(this, n), this.config = {css_class: "br-bar-timer"}, this.domElement = document.createElement("div"), this.prog = 0
}, Cute.rotatorControls.bartimer = Cute.BarTimer, Cute.BarTimer.prototype = new Cute.AbstractControl, Cute.BarTimer.prototype.constructor = Cute.BarTimer, Cute.BarTimer.prototype.update = function () {
    this.drawTween && this.drawTween.stop(), this.drawTween = new TWEEN.Tween(this).to({prog: this.slider.delayProgress() * .01}, 500).easing(TWEEN.Easing.Quartic.EaseOut).onUpdate(this.draw).start()
}, Cute.BarTimer.prototype.draw = function () {
    var n = this.prog * this.slider.width;
    this.glow.style.left = n - this.glow.offsetWidth + "px", this.bar.style.width = Math.max(0, n - 5) + "px"
}, Cute.BarTimer.prototype.setup = function (n) {
    Cute.AbstractControl.prototype.setup.call(this, n), this.slider.bartimer = this, this.domElement.style.width = "100%", this.domElement.style.overflow = "hidden", this.glow = document.createElement("div"), this.glow.className = "br-timer-glow", this.glow.style.position = "relative", this.bar = document.createElement("div"), this.bar.className = "br-timer-bar", this.domElement.appendChild(this.glow), this.domElement.appendChild(this.bar), this.slider.addEventListener(Cute.SliderEvent.WATING, this.update, this), this.draw()
}, Cute.Captions = function (n) {
    Cute.AbstractControl.call(this, n), this.config = {css_class: "br-captions"}, this.domElement = document.createElement("div"), this.captions = [], this.overpause = !1
}, Cute.rotatorControls.captions = Cute.Captions, Cute.Captions.prototype = new Cute.AbstractControl, Cute.Captions.prototype.constructor = Cute.Captions, Cute.Captions.prototype.setup = function (n) {
    Cute.AbstractControl.prototype.setup.call(this, n), this.domElement.style.width = "100%", this.domElement.style.height = "100%", this.domElement.style.position = "absolute"
}, Cute.Captions.prototype.show = function () {
    var t, i, n, r;
    if (this.data = this.slider.getCurrentSlide().pluginData.captions, this.slide_index = this.slider.getCurrentSlideIndex(), !this.captions[this.slide_index] && this.data)for (this.captions[this.slide_index] = [], t = this.data.getElementsByTagName("li"), n = 0, r = t.length; n < r; ++n)i = new Cute.Caption, i.add(t[n].innerHTML, t[n].className), i.delay = Number(t[n].getAttribute("data-delay")) || 0, i.effect = t[n].getAttribute("data-effect") || "fade", this.captions[this.slide_index].push(i);
    if (this.data)for (n = 0, r = this.captions[this.slide_index].length; n < r; ++n)this.domElement.appendChild(this.captions[this.slide_index][n].domElement), this.captions[this.slide_index][n].show()
}, Cute.Captions.prototype.hide = function () {
    if (this.captions[this.slide_index])for (var n = 0,
                                                 t = this.captions[this.slide_index].length; n < t; ++n)this.captions[this.slide_index][n].hide()
}, Cute.Caption = function () {
    this.domElement = document.createElement("div"), this.content = document.createElement("div")
}, Cute.Caption.prototype = {
    constructro: Cute.Caption, effect: "fade", add: function (n, t) {
        this.content.innerHTML = n, this.content.className = "br-caption-content", this.content.style.position = "relative", this.domElement.className = t, this.domElement.style.overflow = "hidden", this.domElement.appendChild(this.content)
    }, fade: function () {
        setOpacity(this.domElement, this.show_pos)
    }, slide: function () {
        this.content.style.left = -this.domElement.offsetWidth * (1 - this.show_pos * .01) + "px"
    }, show: function () {
        this.showTween && this.showTween.stop(), this.show_pos = 0, this[this.effect](), this.showTween = new TWEEN.Tween(this).to({show_pos: 100}, 1e3).delay(this.delay).easing(TWEEN.Easing.Quartic.EaseInOut).onUpdate(this[this.effect]).delay(this.delay).start(), TWEEN.add(this.showTween)
    }, hide: function () {
        this.showTween && this.showTween.stop(), this.showTween = new TWEEN.Tween(this).to({show_pos: 0}, 1e3).easing(TWEEN.Easing.Quartic.EaseInOut).onUpdate(this[this.effect]).onComplete(this.remove).start()
    }, remove: function () {
        this.domElement.parentElement && this.domElement.parentElement.removeChild(this.domElement)
    }
}, Cute.VideoControl = function (n) {
    Cute.AbstractControl.call(this, n), this.config = {
        css_class: "br-video",
        width: 300,
        height: 200
    }, this.domElement = document.createElement("div"), this.video_ele = document.createElement("iframe"), this.closeBtn = document.createElement("div"), this.overPlay = document.createElement("div"), this.videoContainer = document.createElement("div"), this.domElement.style.position = "absolute", this.vopacity = 0, this.videoFade = function () {
        setOpacity(this.videoContainer, this.vopacity)
    }
},Cute.rotatorControls.video = Cute.VideoControl,Cute.VideoControl.prototype = new Cute.AbstractControl,Cute.VideoControl.prototype.constructor = Cute.VideoControl,Cute.VideoControl.prototype.setup = function (n) {
    Cute.AbstractControl.prototype.setup.call(this, n), this.video_ele.setAttribute("allowFullScreen", ""), this.video_ele.setAttribute("frameborder", "0"), this.overPlay.targ = this, this.overPlay.onclick = function () {
        this.targ.showVideo()
    }, this.overPlay.className = "play-btn", this.closeBtn.targ = this, this.closeBtn.onclick = function () {
        this.targ.hideVideo()
    }, this.closeBtn.className = "close-btn", this.videoContainer.className = "video-cont", this.domElement.style.width = "100%", this.domElement.style.height = "100%", this.video_ele.style.width = "100%", this.video_ele.style.height = "100%", this.video_ele.style.background = "black", this.domElement.appendChild(this.overPlay), this.domElement.appendChild(this.videoContainer), this.videoContainer.appendChild(this.closeBtn), this.videoContainer.style.display = "none", setOpacity(this.videoContainer, 0)
},Cute.VideoControl.prototype.showVideo = function () {
    this.videoContainer.style.display = "", this.videoContainer.appendChild(this.video_ele), this.video_ele.className = this.data.className || this.config.css_class, this.video_ele.getAttribute("src") != this.data.getAttribute("href") && this.video_ele.setAttribute("src", this.data.getAttribute("href") || "about:blank"), this.videoTween && this.videoTween.stop(), this.videoTween = new TWEEN.Tween(this).to({vopacity: 100}, 400).onUpdate(this.videoFade).start(), this.paused_from_video = !this.slider.rotator.isPaused, this.slider.rotator.pause()
},Cute.VideoControl.prototype.hideVideo = function () {
    this.videoTween && this.videoTween.stop(), this.videoTween = new TWEEN.Tween(this).to({vopacity: 0}, 400).onUpdate(this.videoFade).start();
    this.videoTween.onComplete(function () {
        this.video_ele.setAttribute("src", "about:blank"), this.videoContainer.removeChild(this.video_ele), this.videoContainer.style.display = "none"
    });
    this.paused_from_video && this.slider.rotator.play()
},Cute.VideoControl.prototype.show = function () {
    if (this.data = this.slider.getCurrentSlide().pluginData.video, !this.data) {
        this.domElement.style.display = "none";
        return
    }
    this.domElement.style.display = "", Cute.AbstractControl.prototype.show.call(this)
},Cute.VideoControl.prototype.hide = function () {
    Cute.AbstractControl.prototype.hide.call(this);
    this.showTween.onComplete(function () {
        this.video_ele.parentElement && this.videoContainer.removeChild(this.video_ele), this.domElement.style.display = "none", this.videoContainer.style.display = "none", this.videoTween && this.videoTween.stop()
    })
},Cute.LinkControl = function (n) {
    Cute.AbstractControl.call(this, n), this.config = {css_class: "br-link"}, this.domElement = document.createElement("div"), this.domElement.style.position = "absolute"
},Cute.rotatorControls.link = Cute.LinkControl,Cute.LinkControl.prototype = new Cute.AbstractControl,Cute.LinkControl.prototype.constructor = Cute.LinkControl,Cute.LinkControl.prototype.setup = function (n) {
    Cute.AbstractControl.prototype.setup.call(this, n), this.domElement.lc = this, this.domElement.style.width = "100%", this.domElement.style.height = "100%", this.domElement.style.cursor = "pointer"
},Cute.LinkControl.prototype.gotoURL = function () {
    window.open(this.lc.link.href, this.lc.link.target || "_self")
},Cute.LinkControl.prototype.show = function () {
    this.link = this.slider.getCurrentSlide().pluginData.link, this.link ? (this.domElement.style.display = "", this.domElement.onclick = this.gotoURL) : (this.domElement.style.display = "none", this.domElement.onclick = null)
},Cute.LinkControl.prototype.hide = function () {
    this.domElement.style.display = "none", this.domElement.onclick = null
},Cute.Loading = function () {
    this.domElement = document.createElement("div"), this.domElement.className = "br-loading", this.domElement.style.display = "none", this.animEle = document.createElement("div"), this.animEle.className = "img", this.domElement.appendChild(this.animEle), this.opacity = 0
},Cute.Loading.prototype = {
    constructor: Cute.Loading, opacityUpdate: function () {
        setOpacity(this.domElement, this.opacity)
    }, show: function () {
        this.showTween && this.showTween.stop(), this.domElement.style.display = "", this.showTween = new TWEEN.Tween(this).to({opacity: 100}, 450).onUpdate(this.opacityUpdate).start()
    }, hide: function () {
        this.showTween && this.showTween.stop(), this.showTween = new TWEEN.Tween(this).to({opacity: 0}, 450).onUpdate(this.opacityUpdate).start(), this.domElement.style.display = "none"
    }
},Cute.ThumbList = function (n) {
    Cute.AbstractControl.call(this, n), this.config = {
        css_class: "br-thumblist",
        type: "vertical"
    }, this.domElement = document.createElement("div"), this.thumbs = []
},Cute.rotatorControls.thumblist = Cute.ThumbList,Cute.ThumbList.prototype = new Cute.AbstractControl,Cute.ThumbList.prototype.constructor = Cute.ThumbList,Cute.ThumbList.prototype.setup = function (n) {
    var i, t, r;
    for (Cute.AbstractControl.prototype.setup.call(this, n), this.config.type = n.getAttribute("data-dir") || "vertical", this.config.autohide = n.getAttribute("data-autohide") == "true", this.domElement.className += " " + this.config.type, this.list = new Cute.ItemList(this.domElement), this.list.type = this.config.type, this.list.frame.className = "br-thumblist-frame", this.list.content.className = "br-thumblist-content", this.list.downright.className = "br-thumblist-next", this.list.upleft.className = "br-thumblist-previous", this.slider.addEventListener(Cute.SliderEvent.CHANGE_NEXT_SLIDE, this.update, this), t = 0, r = this.slider.getSlideList().length; t < r; ++t)i = new Cute.ListThumb(this.slider.getSlideList()[t].thumb, this.slider, this), i.index = t, this.thumbs.push(i), this.list.addItem(i.element);
    this.list.sc.setup()
},Cute.ThumbList.prototype.update = function () {
    this.selectedThumb && this.slider.getCurrentSlideIndex() == this.selectedThumb.index || (this.selectedThumb && this.selectedThumb.unselect(), this.selectedThumb = this.thumbs[this.slider.getCurrentSlideIndex()], this.selectedThumb.select())
},Cute.ThumbList.prototype.show = function () {
    this.config.autohide && Cute.AbstractControl.prototype.show.call(this), this.disable = !1
},Cute.ThumbList.prototype.hide = function () {
    this.config.autohide && Cute.AbstractControl.prototype.hide.call(this), this.disable = !0
},Cute.ListThumb = function (n, t, i) {
    this.img = new Image, this.img.src = n, this.element = document.createElement("div"), this.element.className = "br-list-thumb", this.select_ele = document.createElement("div"), this.select_ele.className = "br-list-thumb-select", this.element.appendChild(this.img), this.element.appendChild(this.select_ele), setOpacity(this.select_ele, 0), this.opacity = 0;
    var r = this;
    i.list.sc.isTouch() ? this.element.addEventListener("touchend", function (n) {
        r.selected || i.disable || i.list.sc.moved || (t.gotoSlide(r.index, !0), n.preventDefault(), n.stopPropagation())
    }, !1) : this.element.onclick = function () {
        r.selected || i.disable || i.list.sc.moved || t.gotoSlide(r.index, !0)
    }
},Cute.ListThumb.prototype = {
    constructor: Cute.ListThumb, opacityUpdate: function () {
        setOpacity(this.select_ele, this.opacity)
    }, select: function () {
        this.selected || (this.selected = !0, this.showTween && (this.showTween = null), this.showTween = new TWEEN.Tween(this).to({opacity: 100}, 450).onUpdate(this.opacityUpdate).start())
    }, unselect: function () {
        this.selected && (this.selected = !1, this.showTween && (this.showTween = null), this.showTween = new TWEEN.Tween(this).to({opacity: 0}, 450).onUpdate(this.opacityUpdate).start())
    }
},Cute.InfoList = function (n) {
    Cute.AbstractControl.call(this, n), this.config = {
        css_class: "br-infolist",
        type: "vertical"
    }, this.domElement = document.createElement("div"), this.items = []
},Cute.rotatorControls.infolist = Cute.InfoList,Cute.InfoList.prototype = new Cute.AbstractControl,Cute.InfoList.prototype.constructor = Cute.InfoList,Cute.InfoList.prototype.setup = function (n) {
    var i, t, r;
    for (Cute.AbstractControl.prototype.setup.call(this, n), this.config.type = n.getAttribute("data-dir") || "vertical", this.config.autohide = n.getAttribute("data-autohide") == "true", this.domElement.className += " " + this.config.type, this.list = new Cute.ItemList(this.domElement), this.list.type = this.config.type, this.list.frame.className = "br-infolist-frame", this.list.content.className = "br-infolist-content", this.list.downright.className = "br-infolist-next", this.list.upleft.className = "br-infolist-previous", this.slider.addEventListener(Cute.SliderEvent.CHANGE_NEXT_SLIDE, this.update, this), t = 0, r = this.slider.getSlideList().length; t < r; ++t)i = new Cute.ListItem(this.slider.getSlideList()[t].pluginData.info, this.slider, this), i.index = t, this.items.push(i), this.list.addItem(i.element);
    this.list.sc.setup()
},Cute.InfoList.prototype.update = function () {
    this.selectedThumb && this.slider.getCurrentSlideIndex() == this.selectedThumb.index || (this.selectedThumb && this.selectedThumb.unselect(), this.selectedThumb = this.items[this.slider.getCurrentSlideIndex()], this.selectedThumb.select())
},Cute.InfoList.prototype.show = function () {
    this.config.autohide && Cute.AbstractControl.prototype.show.call(this), this.disable = !1
},Cute.InfoList.prototype.hide = function () {
    this.config.autohide && Cute.AbstractControl.prototype.hide.call(this), this.disable = !0
},Cute.ListItem = function (n, t, i) {
    this.element = document.createElement("div"), this.element.className = "br-slist-item", this.select_ele = document.createElement("div"), this.select_ele.className = "br-slist-item-select", this.content = document.createElement("div"), this.content.innerHTML = n ? n.text : "", this.content.className = "br-slist-item-content", this.element.appendChild(this.select_ele), this.element.appendChild(this.content), setOpacity(this.select_ele, 0), this.opacity = 0;
    var r = this;
    i.list.sc.isTouch() ? this.element.addEventListener("touchend", function (n) {
        r.selected || i.disable || i.list.sc.moved || (t.gotoSlide(r.index, !0), n.preventDefault(), n.stopPropagation())
    }, !1) : this.element.onclick = function () {
        r.selected || i.disable || i.list.sc.moved || t.gotoSlide(r.index, !0)
    }
},Cute.ListItem.prototype = {
    constructor: Cute.ListThumb, opacityUpdate: function () {
        setOpacity(this.select_ele, this.opacity)
    }, select: function () {
        this.selected || (this.selected = !0, this.showTween && (this.showTween = null), this.showTween = new TWEEN.Tween(this).to({opacity: 100}, 450).onUpdate(this.opacityUpdate).start())
    }, unselect: function () {
        this.selected && (this.selected = !1, this.showTween && (this.showTween = null), this.showTween = new TWEEN.Tween(this).to({opacity: 0}, 450).onUpdate(this.opacityUpdate).start())
    }
},Cute.TouchNavigation = function (n, t) {
    this.isTouch = function () {
        try {
            return document.createEvent("TouchEvent"), !0
        } catch (n) {
            return !1
        }
    };
    var e = this.isTouch(), r = !1, u = 0, i = 0, f;
    this.__touchStart = function (n) {
        r = !0, i = u = n.touches[0].pageX, f = setTimeout(function () {
            r = !1
        }, 3e3)
    }, this.__touchMove = function (n) {
        r && (Math.abs(i - n.touches[0].pageX) >= 10 && n.preventDefault(), i = n.touches[0].pageX)
    }, this.__touchEnd = function () {
        r && (r = !1, clearTimeout(f), i - u > n.offsetWidth / 10 ? t.next() : i - u < -n.offsetWidth / 10 && t.previous(), u = i = 0)
    }, e && (n.addEventListener("touchstart", this.__touchStart), n.addEventListener("touchmove", this.__touchMove), n.addEventListener("touchend", this.__touchEnd))
},Cute.Slider = function () {
    this.slides = [], this.controls = [], this.slideManager = new Cute.SlideManager, this.imgLoaded = !1, this.mlcl = !1, this.api = this.slideManager
},Cute.Slider.prototype = {
    constructor: Cute.Slider, setup: function (n, t) {
        var r, i, f, u;
        for (this.fallBack = new Cute.FallBack, this.element = document.getElementById(n), this.wrapper = document.getElementById(t), Cute.FallBack.isIE ? this.element.className += " cute-ie" : Cute.isMobileDevice && (this.element.className += " cute-device"), Cute.FallBack.isIE8 ? this.element.className += " cute-ie8" : Cute.FallBack.isIE7 && (this.element.className += " cute-ie7"), this.wrapper.slider = this, window.addResizeListener(this.__onresize, this), this.aspect = Number(this.element.getAttribute("data-width")) / Number(this.element.getAttribute("data-height")), this.__setSize(), this.slideManager.resize(), this.slideManager.rotator = this, this.controlLayer = document.createElement("div"), this.controlLayer.style.visibility = "hidden", this.contentLoading = new Cute.Loading, this.contentLoading.domElement.className = "br-large-loading", this.contentLoading.show(), this.element.appendChild(this.contentLoading.domElement), this.element.getAttribute("data-force") && (this.fallBack.force = this.element.getAttribute("data-force")), r = this.element.getElementsByTagName("ul"), i = 0, f = r.length; i < f; ++i)r[i].getAttribute("data-type") == "slides" ? this.slidesElement = r[i] : r[i].getAttribute("data-type") == "controls" && (this.controlsElement = r[i]);
        this.element.getAttribute("data-shuffle") == "true" && this.__shuffleSlides(), this.__createSlides(), this.controlsElement && this.__createControls(), this.element.appendChild(this.slideManager.domElement), u = new Cute.ModuleLoader(this.fallBack), u.loadModule(), u.onComplete = {
            listener: this.__onModuleReady,
            ref: this
        }
    }, __shuffleSlides: function () {
        var n = this.slidesElement.children, t = n[0].getElementsByTagName("img")[0], i, u;
        for (t.setAttribute("data-src", t.getAttribute("src")), i = 0, u = n.length; i < u; ++i)r = Math.floor(Math.random() * (u - 1)), i != r && (this.slidesElement.insertBefore(n[i], n[r]), n = this.slidesElement.children);
        t = n[0].getElementsByTagName("img")[0], t.setAttribute("src", t.getAttribute("data-src"))
    }, __setSize: function () {
        this.slideManager.width = this.wrapper.clientWidth, this.slideManager.height = this.wrapper.clientWidth / this.aspect, this.slideManager.vpWidth = this.slideManager.width + this.slideManager.width * .2, this.slideManager.vpHeight = this.slideManager.height + this.slideManager.height * .2, this.element.style.width = this.slideManager.width + "px", this.element.style.height = this.slideManager.height + "px", this.lastWidth = this.slideManager.width
    }, __onresize: function () {
        this.lastWidth != this.wrapper.clientWidth && (this.__setSize(), this.slideManager.resize())
    }, __onModuleReady: function () {
        this.mlcl = !0, this.imgLoaded && this.__start()
    }, __onImgLoaded: function () {
        this.slide.addContent(this), this.rotator.mlcl && this.rotator.__start(), this.rotator.imgLoaded = !0, this.slide = null, this.rotator = null
    }, __start: function () {
        var n = this.fallBack.getType();
        switch (n) {
            case Cute.FallBack.CANVAS:
                this.slideManager._viewClass = Aroma.ThreeView;
                break;
            case Cute.FallBack.CSS3D:
                this.slideManager._viewClass = Aroma.CSS3DView, Aroma.CSS3DCube.light = !Cute.FallBack.isMobileDevice;
                break;
            case Cute.FallBack.DOM2D:
                this.slideManager._viewClass = Aroma.DivView
        }
        this.showControls(), this.slideManager.start(), Cute.Ticker.Tweenisadded || (Cute.Ticker.add(TWEEN.update, TWEEN), Cute.Ticker.Tweenisadded = !0), Cute.Ticker.add(this.slideManager._timer.update, this.slideManager._timer), Cute.Ticker.start(), this.element.removeChild(this.contentLoading.domElement)
    }, __parseTransValues: function (n, t) {
        for (var u = [], r = n.split(" ").join().split(","), i = 0,
                 f = r.length; i < f; i++)t ? Transitions2D[r[i]] && u.push(Transitions2D[r[i]]) : Transitions3D[r[i]] && u.push(Transitions3D[r[i]]);
        return r = null, u
    }, __createSlides: function () {
        for (var i = null, f = 0, r, t, n, e, u; this.slidesElement.children.length != 0;) {
            for (r = this.slidesElement.firstElementChild || this.slidesElement.children[0], i = new Cute.Slide(this.slideManager), i.dataElement = r, i.delay = r.getAttribute("data-delay"), i.transitions2D = this.__parseTransValues(r.getAttribute("data-trans2d"), !0), i.transitions3D = this.__parseTransValues(r.getAttribute("data-trans3d"), !1), i.rotator = this, t = r.children, n = 0, e = t.length; n < e; ++n) {
                if (t[n].nodeName === "IMG") {
                    f == 0 ? (i.src = t[n].getAttribute("src"), u = new Image, u.slide = i, u.rotator = this, u.onload = this.__onImgLoaded, u.src = i.src) : i.src = t[n].getAttribute("data-src"), i.thumb = t[n].getAttribute("data-thumb");
                    continue
                }
                if (t[n].nodeName === "DIV" && t[n].getAttribute("data-type") == "info") {
                    i.pluginData.info = {
                        text: t[n].innerHTML,
                        _class: t[n].className,
                        align: t[n].getAttribute("data-align") || "bottom",
                        delay: Number(t[n].getAttribute("data-delay")) || 0
                    };
                    continue
                }
                if (t[n].nodeName === "UL" && t[n].getAttribute("data-type") == "captions") {
                    i.pluginData.captions = t[n];
                    continue
                }
                if (t[n].nodeName === "A" && t[n].getAttribute("data-type") == "video") {
                    i.pluginData.video = t[n];
                    continue
                }
                if (t[n].nodeName === "A" && t[n].getAttribute("data-type") == "link") {
                    i.pluginData.link = {href: t[n].getAttribute("href"), target: t[n].getAttribute("target")};
                    continue
                }
            }
            this.slides.push(i), this.slideManager.pushSlide(i), this.slidesElement.removeChild(r), f++
        }
        this.element.removeChild(this.slidesElement)
    }, __createControls: function () {
        var r = this.controlsElement.getElementsByTagName("li"), t, i, u, f, o, n, e;
        for (this.element.appendChild(this.controlLayer), this.controlLayer.className = "br-controls", this.element.getAttribute("data-overpause") == "false" || Cute.FallBack.isMobileDevice || (this.controlLayer.slideManager = this.slideManager, this.controlLayer.rotator = this, u = function () {
            this.slideManager._status != "changing" && this.slideManager._status != "loading" && this.slideManager.setAutoPlay(!1)
        }, f = function () {
            if (!Cute.AbstractControl.paused) {
                if (this.slideManager._status == "changing" || this.slideManager._status == "loading") {
                    this.rotator.ap = !0;
                    return
                }
                this.rotator.ap = !1, this.slideManager.setAutoPlay(!0)
            }
        }, this.controlLayer.onmouseover = u, this.controlLayer.onmouseout = f, this.slideManager.addEventListener(Cute.SliderEvent.CHANGE_END, this.__effEnd, this)), o = new Cute.TouchNavigation(this.controlLayer, this.api), this.controlLayer.style.width = "100%", this.controlLayer.style.height = "100%", n = 0, e = r.length; n < e; ++n)t = r[n].getAttribute("data-type"), t && Cute.rotatorControls[t] && (i = new Cute.rotatorControls[t](this.slideManager), this.controlLayer.appendChild(i.domElement), i.setup(r[n]), this.controls.push(i));
        this.loading = new Cute.Loading, this.element.appendChild(this.loading.domElement), this.slideManager.addEventListener(Cute.SliderEvent.WATING_FOR_NEXT, this.showLoading, this), this.slideManager.addEventListener(Cute.SliderEvent.CHANGE_START, this.hideLoading, this), this.element.removeChild(this.controlsElement)
    }, __effEnd: function () {
        this.ap && this.slideManager.setAutoPlay(!0)
    }, showLoading: function () {
        this.lis = !0, this.loading.show()
    }, hideLoading: function () {
        this.lis && (this.lis = !1, this.loading.hide())
    }, showControls: function () {
        this.contentLoading.hide(), this.controlLayer.style.visibility = "visible"
    }, play: function () {
        Cute.AbstractControl.paused = !1, this.api.setAutoPlay(!0), this.isPaused = !1
    }, pause: function () {
        Cute.AbstractControl.paused = !0, this.isPaused = !0, this.api.setAutoPlay(!1)
    }
};