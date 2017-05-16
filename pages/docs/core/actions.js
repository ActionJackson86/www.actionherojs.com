import DocsPageWithNav from './../../../pageClasses/docsPageWithSideNav.js'
import { Row, Col } from 'react-bootstrap'
import DocsPage from './../../../components/layouts/docsPage.js'

import Code from './../../../components/code.js'

const SimpleAction = `// A Simple Action //

exports.action = {
  name: 'randomNumber',
  description: 'I am an API method which will generate a random number',
  outputExample: {
    randomNumber: 0.123
  },

  run: function(api, data, next){
    data.response.randomNumber = Math.random();
    next();
  }
}
`

const CompoundAction = `// A Combound Action with Shared Inputs//

var commonInputs = {
  email: {
    required: true,
    validator: function(param){
      if( email.indexOf('@') > 0 ){
        return true;
      }else{
        return new Error('that is not a valid email address');
      }
    },
  },
  password: {
    required: true,
    validator: function(param){
      if(param.length < 4){
        return new Error('password should be at least 3 letters long');
      }else{
        return true;
      }
    },
    formatter: function(param){
      return String(param);
    },
  }
};

// the actions

exports.userAdd = {
  name: 'userAdd',
  description: 'I add a user',
  inputs: commonInputs,
  run: function(api, data, next){
    // your code here
    next(error);
  }
};

exports.userDelete = {
  name: 'userDelete',
  description: 'I delete a user',
  inputs: commonInputs,
  run: function(api, data, next){
    // your code here
    next(error);
  }
}
`

const VersionRoutes = `exports.routes = {
  all: [
    // creates routes like \`/api/myAction/1/\` and \`/api/myAction/2/\`
    // will also default \`/api/myAction\` to the latest version
    { path: '/myAction/:apiVersion', action: 'myAction' },

    // creates routes like \`/api/1/myAction/\` and \`/api/2/myAction/\`
    // will also default \`/api/myAction\` to the latest version
    { path: '/:apiVersion/myAction', action: 'myAction' },
  ]
};
`

const Options = `exports.action = {
  // the action's name (the \`exports\` key doesn't matter)
  name: 'randomNumber',
  // the description
  description: 'I am an API method which will generate a random number',
  // a hash of all the inputs this action will accept
  // any inputs provided to the action not in this hash will be stripped
  inputs: {
    multiplier: {
      required: false,
      validator: function(param, connection, actionTemplate){ if(param < 0){
        return 'must be > 0' }else{ return true; }
      },
      formatter: function(param, connection, actionTemplate){
        return parseInt(param);
      },
      default:   function(param, connection, actionTemplate){
        return 1;
      },
    }
  },
  // any middlewares to apply before/after this action
  // global middleware will be applied automatically
  middleware: [],
  // an example response
  outputExample: { randomNumber: 123 },
  // you can choose to block certain servers from using this action
  blockedConnectionTypes: ['webSocket'],
  // how should this action be logged?
  logLevel: 'warning',
  // (HTTP only) if the route for this action includes an extension (like .jpg), should the response MIME be adjusted to match?
  matchExtensionMimeType: true,
  // should this action appear within \`api.documentation.documentation\`
  toDocument: true,

  run: function(api, data, next){
    var error = null;

    data.response.randomNumber = Math.random() * data.params.multiplier;
    next(error);
  }
}
`

const Inputs = `action.inputs = {
  // a simple input
  // defaults assume required = false
  minimalInput: {}
  // a complex input
  multiplier: {
    required: true,
    validator: function(param, connection, actionTemplate){
      if(param < 0){ return 'must be > 0'; }else{ return true; }
    },
    formatter: function(param, connection, actionTemplate){
      return parseInt(param);
    },
    default:   function(param, connection, actionTemplate){
      return 1;
    },
  },
  // a schema input
  schemaInput: {
    required: true,
    default: {},
    schema: {
      nestedInput: {
        required: true,
        default: 1,
        validator: function(param, connection, actionTemplate){
          if(param < 0){ return 'must be > 0'; }else{ return true; }
        },
        formatter: function(param, connection, actionTemplate){
          return parseInt(param);
        },
      },
      otherInput: {},
    }
  }
};
`

