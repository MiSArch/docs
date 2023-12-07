---
sidebar_position: 4
---

# Domain Tradeoff Analysis

This document compares the three domains "Sonarcube Actions" (**SA**), "Shipping Container Service" (**SCS**) and ""Ticketing System" (**TS**) in terms of their suitability with regard to the requirements identified. The complete requirement descriptions can be found in the requirement docs file. Requirements, that are equally fullfillable by both domains are omitted from this comparison.
In the summary, the arguments from the developers perspective are compared to the supervisors feedback.

## Short Description SonarCube Actions

SonarCube Actions allows developers to analyse their source code by assembling an individual processing pipeline. Users upload their code or connect their code-hosting service to the **SA** system. Possible pipeline steps are static code analysis, AI-driven summary, documentation services, or performance analysis. The results from all steps are put together and presented to the user when the pipeline is finished.

## Short Description Shipping Container Service

The **SCS** system allows users to get cargo from one port to another. An important functionality is the preview functionality, which allows the user to know the cost and timeline of his shipping order beforehand, and choose between economic, ecological or fast options. The system handles the routing and scheduling for the simulated container ships and analyzes the event stream of GPS coordinates for anomalies. In the frontend, users can track their orders and operators can access business insights.

## Ticket System

The **TS** domain was added after the requirements analysis to include a lightweight alternative.

Users (both internal and external) can create tickets, which are then handled by support employees. Like in Jira, tickets can have a workflow, which can involve manual, but also automatic steps. Tickets are handled like a sort-of chatbot: most importantly, they have an associated history. Entries in the timeline can for example be a form, text messages, automatic reminders, or button inputs. Doing entries can cause events, for example a message by the creator causes the "answered" event. These events can in be associated with state changes and thus transitions in the pipeline builder. As tickets also have manual steps, in these cases, work needs to be done by employees. Thus, there should be some sort of backlog of tickets which need to be handled by employees.

## E-Commerce

Since the e-commerce domain is used in a variety of other reference architectures, it was included retrospectively in this comparison as a benchmark domain.

## Overview of Relevant Requirement Categories

- Constraints
- Process
- EnPro -- The project itself
- Software Artefacts
- Product
- Usability
- Design
- Architecture
- Microservice Patterns

## Constraints

#### R-C-001: No external services

Both the SCS and SA domains include functionalities, that would benefit from external services (i.e. code summary for SA and routing, currency exchange for SCS). These functionalities can be implemented in the project with some effort.

TS is less complex and therefore is not reliant on external services.

## Process

### EnPro Requirements

#### R-E-001: At least 15 Microservices

The SCS and SA domains easily provide enough use cases to fulfil this requirement. However, due to the pipes-and-filters architecture of the SA domain, it might be easier to add additional, low-effort services.

Since the TS domain is more lightweight, it will be more difficult to come up with 15 microservices.

#### R-E-002: Microservice Patterns

A possible separation of concerns is essential for using the microservice pattern. Tight coupling between the services is one of the largest issues with modern microservice architectures. The SA architecture shares only the input between the different (non-core) services and therefore might be easier to support this pattern.

Since the TS domain will be smaller, a logical seperation of the microservices might be harder.

### Software Artefacts

#### R-SArt-003: Clean and simple deployment

If AI services like a code summary service are implemented in the SA domain, the resulting system might be more difficult to deploy. Large Language Models need a lot of resources to operate.

## Product

### Usability Requirements

#### R-U-001: As realistic as possible

Both domains allow for a realistic system, since similar - microservice-based - systems are in use today. The SA system might be more relevant after the project for the chair since it fits better to their research focus. Since the SCS system is built on top of a simulation, it is slightly less realistic. Since container ships are quite slow, a time speedup is needed.
The TS system will also need simulated "processing" of the tickets.

#### R-U-003: Configurations

Configuration is essential for the experiment-focused side of the reference architecture. The requirement R-U-003 also includes architecture-side configuration and different variants of the system which are indifferent between the domains. The following comparison focuses on the deployment configuration.
There are more configurable variables in the SCS domain since all shipping-related variables (like boat size, container size, number of boats, number of ports, frequency of location updates), that can be adjusted based on the researcher's needs.

#### R-U-004: Experiments

While the SCS domain is more configurable (see R-U-003), it is more effort to make experiments deterministic. Since the system is stateful due to the current location of ships and containers, a well-defined starting state would need to be introduced.

#### R-U-005: The RA must be _lightweight_

Due to the reduced technical complexity of the TS domain, it can be considered the most lightweight.

#### R-U-008: Observability

The SCS domain might be more complicated to observe since actions and events are less user-input-driven than in the SA domain. For example, the metrics regarding one pipeline call can easily be measured and observed end-to-end, while a shipping request adds the order in the shipping queue and leads to a lot of follow-up calculations and optimizations, that are harder to link to one request.

#### R-U-011: Adding services

Due to the looser coupling of the SA domain, additional microservices should be easier to add as long as they do not influence the core services (like scheduling/pipelines).

#### R-U-012: True to the term _Reference Architecture_

See R-U-005: Since the TS system will be more lightweight and easy to understand, it has a slight edge over the other domains.

#### R-U-013: Deterioration in performance

