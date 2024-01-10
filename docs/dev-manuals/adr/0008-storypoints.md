---
sidebar_position: 9
---

# Storypoints

## Problem

As an agile project, we need a definition of effort.
We classify issues into `low`, `medium`, and `high` effort.
However, it is impossible to create diagrams automatically if the real effort is an ordinal measure instead of a rational measure.
As such, we need a numerical definition of `low`, `medium`, and `high`.

## Considered Options

- We use storypoints as effort measurement. 1 Storypoint = 4 hours of work. `low` = effort $\leq 1$ storypoint. `medium` = $1 <$ effort $\geq 3$ storypoints. `high` = effort $> 3$ storypoints.
- Use another definition of effort (no other option was proposed)

## Decision Outcome

- Expected option

## Pros and Cons of the Option

- Good, easily verifiable definition
- Good, makes it possible to create diagrams where we miscalculated
- Good, `low` corresponds to a day or less work according to our guidelines and `medium` corresponds to three working days
- Bad, storypoints should not have a numeric value
- Bad, the threshold for `low` and `medium` might be too low, could result in too many `medium`/`high` issues
