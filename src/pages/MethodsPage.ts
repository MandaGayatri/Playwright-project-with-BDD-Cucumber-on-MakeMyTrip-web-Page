import { Page } from 'playwright';
import { PagesXpaths } from './locators/PagesXpaths';

export class MethodsPage {
    readonly p: PagesXpaths;
    readonly page: Page;

    constructor(page: Page) {
        this.p = new PagesXpaths(page);
        this.page = page;
    }

    async selectFromLocation(fromCity: string): Promise<void> {
        await this.page.waitForTimeout(10000);

        if (await this.p.closePopUp.isVisible()) {
            await this.p.closePopUp.click();
            await this.page.waitForTimeout(3000);
        }

        await this.p.flightLogo.click();
        await this.page.waitForTimeout(3000);
        await this.p.fromCity.waitFor({ state: 'visible', timeout: 10000 });
        await this.p.fromCity.click();
        await this.page.waitForTimeout(2000);
        await this.p.fromSearch.fill(fromCity);
        await this.page.waitForTimeout(2000);
        await this.p.fromToDropdown.waitFor({ state: 'visible', timeout: 10000 });
        await this.p.fromToDropdown.click();
        await this.page.waitForTimeout(2000);
    }

    async selectToLocation(toCity: string): Promise<void> {
        await this.p.toCity.waitFor({ state: 'visible', timeout: 10000 });
        await this.p.toCity.click();
        await this.page.waitForTimeout(2000);
        await this.p.toSearch.waitFor({ state: 'visible', timeout: 10000 });
        await this.p.toSearch.fill(toCity);
        await this.page.waitForTimeout(2000);
        await this.p.firstSuggestion.waitFor({ state: 'visible', timeout: 10000 });
        await this.page.waitForFunction(
            (city) => document.querySelector('li[id*="0-item-0"]')?.textContent?.toLowerCase().includes(city.toLowerCase()) ?? false,
            toCity,
            { timeout: 15000 }
        );
        await this.p.firstSuggestion.click();
        await this.page.waitForTimeout(2000);
    }

    async selectDepartureDate(daysFromToday: number = 2): Promise<void> {
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + daysFromToday);

        const dateStr = targetDate.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: '2-digit',
            year: 'numeric'
        }).replace(/,/g, '');

        const dateCell = this.page.locator(`//*[@aria-label='${dateStr}']`);

        const isCalendarOpen = await this.page.locator("//*[contains(@class,'DayPicker')]")
            .isVisible().catch(() => false);

        if (!isCalendarOpen) {
            await this.p.departureField.waitFor({ state: 'visible', timeout: 10000 });
            await this.p.departureField.click();
            await this.page.waitForTimeout(2000);
        }

        for (let i = 0; i < 12; i++) {
            if (await dateCell.isVisible()) break;
            await this.p.nextMonth.click();
            await this.page.waitForTimeout(1000);
        }
        await dateCell.waitFor({ state: 'visible', timeout: 10000 });
        await dateCell.click();
        await this.page.waitForTimeout(3000);
    }

    async clickSearchButton(): Promise<void> {
        await this.page.waitForTimeout(3000);
        await this.p.searchButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.p.searchButton.click();

        await this.page.waitForURL('**/flights/**', { timeout: 20000 }).catch(() =>
            this.page.waitForURL('**/search**', { timeout: 10000 }).catch(() => {})
        );
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(5000);
    }

    async selectStudentFare(): Promise<void> {
        await this.page.waitForTimeout(3000);
        await this.p.studentFare.waitFor({ state: 'visible', timeout: 15000 });
        await this.p.studentFare.click();
        await this.page.waitForTimeout(5000);
    }

    async filterNonStop(): Promise<void> {
        await this.page.waitForTimeout(3000);
        await this.p.nonStopFilter.waitFor({ state: 'visible', timeout: 15000 });
        const isChecked = await this.p.nonStopFilter.isChecked().catch(() => false);
        if (isChecked) {
            console.log('Non-stop filter is already selected, skipping click');
        } else {
            await this.p.nonStopFilter.click();
            await this.page.waitForTimeout(3000);
        }
    }

    async clickApplyAndCheckResults(): Promise<void> {
        await this.page.waitForTimeout(3000);

        await this.p.applyFiltersButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.p.applyFiltersButton.click();
        await this.page.waitForTimeout(3000);

        await this.page.waitForTimeout(5000);

        if (await this.p.noStudentFaresMsg.isVisible().catch(() => false)) {
            await this.p.regularFare.waitFor({ state: 'visible', timeout: 15000 });
            await this.p.regularFare.click();
            await this.page.waitForTimeout(3000);

            const isSearchAgainVisible = await this.p.applyFiltersButton.isVisible().catch(() => false);
            if (isSearchAgainVisible) {
                await this.p.applyFiltersButton.click();
                await this.page.waitForTimeout(3000);
            }
            await this.page.waitForTimeout(5000);
        }
    }

async clickOnPricesBookNow(): Promise<Page> {
    await this.p.viewPrices.click();
    await this.page.waitForTimeout(3000);
    await this.p.bookNow.waitFor({ state: 'visible', timeout: 15000 });
    const [newPage] = await Promise.all([
        this.page.context().waitForEvent('page'),
        this.p.bookNow.click(),
    ]);
    await newPage.waitForLoadState('domcontentloaded');
    await newPage.waitForTimeout(5000);
    return newPage;
}


async addAdultDetails(firstName: string, lastName: string): Promise<void> {
    await this.p.addAdult.waitFor({ state: 'visible', timeout: 15000 });
    await this.p.addAdult.click();
    await this.page.waitForTimeout(2000);

    await this.p.firstName.waitFor({ state: 'visible', timeout: 10000 });
    await this.p.firstName.fill(firstName);
    await this.page.waitForTimeout(1000);

    await this.p.lastName.waitFor({ state: 'visible', timeout: 10000 });
    await this.p.lastName.fill(lastName);
    await this.page.waitForTimeout(1000);
}

async clickAddAdult(): Promise<void> {
    await this.p.addAdult.waitFor({ state: 'visible', timeout: 15000 });
    await this.p.addAdult.click();
    await this.page.waitForTimeout(2000);
}

async fillFirstName(name: string): Promise<void> {
    await this.p.firstName.waitFor({ state: 'visible', timeout: 10000 });
    await this.p.firstName.fill(name);
    await this.page.waitForTimeout(1000);
}

async fillLastName(name: string): Promise<void> {
    await this.p.lastName.waitFor({ state: 'visible', timeout: 10000 });
    await this.p.lastName.fill(name);
    await this.page.waitForTimeout(1000);
}
}

