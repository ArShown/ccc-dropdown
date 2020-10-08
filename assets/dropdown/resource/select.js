cc.Class({
  extends: cc.Component,

  properties: {
    selectLabel: cc.Label,
    iconNode: cc.Node,
    dropdown: cc.Node,
    contentNode: cc.Node,
    emptyNode: cc.Node,
    layoutNode: cc.Node,
    optionPrefab: cc.Prefab,

    /* ==== */
    _onMount: {
      default: false,
      visible: false
    },

    _defaultValue: {
      default: null,
      visible: false
    },
    defaultValue: {
      visible: false,
      get() {
        return this._defaultValue;
      },
      set(value) {
        this._defaultValue = value;
      }
    },

    /**
     * 選項
     * @params {Array<Object>} arr
     *
     * Object
     * @params {string} name 選項顯示的內容
     * @params {any} value 選項值
     * @params {boolean} disabled 是否禁用
     *
     */
    _options: {
      default: [],
      visible: false
    },
    options: {
      visible: false,
      get() {
        return this._options;
      },
      set(arr) {
        this._options = arr;
        this.onPropChange();
      }
    },

    _value: {
      default: null,
      visible: false
    },
    value: {
      visible: false,
      get() {
        return this._value;
      },
      set(val) {
        this._value = val;
        this.onPropChange();
      }
    },

    placeHolder: {
      visible: false,
      default: '請選擇...',
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

  /* 清掉選項 */
  clearHandler() {
    if (this.isDropDown || !this.isActived)
      this.clickHandler();
    else {
      /* 呼叫 callback */
      this._callback && this._callback(null);
      /* 清掉 value */
      this.value = null;
    }
  },

  /* 選單開關 */
  clickHandler() {
    this.dropdown.active = this.isDropDown = !this.isDropDown;
  },

  /* 需要重新渲染 */
  onPropChange() {
    if (!this._onMount) return false;
    this.renderOption();
  },

  setDisplay(name) {
    if (name === null) {
      /* 沒有選擇值 */
      this.selectLabel.getComponent(cc.Label).string = this.placeHolder;
      this.iconNode.getChildByName('arrow').active = true;
      this.iconNode.getChildByName('remove').active = false;
    } else {
      this.selectLabel.getComponent(cc.Label).string = name;
      this.iconNode.getChildByName('arrow').active = false;
      this.iconNode.getChildByName('remove').active = true;
    }
  },

  renderOption() {
    let totalHeight = 20;
    /* 清空 */
    this.layoutNode.removeAllChildren();
    /* 初始化參數 */
    let activeName = null;
    this.isActived = false;

    /* selected option */
    if (this.options.length > 0) {
      this.emptyNode.active = false;
      this.layoutNode.active = true;

      /* 寫入 */
      this.options.forEach(option => {
        const {
          name,
          value,
          disabled = false
        } = option;

        let item = cc.instantiate(this.optionPrefab);
        item.getComponent('option').visibleName = name;
        item.getComponent('option').value = value;
        item.getComponent('option').disabled = disabled;
        item.getComponent('option').onSelected = this.selectedHandler.bind(this, option);
        /* has selected value */
        let isSelected = this.value === value;
        isSelected && (activeName = name) && (this.isActived = true);
        item.getComponent('option').selected = isSelected;

        this.layoutNode.addChild(item);
        totalHeight += item.height;
      });
      /* 更新高度 */
      this.contentNode.height = Math.max(totalHeight, 150);

    } else {
      this.emptyNode.active = true;
      this.layoutNode.active = false;
    }

    this.setDisplay(activeName);
  },

  selectedHandler(target) {
    const {
      name,
      value,
      disabled
    } = target;
    if (disabled) return false;
    /* 更新顯示文字 */
    this.selectLabel.getComponent(cc.Label).string = name;
    /* 選單關閉 */
    this.clickHandler();
    /* 選擇的值有變 */
    if (this.value !== value) {
      /* 呼叫 callback */
      this._callback && this._callback(value);
      /* 更新選擇值 */
      this.value = value;
    }
  },

  onLoad() {
    this.isDropDown = false;
    this.isActived = false;
    this._onMount = true;
    this.value = this.value !== null ? this.value : this.defaultValue;
  }
});