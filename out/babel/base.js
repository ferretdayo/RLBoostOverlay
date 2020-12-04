// class PodContainer extends HTMLElement {
//     static get observedAttributes() {
//         return [
//             "playername",
//             "imgurl",
//             "score",
//             "goals",
//             "assists",
//             "saves",
//             "shots",
//             "boost",
//             "side",
//             "isbeingspectated",
//             "flip"
//         ];
//     }
//     constructor() {
//         super();
//         this.attachShadow({mode: "open"});
//         this.podAttributes = {
//             playername: "Unknown",
//             imgurl: "https://via.placeholder.com/50x50",
//             score: "0",
//             goals: "0",
//             assists: "0",
//             saves: "0",
//             shots: "0",
//             boost: "33",
//             side: "left",
//             isbeingspectated: "0",
//             flip: "0"
//         };
//         this.statPositions = {
//         };
//         this.getPosition = function (name) {
//             var nameNew = name + this.podAttributes.side;
//             if (this.statPositions.hasOwnProperty(nameNew)) {
//                 return this.statPositions[nameNew];
//             }
//             return 0;
//         };
//     }
//     connectedCallback() {
//         for (var a in this.podAttributes) {
//             if (!this.podAttributes.hasOwnProperty(a)) {
//                 continue;
//             }
//             var val = this.attributes.getNamedItem(a);
//             if (val !== null) {
//                 this.podAttributes[a] = val.value;
//             }
//         }
//         this.shadowRoot.innerHTML = `
//           <style>
//         .stat-names
//         {
//             position: absolute;
//             width: 100%;
//             top: 30px;
//             font-size: 15px;
// 			z-index: 100;
//         }
//         .name-item {
//             position: absolute;
//             width: 100%;
//             top: -8px;
//             color: red;
// 			z-index: 100;
//         }
//         .valOffset {
//             position: absolute;
//             width: 100%;
//             top: 12px;
//             font-size: 20px;
// 			z-index: 100;
//         }
//         .namesGlobal
//         {
//             position: absolute;
//             width: 100%;
//             top: -2px;
//             color: black;
// 			text-shadow: 0px 0px 1px white, 0px 0px 3px white, 0px 0px 6px white;
// 			z-index: 100;
//         }
//         .container {
//             width: 510px;
//             color: white;
// 			text-shadow: 0px 0px 2px black, 0px 0px 8px white;
//             font-family: Arial;
//             font-weight: bold;
//             font-size: 20px;
//             text-align: center;
//             position: relative;
//         }
//         .img-style{
// 			position: absolute;
// 			top: 0px;
// 			left: 0px;
// 			z-index: -50;
// 		}
// 		.pfp-style.left {
// 			position: absolute;
// 			left: 17px;
// 			top: 18px;
// 			width: 63px;
// 			height: 63px;
// 		}
// 		.pfp-style.right {
// 			position: absolute;
// 			right: 17px;
// 			top: 18px;
// 			width: 63px;
// 			height: 63px;
// 		}
//         .img-style.left {
//             transform: scaleX(-1);
//         }
//         .img-style.right {
//             transform: none;
//         }
//         .name-style.left {
//             left: 92px;
//             text-align: left;
//         }
//         .name-style.right {
//             left: -92px;
//             text-align: right;
//         }
//         .score-style.left {
//             left: -140px;
//         }
//         .score-style.right {
//             left: -170px;
//         }
//         .goals-style.left {
//             left: -65px;
//         }
//         .goals-style.right {
//             left: -95px;
//         }
//         .assists-style.left {
//             left: 10px;
//         }
//         .assists-style.right {
//             left: -20px;
//         }
//         .saves-style.left {
//             left: 85px;
//         }
//         .saves-style.right {
//             left: 55px;
//         }
//         .shots-style.left {
//             left: 160px;
//         }
//         .shots-style.right {
//             left: 130px;
//         }
// 		.boost-style.left{
// 			left: -47px;
// 			text-align: right;
// 		}
// 		.boost-style.right{
// 			left: 47px;
// 			text-align: left;
// 		}
// 		#boostbar {
//           top: 16px;
//           width: 379px;
//           position: absolute;
//           background-color: grey;
//           border-radius: 3px;
//         }
//         #boostbar.left {
//             left: 88px;
//         }
//         #boostbar.right {
//             left: 43px;
//             transform: scaleX(-1);
//         }
//         #boostbar-value {
//           background-color: orange;
//           width: 33%;
//           /* Adjust with JavaScript */
//           height: 26px;
//           border-radius: 1px;
//         }
// 		.hidden{
// 			visibility: hidden !important;
// 		}
//         /* 350 => 70 */
//     </style>
//     <div class="container">
//         <img src="Assets/SamplePod02.png" id="img" class="img-style ${this.podAttributes.side}"/>
// 		<img src="Assets/SamplePod02_Glow.png" id="img-glow" class="img-style ${this.podAttributes.isbeingspectated ? "" : "hidden"} ${this.podAttributes.side}"/>
//         <img src="Assets/SamplePod02_Flip.png" id="img-flip" class="img-style ${this.podAttributes.flip ? "" : "hidden"} ${this.podAttributes.side}"/>
// 		<img src="${this.podAttributes.imgurl}" id="img-pfp" class="pfp-style ${this.podAttributes.side}"/>
// 		<div id="boostbar" class="${this.podAttributes.side}">
//           <div id="boostbar-value"></div>
//         </div>
// 		<p class="name-item namesGlobal name-style ${this.podAttributes.side}" id="playername">${this.podAttributes.playername}</p>
// 		<p class="namesGlobal boost-style ${this.podAttributes.side}" id="boost">${this.podAttributes.boost}</p>
//         <div class="stat-names score-style ${this.podAttributes.side}">
//             <p>Score</p>
//             <p id="score" class="valOffset">${this.podAttributes.score}</p>
//         </div>
//         <div class="stat-names goals-style ${this.podAttributes.side}">
//             <p>Goals</p>
//             <p id="goals" class="valOffset">${this.podAttributes.goals}</p>
//         </div>
//         <div class="stat-names assists-style ${this.podAttributes.side}">
//             <p>Assists</p>
//             <p id="assists" class="valOffset">${this.podAttributes.assists}</p>
//         </div>
//         <div class="stat-names saves-style ${this.podAttributes.side}">
//             <p>Saves</p>
//             <p id="saves" class="valOffset">${this.podAttributes.saves}</p>
//         </div>
//         <div class="stat-names shots-style ${this.podAttributes.side}">
//             <p>Shots</p>
//             <p id="shots" class="valOffset">${this.podAttributes.shots}</p>
//         </div>  
//     </div>
// 	  `;
//         this.componentConnected = true;
//     }
//     attributeChangedCallback(name, oldValue, newValue) {
//         if (this.componentConnected && this.podAttributes.hasOwnProperty(name)) {
//             this.podAttributes[name] = newValue;
//             if (name === "side") {
//                 if (oldValue === "left") {
//                     this.shadowRoot.querySelectorAll(".left").forEach((e) => {
//                         var list = e.className.split(' ');
//                         var splitLoc = list.indexOf("left");
//                         if (splitLoc > -1) {
//                             list.splice(splitLoc, 1);
//                         }
//                         list.push('right');
//                         e.setAttribute('class', list.join(' '));
//                     });
//                 } else if (oldValue === "right") {
//                     this.shadowRoot.querySelectorAll(".right").forEach((e) => {
//                         var list = e.className.split(' ');
//                         var splitLoc = list.indexOf("right");
//                         if (splitLoc > -1) {
//                             list.splice(splitLoc, 1);
//                         }
//                         list.push('left');
//                         e.setAttribute('class', list.join(' '));
//                     });
//                 }
//             } else if (name === "isbeingspectated") {
//                 var specE = this.shadowRoot.getElementById("img-glow");
//                 var specClasses = specE.className.split(' ');
//                 var specSplitLoc = specClasses.indexOf("hidden");
//                 if (newValue === "1") {
//                     if (specSplitLoc > -1) {
//                         specClasses.splice(specSplitLoc, 1);
//                     }
//                 } else {
//                     if (specSplitLoc < 0) {
//                         specClasses.push("hidden");
//                     }
//                 }
//                 this.podAttributes.isbeingspectated = !!newValue;
//                 specE.setAttribute('class', specClasses.join(' '));
//             } else if (name === "flip") {
//                 var flipE = this.shadowRoot.getElementById("img-flip");
//                 var flipClasses = flipE.className.split(' ');
//                 var flipSplitLoc = flipClasses.indexOf("hidden");
//                 if (newValue === "1") {
//                     if (flipSplitLoc > -1) {
//                         flipClasses.splice(flipSplitLoc, 1);
//                     }
//                 } else {
//                     if (flipSplitLoc < 0) {
//                         flipClasses.push("hidden");
//                     }
//                 }
//                 this.podAttributes.flip = !!newValue;
//                 flipE.setAttribute('class', flipClasses.join(' '));
//             } else if (name === "imgurl") {
//                 this.shadowRoot.getElementById("img-pfp").src = newValue;
//             } else {
//                 if (name === "boost") {
//                     this.shadowRoot.getElementById("boostbar-value").style.width = newValue + "%";
//                 }
//                 this.shadowRoot.getElementById(name).innerText = newValue;
//             }
//         }
//     }
// }
// customElements.define("pod-container", PodContainer);
"use strict";
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

