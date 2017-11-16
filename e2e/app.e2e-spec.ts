import { DependencyHellSCIAPage } from './app.po';

describe('dependency-hell-scia App', () => {
  let page: DependencyHellSCIAPage;

  beforeEach(() => {
    page = new DependencyHellSCIAPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
