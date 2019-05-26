##### Parking Lot CLI

A simple command line interface for managing your parking lot.

###### Setup

- You can either run: `cd program && npm i` or `./bin/setup` to setup necessary files

- In case you can't run `./bin/setup`, give the file `execution` permission by running `chmod +x bin/setup`
in your terminal

- `./bin/setup` is recommended as it will also run the unit tests

- If you follow the node way of preparing the project, then run unit tests manually to
confirm everything is working as expected. To do that type: `npm test` inside `program` dir

###### Testing the CLI

- The CLI can either be run in interactive mode or provided a file to process

- It can be spawn up using either of the approaches below:

```bash
cd program
./dist/index.js # interactive mode
./dist/index.js file.txt # file based processing
```

or

```bash
./bin/parking_lot # interactive mode
./bin/parking_lot file.txt # file based processing
```

- To test the file based processing, you can put the following content in a text file
and try running the CLI with the file path provided

```text
// file.txt

create_parking_lot 6
park KA-01-HH-1234 White
park KA-01-HH-9999 White
park KA-01-BB-0001 Black
park KA-01-HH-7777 Red
park KA-01-HH-2701 Blue
park KA-01-HH-3141 Black
leave 4
status
park KA-01-P-333 White
park DL-12-AA-9999 White
registration_numbers_for_cars_with_colour White
slot_numbers_for_cars_with_colour White
slot_number_for_registration_number KA-01-HH-3141
slot_number_for_registration_number MH-04-AY-1111
```

```bash
./bin/parking_lot file.txt
```

####### Running the Integration Tests

- To check both the modes specified above, you can run the whole integration test suit
given under `functional_spec` dir

```bash
./bin/run_functional_tests
```

- To run different specs separately, refer to the `readme` given inside `functional_spec` dir
