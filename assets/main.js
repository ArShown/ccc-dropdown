// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
  extends: cc.Component,

  properties: {
    defaultSelection: cc.Node,
    stateSelection: cc.Node,
  },

  getSelectionBoxScript(node) {
    return node.getChildByName('selection').getChildByName('box').getComponent('select');
  },

  start() {
    const defaultNode = this.getSelectionBoxScript(this.defaultSelection);
    defaultNode.addOptions([{
      name: '選項一',
      value: 'option1'
    }, {
      name: '選項二',
      value: 'option2'
    }, {
      name: '選項三',
      value: 'option3'
    }, {
      name: '選項四',
      value: 'option4'
    }]);
    defaultNode.placeHolder = 'Choose...';
    defaultNode.onSelected = value => console.log('choose:', value);

    let stateNode = this.getSelectionBoxScript(this.stateSelection);
    stateNode.addOptions([{
      name: '選項一',
      value: 'option1'
    }, {
      name: '選項二',
      value: 'option2',
      disabled: true
    }, {
      name: '選項三',
      value: 'option3'
    }, {
      name: '選項四',
      value: 'option4'
    }]);
    stateNode.defaultValue = 'option1';
  }
});