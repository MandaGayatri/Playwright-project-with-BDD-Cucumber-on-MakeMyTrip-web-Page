@e2e @makemytrip @smoke
Feature: MakeMyTrip Flight Booking

  Scenario Outline: Book cheapest flight from start to destination
    Given I am on makemytrip homepage
    When I click on from button and select my startLocation "<startLocation>"
    And I click on To button and select toLocation "<toLocation>"
    And I select departure date
    And I click on searchButton
    And I select student fare type
    And I filter non stop flights
    And I click on search button to apply filters
    And I switch to regular fare if no student fares available
    And I click on view Prices button for first flight and click on bookNow button
    Then Selected flight details should appear
    And I add adult passenger details:
      | firstName | lastName |
      | <firstName> | <lastName> |
    Then All values should be displayed

    Examples:
      | startLocation | toLocation | firstName | lastName |
      | Hyderabad     | chennai    | lucky     | smiley   |
