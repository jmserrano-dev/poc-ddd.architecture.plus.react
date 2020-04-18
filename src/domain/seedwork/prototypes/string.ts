/* eslint-disable no-extend-native */

if (!String.prototype.isEmpty) {
  String.prototype.isEmpty = function () {
    return this.length === 0 || !this.trim();
  };
}

if (!String.prototype.isNotEmpty) {
  String.prototype.isNotEmpty = function () {
    return !this.isEmpty();
  };
}
