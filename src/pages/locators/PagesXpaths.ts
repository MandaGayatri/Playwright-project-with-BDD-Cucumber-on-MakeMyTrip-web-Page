import { Page, Locator } from 'playwright'

export class PagesXpaths {
  readonly page: Page
  readonly closePopUp: Locator
  readonly fromCity: Locator
  readonly fromSearch: Locator
  readonly fromToDropdown: Locator
  readonly flightLogo: Locator
  readonly toCity: Locator
  readonly toSearch: Locator
  readonly searchButton: Locator
  readonly departureField: Locator
  readonly nextMonth: Locator
  readonly lockPricePopup: Locator
  readonly studentFare: Locator
  readonly regularFare: Locator
  readonly nonStopFilter: Locator
  readonly applyFiltersButton: Locator
  readonly noStudentFaresMsg: Locator
  readonly viewPrices: Locator
  readonly bookNow : Locator
  readonly firstSuggestion: Locator
  readonly addAdult : Locator
  readonly firstName : Locator
  readonly lastName : Locator


  constructor(page: Page) {
    this.page = page
    this.closePopUp = page.locator("//span[@data-cy='closeModal']")
    this.fromCity = page.locator("//input[@id='fromCity']")
    this.fromSearch = page.locator("//input[@placeholder='From']")
    this.fromToDropdown = page.locator("//li[contains(@id,'0-item-0')]")
    this.flightLogo = page.locator("//li[@class='menu_Flights']")
    this.toCity = page.locator("//input[@id='toCity']")
    this.toSearch = page.locator("//input[@placeholder='To' and not(@readonly)]")
    this.searchButton = page.locator("//a[text()='Search']")
    this.departureField = page.locator("//span[contains(text(),'Departure')]")
    this.nextMonth = page.locator("//span[contains(@class,'DayPicker-NavButton--next')]")
    this.lockPricePopup = page.locator("//span[contains(text(),'Lock')]")
    this.studentFare = page.locator("//*[text() = 'Student']")
    this.regularFare = page.locator("//*[text()='Regular']")
    this.nonStopFilter = page.locator("//*[text()=' Non Stop   ']").first()
    this.applyFiltersButton = page.locator("//*[text()='SEARCH']")
    this.noStudentFaresMsg = page.locator("//*[contains(text(),'could not find any Student Fares')]")
   this.viewPrices = page.locator("(//span[contains(text(),'VIEW PRICES')])[1]//parent::button")
   this.bookNow = page.locator("(//button[contains(text(),'BOOK NOW')])[1]")
   this.firstSuggestion = page.locator("//li[contains(@id,'0-item-0')]")
   this.addAdult = page.locator("//*[contains(text(),'+ ADD NEW ADULT')]")
   this.firstName = page.locator("//input[@placeholder='First & Middle Name']")
   this.lastName = page.locator("//input[@placeholder='Last Name']")


  }
}
