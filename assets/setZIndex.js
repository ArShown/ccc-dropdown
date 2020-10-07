cc.Class({
  extends: cc.Component,

  properties: {
    zIndex: {
      default: 0,
      type: Number
    }
  },

  onLoad() {
    this.node.zIndex = this.zIndex;
  }
});