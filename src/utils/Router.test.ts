import Router, { BlockConstructable } from './Router'
import { expect } from 'chai';

import sinon from 'sinon';
import Block from "./Block"



describe.only('Router', () => {

  global.window.history.back = () => {
    if (typeof window.onpopstate === 'function') {
      window.onpopstate({currentTarget: window} as unknown as PopStateEvent);
    }
  };
  global.window.history.forward = () => {
    if (typeof window.onpopstate === 'function') {
      window.onpopstate({currentTarget: window} as unknown as PopStateEvent);
    }
  }

  const getContentFake = sinon.fake.returns(document.createElement('div'));

  const BlockMock = class {
    getContent = getContentFake;
  } as unknown as BlockConstructable;

  it('use() should return Router instance', () => {
    const result = Router.use('/', BlockMock as typeof Block);

    expect(result).to.eq(Router);
  });

  describe('.back()', () => {
    it('should render a page on history back action', () => {
      Router
        .use('/', BlockMock as typeof Block)
        .start();

      Router.back();

      expect(getContentFake.callCount).to.eq(1);
    });
  });

  describe('.forward()', () => {
    it('should render a page on history forward action', () => {
      Router
        .use('/', BlockMock as typeof Block)
        .start();

      Router.forward();

      expect(getContentFake.callCount).to.eq(1);
    });
  });

  it('should render a page on start', () => {
    Router
      .use('/', BlockMock as typeof Block)
      .start();

    expect(getContentFake.callCount).to.eq(1);
  });
});