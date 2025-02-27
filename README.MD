# Web Application Mimicking Google Sheets

## Overview
This is a fully functional web-based spreadsheet application that mimics Google Sheets. It allows users to create, edit, format, and manipulate spreadsheet data with essential mathematical and data quality functions.

## Features
- **Spreadsheet Interface**: Mimics Google Sheets layout with toolbar, formula bar, and interactive grid.
- **Cell Formatting**: Supports bold, italic, underline, font size, and colors.
- **Mathematical Functions**:
  - `SUM(range)`: Calculates the sum of selected cells.
  - `AVERAGE(range)`: Computes the average value.
  - `MAX(range)`: Returns the maximum number.
  - `MIN(range)`: Returns the minimum number.
  - `COUNT(range)`: Counts numeric values.
- **Data Quality Functions**:
  - `TRIM(text)`: Removes leading and trailing spaces.
  - `UPPER(text)`: Converts text to uppercase.
  - `LOWER(text)`: Converts text to lowercase.
  - `REMOVE_DUPLICATES(range)`: Removes duplicate entries.
  - `FIND_AND_REPLACE(find, replace)`: Replaces text occurrences.
- **Cell Dependencies**: Dynamically updates formulas when dependent cells change.
- **Data Entry & Validation**: Ensures proper input handling for numeric and text fields.
- **Drag & Drop Support**: Allows users to move cell content effortlessly.
- **Save & Load**: Users can download and upload their spreadsheet as JSON.

## Tech Stack
- **Frontend**: HTML, CSS, JavaScript
- **Data Structures Used**:
  - **Objects**: Stores spreadsheet cell data.
  - **Arrays**: Manages multiple sheets.
  - **Event Listeners**: For interactive UI handling.

## Installation & Usage
1. Clone this repository:
   ```bash
   git clone https://maheshlakki.github.io/Web-Application-Mimicking-Google-Sheets/
   ```
2. Open `index.html` in a browser.
3. Start using the spreadsheet functionality!

## Future Enhancements
- Add support for advanced formulas.
- Implement CSV/Excel import/export.
- Introduce collaborative editing with real-time updates.

## Author
Developed by [T.Mahesh].
