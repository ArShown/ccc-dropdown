cc.Class({
  extends: cc.Component,

  properties: {
    selectedMark: cc.Node,
    title: cc.Label,

    /* listener */
    _name: {
      default: 'option',
      visible: false,
    },
    visibleName: {
      visible: false,
      set(name) {
        this._name = name;
        this.node.getChildByName('title').getComponent(cc.Label).string = name;
      }
    },

    // _value: {
    //   default: null,
    //   visible: false,
    // },
    // value: {
    //   visible: false,
    //   set(content) {
    //     this._value = content;
    //   }
    // },

    _disabled: {
      default: false,
      visible: false,
    },
    disabled: {
      visible: false,
      set(flag) {
        this._disabled = flag;
        if (flag) {
          this._selected = false;
          this.node.getChildByName('title').color = cc.Color.GRAY;
          this.node.getChildByName('selected').active = false;
          this.node.getComponent(cc.Button).interactable = !flag;
        }
      }
    },

    _selected: {
      default: false,
      visible: false,
    },
    selected: {
      visible: false,
      set(flag) {
        this._selected = !this._disabled ? flag : false;
        this.node.getChildByName('selected').active = this._selected;
      }
    },

    _callback: {
      default: null,
      visible: false,
    },
    onSelected: {
      visible: false,
      set(callback) {
        this._callback = callback
      }
    }
  },

  clickHandler(e) {
    if (this._disabled) {
      e.preventDefault();
      return false;
    }
    this._callback && this._callback();
  }
});