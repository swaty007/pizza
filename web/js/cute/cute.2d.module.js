Aroma.DivView = function (n, t) {
    Aroma.AbstractView.call(this, n, t), this.stage = document.createElement("div"), this.viewport = document.createElement("div"), this.stageFrag = document.createDocumentFragment(), this.viewport.appendChild(this.stage), this.alignstage = function () {
        this.stage.style.position = "absolute", this.stage.style.left = (this.vpWidth - this.width) / 2 + "px", this.stage.style.top = (this.vpHeight - this.height) / 2 + "px"
    }
}, Aroma.DivView.prototype = new Aroma.AbstractView, Aroma.DivView.prototype.constructor = Aroma.DivView, Aroma.DivView.prototype.setup = function () {
    this.stage.style.background = 'url("' + this.oldSource.src + '") no-repeat', this.stage.style.position = "absolute", this.stage.style.overflow = "hidden"
}, Aroma.DivView.prototype.dispose = function () {
    Aroma.AbstractView.prototype.dispose.call(this), this._pieceList = [], this.viewport.removeChild(this.stage)
}, Aroma.DivView.prototype.setSize = function (n, t) {
    Aroma.AbstractView.prototype.setSize.call(this, n, t), this.stage.style.width = n + "px", this.stage.style.height = t + "px", this.alignstage()
}, Aroma.DivView.prototype.setViewPortSize = function (n, t) {
    Aroma.AbstractView.prototype.setViewPortSize.call(this, n, t), this.viewport.style.width = n + "px", this.viewport.style.height = t + "px", this.alignstage()
}, Aroma.DivView.prototype.prepare = function () {
    this.stage.appendChild(this.stageFrag), this.stageFrag = null
}, Aroma.DivView.prototype.getPieceAt = function (n, t, i) {
    var u = this.posToID(n, t), r, f;
    return this._pieceList[u] != null ? this._pieceList[u] : (r = new Aroma.DivPiece, f = this.getPieceBounds(n, t), r.col = n, r.row = t, r.bounds = f, r.view = this, i.piece = r, ConcatObject.concat(r.options, i.getPieceOptions()), r.setup(this.newSource, this.oldSource), this.stageFrag.appendChild(r.div), this._pieceList[u] = r, r)
}, Aroma.DivPiece = function () {
    Aroma.Piece.call(this), this.options = {dir: "b", push: !1}, this.setLoc = function (n, t) {
        var i = this.bounds.height, r = this.bounds.width;
        (n == "l" || n == "r") && (this.proxy.new_x = (n == "r" ? 1 : -1) * (r - r * t * .01), this.options.push && (this.proxy.old_x = (n == "r" ? -1 : 1) * r * t * .01)), (n == "t" || n == "b") && (this.proxy.new_y = (n == "b" ? 1 : -1) * (i - i * t * .01), this.options.push && (this.proxy.old_y = (n == "b" ? -1 : 1) * i * t * .01))
    }
}, Aroma.DivPiece.prototype = new Aroma.Piece, Aroma.DivPiece.prototype.constructor = Aroma.DivPiece, Aroma.DivPiece.prototype.setup = function (n, t) {
    this.newSource = n, this.oldSource = t, this.proxy = {
        x: 0,
        y: 0,
        slide: 0,
        opacity: 100,
        old_x: 0,
        old_y: 0,
        new_x: 0,
        new_y: 0,
        piece: this
    }, this.div = document.createElement("div"), this.origin_x = this.bounds.x, this.origin_y = this.bounds.y, this.div.style.position = "absolute", this.div.style.overflow = "hidden", this.div.style.width = this.bounds.width + "px", this.div.style.height = this.bounds.height + "px", this.div.style.left = this.origin_x + "px", this.div.style.top = this.origin_y + "px", this.old_img = new Image, this.old_img.src = t.src, this.old_img.style.position = "absolute", this.old_img.style.width = this.view.width + "px", this.old_img.style.height = this.view.height + "px", this.old_img.style.left = -this.bounds.x + "px", this.old_img.style.top = -this.bounds.y + "px", this.new_img = new Image, this.new_img.src = n.src, this.new_img.style.position = "absolute", this.new_img.style.width = this.view.width + "px", this.new_img.style.height = this.view.height + "px", this.new_img.style.left = -this.bounds.x + "px", this.new_img.style.top = -this.bounds.y + "px", this.img_div = document.createElement("div"), this.img_div.style.position = "relative", this.img_div.style.overflow = "hidden", this.img_div.style.width = this.bounds.width + "px", this.img_div.style.height = this.bounds.height + "px", this.img_div.appendChild(this.new_img), this.div.appendChild(this.old_img), this.div.appendChild(this.img_div)
}, Aroma.DivPiece.prototype.dispose = function () {
    this.div.removeChild(this.img_div), this.view.stage.removeChild(this.div), this.img_div = null, this.div = null, this.proxy.piece = null, this.proxy = null, this.oldSource = null, this.newSource = null, this.view = null, this.options = null, this.bounds = null
}, Aroma.DivPiece.prototype.proxyUpdate = function () {
    this.piece.div.style.left = this.x + this.piece.origin_x + "px", this.piece.div.style.top = this.y + this.piece.origin_y + "px", this.piece.setLoc(this.piece.options.dir.charAt(0), this.slide), this.piece.options.dir.length == 2 && this.piece.setLoc(this.piece.options.dir.charAt(1), this.slide), this.piece.img_div.style.left = this.new_x + "px", this.piece.img_div.style.top = this.new_y + "px", this.piece.options.push && (this.piece.old_img.style.left = this.old_x - this.piece.origin_x + "px", this.piece.old_img.style.top = this.old_y - this.piece.origin_y + "px"), this.piece.img_div.style.filter = "alpha(opacity=" + this.opacity + ")", this.piece.img_div.style.opacity = this.opacity / 100, this.piece.img_div.style.MozOpacity = this.opacity / 100, this.piece.img_div.style.KhtmlOpacity = this.opacity / 100, this.piece.img_div.style.MSOpacity = this.opacity / 100
};