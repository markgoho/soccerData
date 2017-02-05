import { SoccerDataPage } from './app.po';

describe('soccer-data App', function() {
  let page: SoccerDataPage;

  beforeEach(() => {
    page = new SoccerDataPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
