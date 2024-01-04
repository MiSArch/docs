---
sidebar_position: 6
---

# Spelling Id like camel case

## Context and Problem Statement

The term `id` is used in multiple places throughout the project.
We need to decide on how it is spelled, in particular when used as prefix in camel-cased words.

## Considered Options

- spelling it `Id`
- spelling it `ID`
- spelling it either `Id` or `ID` depending on service/context

## Decision Outcome

Chosen option: "spelling it `Id`", because allows us to have consistency in the whole project regarding the spelling of id

## Pros and Cons of the Options

### spelling it `Id`

- Good, because consistency: required by VueJS frontend due to how naming conversions are handled between snake and camel case
- Neutral, because personal preference of some team members

### spelling it `ID`

- Good, as consistent with style guide for acronyms in some programming languages
- Neutral, because personal preference of some team members

### spelling it either `Id` or `ID` depending on service/context

- Good, because developer of each service can decide based on personal preference
- Bad, because less consistency