const MoneyInCents = `moneyInCents: {
  required:  true,
  default:   function(p){ return 0; },
  formatter: function(p){ return parseFloat(p); },
  validator: function(p){
    if(isNaN(parseFloat(p)){ return new Error('not a number'); }
    if(p < 0){ return new Error('money cannot be negative'); }
    else{ return true; }
  },
}`

const CacheTest = `exports.cacheTest = {
  name: 'cacheTest',
  description: 'I will test the internal cache functions of the API',
  outputExample: {},

  inputs: {
    key: {
      required: true,
      formatter: [
         function(s){ return String(s); },
         'api.formatter.uniqueKeyName' // <----------- HERE
      ]
    },
    value: {
      required: true,
      formatter: function(s){ return String(s); },
      validator: function(s){
        if(s.length < 3){ return '\`value\` should be at least 3 letters long'; }
        else{ return true; }
      }
    },
  },

  run: function(api, data, next){
    // ...
  }
};`

const UniqueKeyName = `module.exports = {
  initialize: function(api, next){
    api.formatter = {
      uniqueKeyName: function(key){
        return key + '-' + this.connection.id;
      }
    };

    next();
  },
};`

const SchemaInput = `exports.addUser = {
  name: 'api/addUser',
  description: 'I add user',

  firstName: { required: true },
  lastName: { required: false },
  username: { required: true },
  address: {
    required: false,
    schema: {
      country: {
        required: true,
        default: 'USA'
      },
      state: { required: false },
      city: {
        required: true,
        formatter: (val) => \`City:\${val}\`,
        validator: (val) => val.length > 10,
      }
    }
  }
  run: () => {},
}`

const DataObject = `data = {
  connection: connection,
  action: 'randomNumber',
  toProcess: true,
  toRender: true,
  messageCount: 123,
  params: { action: 'randomNumber', apiVersion: 1 },
  actionStartTime: 123,
  response: {},
}`

export default class extends DocsPageWithNav {
  constructor (props) {
    super(props)

    this.state = {
      titleSection: {
        title: 'Core > Actions',
        icon: '/static/images/easy-to-use-actions.svg'
      },
      sections: {
        'general': 'General',
        'versions': 'Versions',
        'options': 'Options',
        'inputs': 'Inputs',
        'the-data-object': 'The Data Object',
        'middleware': 'Middleware',
        'notes': 'Notes'
      },
      links: [
        {link: '/docs/core/tasks', title: '» Core > Tasks'}
      ]
    }
  }

