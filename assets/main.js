cc.Class({
  extends: cc.Component,

  properties: {
    defaultSelection: cc.Node,
    stateSelection: cc.Node,
  },

  onLoad() {
    this.defaultNode = this.defaultSelection.getComponentInChildren('select');
    this.defaultNode.placeHolder = 'Choose...';
    this.defaultNode.onSelected = value => console.log('default choose:', value);
    this.defaultNode.options = [{
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
    }];

    this.stateNode = this.stateSelection.getComponentInChildren('select');
    this.stateNode.onSelected = value => console.log('state choose:', value);
    this.stateNode.defaultValue = 'option2';
    this.stateNode.options = [{
      name: '選項一',
      value: 'option1',
      disabled: true
    }, {
      name: '選項二',
      value: 'option2'
    }, {
      name: '選項三',
      value: 'option3'
    }, {
      name: '選項四',
      value: 'option4'
    }];
  }
});