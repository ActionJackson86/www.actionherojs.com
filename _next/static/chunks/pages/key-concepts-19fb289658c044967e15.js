_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[13],{"+guG":function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return b}));var o=n("1OyB"),a=n("vuIU"),i=n("Ji7U"),r=n("md7G"),s=n("foSv"),c=n("q1tI"),l=n.n(c),u=n("lDfE"),h=n("3Z9Z"),d=n("JI6e"),m=n("cWnB"),p=n("4Wno"),f=n("m4NA"),y=l.a.createElement;function g(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}var b=function(e){Object(i.a)(c,e);var t,n=(t=c,function(){var e,n=Object(s.a)(t);if(g()){var o=Object(s.a)(this).constructor;e=Reflect.construct(n,arguments,o)}else e=n.apply(this,arguments);return Object(r.a)(this,e)});function c(e){var t;return Object(o.a)(this,c),(t=n.call(this,e)).state={titleSection:{title:"Actionhero Key Concepts",icon:"/static/images/internet-of-things.svg"},sections:{intro:"Introduction",actions:"Actions",tasks:"Tasks",initializers:"Initializers",chat:"Chat",servers:"Servers",testing:"Testing"},links:[{link:"/tutorials",title:"\xbb Tutorials"}]},t}return Object(a.a)(c,[{key:"render",value:function(){return y(p.a,{sideNav:this.state.sections,titleSection:this.state.titleSection,links:this.state.links,currentSection:this.state.currentSection,showSolutions:!0},y(h.a,null,y(d.a,{md:12},this.section("intro",y("div",null,y("p",null,"Actionhero is an API server. The type of workload Actionhero excels at involves producing and consuming APIs, storing and retrieving data from databases, modifying files, and similar jobs. Actionhero has 5 key concepts that make up each application: ",y("strong",null,"Actions"),", ",y("strong",null,"Tasks"),","," ",y("strong",null,"Initializers"),", ",y("strong",null,"Chat"),", and"," ",y("strong",null," Servers"),". This page will contain a brief overview of these key concepts, and provide a like to the related ",y("a",{href:"/tutorials"},"tutorial")," which contains more in-depth information."),y("img",{style:{margin:10},width:"100%",src:"/static/images/key-concepts.png"}),y("p",null,"If you are coming from a framework like Rails that has a strong focus on the"," ",y("a",{href:"https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller",target:"_new"},"MVC (model - view - controller) pattern"),", you might be surprised to see that those concepts are missing from Actionhero. That is because Actionhero is a"," ",y("strong",null,y("em",null,"backend-agnostic API framework")),"."),y("p",null,'"Backend-agnostic" means that Actionhero can work with any backend/storage engine you might want to use. Since "models" are so closely tied to the storage engine around them, Actionhero doesn\'t have any opinions on how they should work. That said, there are many Actionhero plugins to help with that! One of the most popular is'," ",y("a",{href:"https://github.com/actionhero/ah-sequelize-plugin",target:"_blank"},"ah-sequelize-plugin")," ","which is a great way to introduce traditional database-backed models & migrations with MySQL or Postgres."),y("p",null,'"API framework" means that by default, Actionhero only speaks JSON over HTTP(S) or websockets. It doesn\'t render HTML or any other type of "view" meant to be consumed by a human. Again, there are plugins to introduce new protocols to Actionhero if you want them, but they are optional. Actionhero is not a font-end server, although it\'s easy to pair'," ",y("a",{target:"_blank",href:"https://github.com/actionhero/ah-next-plugin"},"Actionhero with Next.JS"),', for example, to also render a website from the same application. Actionhero focuses on the parts of the stack at the "controller" level - how to smoothly speak to clients over multiple protocols, handle caching, background jobs, and real-time communication.'),y("p",null,"Actionhero was built from the ground up to include all the features you expect from a modern API framework. Written in Typescript, Actionhero makes it easy to build a modern API server with ES6 features like Async/Await... and it also knows when to get out of the way so you can customize your stack to fit your needs."))),this.section("actions",y("div",null,y(f.a,{language:"typescript"},'import { Action } from "actionhero";\n\nexport class RandomNumber extends Action {\n    constructor() {\n    super();\n    this.name = "randomNumber";\n    this.description = "I am an API method which will generate a random number";\n    this.outputExample = { randomNumber: 0.123 };\n  }\n\n  async run({connection, response}) {\n    response.randomNumber = Math.random();\n    response.stringRandomNumber = connection.localize([\n      "Your random number is {{ randomNumber }}",\n      response,\n    ]);\n  }\n}'),y("p",null,"Actions are the main way that you interact with your clients - responding to their requests and performing actions for them. An Action exists to read a connection's request information (which we call ",y("code",null,"params"),'), preform some operation (perhaps reading or writing to a database), and then finally responding to that request with a response. When you think of an API in the most general sense, Actions are probably what you are thinking of. Actions are most like traditional "controller" objects from an MVC framework... but they work for all connection types like web, websocket, etc. Actions are a uniform way to define what methods your API exposes to any client that wants to access it.'),y("p",null,"Actions can have middleware to help with things like authentication or logging. Actions are generally stateless, and throw errors if something goes wrong (",y("code",null,"user not found")," or"," ",y("code",null,"you aren't signed in"),"). In general actions are short, and don't have much business logic. They rely on other objects for the business logic, perhaps in your models, or service objects you've created in other parts of your application."),y("p",null,"Actions rely on servers to handle routing requests to them, and to format responses."),y("div",{style:{textAlign:"center",margin:30}},y(m.a,{href:"/tutorials/actions",variant:"outline-info"},"Learn more about Actions")))),this.section("tasks",y("div",null,y(f.a,{language:"typescript"},'import { Task } from "actionhero";\nimport { sendWelcomeEmail } from "./../serviceObjects/email";\n\nexport class SendWelcomeMessage extends Task {\n  constructor() {\n    super();\n    this.name = "SendWelcomeEmail";\n    this.description = "I send the welcome email to new users";\n    this.frequency = 0;\n    this.queue = "high-priority";\n  }\n\n  async run(data) {\n    await sendWelcomeEmail({ address: data.email });\n    return true;\n  }\n}'),y("p",null,'Tasks are background jobs. Tasks can be either enqueued by an Action or another Task, or they can be recurring, and run every few minutes, hours, or days. Actionhero is "cluster-aware", which means that it knows how to distribute tasks between many servers, ensure that only one is running at a time, and how to retry them when something go wrong. Tasks can be enqueued to run ASAP, or delayed until a specific time in the future.'),y(f.a,{language:"typescript"},'import { task } from "actionhero";\n\n// Enqueue the task now, and process it ASAP\nawait task.enqueue("sendWelcomeEmail", { to: "evan@evantahler.com" });\n\n// Enqueue the task now, and process it once `timestamp` has ocurred\nawait task.enqueueAt(10000, "sendWelcomeEmail", { to: "evan@evantahler.com" })'),y("p",null,"When working with a third-party API or doing a particularly slow operation, it's probably a good idea to use a Task so your users do not need to wait. Also, if some operation might fail and you want to retry it, a Task again would be a good choice."),y("p",null,"A good task is short-lived and idempotent. Tasks that deal with complex workflows can enqueue other Tasks, store state in a database or elsewhere in your application, like Actionhero's built-in ",y("a",{href:"/tutorials/cache"},"cache"),"."),y("p",null,"Under the hood, Actionhero uses the"," ",y("a",{href:"https://github.com/actionhero/node-resque",target:"_blank"},"node-resque")," ","package to manage tasks. If you want a user-interface to visually inspect your task queues, check out the"," ",y("a",{href:"https://github.com/actionhero/ah-resque-ui",target:"_blank"},"ah-resque-ui")," ","Actionhero plugin. just like Actions, middleware can be used to help with Task retrying, error handling, unique-jobs, and more."),y("img",{src:"/static/images/ah-resque-ui.png",style:{margin:10},width:"100%"}),y("div",{style:{textAlign:"center",margin:30}},y(m.a,{href:"/tutorials/tasks",variant:"outline-info"},"Learn more about Tasks")))),this.section("initializers",y("div",null,y(f.a,{language:"typescript"},'import { Initializer, api, log } from "actionhero";\nimport { Database } from "../classes/database";\n\nexport class DatabaseInit extends Initializer {\n  constructor() {\n    super();\n    this.name = "DatabaseInit";\n  }\n\n  async initialize() {\n    await Database.connect();\n  }\n\n  async start() {\n    await Database.migrate();\n    await Database.check();\n  }\n\n  async stop() {\n    await Database.disconnect();\n  }\n}'),y("p",null,"Initializers are how your server connects to databases and other APIs. Initializers hook into the Actionhero server's lifecycle methods, (",y("code",null,"initialize"),","," ",y("code",null,"start"),", and ",y("code",null,"stop"),"), and provide a great place to run any code you need. This is also a great place to do per-server chores, like clearing a disk cache or compressing files. For example, the"," ",y("a",{href:"https://github.com/actionhero/ah-sequelize-plugin",target:"_blank"},"ah-sequelize-plugin")," ","connects to your Postgres or MySQL server in the"," ",y("code",null,"initialize")," phase, runs migrations in the"," ",y("code",null,"start")," phase, and disconnects at the"," ",y("code",null,"stop")," phase."),y("div",{style:{textAlign:"center",margin:30}},y(m.a,{href:"/tutorials/initializers",variant:"outline-info"},"Learn more about Initializers")))),this.section("chat",y("div",null,y(f.a,{language:"typescript"},'// from a connected websocket client\nclient.roomAdd("public-chat-room");\nclient.say("public-chat-room", "Hello everyone")\n\nclient.on(\'message\', (message) => {console.log(message)})'),y("p",null,'Actionhero provides a robust cluster-ready chat system. "Chat" doesn\'t just mean human-to-human communication, but rather any client-to-client and client-to-server communication that you want to happen in real time. This can be sharing live updates to a web page, game data about other players or the state of the world, and of course, human-to-human chat!'),y("p",null,"The chat system is available to use both by the server, and by clients."),y(f.a,{language:"typescript"},'// or, from the srver\nchatRoom.broadcast({}, "public-chat-room", "welcome to the room");'),y("p",null,"Just like Actions, middleware can be used to help with chat room presence, authentication, and more. Try an example of the chat"," ",y("a",{href:"https://demo.actionherojs.com/chat.html",target:"_blank"},"here.")),y("div",{style:{textAlign:"center",margin:30}},y(m.a,{href:"/tutorials/chat",variant:"outline-info"},"Learn more about Chat")))),this.section("servers",y("div",null,y("p",null,"Actionhero is unique in that it allows you to build or add many types of servers into one application. Not only can you support HTTP and websockets, but you can add custom protocols like Quick and Protobuf to your application and easily reuse your Actions!"),y("p",null,"Servers handle incoming connections, and routing their requests to actions or the chat system. There are a number of unique use-cases where a server might be good way to interact with other real-time APIs, like consuming the streaming Twitter API or custom responses from IOT or embedded devices."),y("div",{style:{textAlign:"center",margin:30}},y(m.a,{href:"/tutorials/servers",variant:"outline-info"},"Learn more about Servers")))),this.section("testing",y("div",null,y(f.a,{language:"typescript"},'import { Process, specHelper } from "actionhero";\n\nconst actionhero = new Process();\n\ndescribe("Action", () => {\n  describe("randomNumber", () => {\n    beforeAll(async () => {\n      await actionhero.start();\n    });\n\n    afterAll(async () => {\n      await actionhero.stop();\n    });\n\n    let firstNumber = null;\n\n    test("generates random numbers", async () => {\n      const { randomNumber } = await specHelper.runAction("randomNumber");\n      expect(randomNumber).toBeGreaterThan(0);\n      expect(randomNumber).toBeLessThan(1);\n      firstNumber = randomNumber;\n    });\n\n    test("is unique / random", async () => {\n      const { randomNumber } = await specHelper.runAction("randomNumber");\n      expect(randomNumber).toBeGreaterThan(0);\n      expect(randomNumber).toBeLessThan(1);\n      expect(randomNumber).not.toEqual(firstNumber);\n    });\n  });\n});'),y("p",null,"Actionhero would not be a complete framework unless it included a convenient way to write tests for the above key concepts. Actionhero comes with a ",y("code",null,"specHelper")," ","which includes ways to easily mock Actions and Tasks."),y("p",null,"Actionhero will generate Jest tests for each new Action and Task that you generate. Actionhero's configuration is NODE_ENV-aware, and makes it simple to change your database configurations between environments."),y("div",{style:{textAlign:"center",marginTop:30}},y(m.a,{href:"/tutorials/testing",variant:"outline-info"},"Learn more about Testing")))))))}}]),c}(u.a)},"816G":function(e,t,n){"use strict";n.d(t,"a",(function(){return f}));var o=n("1OyB"),a=n("vuIU"),i=n("Ji7U"),r=n("md7G"),s=n("foSv"),c=n("q1tI"),l=n.n(c),u=n("Ff+t"),h=n("JSsD"),d=n("uuth"),m=l.a.createElement;function p(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}var f=function(e){Object(i.a)(c,e);var t,n=(t=c,function(){var e,n=Object(s.a)(t);if(p()){var o=Object(s.a)(this).constructor;e=Reflect.construct(n,arguments,o)}else e=n.apply(this,arguments);return Object(r.a)(this,e)});function c(){return Object(o.a)(this,c),n.apply(this,arguments)}return Object(a.a)(c,[{key:"render",value:function(){var e=this.props,t=e.children,n=e.waypointEnter,o=e.waypointExit,a=e.id,i=e.title,r=e.parent,s=function(e){};n&&(s=function(e){n.call(r,a,e)});var c=function(e){};return o&&(c=function(e){o.call(r,a,e)}),m(d.a,{onEnter:s,onLeave:c},m("div",null,m("br",null),m("h2",{id:a,style:h.a.typography.h2},m("span",{style:{fontWeight:300,fontSize:36}},i)),m(u.a,null),m("div",{style:{fontFamily:h.a.fonts.docs}},t)))}}]),c}(c.Component)},P4l6:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/key-concepts",function(){return n("+guG")}])},lDfE:function(e,t,n){"use strict";n.d(t,"a",(function(){return m}));var o=n("1OyB"),a=n("vuIU"),i=n("Ji7U"),r=n("md7G"),s=n("foSv"),c=n("q1tI"),l=n.n(c),u=n("816G"),h=l.a.createElement;function d(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}var m=function(e){Object(i.a)(c,e);var t,n=(t=c,function(){var e,n=Object(s.a)(t);if(d()){var o=Object(s.a)(this).constructor;e=Reflect.construct(n,arguments,o)}else e=n.apply(this,arguments);return Object(r.a)(this,e)});function c(){return Object(o.a)(this,c),n.apply(this,arguments)}return Object(a.a)(c,[{key:"waypointEnter",value:function(e,t){var n=t.previousPosition;t.currentPosition;this.state.currentlyVisableSections||this.setState({currentlyVisableSections:{}}),"below"!==n&&n||(this.state.currentlyVisableSections[e]=!0),"above"===n&&(this.state.currentlyVisableSections[e]=!0),this.highlightSection()}},{key:"waypointExit",value:function(e,t){t.previousPosition,t.currentPosition;delete this.state.currentlyVisableSections[e],this.highlightSection()}},{key:"highlightSection",value:function(){for(var e,t=Object.keys(this.state.sections),n=0;n<t.length;){if(e=t[n],this.state.currentlyVisableSections[e])return this.setState({currentSection:e});n++}}},{key:"section",value:function(e,t){var n=this,o=this.state.sections[e];return h(u.a,{waypointEnter:function(e,t){return n.waypointEnter(e,t)},waypointExit:function(e,t){return n.waypointExit(e,t)},id:e,parent:this,title:o},t)}}]),c}(c.Component)}},[["P4l6",0,2,1,3,4,5]]]);