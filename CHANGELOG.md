# v2.1.1
- Added new gulp tasks
- Separated themes and components files, now it can be used alone

# v2.1.0
- Dropdown
    - removed transparent background of menu without any theme
- Modalbox
    - removed transparent background of modalbox without any theme
    - added padding for modalbox for styles without any theme
- Slider
    - added `.slider--finite` class to disable infinite sliding (prev arrow disappears on slide #1 and next arrow on last slide)
    - added simple styles for non themed arrows
- Tabs
    - added new class `.tab__content--scrollable` to make a tab vertical scrollbar
    - added `overflow: hidden` for non scrollable tabs

# v2.0.0
- Accordion
  - changed mechanism of working from using :target selector to using inputs type radio/checkbox and :checked selector
  - added possibility to collapse one or multiple accordions
- Dropdown
  - changed mechanism of working from using :hover selector to using inputs type checkbox and :checked selector
  - new two type of dropdowns
  - new four directions of dropdown appearing
  - added nested dropdowns
- Modalbox
  - changed mechanism of working from using :target selector to using input type checkbox and :checked selector
  - new four types of dialogs
- Slider
  - added four various positions of slider pills
  - added navigation arrows
- Separated raw styles from theme styles
- Gulp commands

# v1.0.0
Initial commit
