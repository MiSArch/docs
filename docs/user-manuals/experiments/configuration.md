---
sidebar_position: 1
---

import CustomImage from "@site/src/components/CustomImage";

# Experiment configuration

Misarch is intended as a modern microservice reference architecture.\
As such, it is essential that you can customize what is happening internally.\
Generally, experiment configuration can be achieved as follows:


## Action sequence

<CustomImage
 path="/images/experiment-configuration-sequence-diagram"
 alt="sequence diagram how the experiment configuration works"
 width="806px"
 height="421px"
/>

As you can see in the diagram, your main job is querying the available pods, and then adapting pods based on the results.

## Adaptation architecture

![experiment configuration architecture](experiment-configuration-architecture.svg)

As soon as you send the command to update the state of something, the configurator publishes the command as an event on the event bus, and as every pod is subscribed to such events, it will receive the payload and decide itself whether it needs to act.

If the system scales due to your command, you are responsible yourself to manage the new pods.
The configurator simply forwards your events to the required pods and does not handle any other state.

## Requests

You have exactly two important types of requests to keep in mind:
1. Querying available actors
2. Acting based on the available actors

`1.` can be achieved by performing a `GET` on the route `/configure/services` which forwards the answer of the Dapr placement API (https://docs.dapr.io/concepts/dapr-services/placement/).\
The output of this route is the JSON request as returned by Dapr.

`2.` can be achieved by performing a `POST` on the route `/global-configuration/configure` with the following request body:
```json
{
  "services": [<service>],
  "event" : {
    "type": "<event type>",
    "action": {<action with type specific needed metadata>}
  }
}
```
`<service>` and `<event body>` are two auxiliary datatypes:\
`<service>` is defined as
```json
{
  "name": "string",
  "appId": "string"
  "actorTypes": ["json", "string", "array"]
}
```
- `name` is here the host:port address of any pod/container. It can uniquely identify which pod/container to target.
- `appId` is the name of the deployment. In other words, it can be used to configure i.e. all `order` replicas.
- `actorTypes` are roles assigned to each actor, for now unused.

A request will be forwarded to each replica that matches all of the attributes you provided.\
Omitted attributes count as "forward to all".

Possible event types are currently the following:
- `cpu`
- `memory` - absolute minimum, i.e. require at least `100MB` (requiring the memory to be below a value is physically impossible)
- `block_requests` - disable requests completely

## Event bodies

All event bodies look like the following:
```json
{
  "undo": true,
  "format": "",
  "value": ""
}
```

if `undo` is true, `value` will be ignored and the application will be reset to the state before any event of this type was encountered.

`value` is the exact value to use.\
Acceptable values are decided by `format`.

Possible formats:

### CPU formats

\<TODO\>

### Memory formats

At the moment, memory scaling supports the following formats: [`absolute`].\
As such, `format` is currently ignored and defaults to the `blocking` format.\
For the `blocking` format, the value is always a boolean in string form whether requests should be blocked or not.


### Request blocking formats

At the moment, there is only a single format for request blocking events: `blocking`.\
As such, `format` is currently ignored and defaults to the `blocking` format.\
For the `blocking` format, the value is always a boolean in string form whether requests should be blocked or not.

## What happens when a service does not support a configuration?

When a service receives a configuration but does not support the configuration or cannot scale according to the request, it will publish an event called \<TODO\>.