  render () {
    return (
      <DocsPage sideNav={this.state.sections} titleSection={this.state.titleSection} links={this.state.links} currentSection={this.state.currentSection}>
        <Row>
          <Col md={12}>
            { this.section('general',
              <div>
                <Code>{SimpleAction}</Code>

                <p>The core of ActionHero is the Action framework, and <strong>actions</strong> are the basic units of work.  All connection types from all servers can use actions.  This means that you only need to write an action once, and both HTTP clients and websocket clients can consume it.</p>
                <p>The goal of an action is to read <code>data.params</code> (which are the arguments a connection provides), do work, and set the <code>data.response</code> (and <code>error</code> when needed) values to build the response to the client.</p>
                <p>You can create you own actions by placing them in a <code>./actions/</code> folder at the root of your application.  You can use the generator with <code>actionhero generate action --name=myAction</code></p>
                <p>Here's an example of a simple action which will return a random number to the client:</p>
                <p>You can also define more than one action per file if you would like, to share common methods and components (like input parsers):</p>

                <Code>{CompoundAction}</Code>
              </div>
            )}

            { this.section('versions',
              <div>
                <p>ActionHero supports multiple versions of the same action.  This will allow you to support actions/routes of the same name with upgraded functionality.</p>

                <ul>
                  <li>actions optionally have the <code>action.version</code> attribute.</li>
                  <li>a reserved param, <code>apiVersion</code> is used to directly specify the version of an action a client may request.</li>
                  <li>if a client doesn't specify an <code>apiVersion</code>, they will be directed to the highest numerical version of that action.</li>
                </ul>

                <p>You can optionally create routes to handle your API versioning:</p>

                <Code>{VersionRoutes}</Code>

                <p><em>As a note, if a client accessing ActionHero via routes does not provide an apiVersion and it is explicitly defined in the route, the highest number will not be assigned automatically, and will be seen as a routing error.</em></p>
              </div>
            )}

            { this.section('options',
              <div>
                <Code>{Options}</Code>
                <p>The complete set of options an action can have are:</p>
              </div>
            )}

            { this.section('inputs',
              <div>
                <Code>{Inputs}</Code>

                <p>The properties of an input are:</p>
                <ul>
                  <li>
                    <code>required</code> (boolean)
                    <ul>
                      <li>Default: <code>false</code></li>
                    </ul>
                  </li>
                  <li>
                    <code>{`formatter = function(param, connection, actionTemplate)`}</code>
                    <ul>
                      <li>will return the new value of the param</li>
                      <li>Default: The parameter is not reformatted</li>
                    </ul>
                  </li>
                  <li>
                    <code>{`default = function(param, connection, actionTemplate)`}</code>
                    <ul>
                      <li>will return the default value of the param</li>
                      <li>you can also have a static assignment for <code>default</code> father than a {`function`}, ie: <code>default: 123</code></li>
                      <li>Default: Parameter has no default value</li>
                    </ul>
                  </li>
                  <li>
                    <code>{`validator = function(param, connection, actionTemplate)`}</code>
                    <ul>
                      <li>should return <code>true</code> if validation passed</li>
                      <li>should return an error message if validation fails which will be returned to the client</li>
                      <li>Default: Parameter is always valid</li>
                    </ul>
                  </li>
                  <li>
                    <code>schema</code> (object)
                    <ul>
                      <li>optional nested inputs definition</li>
                      <li>accept <code>object</code> similar to regular input</li>
                      <li>nested input also have properties: <code>required</code>, <code>formatter</code>, <code>default</code> and <code>validator</code></li>
                    </ul>
                  </li>
                </ul>

                <p>You can define <code>api.config.general.missingParamChecks = [null, '', undefined]</code> to choose explicitly how you want un-set params to be handled in your actions.  For example, if you want to allow explicit <code>null</code> values in a JSON payload but not <code>undefined</code>, you can now opt-in to that behavior.  This is what <code>action.inputs.x.required = true</code> will check against.</p>
                <p>Since all properties of an input are optional, the smallest possible definition of an input is: <code>name : {}</code>.  However, you should usually specify that an input is required (or not), ie: <code>{`name: {required: false}`}</code>.</p>
                <p>The methods <code>default</code>, <code>formatter</code>, and <code>validator</code> have the api object set as <code>this</code> within their scopes.  This means that you can define common formatters within middleware and reference them in each action.</p>
                <p>The methods are applied in this order:</p>

                <ul>
                  <li><code>default()</code></li>
                  <li><code>formatter()</code></li>
                  <li><code>validator()</code></li>
                  <li><code>required()</code></li>
                </ul>

                <p>Here's an example...</p>

                <Code>{MoneyInCents}</Code>

                <p>...and the results would be:</p>

                <ul>
                  <li>If moneyInCents = <code>4</code>       =&gt; (4 =&gt; 4 =&gt; 400 =&gt; ok)</li>
                  <li>If moneyInCents = <code>&quot;4&quot;</code>     =&gt; ('4' =&gt; 4 =&gt; 400 =&gt; ok)</li>
                  <li>If moneyInCents = <code>&quot;-4&quot;</code>    =&gt; (&quot;-4&quot; =&gt; -4 =&gt; -400 =&gt; {`Error(‘money cannot be negative'))`}</li>
                  <li>If moneyInCents = <code>&quot;&quot;</code>      =&gt; 0 (default value)</li>
                  <li>If moneyInCents = <code>null</code>    =&gt; 0 (default value)</li>
                  <li>If moneyInCents = <code>&quot;hello&quot;</code> =&gt; {`Error(‘not a number')`}</li>
                </ul>

                <p>Formatters and Validators can also be named method names. For example, you might have an action like:</p>

                <Code>{CacheTest}</Code>

                <p>You can define <code>api.formatter.uniqueKeyName</code> elsewhere in your project, like this initializer:</p>

                <Code>{UniqueKeyName}</Code>

                <p>Example schema input:</p>

                <Code>{SchemaInput}</Code>
              </div>
            )}

            { this.section('the-data-object',
              <div>
                <Code>{DataObject}</Code>

                <p>The <code>data</code> object passed into your action captures the state of the connection at the time the action was started.  Middleware preProcessors have already fired, and input formatting and validation has occurred.  Here are the properties of the <code>data</code> object:</p>
                <p>The goal of most actions is to do work and then modify the value of <code>data.response</code>, which will eventually be sent down to the client.</p>
                <p>You can also modify properties of the connection by accessing <code>data.connection</code>, IE changing the response header for a HTTP request.</p>
                <p>If you don't want your action to respond to the client, or you have already sent data to the client (perhaps you already rendered a file to them or sent an error HTTP header), you can set <code>data.toRender = false;</code></p>
              </div>
            )}

            { this.section('middleware',
              <div>
                <p>You can create middlware which would apply to the connection both before and after an action.  Middleware can be either global (applied to all actions) or local, specified in each action via <code>action.middleware = []</code>.  Supply the <code>names</code> of any middleware you want to use.</p>
                <p>You can <a href='/docs/core/#middleware'>learn more about middleware here</a>.</p>
              </div>
            )}

            { this.section('notes',
              <div>
                <ul>
                  <li>Actions are asynchronous, and require in the API object, the <code>data</code> object, and the callback function.  Completing an action is as simple as calling <code>next(error)</code>.  If you have an error, be sure that it is a <code>new Error()</code> object, and not a string.</li>
                  <li>The metadata <code>outputExample</code> is used in reflexive and self-documenting actions in the API, available via the <code>documentation</code> verb (and /api/ showDocumenation action).</li>
                  <li>You can limit how many actions a persistent client (websocket, tcp, etc) can have pending at once with <code>api.config.general.simultaneousActions</code></li>
                  <li><code>actions.inputs</code> are used for both documentation and for building the whitelist of allowed parameters the API will accept.  Client params not included in these whitelists will be ignored for security. If you wish to disable the whitelisting you can use the flag at <code>api.config.general.disableParamScrubbing</code>. Note that <a href='/docs/core/#middleware'>Middleware</a> preProcessors will always have access to all params pre-scrubbing.</li>
                  <li><code>matchExtensionMimeType</code> is currently only used by the <code>web</code> server, and it indicates that if this action is successfully called by a client with <code>connection.extension</code> set, the headers of the response should be changed to match that file type.  This is useful when creating actions that download files.</li>
                  <li>ActionHero strives to keep the <code>data.connection</code> object uniform among various client types, and more importantly, present <code>data.params</code> in a homogeneous way.  You can inspect <code>data.connection.type</code> to learn more about the connection.  The gory details of the connection (which vary on its type) are stored in <code>data.connection.rawConnection</code> which will contain the websocket, tcp connection, etc.  For web clients, <code>{`data.connection.rawConnection = {req: req, res: res}`}</code> for example.
                    <ul>
                      <li>You can learn more about some of the <code>rawConnection</code> options by learning how to <a href='/docs/core/#file-server-sending-files-from-actions'>send files from actions</a>.</li>
                    </ul>
                  </li>
                </ul>

                <p><a href='/docs/servers/#web-uploading-files'>You can learn more about handling HTTP verbs and file uploads here</a> and <a href='/docs/servers/#socket'>TCP Clients</a> and <a href='/docs/servers/#websocket'>Web-Socket Clients</a></p>
              </div>
            )}
          </Col>
        </Row>
      </DocsPage>
    )
  }
}
