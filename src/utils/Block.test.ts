import proxyquire from 'proxyquire';
import { expect } from 'chai';
import sinon from 'sinon';
import type BlockType from './Block'

const eventBusMock = {
  on: sinon.fake(),
  emit: sinon.fake(),
}

const { default: Block } = proxyquire('./Block', {
  './EventBus': {
    EventBus: class {
      emit = eventBusMock.emit;

      on = eventBusMock.on;
    }
  }
}) as { default: typeof BlockType };

describe('Block', () => {
  class ComponentMock extends Block<any> {

  }

  const mock = new ComponentMock({})
  it('should fire init event on initialization',  () => {
    expect(eventBusMock.emit.calledWith('init')).to.eq(true);
  });

  it('should update',()=>{
    mock.setProps({value: "new"}) 
    expect(eventBusMock.emit.calledWith('flow:component-did-update')).to.eq(true);
  })
});