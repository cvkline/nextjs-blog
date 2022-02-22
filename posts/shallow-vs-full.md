---
title: 'Shallow vs Full Rendering in JS tests'
date: '2020-12-03'
---

This is a very complicated question without an easy answer. The more I thought about and read discussions online about the pros and cons of both testing philosophies, it became clearer that both have a lot of utility and both can contribute significantly to software quality assurance. Neither provides everything a spec writer might want.

Indeed, I found two separate blog posts titled “Why I Never Use Shallow Rendering” and “Why I Always Use Shallow Rendering.”

But here are a few bullet points and then a few things to think about.

## Shallow rendering (Jest/Enzyme)

* More in the spirit of “unit testing” - faults in child components won’t affect the specs of the component under test.
* Avoids unnecessary and constant re-rendering of common children (especially InstUI components, for instance). Unclear how much of a performance issue that really is.
* Focussed mainly on what the component renders as children, what props it sends to them, and what callbacks it calls (which can be Jest mocks in the shallow render).
* If you refactor child components (like in a shared directory), and your spec is testing for specific React components in the children of the component under test, you can break specs.
* If specs for child components are not complete enough, it’s possible to break a parent component and the specs will still pass.
* Does allow access to the “guts” of the component being tested, but is that something a spec should be doing? Lots of differing opinions out there!

## Full DOM rendering (Jest/react-testing-library)

* Follows the philosophy of “tests should be testing how a component is actually used and what it actually displays.” In a way this feels more like integration testing.
* Takes a component and its props, and then the tests operate on the resulting DOM tree that is rendered.
* Does not focus on the mechanics of how a component operates (indeed, disallows access to the internals of a component), but on the final result of what it does.
* If a component is complex, with lots of lifecycle and state and/or hooks, one must be very careful to interact with all possible paths of interaction in specs, which may not be so necessary if the behavior of state and props could be directly tested.
* It is quite possible to do unit tests (i.e. test a single React component while not rendering lower level ones) by mocking out children with jest.mock or by writing the component such that child components are props which default to their “real” components but can be overridden when a spec renders it.
* Possibly has better baked-in support for async/await to check for DOM modifications that are expected to happen “soon” but not immediately.

## What are our JS specs “supposed” to be testing?

Which testing philosophy to standardize on comes down more to “what are our tests trying to test?” Are we testing code or behavior? Are we more concerned about stimulus-response of a software module, or the result of what happens to the DOM tree when it is rendered and then interacted with? It kind of depends on what the component is designed to do!

Maybe we should be allowing/encouraging both? (It’s Jest either way so this isn’t as duplicative as it might seem.)

We could have one set of specs using Enzyme to pick very carefully at how more complex components operate. (By “complex” I mean components with complex lifecycles that re-render via many different pathways in response to both API responses and user interaction.) These specs can be sensitive to how state and props are managed, and what child components they render. Function components that don’t manage state or lifecycle or use hooks might not even need shallow specs at all, since they will be fully tested by the next point:

And then we could have a separate set of specs using testing-library/react that fully exercise intermediate and low-level components, with a focus on what DOM elements and text strings actually wind up in the user’s browser window.

Confidence in the correct behavior of complex higher-level components (via shallow-render specs that fully exercise them in isolation) means that full-render specs do not necessarily have to be careful to test all possible interaction paths and can concentrate on typical “real-world” workflows through them.

Finally, the integration tests (Selenium) will tie everything together (and test against a real browser instead of jsdom).