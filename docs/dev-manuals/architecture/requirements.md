---
sidebar_position: 2
---

# Requirements

:::caution

Although we are no longer in the requirements engineering phase, this document may still change in the near future.

:::

## To-do List and Open Questions RE this document

- [ ] Go through the requirements after having prioritized them and adjust the usage of "should" and "must" to better reflect the requirement's importance.

## RE Wording in this Document

- We use _Microservice_ and _Service_ interchangeably.
- We use _Reference Architecture_ and _System_ interchangeably.
- RA = reference architecture

## Stakeholders

- Examiner
- Supervisors
- Developers
- Researchers:
  - Researcher _Toni_
  - Researcher _Goliath_
- _Ulm_ -- a collective of experienced users of similar systems; they do metric based performance experiments and regularly have to adapt the underlying reference architecture

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
  - Configurations
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
- Origin: Examiner, Supervisors

#### R-E-002: Microservice Patterns

- Microservice patterns must be used and well documented.
- Origin: Examiner, Supervisors

#### R-E-003: Different programming languages

- Different programming languages must be used for the system's implementation.
- Python should only be considered as a last resort.

  - If Python was used, an explanation would be needed.

- Java should be part of the mix. -- Researcher _Goliath_
- See R-T-003, R-T-009, and R-T-002
- Origin: Examiner, Researcher _Goliath_

### Software Artefacts

#### R-SArt-001: Documentation

- The system must be well documented.
- The software architecture of the system must be well documented.
- Design decisions must be documented using Architectural Design Records (ADRs).
  - https://adr.github.io
  - https://github.com/joelparkerhenderson/architecture-decision-record
  - https://adr.github.io/madr/
- The endpoints of the system must be clearly and comprehensively documented.
- See R-U-019
- Origin: Examiner

#### R-SArt-002: Clean code

- Origin: Examiner

#### R-SArt-003: Clean and simple deployment

- The deployment must be _clean_.
- The doployment must be simple.
- The term one-click deployment was used during the interviews with researchers and supervisors.
- The README file referring to the deployment must be complete, well structured, informative, easy to read and to understand, and always up to date.
- This requirement could also be moved into the section _Usability Requirements_ since an easy deployment relates to higher usability.
- Origin: Examiner, Researcher _Toni_, Researcher _Goliath_

##### Open Questions

- What exactly is a _clean_ deployment?

#### R-SArt-004: Explanatory models for the end user

- The end user should have access to models which support them in understanding the system.
- Origin: Researcher _Toni_

#### R-SArt-005: Chaos testing

- The system must be _ready_ for chaos testing, one must be able to apply chaos testing to the system's microservices.
- As part of the testing strategy, chaos testing should be done within the EnPro.
- Depending on the toolkit for doing chaos testing, it has to be ensured that the system's reliability changes in order to test ist by applying chaos testing technique.
- Regarding the targeted non-functional requirement at test -- reliability --: Either the toolkit simulates unreliability or the system must enable different configurations of reliability itself.
- Origin: Supervisors, Researcher _Toni_

## Product

### Domain

#### R-D-001: The domain must be specific and self-explanatory

- The domain must be a specific one.
- Researchs must be able to understand the domain intuitively.
- The domain must not be an obstacle under any circumstances. As long as the domain is _self-explanatory_, it doesn't matter which domain is shown.
- The domain must not require special knowledge about it in order to be able to use the system.
- Origin: Researchers, Researcher _Toni_

#### R-D-002: The domain should not be part of the _technology world_

- The domain should be clearly separated from any technology domain to avoid confusion regarding wordings and terms.
- There should be no clashes regarding the language of the domain and the language of the system's architecture: no common wordings.
- e.g., words like service, pipeline, container (Docker) should be avoided in the domain language
- Origin: Researcher _Toni_

### Usability Requirements

#### R-U-001: As realistic as possible

- The system should be as close to a _real_ system as possible.
- See R-A-006
- Origin: Examiner

##### Open Questions

- In what regard should the system be realistic? Regarding the look and feel of it -- usability? Regarding the load and usage? Or regarding the messaging traffic between the services? We have to clearify this.

#### R-U-002: Usable interface

- The user interface should be _good_.
- It should be usable.
- Origin: Examiner

#### R-U-003: Configurations

- The user must be able to configure the system.
- The system exposes a configuration file. This file must be independent of the system's technology stack.
- The system should expose only a single central location for configurations.
- The number of configuration files should be limited to only one.
- Origin: Examiner, Supervisors, Researchers, _Ulm_

