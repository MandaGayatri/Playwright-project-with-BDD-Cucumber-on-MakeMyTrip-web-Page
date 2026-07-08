import { Given, When, Then, DataTable } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../hooks/hooks';
import { MethodsPage } from '../pages/MethodsPage';

Given('I am on makemytrip homepage', async function (this: CustomWorld) {
    await expect(this.page).toHaveTitle(/makemytrip/i);
    });

When('I click on from button and select my startLocation {string}',async function(this:CustomWorld,startLocation: string)
{
    const hm = new MethodsPage(this.page);
    await hm.selectFromLocation(startLocation);
    });
Then('I click on To button and select toLocation {string}',async function(this:CustomWorld,toLocation: string)
{
    const hm = new MethodsPage(this.page);
      await hm.selectToLocation(toLocation);

    });
Then('I select departure date',async function(this:CustomWorld)
{
    const hm = new MethodsPage(this.page);
      await hm.selectDepartureDate();

    });
Then('I click on searchButton',async function(this:CustomWorld)
{
    const hm = new MethodsPage(this.page);
      await hm.clickSearchButton();

    });
Then('I select student fare type',async function(this:CustomWorld)
{
    const hm = new MethodsPage(this.page);
      await hm.selectStudentFare();

    });
Then('I filter non stop flights',async function(this:CustomWorld)
{
    const hm = new MethodsPage(this.page);
      await hm.filterNonStop();

    });
Then('I click on search button to apply filters',async function(this:CustomWorld)
{
    const hm = new MethodsPage(this.page);
      await hm.clickApplyAndCheckResults();

    });
Then('I switch to regular fare if no student fares available',async function(this:CustomWorld)
{
    // Handled within clickApplyAndCheckResults

    });
Then('I click on view Prices button for first flight and click on bookNow button',async function(this:CustomWorld)
{
    const hm = new MethodsPage(this.page);
    this.newPage = await hm.clickOnPricesBookNow();
    });

Then('Selected flight details should appear', async function (this: CustomWorld) {
    await expect(this.newPage).toHaveTitle(/makemytrip/i);
    });

Then('I add adult passenger details:', async function (this: CustomWorld, table: DataTable) {
    const hm = new MethodsPage(this.newPage);
    const rows = table.hashes();
    for (const row of rows) {
        await hm.addAdultDetails(row.firstName, row.lastName);
    }
    });

Then('All values should be displayed', async function (this: CustomWorld) {
    await expect(this.newPage).toHaveTitle(/makemytrip/i);
    });