var BaseModel =
/*#__PURE__*/
function () {
  function BaseModel(eventData) {
    _classCallCheck(this, BaseModel);

    _callbacks.set(this, {
      writable: true,
      value: []
    });

    debugger;
    this.updateData(eventData);
  }

  _createClass(BaseModel, [{
    key: "updateData",
    value: function updateData() {}
  }, {
    key: "updateTeamId",
    value: function updateTeamId() {}
  }, {
    key: "registerDataUpdateCallback",
    value: function registerDataUpdateCallback(callback) {
      if (callback instanceof Function) {
        _classPrivateFieldGet(this, _callbacks).push(callback);
      }
    }
  }, {
    key: "triggerCallbacks",
    value: function triggerCallbacks() {
      _classPrivateFieldGet(this, _callbacks).forEach(function (c) {
        c();
      });
    }
  }]);

  return BaseModel;
}();

var _callbacks = new WeakMap();
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Player =
/*#__PURE__*/
function (_BaseModel) {
  _inherits(Player, _BaseModel);

  function Player() {
    _classCallCheck(this, Player);

    return _possibleConstructorReturn(this, _getPrototypeOf(Player).apply(this, arguments));
  }

  _createClass(Player, [{
    key: "updateData",
    value: function updateData(data) {
      if (!(data instanceof Object)) {
        return;
      }

      this.playerName = data.hasOwnProperty("PlayerName") ? data["PlayerName"] : "";
      this.goals = data.hasOwnProperty("Goals") ? data["Goals"] : "";
      this.mmr = data.hasOwnProperty("MMR") ? data["MMR"] : "";
      this.assists = data.hasOwnProperty("Assists") ? data["Assists"] : "";
      this.saves = data.hasOwnProperty("Saves") ? data["Saves"] : "";
      this.score = data.hasOwnProperty("Score") ? data["Score"] : "";
      this.playerID = data.hasOwnProperty("PlayerID") ? data["PlayerID"] : "";
      this.playerUniqueID = data.hasOwnProperty("PlayerUniqueID") ? data["PlayerUniqueID"] : "";
      this.kills = data.hasOwnProperty("Kills") ? data["Kills"] : "";
      this.ballTouches = data.hasOwnProperty("BallTouches") ? data["BallTouches"] : "";
      this.currentBoostAmount = data.hasOwnProperty("CurrentBoostAmount") ? data["CurrentBoostAmount"] : "";
      this.teamNum = data.hasOwnProperty("TeamNum") ? data["TeamNum"] : "";
      this.isBot = data.hasOwnProperty("IsBot") ? data["IsBot"] : "";
      this.triggerCallbacks();
    }
  }]);

  return Player;
}(BaseModel);
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Team =
/*#__PURE__*/
function (_BaseModel) {
  _inherits(Team, _BaseModel);

  function Team(teamId, eventData) {
    var _this;

    _classCallCheck(this, Team);

    debugger;

    _this.updateTeamId(teamId);

    _this.updateData(eventData);

    return _possibleConstructorReturn(_this);
  }

  _createClass(Team, [{
    key: "updateTeamId",
    value: function updateTeamId(teamId) {
      if (!(teamId instanceof Number)) {
        return;
      }

      this.teamId = teamId;
    }
  }, {
    key: "updateData",
    value: function updateData(data) {
      if (!(data instanceof Object)) {
        return;
      }

      this.name = data.hasOwnProperty("Name") ? data["Name"] : "";
      this.goals = data.hasOwnProperty("Goals") ? data["Goals"] : "";
      this.triggerCallbacks();
    }
  }]);

  return Team;
}(BaseModel);
"use strict";