##### Conflicting Interpretation of the requirement:

- It should be possible to configure microservices individually in order to analyze their impact on the rest of the system.
- "If I change one service, what is the response of the rest of the system to that change." -- Researcher _Goliath_
- Origin: Researcher _Goliath_

##### Open Questions

- What exactly is it, that users can configure?

#### R-U-004: Experiments

- Researchers must be able to perform experiments using the RA.
- There must be a configurations file for designing the experiments. See R-U-003.
- The RA must be sufficiently deterministic in order to allow the user to repeatedly carry out experiments.
- Researchers want to do experiments using the RA.
- It must be effortless to use the system for experimentation. -- Researcher _Toni_
- As a researcher, I want control over my experiments. The systems must allow me to have this control. -- Researcher _Toni_. The system must be fully controllable in order to maximize the degrees of freedom in the experimentation.
- Origin: Supervisors, Researchers, Researcher _Toni_

#### R-U-005: The RA must be _lightweight_

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
- See R-A-001
- Origin: Researcher

#### R-U-012: True to the term _Reference Architecture_

- The system should be usable as a reference system in the context of education. One should be able to show, let observe, and explain what a microservice architecture is and how it reacts to load.
- Also one should be able to observe and better understand the effects of scaling.
- Origin: Researcher

#### R-U-013: Deterioration in performance

- It should be fairly easy to control the performance of the system. A researcher should be able to decide when and how the performance deteriorates.
- "As a researcher I want to be able to a) reproduce performance issues and b) inject them into the system. I want to be able to trigger potential bottle necks." -- Researcher _Goliath_
- Individual services should be controlled regarding their performance degradation.
- The system should allow for _injecting_ gradual performance degradation at the system level and at the microservice level.
- It should be possible to _inject_ regression by making configurations to the database (e.g., number of threads available to the database system). See R-Conf-006
- Origin: Researcher, Researcher _Goliath_

#### R-U-014: Demo mode

- There should be a kind of demo mode so that a new user can try out the system quickly and easily: We provide test data with which the system can be directly _loaded_.
- Origin: Developers

#### R-U-015: Repeatability of experiments

- The system must ensure that researchers can repeat experiments as often as they wish.
- As a researcher, I want to repeat an experminent multiple times and I need the system to be in the exact same state at the beginning of each repetition of the experiment.
- A stakeholder said: "If I have scaling in place, when the experiment is finished, you want the state to be just like before the experiment. This allows repeatability."
- This requirement could also be moved into the section Configurations.
- Origin: Researcher _Toni_

#### R-U-016: Scheduling of experiments

- The system must offer the possibility to schedule experiments.
- As a researcher, I want to be able to schedule experiments.
- This requirement could also be moved into the section Configurations.
- Origin: Researcher _Toni_

#### R-U-017: Measurements and Metrics

- The system should make measurements related to the system's behavior, record these measurements and make them available for the user.
- External developers said that they needed "comprehensive measurements from the system".
- The recorded data should be as diverse and comprehensive as possible. This way researchers can decide per case which measures they need.
- Origin: _Ulm_

##### Open Questions

- What exactly is it that could be measured?

#### R-U-018: Usage costs

- The system should measure and report the costs of running and scaling the system.
- As a user / researcher, I want to make decisions partly based on the costs of the system's usage.
- The supervisors do not require this.
- See R-Conf-004
- Origin: _Ulm_

#### R-U-019: JMeter readiness

- Using JMeter to test the performance of the RA must be a) possible and b) easy and intuitive.
- How can the likelihood of achieving this requirement be maximized? By providing a comprehensive documentation detailing the architecture, endpoints, expected behaviors, and data formats of the RA. The documentation should guide performance engineers in setting up test scenarios accurately within JMeter. In addition, by defining clear API contracts or specifications (such as Swagger/OpenAPI documentation) for the RA's endpoints, request formats, and responses. This helps in accurately configuring JMeter's HTTP Request samplers and assertions. Also, see R-SArt-001.
- See R-T-007
- Origin: Derived from R-T-007

### Non-functional Requirements

#### R-NFR-001: Performance

- The microservices must be performant.
- Origin: Examiner

#### R-NFR-002: Elasticity / Auto scaling

- The system must be _elastic_.
- The system must scale automatically.
- Origin: Examiner, Researcher _Toni_

##### Open Question

- What exactly does _elastic_ mean? What is the examiner's understanding of the term?

