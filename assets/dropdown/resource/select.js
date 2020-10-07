cc.Class({
  extends: cc.Component,

  properties: {
    selectLabel: cc.Label,
    dropdown: cc.Node,
    contentNode: cc.Node,
    emptyNode: cc.Node,
    layoutNode: cc.Node,
    optionPrefab: cc.Prefab,

    /* ==== */
    _defaultValue: {
      default: null,
      visible: false
    },
    defaultValue: {
      set(value) {
        this._defaultValue = value;
        if (this.options.length > 0) {
          this.updateOptions();
          this.renderOptions();
        }
      }
    },

    placeHolder: {
      visible: false,
      set(str) {
        this.selectLabel.getComponent(cc.Label).string = str;
      }
    },

    _callback: {
      default: null,
      visible: false
    },
    onSelected: {
      visible: false,
      set(callback) {
        this._callback = callback
      }
    }
  },

  clickHandler() {
    this.dropdown.active = this.isDropDown = !this.isDropDown;
  },

  selectedHandler(target) {
    const {
      name,
      value,
      disabled
    } = target;
    /* 更新顯示文字 */
    this.selectLabel.getComponent(cc.Label).string = name;
    /* 選單關閉 */
    this.clickHandler();
    /* 選擇的值有變 */
    if (this.value !== value) {
      /* 呼叫 callback */
      this._callback && this._callback(value);
      /* 更新 option 結構 */
      this.options = this.options.map(option => {
        option.selected = value === option.value;
        return option;
      });
      this.renderOptions();
      /* 更新選擇值 */
      this.value = value;
    }
  },

  /**
   * 寫入新的選項
   * @params {Array<Object>} optArr
   *
   * Object
   * @params {string} name 選項顯示的內容
   * @params {any} value 選項值
   * @params {boolean} disabled 是否禁用
   *
   */
  addOptions(optArr) {
    this.options = optArr;

    if (this.options.length > 0) {
      this.emptyNode.active = false;
      this.layoutNode.active = true;
    } else {
      this.emptyNode.active = true;
      this.layoutNode.active = false;
    }

    if (this._defaultValue !== null)
      this.updateOptions();
    this.renderOptions();
  },

  updateOptions() {
    this.options.map(option => {
      if (this._defaultValue === option.value) {
        option.selected = true;
        /* 更新顯示文字 */
        this.selectLabel.getComponent(cc.Label).string = option.name;
      }
      return option;
    });
  },

  renderOptions() {
    let totalHeight = 20;
    /* 清空 */
    this.layoutNode.removeAllChildren();
    /* 寫入 */
    this.options.forEach(option => {
      const {
        name,
        value,
        disabled = false,
        selected = false
      } = option;
      let item = cc.instantiate(this.optionPrefab);
      item.getComponent('option').visibleName = name;
      item.getComponent('option').value = value;
      item.getComponent('option').disabled = disabled;
      item.getComponent('option').selected = selected;
      item.getComponent('option').onSelected = this.selectedHandler.bind(this, option);
      this.layoutNode.addChild(item);

      totalHeight += item.height;
    });
    /* 更新高度 */
    this.contentNode.height = Math.max(totalHeight, 150);
  },

  onLoad() {
    this.isDropDown = false;
    this.value = null;
    this.options = [];
  }
});