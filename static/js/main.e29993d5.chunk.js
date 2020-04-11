(this.webpackJsonpminefield=this.webpackJsonpminefield||[]).push([[0],[,,,,,,,,,,function(e,t,n){e.exports=n(19)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(1),s=n.n(a),i=n(6),r=n.n(i),o=(n(15),n(5)),l=n(8),u=n(2),c=n(7);n(16);function h(e){var t=e.show,n=e.children;return s.a.createElement(s.a.Fragment,null,Object(i.createPortal)(s.a.createElement("div",{className:"\n                        modal\n                        ".concat(t?"showing":"","\n                    ")},s.a.createElement("div",{className:"\n                            modal-content\n                            ".concat(t?"showing":"","\n                        ")},n)),document.body))}var m=n(3),d=n(4),f=[{name:"Medium",rows:20,columns:10,bombs:35,bisque:!0},{name:"Easy",rows:12,columns:6,bombs:10,bisque:!0},{name:"Hard",rows:28,columns:13,bombs:75,bisque:!0}],g=function(){function e(t,n){Object(m.a)(this,e),this.minefield=t,this.rowIndex=n,this.squares=[]}return Object(d.a)(e,[{key:"isEven",value:function(){return this.rowIndex%2===0}},{key:"addSquare",value:function(e,t){e.setRow(this,t),this.squares.push(e)}},{key:"getSquareFromColumn",value:function(e){return this.squares.find((function(t){return t.address.squareIndexInRow===e}))}},{key:"getRowAbove",value:function(){var e=this;return this.rowIndex<=0?null:this.minefield.rows.find((function(t){return t.rowIndex===e.rowIndex-1}))}},{key:"getRowBelow",value:function(){var e=this;return this.rowIndex>=this.minefield.rows.length-1?null:this.minefield.rows.find((function(t){return t.rowIndex===e.rowIndex+1}))}}]),e}(),v=function(){function e(t){Object(m.a)(this,e),this.row=t,this.hasBomb=!1,this.showingResult=!1,this.hasFlag=!1}return Object(d.a)(e,[{key:"setRow",value:function(e,t){this.row=e,this.address={rowIndex:e.rowIndex,squareIndexInRow:e.squares.length,squareIndexInMinefield:t}}},{key:"getNeighbors",value:function(){var e=this.row,t=this.row.getRowAbove(),n=this.row.getRowBelow(),a=this.address.squareIndexInRow,s=a-1,i=a+1,r=[];return t&&(r.push(t.getSquareFromColumn(s)),r.push(t.getSquareFromColumn(a)),r.push(t.getSquareFromColumn(i))),r.push(e.getSquareFromColumn(s)),r.push(e.getSquareFromColumn(i)),n&&(r.push(n.getSquareFromColumn(s)),r.push(n.getSquareFromColumn(a)),r.push(n.getSquareFromColumn(i))),r.filter((function(e){return e}))}},{key:"getNeighborsWithBombs",value:function(){return this.getNeighbors().filter((function(e){return e.hasBomb}))}},{key:"getNumberOfNeighborsWithBombs",value:function(){return this.getNeighborsWithBombs().length}},{key:"show",value:function(){e.hasFlag||this.showingResult||(this.showingResult=!0)}},{key:"isEven",value:function(){return this.address.squareIndexInMinefield%2===0}},{key:"toggleFlag",value:function(){this.hasFlag=!this.hasFlag&&!this.showingResult&&!this.row.minefield.isFinished}},{key:"putBomb",value:function(){this.hasBomb=!0}}]),e}(),b=function(){function e(t,n,a){Object(m.a)(this,e),this.level=t,this.rows=[],this.squares=[],this.squaresWithBombs=[],this.hasStarted=!1,this.isFinished=!1,this.lose=!1,this.win=!1,this.qtyFlagsMissing=t.bombs,this.qtyFieldsToExplore=0,this.getLastRecord=n,this.storeRecord=a}return Object(d.a)(e,[{key:"shouldPaintAsEven",value:function(e){var t=e.isEven();return this.level.columns%2===0&&!e.row.isEven()?!t:t}},{key:"explodeSquaresAround",value:function(e){var t=this;e.getNeighbors().forEach((function(e){t.show(e)}))}},{key:"saveRecord",value:function(){if(this.getLastRecord&&this.storeRecord){var e=this.getLastRecord(),t=this.getElapsedSeconds();(!e||t<e)&&this.storeRecord(t)}}},{key:"winGame",value:function(){this.finishGame(),this.saveRecord(),this.win=!0}},{key:"loseGame",value:function(){this.finishGame(),this.lose=!0}},{key:"finishGame",value:function(){this.isFinished=!0,this.finishTime=new Date}},{key:"startGame",value:function(){this.hasStarted=!0,this.startTime=new Date}},{key:"getElapsedSeconds",value:function(){return this.hasStarted?this.isFinished?Math.floor((this.finishTime-this.startTime)/1e3):Math.floor((new Date-this.startTime)/1e3):0}},{key:"show",value:function(e){this.isFinished||e.hasFlag||e.showingResult||(this.hasStarted||(this._distributeBombs(e),this.startGame()),e.show(),e.hasBomb?this.loseGame():(this.qtyFieldsToExplore--,0===this.qtyFieldsToExplore&&this.winGame()),0===e.getNumberOfNeighborsWithBombs()&&this.explodeSquaresAround(e))}},{key:"toggleFlag",value:function(e){e.showingResult||this.isFinished||(e.toggleFlag(),e.hasFlag?this.qtyFlagsMissing--:this.qtyFlagsMissing++)}},{key:"_distributeBombs",value:function(e){for(var t=0;t<this.level.bombs;){var n=Math.floor(Math.random()*this.squares.length),a=this.squares[n];this.level.bisque&&this._isNeighborOrSelf(a,e)||(a.hasBomb||(a.putBomb(),this.squaresWithBombs.push(a),t++,this.qtyFieldsToExplore--))}}},{key:"_isNeighborOrSelf",value:function(e,t){if(!t)return!1;if(e===t)return!0;for(var n=t.getNeighbors(),a=0;a<n.length;a++)if(e===n[a])return!0;return!1}},{key:"_createRow",value:function(e){var t=new g(this,e);return this.rows.push(t),t}},{key:"_createSquare",value:function(e){var t=new v(e);return e.addSquare(t,this.squares.length),this.squares.push(t),this.qtyFieldsToExplore++,t}}],[{key:"createMinefield",value:function(t,n,a){for(var s=new e(f.find((function(e){return e.name===t})),n,a),i=0;i<s.level.rows;i++)for(var r=s._createRow(i),o=0;o<s.level.columns;o++)s._createSquare(r);return s}}]),e}();n(17);function w(){var e=Object(a.useState)({}),t=Object(o.a)(e,2),n=t[0],i=t[1],r=Object(a.useState)(0),m=Object(o.a)(r,2),d=m[0],g=m[1],v=Object(a.useState)(f[0].name),w=Object(o.a)(v,2),E=w[0],y=w[1],p=Object(a.useState)(0),q=Object(o.a)(p,2),N=q[0],k=q[1];function F(e){localStorage.setItem("record",e)}function S(){return localStorage.getItem("record")}function I(){var e=b.createMinefield(E,S,F);i(e),g(d+1)}return Object(a.useEffect)((function(){var e=b.createMinefield(E,S,F);i(e)}),[E]),Object(a.useEffect)((function(){var e=setInterval((function(){n&&k(n.getElapsedSeconds())}),100);return function(){return clearInterval(e)}}),[n]),s.a.createElement("section",{className:"campo-minado"},s.a.createElement(h,{show:n.win},s.a.createElement("div",{className:"modal-endgame win"},s.a.createElement("p",null,"You win!"),s.a.createElement("div",{className:"row"},s.a.createElement("div",{className:"record"},s.a.createElement("div",{className:"trophies"},s.a.createElement("div",{className:"trophy"},s.a.createElement(u.b,null)),s.a.createElement("div",{className:"trophy"},s.a.createElement(u.b,null)),s.a.createElement("div",{className:"trophy"},s.a.createElement(u.b,null)),s.a.createElement("div",{className:"trophy"},s.a.createElement(u.b,null))),s.a.createElement("div",{className:"seconds"},S()," seconds"),s.a.createElement("div",{className:"trophies"},s.a.createElement("div",{className:"trophy"},s.a.createElement(u.b,null)),s.a.createElement("div",{className:"trophy"},s.a.createElement(u.b,null)),s.a.createElement("div",{className:"trophy"},s.a.createElement(u.b,null)),s.a.createElement("div",{className:"trophy"},s.a.createElement(u.b,null))))),s.a.createElement("div",{className:"row"},s.a.createElement("button",{onClick:I},s.a.createElement(c.a,null))))),s.a.createElement(h,{show:n.lose},s.a.createElement("div",{className:"modal-endgame lose"},s.a.createElement("p",null,"You lose!"),s.a.createElement("div",{className:"row"},s.a.createElement("button",{onClick:I},s.a.createElement(c.a,null))))),s.a.createElement("div",{className:"game"},s.a.createElement("div",{className:"config"},s.a.createElement("div",null,s.a.createElement("div",{className:"flag"},s.a.createElement(l.a,null)," ",n.qtyFlagsMissing),s.a.createElement("select",{onChange:function(e){return function(e){y(e)}(e.target.value)}},f.map((function(e){return s.a.createElement("option",{value:e.name,key:e.name},e.name)})))),s.a.createElement("div",null,s.a.createElement("div",{className:"elapsedSeconds"},N>0&&N))),s.a.createElement("div",{className:"main"},n.rows&&n.rows.map((function(e){return s.a.createElement("div",{key:e.rowIndex,className:"square-row"},e.squares.map((function(e){return s.a.createElement("div",{key:e.address.squareIndexInMinefield,className:"\n                                        square \n                                        ".concat(n.shouldPaintAsEven(e)?"even":"odd","\n                                        ").concat(e.showingResult?"showing":"not-showing","\n                                        ").concat(E&&E.toLowerCase(),"\n                                    "),onClick:function(){return function(e){n.show(e),i(n),g(d+1)}(e)},onContextMenu:function(t){return function(e,t){e.preventDefault(),n.toggleFlag(t),i(n),g(d+1)}(t,e)}},e.showingResult&&!e.hasBomb&&0!==e.getNumberOfNeighborsWithBombs()&&e.getNumberOfNeighborsWithBombs(),e.showingResult&&e.hasBomb&&s.a.createElement(u.a,null),e.hasFlag&&s.a.createElement(l.a,null))})))})))))}n(18);var E=function(){return s.a.createElement("section",{className:"main-section"},s.a.createElement(w,null))};r.a.render(s.a.createElement(s.a.StrictMode,null,s.a.createElement(E,null)),document.getElementById("root"))}],[[10,1,2]]]);
//# sourceMappingURL=main.e29993d5.chunk.js.map