#### R-NFR-003: Resilience

- The system should be resilient.
- The systems' microservices must not fail suddenly and without good reason.
- Origin: Researcher _Toni_

#### R-NFR-004: Maintainability

- In the long term, the system should be easy to maintain.
- Not only for the developers but also for the researchers using the system.
- Instead of trying to support every possible deployment, only one deployment should be supported but that one should be supported very well.
- In order to improve maintainability, things should be kept as simple as possible. Note, that this is a very general and loose requirement.
- Origin: Researcher _Goliath_

### Configurations

See also R-U-003.

#### R-Conf-001: Variable in size

- The system's size should be configurable.
- As a researcher, I want to be able to decide how big or small the system actually is. I want to set the system's size in order to have it fit my needs.
- Origin: Researcher _Toni_

##### Open Questions

- What is a small system? What is a big system? How should size be measured?

#### R-Conf-002: Load profiles

- The system must offer the possibility to use load profiles.
- As a researcher, I want to specify load profiles to control the system when experimenting with it.
- Advice from stakeholder: Derive the load profiles from the domain.
- As a researcher, I want diversity in the system's load patterns because I want to know, if I deploy an elasticity policy, how will that perform?
- Origin: Researcher _Toni_

#### ~~R-Conf-003: Elasticity policies~~

- The system must offer the possibility to specify elasticity policies.
- We discarded this requ. since it only serves as a high-level term for scaling and load handling. Since it could be that in the future there will be more specific requirements, we did not delete it entirely.
- See R-Conf-002, R-Conf-003
- Origin: Researcher _Toni_

#### R-Conf-004: Scaling policies

- The system should offer different alternatives for scaling.
- The system should allow the user to configure the scaling techniques in place.
- For each scaling strategy, the system should inform about the costs of the chosen scaling strategy. -- _Ulm_

  - See R-U-018
  - The supervisors do not require this.

- Origin: Researcher _Toni_

#### R-Conf-005: System variants

- The system should have different variants.
- e.g., one variant with database as a service, another variant with a shared database
- Origin: Researcher _Toni_

##### Open Questions

- What other variants could be interesting?

#### R-Conf-006: Configurations scope

- The system should allow for configurations on the following levels:
  - System
  - Microservice
  - Database (Management System)
- Origin: Researcher _Goliath_

## Design

### Architecture

#### R-A-001: Extendability

- The RA must be expandable: Additional microservices can be added without further ado.
- See R-U-011
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
- Origin: Examiner, Supervisors, Researchers, Researcher _Toni_

#### R-A-006: Diversity in communication protocols

- The system should have diversity regarding communication protocols.
- A researcher said: "Just like in reality."
- See R-U-001
- Origin: Researcher _Toni_

#### R-A-007: Exclusive components that "facilitate research"

- The system should have separate components that allow for experimentation.
- A researcher said: "Additional components have to be coded that facilitate research. For instance, injecting load into the system."
- Origin: Researcher _Toni_

##### Open Questions

- What do these components really do?

#### R-A-008: Distributed Tracing

- The system must have distributed tracing available.
- Origin: _Ulm_

### Microservice Patterns

#### R-MP-001: Database per Service

- Origin: Examiner

#### R-MP-002: Messaging (Asynchronous Communication)

Origin: Examiner, Supervisors, Researchers, Researcher _Toni_

#### R-MP-003: Circuit Breaker

- Origin: Examiner

#### R-MP-004: API Gateway

- Origin: Examiner

#### R-MP-005: Saga

- Origin: Examiner

#### R-MP-007: Frontends for Backends

- Origin: Examiner

### Technologies

#### R-T-001: Use Kubernetes

- Origin: Examiner, Supervisors, Researcher

#### R-T-002: No Python

- Python should only be considered as a last resort.
  - If we used Python, we would have to explain why.
- _See R-E-003_
- Origin: Examiner

#### R-T-003: Use Go

- The programming language Go should be used along with a corresponding framework.
- Origin: Examiner

#### R-T-004: Spring Boot

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
- https://jmeter.apache.org
- See R-U-019
- Origin: Examiner

#### R-T-008: OpenTelemetry

- OpenTelemetry should be used for monitoring.
- https://opentelemetry.io
- https://github.com/open-telemetry/opentelemetry-demo -- We should investigate this as recommended by Researcher _Goliath_
- Origin: Researcher _Toni_

#### R-T-009: Kotlin

- The programming language Kotlin should be used.
- Origin: Researcher _Goliath_
