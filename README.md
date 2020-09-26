# WeightliftingML
Markup language and parser for weightlifting logs.

The idea is to be able to derive structured data from concise workout notes taken on a smartphone.

Here's an example of a workout log in the WeightliftingML format:

```
Workout September 16, 2020

Snatch
Up to technique bar + 35lb each side

Clean and Jerk
Up to 145lb

Squat
3x5@165
  
Bench
3x5@170
  
Deadlift
5@185
5@255 TOUGH
```

The following elements are parsed:

## Workout Date
Example:
```
Workout September 16, 2020
```

It triggers on the term "Workout", and requires this very specific date format.

All exercises that follow a workout date line have that data associated with it.

## Loosely Formatted Exercises
Examples:
```
Snatch
Up to technique bar + 35lb each side
```
```
Clean and Jerk
Up to 145lb
```
It triggers on "lb". Exercise and poundage are parsed, and the entire line that includes "lb" is treated as notes.

## Acknowledgements

Many thanks to Justin Curry for the sample notes, notation ideas, and collaboration on this!
