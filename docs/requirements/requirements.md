# Requirements

:::caution

This document is in the making since we are still in the requirements engineering phase.

:::

## To-do List and Open Questions RE this document

- [ ] Should we differentiate between the individual stakeholders? Or is it sufficient if we just document their perspective or role (e.g., supervisor, researcher, instead of supervisor XYZ or researcher ABC)?

## RE Wording in this Document

- We use *Microservice* and *Service* interchangeably.
- We use *Reference Architecture* and *System* interchangeably.
- RA = reference architecture

## Stakeholders

- Examiner
- Supervisors
- Developers
- Researchers

## Requirement Categories

- Constraints
- Process
  - EnPro -- The project itself
  - Software Artefacts
- Product
  - Domain
  - Usability
  - Non-functional Requirements & Quality Attributes
  - Performance
- Design
  - Architecture
  - Microservice Patterns
  - Loose Coupling
  - Technologies
  - Deployment

## Constraints

### R-C-001: No external services

- The system must not depend on external services.
- Origin: Supervisors, Examiner

### R-C-002: Free of charge

- The use of the system must be free of charge.
- Also, the deployment of the system must be free of charge.
- Origin: Researcher

## Process

### EnPro Requirements

#### R-E-001: At least 15 Microservices

- The RA must consist of at least 15 microservices.
- Origin: Supervisors

#### R-E-002: Microservice Patterns

- Microservice patterns must be used and well documented.
- Origin: Supervisors

#### R-E-003: Different programming languages

- Different programming languages must be used for the system's implementation.
- Python should only be considered as a last resort.
  - If Python was used, an explanation would be needed.

- Origin: Examiner

### Software Artefacts

#### R-SArt-001: Documentation

- The system must be well documented.
- The software architecture of the system must be well documented.
- Design decisions must be documented using Architectural Design Records (ADRs).
  - https://adr.github.io
  - https://github.com/joelparkerhenderson/architecture-decision-record
  - https://adr.github.io/madr/
- Origin: Examiner

#### R-SArt-002: Clean code

- Origin: Examiner

#### R-SArt-003: Clean and simple deployment

- The deployment must be *clean*.
- The doployment must be simple.
- The term one-click deployment was used during the interviews with researchers and supervisors.
- Origin: Examiner

##### Open Questions

- What exactly is a *clean* deployment? When does the examiner consider a deployment a *dirty* one?

## Product

### Usability Requirements

#### R-U-001: As realistic as possible

- The system should be as close to a *real* system as possible.
- Origin: Examiner

##### Open Questions

- In what regard should the system be realistic? Regarding the look and feel of it -- usability? Regarding the load and usage? Or regarding the messaging traffic between the services? We have to clearify this.

#### R-U-002: Usable interface

- The user interface should be *good*.
- It should be usable.
- Origin: Examiner

##### Open Questions

- What is klee frontend? The examiner mentioned it.

#### R-U-003: Configurations

- The user must be able to configure the system.
- The system exposes a configuration file. This file must be independent of the system's technology stack.
- The system should expose only a single central location for configurations.
- The number of configuration files should be limited to only one.
- Origin: Examiner, Supervisors, Researchers

##### Open Questions

- What exactly is it, that users can configure?

#### R-U-004: Experiments

- Researchers must be able to perform experiments using the RA.
- There must be a configurations file for designing the experiments. See R-U-003.
- The RA must be sufficiently deterministic in order to allow the user to repeatedly carry out experiments.
- Researchers want to do experiments using the RA.
- Origin: Supervisors, Researchers

#### R-U-005: The RA must be *lightweight*

- Researchers must be able to "simply quickly try something out RE experimentation".
- It should be really easy and intuitive to quickly deploy the system.
- The RA should not depend on other systems or services. See R-C-001.
- Origin: Researchers

#### R-U-006: Transparency

- Researchers must be able to judge quickly whether or not the RA is of good use for them: The documentation or public appearance of the RA must be appealing, comprehensible, complete and informative so that interested parties can easily assess whether the RA meets their requirements.
- Researchers must have access to the code and the documentation.
- The code must be open source.
- One researchers said that she does not like that one simply does not know exactly how the existing RAs compare to each other since their documentations lacking in quality and quantity.
- Origin: Supervisors, Researchers

