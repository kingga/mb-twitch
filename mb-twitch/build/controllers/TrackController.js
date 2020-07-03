"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TrackController = /** @class */ (function () {
    function TrackController() {
    }
    TrackController.prototype.stateChanged = function (state) {
        console.log("Track state has changed to " + (state.isPlaying ? "play" : "pause."));
    };
    return TrackController;
}());
exports.default = TrackController;
//# sourceMappingURL=TrackController.js.map