Both the SA and SCS domains allow for performance deterioration, although through different means. In the SA domain, heavy load can be put on the system by adding AI-driven steps. In the SCS domain, the routing and optimization for large orders and ships or data-intensive business intelligence queries can add load.
The TS system does not include similar - resource-intensive processes.

### ToAdd Unexpected load

The TS domain includes somewhat unexpected load since tickets increase when systems are down or users are unhappy. The SCS domain includes unexpected load, when ships are delayed or shipping routes closed. The argument can be made, however, that ships are slow and therefore calculations not time-sensitive. The SA system can be hit with requests for very large repositories.
These do however not fulfil the definition regarding unexpected load completely.

## Design

### Architecture

#### R-A-001: Extendability

See R-U-011

#### R-A-003: Distributed Transactions

Distributed Transactions might be easier in the SCS domain since one shipping order passes different process steps and later shipping ports.

#### R-A-005: Loose Coupling

See R-E-002

### Microservice Patterns

#### R-MP-001: Database per Service

In the TS domain, clearly separating the services will be harder (see R-E-002).

#### R-MP-005: Saga

See R-A-003

## Summary

An **X** indicates, that the domain is better able to or easier to implement a requirement than domains without an X. **0** means, that the domain is neither beneficial nor hindering for the implementation of a requirement. An **empty field** means, that it is harder within the domain to fulfil the requirement.

| Requirement                                         | SA  | SCS | TS  | e-Commerce |
| --------------------------------------------------- | --- | --- | --- | ---------- |
| R-E-001 (No external services)                      |     |     | X   | F          |
| R-E-002 (At least 15 microservices)                 | X   | X   |     | X          |
| R-SArt-003 (Clean/simple deployment)                |     | 0   | X   | X          |
| R-U-001 (As realistic as possible)                  | X   | 0   | 0   | 0          |
| R-U-003 (Configurations)                            | X   | X   | 0   |            |
| R-U-003 (Conf. Arch)                                | X   |     | 0   |            |
| R-U-004 (Experiments)                               | X   |     | X   | X          |
| R-U-005 (The RA must be _lightweight_)              | 0   | 0   | X   | X          |
| R-U-008 (Observability)                             | X   |     | X   | X          |
| R-U-011 (Adding services)                           | X   | 0   | 0   | 0          |
| R-U-012 (True to the term _Reference Architecture_) | 0   | 0   | X   | X          |
| R-U-013 (Deterioration in performance)              | X   | X   |     | X          |
| Unexpected load                                     | 0   |     | 0   | X          |
| R-A-003 (Distributed Transactions)                  | 0   | X   |     | X          |
| R-MP-001 (Database per Service)                     | X   | X   |     | X          |
| Rating                                              | 5   | 1   | 2   | 13         |

## Project Supervisor' opinion:

| Requirement                                         | SA   | SCS | TS    | e-Commerce | Relevance | Comments                                                           |
| --------------------------------------------------- | ---- | --- | ----- | ---------- | --------- | ------------------------------------------------------------------ |
| R-C-001 (No external services)                      | 0    | F   | X     | F          | REL       |
| R-E-001 (At least 15 microservices)                 | X    | 0   | 0     | X          | REL       |
| R-E-002 (Suited for Microservices)                  | X    | X   | X     | X          | REL       |
| R-SArt-003 (Clean/simple deployment)                |      | 0   | X     | X          | NTH       |
| R-U-001 (Realisitic Usage possible)                 | X    | 0   | X     | 0          | NTH       |
| R-U-001 (Realistic experiments possible)            | X    | 0   | F     | F          | NTH       | F: more effort required                                            |
| R-U-003 (Data Configurations)                       | X    | X   | X     | X          | NTH       |
| R-U-003 (Conf. Arch)                                | X    |     | 0     |            | NI        | Only with chat pipeline? Then maybe 0 for e-Commerce               |
| R-U-004 (Experiments)                               | X    | 0   | X     | X          | REL       | Stateless experiments?                                             |
| R-U-005 (The RA must be _lightweight_)              | 0    | 0   | X     | X          | REL       | lightweight regarding domain understanding, etc.                   |
| R-U-008 (Observability)                             | X    | 0   | X     | X          | REL       |
| R-U-011 (Adding services)                           | X    | 0   | X     | 0          | NTH       | X for TS if services for chat                                      |
| R-U-012 (True to the term _Reference Architecture_) | 0    | 0   | X     | X          | REL       | Regarding education and benchmark system                           |
| R-U-013 (Deterioration in performance)              | N    | N   | N     | N          | N         | Removed because faking would be possible everywhere                |
| R-Special (Unexpected load)                         | 0    |     | 0     | X          | REL       |
| R-A-003 (Distributed Transactions)                  | 0    | X   | 0     | X          | NTH       | Good if there are business processes including it and some without |
| R-MP-001 (Database per Service)                     | X    | X   | X     | X          | REL       | Each service requiring a DB has its own                            |
| R-Special (Finding newcomers)                       | X    |     | 0     | X          | REL       |
| Rating                                              | 8    | 2   | 11    | 11         |
| Rating with relevance                               | 15.5 | 3   | 18.75 | 21.25      |

X = 1, F = 0.5, 0 = 0, Nothing = -1

Factors: REL = 2, NTH = 1.5, NI = 1

Therefore, the decision is made for the E-Commerce Domain Model since it is preferrable in both ratings.
