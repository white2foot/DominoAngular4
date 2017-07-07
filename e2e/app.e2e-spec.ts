import { Test2appPage } from './app.po';

describe('test2app App', () => {
  let page: Test2appPage;

  beforeEach(() => {
    page = new Test2appPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