var __subscribers = {};
var WsSubscribers = {
  init: function init() {
    var webSocket = new WebSocket("ws://localhost:49122");

    webSocket.onmessage = function (event) {
      var jEvent = JSON.parse(event.data);

      if (!jEvent.hasOwnProperty('event')) {
        return;
      }

      var eventSplit = jEvent.event.split(':');
      var channel = eventSplit[0];
      var event_event = eventSplit[1];
      WsSubscribers.triggerSubscribers(channel, event_event, jEvent.data);
    };

    webSocket.onopen = function () {
      WsSubscribers.triggerSubscribers("ws", "open");
    };

    webSocket.onerror = function () {
      WsSubscribers.triggerSubscribers("ws", "error");
    };

    webSocket.onclose = function () {
      WsSubscribers.triggerSubscribers("ws", "close");
    };
  },
  subscribe: function subscribe(channel, event, callback) {
    if (!__subscribers.hasOwnProperty(channel)) {
      __subscribers[channel] = {};
    }

    if (!__subscribers[channel].hasOwnProperty(event)) {
      __subscribers[channel][event] = [];
    }

    __subscribers[channel][event].push(callback);
  },
  clearEventCallbacks: function clearEventCallbacks(channel, event) {
    if (__subscribers.hasOwnProperty(channel) && __subscribers[channel].hasOwnProperty(event)) {
      __subscribers[channel] = {};
    }
  },
  triggerSubscribers: function triggerSubscribers(channel, event, data) {
    if (__subscribers.hasOwnProperty(channel) && __subscribers[channel].hasOwnProperty(event)) {
      __subscribers[channel][event].forEach(function (callback) {
        if (callback instanceof Function) {
          callback(data);
        }
      });
    }
  }
};
