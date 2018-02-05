<!---






    WARNING, READ THIS.
    This is a computed file. Do not edit.
    Edit `/docs/overview.template.md` instead.












    WARNING, READ THIS.
    This is a computed file. Do not edit.
    Edit `/docs/overview.template.md` instead.












    WARNING, READ THIS.
    This is a computed file. Do not edit.
    Edit `/docs/overview.template.md` instead.












    WARNING, READ THIS.
    This is a computed file. Do not edit.
    Edit `/docs/overview.template.md` instead.












    WARNING, READ THIS.
    This is a computed file. Do not edit.
    Edit `/docs/overview.template.md` instead.






-->
[<p align="center"><img src='https://github.com/brillout/reframe/raw/master/docs/logo/logo-with-title.svg?sanitize=true' width=450 height=94 style="max-width:100%;" alt="Reframe"/></p>](https://github.com/brillout/reframe)
<p align="center">
    Framework to create React web apps.
    Server-rendered apps, static apps, and other types apps.
    Easy to use yet fully customizable.
</p>
<br/>

[Overview](/../../)<br/>
[Usage Manual](/docs/usage-manual.md)<br/>
[Customization Manual](/docs/customization-manual.md)

# Overview

##### Contents

 - [What is Reframe](#what-is-reframe)
 - [Why Reframe](#why-reframe)
 - [The React Future](#the-future-of-react)
 - [Reframe Project Scope](#reframe-project-scope)
 - [Reframe VS Next.js](#reframe-vs-next.js)
 - [List of SSR tools](#reframe-alternatives)
 - [Quick Start](#quick-start)


### What is Reframe

Reframe allows you to create a web app by defining pages.
Reframe then takes care of the rest: It automatically transpiles, bundles, serves, and routes your pages.

A page is defined by a plain JavaScript object called *page config*.

~~~js
// We create a landing page by defining a page config `LandingPage`:
const LandingPage = {
    route: '/', // Page's URL
    view: () => <div>Welcome to Reframe</div>, // Page's root React component
    title: 'Welcome' // Page's <title>
};
~~~

A page config configures a page by assigning it
 - a React component (required),
 - a route (required), and
 - further (optional) page configurations (such as the page's &lt;title&gt;, meta tags, script tags, whether the page should by hydrated or not, whether the page's HTML should be rendered at build-time or at request-time, etc.).

You can build a React web app with **no build configuration** and **no server configuration**.
**All you need to create a web app is one React component, one route, and one page config per page.**
But **everything is customizable**, if you need to.
You can customize the transpiling & bundling, the server, the browser entry, the Node.js entry, etc.

By defining page configs you can easily create:

 - **Server-side rendered React apps**
 <br/>
 Apps where React components are rendered to HTML on the server at request-time.

 - **HTML-static React apps**
 <br/>
 Apps where all pages are rendered to HTML at build-time.
 These apps don't need a Node.js server and can be deployed to a static website hosting such as GitHub Pages or Netlify.

 - **DOM-static React apps**
 <br/>
 Apps where the DOM is static and React is only used to render HTML.
 No (or almost no) JavaScript is loaded in the browser.

 - **Every kind of React app**
 <br/>
 Pretty much all kinds of app can be created.
 Reframe generates a certain type of app depending on how you configure your pages.
 For example, if you add `htmlIsStatic: true` to a page config, then that page's HTML is rendered at build-time instead of request-time.
 So, creating an HTML-static React app is simply a matter of setting `htmlIsStatic: true` to all page configs.
 An app can be a mix: Some pages can be HTML-static, some HTML-dynamic, some DOM-static, and some DOM-dynamic.

Reframe supports a high varitety of app types you can choose from by simply configurating your page configs.

In the following we create a web app by defining one page config `HelloPage`.

~~~js
// ~/tmp/reframe-playground/pages/HelloPage.html.js

import React from 'react';

const HelloComponent = (
    props => {
        // Our route arguments are available at `props.route.args`
        const name = props.route.args.name;
        return (
            <div>
                Hello {name}
            </div>
        );
    }
);

const HelloPage = {
    route: '/hello/{name}', // Page's (parameterized) URL
    title: 'Hi there', // Page's <title>
    view: HelloComponent, // Page's root React component
};

export default HelloPage;
~~~

The `reframe` CLI does the rest:

<p align="center">
    <img src='https://gitlab.com/brillout/reframe/raw/master/docs/screenshots/reframe_overview_screenshot.png' width=1200 style="max-width:100%;"/>
</p>

### Why Reframe

Reframe has been designed with a focus on
 - Ease of Use
 - Universality
 - Customization
 - Performance

##### Ease of Use

Creating a React app is simply a matter of creating React components and page configs.
The Quick Start section bellow shows how easy it is.

#### Universality

When React came out in 2013, it was used predominantly for the browser / the DOM.
It is nowadays more and more used to generate HTML.
We expect this trend to considerably increase.
(See "The React Future" section.)

Reframe embraces this future and by supporting pretty much every type of web apps.

In short, if you want to create, not matter what type of app, you can then use Reframe to quickly get started.

In short, React may very well become the de-facto view library when creating any application that involves a UI.

Current React frameworks only support certain types of web apps.
In contrast, Reframe supports pretty much every type of web apps.
(See the "What is Reframe" section for what kind of apps Reframe can generate.)


Beyond the now wide-spread
Whet

 - DOM-static pages
  <br/>
   No 200KB heavy React+Polyfill are loaded.
 - Partial DOM-dynamic pages

 This 

More and more web apps are going to emerge where a majority of the app's pages are DOM-static and only some pages are (partially) DOM-dynamic.
n

[Progressive Web Apps](https://developers.google.com/web/progressive-web-apps/)




#### Customization

Beyond the basic usage that is designed to be as easy as possible, Reframe allows advanced customization.

With little effort the 
You can have
 - customize server
   - add server routes to create API endpoints, authentication endpoints, etc.
   - custom hapi server config (Reframe uses the hapi server framework by default),
   - use any server framework such as Express, Koa, etc.
 - customize browser JavaScript
   - add error logging, analytics logging, etc.
   - you can have full control of the hydration process
 - transpilation & bundling
   - The webpack config Reframe uses is pretty much fully customizable (Reframe works with almost any arbitrary webpack config)
   - use typescript



Among others you can use a
custom webpack config (there is almost no restriction about the webpack config Reframe is consuming),
custom browser entry,
custom build tool such as Rollup,
custom server framework such as Express,
custom routing library other than Crossroads.js (Reframe uses Crossroads.js as routing library by default),
custom React integration,
custom view library such as Preact,
etc.

Reframe is designed so that it is fully customizable:
Reframe consists of three packages
(`@reframe/build` that transpiles and bundles, `@reframe/server` that creates the server, `@reframe/browser` that hydrates React components in the browser)
and each of these packages can be replaced with code of your own.
That means that, if you replace all these three packages with your own code, you effectively get rid of Reframe.

That way, you can quickly create a prototype that fully complies to Reframe's design decisions.
and, as your prototype grows to a mature application, you can replace the Reframe packages with your own code to eventually get rid of Reframe.
and progressively over time and progressively,
as your app's needs mature, crystalize, and doesn't match Reframe's design decisions,
you can replace replace Reframe with code of your own to gain full control.


To further push the evenlop,

Reframe consists of three
has been designed so that every Reframe LOC can be replaced with custom code.

Beyond that, Reframe is fully customizable:


This means that everything 
For more information, see the Customization manual
Reframe consists of 3 parts 


### The future of React is bright and is "SRO-by-default"

> **TL;DR**
> - Pages that have a DOM that is mostly static. are considerably easier to create and considerably more performant.
> - Reframe supports and encourages the creation of such mostly-DOM-static pages.
> - Reframe will eventually
> - A web app framework on eye-level with RoR / Django based on JavaScript and React will soon emerge.

Let's imagine a dev team that needs to implement a web app where no page is interactive.
In other words the DOM is never manipulated.
(We call a web app or a page *DOM-static* when the DOM is not manipulated and we call it *DOM-dynamic* otherwise.)
Would be want to use JavaScript & React to create such DOM-static web app?

Maybe not, as React is a tool for creating interactive views.
Instead we could use Ruby on Rails, Django, or Go.
If the company only and will only will always have projects DOM-static web apps,
But this is unlikely and chances are high that at some point a new project or new project requirement will require DOM-dynamic page(s).
At this point the dev team will have no choice than to acquire knowledge about JavaScript and a view library such as React.

The problem would not have occured, if the dev team would have chosen React and JavaScript.

But there is a problem: Implementing a web app solely with JavaScript and React is currently overly effortful.
These days, it is easier to implement a DOM-static web app with Ruby on Rails (RoR) than with JavaScript & React.
But this is changing.
The reason that RoR is easier is not because of the Ruby language nor because of RoR's template engine.
It's because of RoR itself, the framework.
JavaScript & React are missing a framework and Reframe aims to be that framework.

**Soon JavaScript & React will get a framework at eye-level with RoR. At that point, there will be virtually no reason to choose RoR over JavaScript & React. Reframe aims to be that framework.**







> - Reframe allows the creation of web apps that are mostly DOM-dynamic as well as web apps that are mostly DOM-static.


There may be JavaScript fatigue, but JavaScript and React are not going anywhere and their popularity and adoption are only increasing.

Likewise, on a career level, learning JavaScript and React is a robust choice.




JavaScript & React is more difficult is because
But this is because no high-quality web app framework using React has emerged yet.
Reframe aims to fill the gap.


On the other, and even if we don't manipulate the DOM, React is still a great templating engine to generate HTML.
With React, we can create JavaScript's expressivness to define views, which is quite neat and superior to declarative template engines.

But more importantly, if it does happen that some page enventually need.
With Reframe, adding interactivity to a DOM-static page  is a matter of only a couple of lines of code.

Also, JavaScript is one of the most popular language, relatively easy and performant

great for static views as well.
, would you use React
Imagine you 

React is not only a great library to implement dynamic views,
but it is also a great templating engine.
A React component is universal:
It describes a view
that can be static or dynamic, and
that can be rendered to the DOM or to HTML or even to native iOS/Android.
No other templating engine is that universal.
And using the expressivness of JavaScript to define React components is vastly more powerful than any declarative template engines.



WebAssembly has the potential to be what Java and .NET have both tried and failed to be -- the universal runtime for all languages across all platforms.


We predict that React will become the de-facto templating engine.

Even if you don't 
Even if none of yours pages

Hacker news has almost no interactive.
React's popularity is increasing and is becoming the de-facto, similar to (Vue.js is great but it does a poor job on the server.)
React in itself is a near-optimal experience; It does only one thing and does it very well.
The problem with React is that 
The only problem but the ecosystem around React is still young.
But this is changing and Reframe is contributing.

Reframe's vision is that learning JavaScript and React will be enough to build a full-stack application.

With *SRO* 

**If your page doesn't need to be interactive, then it shouldn't**.
Pages that dynamically change in the browser.
Dynamic pages are difficult by nature, and not matter how much better our tooling will become, dynamic pages will remain considerably more complex then static pages.

Every usage signal; React popularity is steadly increasing and not stopping. 

Why not use Ruby on Rails, Django, or Flask instead of React then? Because
 1. React/JSX is a vastly superior HTML templating engine.
 1. React/JSX is an incredibly powerful HTML templating engine.
 It is vastly superior to previous 

 2. 
 3. One language for both the browser and the server.
 3. WebAssembly means that you can quickely implement prototypes with a script language and have great performence with a GC-less statically-typed language.
 4. WebAssembly means that you'll eventually be able to choose amongst a high variety of languages while 


Website cooking recipes with AMP
Still worth it because
 - Reuse the whole React & Reframe ecosystem
 -

React is popular:
 - https://stateofjs.com/2017/front-end/results
  - 90% say they would use React again. Even though the tooling around React is still very young and immature.
 - more interestingly is everytime I talk to people about React what strikes me the level of enthusiam. I've never seen such repeated enthusiam for a programming library before.

**Even if all your pages aren't dynamic, React is still the right choice**.

**Reframe embraces this future and allows you to JavaScript-less pages.**

At the cornerstore of this is the concept of We call such page a *HTML-static* and *DOM-static* page, and the Usage Manual explains (Switching is a matter of change 1 line)





##### A more reasonable approach to dynamic pages

With Reframe you can defined so-called HTML-static and DOM-static pages.
Such pages are rendered to HTML on build-time and don't load any JavaScript.

Your about page, your landing page, your homepage probably don't need to be dynamic, don't need .
You can still include small JavaScript code such as Google Anayltics.
But really, if one of your pages doesn't strictly need to be dynamic, then it shouldn't.

React ; If you don't.

It's not SRO React that is hard to implement, it's actually browser React the difficult.


##### Performance

- SSR.
  <br/>
  All pages are rendered to HTML, which considerably decreases the perceived load time.
- Code splitting.
  <br/>
  Every page loads two scripts:
  A script shared and cached accross all pages that include common code such as React and polyfills,
  and a script that is specific to the page,
  which is typically lightweight.
  This means that if a page requires KB-heavy libraries that won't affect the KB-size of other pages.
- Optimal HTTP Caching.
  <br/>
  Every dynamic server response is cached with a Etag header, and
  every static server response is indefinitely cached.
  (By assigning the static asset to a hashed URL, and by setting the `Cache-Control` header to `immutable` and `max-age`'s maxium value.)
- Pages that load a minimal amount of browser-side JavaScript
- DOM-static pages.
  <br/>
  A page can be configured to be rendered only on the server.
  This as React is not loaded in the browser and the page doesn't need to be hydrated.
  Also, a page can be configured so that only parts are hydrated.
- HTML-static pages.
  <br/>
  A page can be configured to be rendered to HTML at build-time instead of request-time.
  This means that, the page is rendered only once to HTML when Reframe is transpiling and bundling and the the HTML is statically served.



### Reframe VS Next.js

On a high-level, Next.js's main problem is that

 1. Using Next.js feels like having tied hands.
    <br/>
    Next.js works well if you comply with its design decisions but you are in for trouble if you don't.
    For example, Next.js's webpack customization is broken which leads to no support for typescript, PostCSS, SASS, etc.

 2. Next.js only supports other types of apps beyond universal
    <br/>
    Next.js supports only two types of apps: universal apps (where the entire page is rendered to HTML at request-time and hydrated in the browser) and static apps (where all pages are rendered to HTML at build-time).
    But React allows a higher variety of applications that . All of them are not supported by Next.js. Hybrid dynamic static apps
    Reframe supports every type of React apps.

 3. Next.js doesn't embrace the future
    <br/>
    Next.js's focus is limited to universal and static apps, yet more and more React applications will implement hybrid apps that have a mix of DOM-static pages, DOM-dynamic pages, HTML-static pages and HTML-dynamic pages.
    Furthermore, Next.js's team don't show interest in topis such as state management, view logic management, database integration, ORM, Asynchronous tasks, CMS, etc.
    Reframe strives to expand in these areas.



About 1:
(mainly because in parts because Next.js doesn't do universal webpack)

About 2:
Next.js doesn't allow you to create pages that load the minimum amount of JavaScript.
But React is more and more used in a server-rendering-only fashion; See the "The future of React is SRO".

On a low-level, Next.js lacks in terms of ease of use, performance and security:
 - Next.js's routing is a big hassle
 - Server cusomtization is a hassle
 - The creation of static apps is uncesseray complicated
   <br>
   In contrast, with Reframe static apps are just a matter of setting `htmlIsStatic: true` to every page config and the whole developing experience stays the same.
 - Customization of browser JavaScript is not possible for things such as error tracking
 - No typescript support (The
 - No support for third party code integration such as error tracking, google analytics, etc. (Next.js doesn't allow you to control 
 - No
 - No support for [AMP](https://www.ampproject.org/)
 - Security issues. [Easy](https://github.com/zeit/next.js/blob/33f8f282099cb34db2c405aabb883af836d6dc2a/test/integration/production/test/security.js)





### Reframe Project Scope

All types of apps can be created with Reframe, whether it be a universal app, or a static app, or an with a combination of static and dynamic pages.

That's because you can configure as "HTML-static


When creating an app with Reframe takes care:

 - **Build**
   <br/>
   Transpiles and bundles your frontend assets. (Uses webpack.)
 - **Server**
   <br/>
   Sets up a Node.js server that serves dynamic HTMLs and static assets. (Uses hapi.)
 - **Routing**
   <br/>
   Maps URLs to pages.

Reframe **doesn't** take care of:

 - View logic / state management.
   <br/>
   It's up to you to manage the state of your views. (Or use Redux / MobX / [Reprop](https://github.com/brillout/reprop).)
 - Database.
   <br/>
   It's up to you to create, populate, and query databases.


### List of SSR tools

The exhaustive list of frameworks/tools (scaffolds not included) that help create server-rendered React apps:

###### Frameworks

 - [Next.js](https://github.com/zeit/next.js)
 - [After.js](https://github.com/jaredpalmer/after.js)

###### Libraries

 - [Razzle](https://github.com/jaredpalmer/razzle)
 - [Universal Router](https://github.com/kriasoft/universal-router)

Make a PR if something is missing in the list.
(Gatsby is for static apps only, Create React App is a scaffold.)

### Quick Start

Let's create our first React app.
For that we will create a page by defining a page config and a React component.

1. We first create a `pages/` directory:

~~~shell
mkdir -p ~/tmp/reframe-playground/pages
~~~


2. We then create a new JavaScript file `~/tmp/reframe-playground/pages/HelloPage.html.js` that exports a page config:

~~~js
import React from 'react';

const HelloWorldPage = {
    route: '/',
    view: () => (
        <div>
            Hello World, from Reframe.
        </div>
    ),
};
export default HelloWorldPage;
~~~

3. We install Reframe's CLI and React:

~~~shell
npm install -g @reframe/cli
~~~
~~~shell
cd ~/tmp/reframe-playground/
~~~
~~~shell
npm install react
~~~

4. Finally, We run the CLI:

~~~shell
cd ~/tmp/reframe-playground/
~~~
~~~shell
reframe
~~~

which prints

~~~shell
$ reframe ~/tmp/reframe-playground/pages
✔ Page directory found at ~/tmp/reframe-playground/pages
✔ Frontend built at ~/tmp/reframe-playground/dist/browser/ [DEV]
✔ Server running at http://localhost:3000
~~~

What happens here

 - Reframe searches for the `/pages` directory and finds it at `~/tmp/reframe-playground/pages`
 - Reframe reads the `/pages` directory and finds our page config at `~/tmp/reframe-playground/pages/HelloPage.html.js`
 - Reframe uses webpack to transpile `HelloPage.html.js` and to create two bundles for the browser: one bundle shared- and another bundle specific to `HelloPage` that will only be loaded when navigating to a URL matching our `HelloPage` page's route `/hello/{name}`.
 - Reframe starts a hapi server serving all static browser assets and serving the dynamically HTML generated 

That's it:
We have created our first React web app with only one React Component and one page config.

The "Basic Usage" section of the [Usage Manual](/docs/usage-manual.md) contains further information for:
 //- Creating a server-rendered app
 - Loading async data
 - Creating a static app

<!---






    WARNING, READ THIS.
    This is a computed file. Do not edit.
    Edit `/docs/overview.template.md` instead.












    WARNING, READ THIS.
    This is a computed file. Do not edit.
    Edit `/docs/overview.template.md` instead.












    WARNING, READ THIS.
    This is a computed file. Do not edit.
    Edit `/docs/overview.template.md` instead.












    WARNING, READ THIS.
    This is a computed file. Do not edit.
    Edit `/docs/overview.template.md` instead.












    WARNING, READ THIS.
    This is a computed file. Do not edit.
    Edit `/docs/overview.template.md` instead.






-->