#### R-U-007: The domain must be self-explanatory

- The domain must not be an obstacle under any circumstances. As long as the domain is *self-explanatory*, it doesn't matter which domain is shown.
- The domain must not require special knowledge about it in order to be able to use the system.
- Origin: Researchers

#### R-U-008: Observability

- The user must be able to observe and understand exactly what the system is doing or last did.
- The RA must not try to be a blackbox.
- Origin: Examiner, Supervisors, Researchers

#### R-U-009: Visualization of load

- The current utilization (load) of the individual microservices should be visualized at runtime.
- The system should show the current differences in load for the individual services (e.g., using thick lines for more requests).
- Origin: Examiner

#### R-U-010: Explanations of metrics

- Metrics that could be interesting to researchers (e.g. regarding performance) should be well explained.
- Origin: Researcher

#### R-U-011: Adding services

- It should be easy to add more microservices to the system.
- Origin: Researcher

#### R-U-012: True to the term *Reference Architecture*

- The system should be usable as a reference system in the context of education. One should be able to show, let observe, and explain what a microservice architecture is and how it reacts to load.
- Also one should be able to observe and better understand the effects of scaling.
- Origin: Researcher

#### R-U-013: Deterioration in performance

- It should be fairly easy to control the performance of the system. A researcher should be able to decide when and how the performance deteriorates.
- Origin: Researcher

#### R-U-014: Demo mode

- There should be a kind of demo mode so that a new user can try out the system quickly and easily: We provide test data with which the system can be directly *loaded*.
- Origin: Developers

### Non-functional Requirements

#### R-NFR-001: Performance

- The microservices must be performant.
- Origin: Examiner

#### R-NFR-002: Elasticity

- The system must be *elastic*.
- Origin: Examiner

##### Open Question

- What exactly does *elastic* mean? What is the examiner's understanding of the term?

## Design

### Architecture

#### R-A-001: Extendability

- The RA must be expandable: Additional microservices can be added without further ado.
- Origin: Researcher

#### R-A-002: Scale out scenario for databases

- The system should account for a scale out scenario regarding databases.
- Origin: Examiner

#### R-A-003: Distributed Transactions

- The system should support distributed transactions.
- Origin: Supervisors

#### R-A-004: Antipatterns must be avoided

- Origin: Supervisors

#### R-A-005: Loose Coupling

- Services must be only loosely coupled.
- Regarding time and location and structure.
- API first: Services are only allowed to expose and work with other services' interfaces.
- A domain-driven declaration of service responsibilities must be at hand.
- Origin: Examiner, Supervisors, Researchers

### Microservice Patterns

#### R-MP-001: Database per Service

- Origin: Examiner

#### R-MP-002: Messaging (Asynchronous Communication)

Origin: Examiner, Supervisors, Researchers

#### R-MP-003: Circuit Breaker

- Origin: Examiner

#### R-MP-004: Gateway

- Origin: Examiner

#### R-MP-005: Saga

- Origin: Examiner

#### R-MP-006: IO Patterns

- Origin: Examiner

#### R-MP-007: Frontend for Backend

- Origin: Examiner

### Technologies

#### R-T-001: Use Kubernetes

- Origin: Examiner, Supervisors, Researcher

#### R-T-002: No Python

- Python should only be considered as a last resort.
  - If we used Python, we would have to explain why.
- *See R-E-003*
- Origin: Examiner

#### R-T-003: Use Go

- The programming language Go should be used along with a corresponding framework.
- Origin: Examiner

#### R-T-004: Sprint Boot

- Spring Boot or something similiar must be used.
- Origin: Examiner

#### R-T-005: Kafka

- Kafka should be used for the middleware.
- Origin: Examiner

#### R-T-006: Dapr

- Dapr should be used for the middleware.
- Origin: Supervisors

#### R-T-007: JMeter

- JMeter should be used for load and elasticity tests.
- Origin: Examiner

