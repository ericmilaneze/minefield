(this.webpackJsonpminefield=this.webpackJsonpminefield||[]).push([[0],[,,,,,,,,,,function(e,t,n){e.exports=n(19)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var s=n(1),a=n.n(s),i=n(4),r=n.n(i),o=(n(15),n(5)),u=n(7),l=n(9),h=n(6);n(16);function c(e){var t=e.show,n=e.children;return a.a.createElement(a.a.Fragment,null,Object(i.createPortal)(a.a.createElement("div",{className:"\n                        modal\n                        ".concat(t?"showing":"","\n                    ")},a.a.createElement("div",{className:"\n                            modal-content\n                            ".concat(t?"showing":"","\n                        ")},n)),document.body))}var m=n(2),d=n(3),f=[{name:"Medium",rows:20,columns:10,bombs:35,bisque:!0},{name:"Easy",rows:12,columns:6,bombs:10,bisque:!0},{name:"Hard",rows:28,columns:13,bombs:75,bisque:!0}],g=function(){function e(t,n){Object(m.a)(this,e),this.minefield=t,this.rowIndex=n,this.squares=[]}return Object(d.a)(e,[{key:"isEven",value:function(){return this.rowIndex%2===0}},{key:"addSquare",value:function(e,t){e.setRow(this,t),this.squares.push(e)}},{key:"getSquareFromColumn",value:function(e){return this.squares.find((function(t){return t.address.squareIndexInRow===e}))}},{key:"getRowAbove",value:function(){var e=this;return this.rowIndex<=0?null:this.minefield.rows.find((function(t){return t.rowIndex===e.rowIndex-1}))}},{key:"getRowBelow",value:function(){var e=this;return this.rowIndex>=this.minefield.rows.length-1?null:this.minefield.rows.find((function(t){return t.rowIndex===e.rowIndex+1}))}}]),e}(),w=function(){function e(t){Object(m.a)(this,e),this.row=t,this.hasBomb=!1,this.showingResult=!1,this.hasFlag=!1}return Object(d.a)(e,[{key:"setRow",value:function(e,t){this.row=e,this.address={rowIndex:e.rowIndex,squareIndexInRow:e.squares.length,squareIndexInMinefield:t}}},{key:"getNeighbors",value:function(){var e=this.row,t=this.row.getRowAbove(),n=this.row.getRowBelow(),s=this.address.squareIndexInRow,a=s-1,i=s+1,r=[];return t&&(r.push(t.getSquareFromColumn(a)),r.push(t.getSquareFromColumn(s)),r.push(t.getSquareFromColumn(i))),r.push(e.getSquareFromColumn(a)),r.push(e.getSquareFromColumn(i)),n&&(r.push(n.getSquareFromColumn(a)),r.push(n.getSquareFromColumn(s)),r.push(n.getSquareFromColumn(i))),r.filter((function(e){return e}))}},{key:"getNeighborsWithBombs",value:function(){return this.getNeighbors().filter((function(e){return e.hasBomb}))}},{key:"getNumberOfNeighborsWithBombs",value:function(){return this.getNeighborsWithBombs().length}},{key:"show",value:function(){e.hasFlag||this.showingResult||(this.showingResult=!0)}},{key:"isEven",value:function(){return this.address.squareIndexInMinefield%2===0}},{key:"toggleFlag",value:function(){this.hasFlag=!this.hasFlag&&!this.showingResult&&!this.row.minefield.isFinished}},{key:"putBomb",value:function(){this.hasBomb=!0}}]),e}(),b=function(){function e(t){Object(m.a)(this,e),this.level=t,this.rows=[],this.squares=[],this.squaresWithBombs=[],this.isFinished=!1,this.lose=!1,this.win=!1,this.hasStarted=!1,this.qtyFlagsMissing=t.bombs,this.qtyFieldsToExplore=0}return Object(d.a)(e,[{key:"shouldPaintAsEven",value:function(e){var t=e.isEven();return this.level.columns%2===0&&!e.row.isEven()?!t:t}},{key:"explodeSquaresAround",value:function(e){var t=this;e.getNeighbors().forEach((function(e){t.show(e)}))}},{key:"show",value:function(e){this.isFinished||e.hasFlag||e.showingResult||(this.hasStarted||(this._distributeBombs(e),this.hasStarted=!0),e.show(),e.hasBomb?(this.isFinished=!0,this.lose=!0):(this.qtyFieldsToExplore--,0===this.qtyFieldsToExplore&&(this.isFinished=!0,this.win=!0)),0===e.getNumberOfNeighborsWithBombs()&&this.explodeSquaresAround(e))}},{key:"toggleFlag",value:function(e){e.showingResult||this.isFinished||(e.toggleFlag(),e.hasFlag?this.qtyFlagsMissing--:this.qtyFlagsMissing++)}},{key:"_distributeBombs",value:function(e){for(var t=0;t<this.level.bombs;){var n=Math.floor(Math.random()*this.squares.length),s=this.squares[n];this.level.bisque&&this._isNeighborOrSelf(s,e)||(s.hasBomb||(s.putBomb(),this.squaresWithBombs.push(s),t++,this.qtyFieldsToExplore--))}}},{key:"_isNeighborOrSelf",value:function(e,t){if(!t)return!1;if(e===t)return!0;for(var n=t.getNeighbors(),s=0;s<n.length;s++)if(e===n[s])return!0;return!1}},{key:"_createRow",value:function(e){var t=new g(this,e);return this.rows.push(t),t}},{key:"_createSquare",value:function(e){var t=new w(e);return e.addSquare(t,this.squares.length),this.squares.push(t),this.qtyFieldsToExplore++,t}}],[{key:"createMinefield",value:function(t){for(var n=new e(f.find((function(e){return e.name===t}))),s=0;s<n.level.rows;s++)for(var a=n._createRow(s),i=0;i<n.level.columns;i++)n._createSquare(a);return n}}]),e}();n(17);function v(){var e=Object(s.useState)({}),t=Object(o.a)(e,2),n=t[0],i=t[1],r=Object(s.useState)(0),m=Object(o.a)(r,2),d=m[0],g=m[1],w=Object(s.useState)(f[0].name),v=Object(o.a)(w,2),q=v[0],E=v[1];function y(){var e=b.createMinefield(q);i(e),g(d+1)}return Object(s.useEffect)((function(){var e=b.createMinefield(q);i(e)}),[q]),a.a.createElement("section",{className:"campo-minado"},a.a.createElement(c,{show:n.win},a.a.createElement("div",{className:"modal-endgame win"},a.a.createElement("p",null,"You win!"),a.a.createElement("div",{className:"refresh"},a.a.createElement("button",{onClick:y},a.a.createElement(h.a,null))))),a.a.createElement(c,{show:n.lose},a.a.createElement("div",{className:"modal-endgame lose"},a.a.createElement("p",null,"You lose!"),a.a.createElement("div",{className:"refresh"},a.a.createElement("button",{onClick:y},a.a.createElement(h.a,null))))),a.a.createElement("div",{className:"game"},a.a.createElement("div",{className:"config"},a.a.createElement("div",null,a.a.createElement("div",{className:"flag"},a.a.createElement(u.a,null)," ",n.qtyFlagsMissing),a.a.createElement("select",{onChange:function(e){return function(e){E(e)}(e.target.value)}},f.map((function(e){return a.a.createElement("option",{value:e.name,key:e.name},e.name)}))))),a.a.createElement("div",{className:"main"},n.rows&&n.rows.map((function(e){return a.a.createElement("div",{key:e.rowIndex,className:"square-row"},e.squares.map((function(e){return a.a.createElement("div",{key:e.address.squareIndexInMinefield,className:"\n                                        square \n                                        ".concat(n.shouldPaintAsEven(e)?"even":"odd","\n                                        ").concat(e.showingResult?"showing":"not-showing","\n                                        ").concat(q&&q.toLowerCase(),"\n                                    "),onClick:function(){return function(e){n.show(e),i(n),g(d+1)}(e)},onContextMenu:function(t){return function(e,t){e.preventDefault(),n.toggleFlag(t),i(n),g(d+1)}(t,e)}},e.showingResult&&!e.hasBomb&&0!==e.getNumberOfNeighborsWithBombs()&&e.getNumberOfNeighborsWithBombs(),e.showingResult&&e.hasBomb&&a.a.createElement(l.a,null),e.hasFlag&&a.a.createElement(u.a,null))})))})))))}n(18);var q=function(){return a.a.createElement("section",{className:"main-section"},a.a.createElement(v,null))};r.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(q,null)),document.getElementById("root"))}],[[10,1,2]]]);
//# sourceMappingURL=main.6159c586.chunk.js.map