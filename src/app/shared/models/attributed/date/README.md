Let's imagine we need to create new column type - Date column for example.

We must make 2 models:

1. DateCell - based on Cell interface
2. DateColumn - based on TypedColumn, DateColEdit and other models

Also we must make 3 functions:

1. getDateValue - which could get particular value from a row
2. formDateValueFn - which prepares date for Edit Form.
3. getDateRequests - which prepares edited data for sending http request.
