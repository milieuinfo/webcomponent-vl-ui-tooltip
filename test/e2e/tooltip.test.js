
const {assert, getDriver} = require('vl-ui-core').Test.Setup;
const VlTooltipPage = require('./pages/vl-tooltip.page');

describe('vl-tooltip', async () => {
  let vlTooltipPage;

  beforeEach(() => {
    vlTooltipPage = new VlTooltipPage(getDriver());
    return vlTooltipPage.load();
  });

  afterEach(async () => {
    await vlTooltipPage.reset();
  });

  async function assertTooltipIsZichtbaarMetText(tooltip, text) {
    await assert.eventually.isTrue(tooltip.isDisplayed());
    await assert.eventually.equal(tooltip.getText(), text);
  }

  async function assertTooltipWordtOpCorrectePlaatsGetoond(tooltip, location) {
    await assert.eventually.equal(tooltip.isTop(), location === 'top');
    await assert.eventually.equal(tooltip.isRight(), location === 'right');
    await assert.eventually.equal(tooltip.isBottom(), location === 'bottom');
    await assert.eventually.equal(tooltip.isLeft(), location === 'left');
  }

  async function hover(element) {
    await element.hover();
  }

  it('WCAG', async () => {
    await assert.eventually.isFalse(vlTooltipPage.hasWcagIssues());
  });

  it('als gebruiker kan ik over een knop hoveren om de tooltip bovenaan te zien', async () => {
    const tooltip = await vlTooltipPage.getTopTooltip();
    await assert.eventually.isFalse(tooltip.isDisplayed());

    await hover(await vlTooltipPage.getTopTooltipButton());

    await assertTooltipIsZichtbaarMetText(tooltip, 'This is tooltip on the top');
    await assertTooltipWordtOpCorrectePlaatsGetoond(tooltip, 'top');
  });

  it('als gebruiker kan ik over een knop hoveren om de tooltip rechts te zien', async () => {
    const tooltip = await vlTooltipPage.getRightTooltip();
    await assert.eventually.isFalse(tooltip.isDisplayed());

    await hover(await vlTooltipPage.getRightTooltipButton());

    await assertTooltipIsZichtbaarMetText(tooltip, 'This is tooltip on the right');
    await assertTooltipWordtOpCorrectePlaatsGetoond(tooltip, 'right');
  });

  it('als gebruiker kan ik over een knop hoveren om de tooltip onderaan te zien', async () => {
    const tooltip = await vlTooltipPage.getBottomTooltip();
    await assert.eventually.isFalse(tooltip.isDisplayed());

    await hover( await vlTooltipPage.getBottomTooltipButton());

    await assertTooltipIsZichtbaarMetText(tooltip, 'This is tooltip on the bottom');
    await assertTooltipWordtOpCorrectePlaatsGetoond(tooltip, 'bottom');
  });

  it('als gebruiker kan ik over een knop hoveren om de tooltip links te zien', async () => {
    const tooltip = await vlTooltipPage.getLeftTooltip();
    await assert.eventually.isFalse(tooltip.isDisplayed());

    await hover(await vlTooltipPage.getLeftTooltipButton());

    await assertTooltipIsZichtbaarMetText(tooltip, 'This is tooltip on the left');
    await assertTooltipWordtOpCorrectePlaatsGetoond(tooltip, 'left');
  });

  it('als gebruiker zie ik de tekst kleiner wanneer er veel tekst in een tooltip zit', async () => {
    await hover(await vlTooltipPage.getMoreContentButton());
    const tooltip = await vlTooltipPage.getMoreContentTooltip();
    await assertTooltipIsZichtbaarMetText(tooltip, 'For a large button, label or other element with more text, the content is shown in a smaller, more condensed way.');
    await assert.eventually.isTrue(tooltip.isLargeTooltip());
  });

  it('als gebruiker kan ik de tekst van een static tooltip zien', async () => {
    const tooltip = await vlTooltipPage.getStaticTooltip();
    await assertTooltipIsZichtbaarMetText(tooltip, 'Static Tooltip');
  });

  it('als gebruiker krijg ik alleen de tooltip te zien wanneer ik over een element hover met tooltip', async () => {
    const button = await vlTooltipPage.getTopTooltipButton();
    const buttonInsideShadowDOM = await vlTooltipPage.getShadowDOMTooltipButton();
    const tooltip = await vlTooltipPage.getTopTooltip();
    const tooltipInsideShadowDOM = await vlTooltipPage.getShadowDOMTooltip();
    await assert.eventually.isFalse(tooltip.isDisplayed());
    await assert.eventually.isFalse(tooltipInsideShadowDOM.isDisplayed());
    await button.hover();
    await assert.eventually.isTrue(tooltip.isDisplayed());
    await assert.eventually.isFalse(tooltipInsideShadowDOM.isDisplayed());
    await buttonInsideShadowDOM.hover();
    await assert.eventually.isFalse(tooltip.isDisplayed());
    await assert.eventually.isTrue(tooltipInsideShadowDOM.isDisplayed());
    await button.hover();
    await assert.eventually.isTrue(tooltip.isDisplayed());
    await assert.eventually.isFalse(tooltipInsideShadowDOM.isDisplayed());
    await buttonInsideShadowDOM.hover();
  });
});
