import React from 'react'
import DocsPageWithNav from './../../../pageClasses/docsPageWithSideNav.js'
import { Row, Col } from 'react-bootstrap'
import DocsPage from './../../../components/layouts/docsPage.js'

import Code from './../../../components/code.js'

const v15 =
`\`actionhero generateAction --name=[name]\`      -> \`actionhero generate action --name=[name]\`
\`actionhero generateInitializer --name=[name]\` -> \`actionhero generate initializer --name=[name]\`
\`actionhero generateServer --name=[name]\`      -> \`actionhero generate server --name=[name]\`
\`actionhero generateTask --name=[name]\`        -> \`actionhero generate task --name=[name]\`
`

const v11Action =
`run: function(api, data, next){
  data.response.randomNumber = Math.random();
  next(error);
}`

const v11Data =
`data = {
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
        title: 'Operations: Upgrade Path',
        icon: '/static/images/ops-tools.svg'
      },
      sections: {
        'overview': 'Overview',
        'v17': 'Upgrading from v16 to v17',
        'v16': 'Upgrading from v15 to v16',
        'v15': 'Upgrading from v14 to v15',
        'v14': 'Upgrading from v13 to v14',
        'v13': 'Upgrading from v12 to v13',
        'v12': 'Upgrading from v11 to v12',
        'v11': 'Upgrading from v10 to v11'
      },
      links: [
        {link: '/docs/core/production-notes', title: '« Operations: Production Notes'}
      ]
    }
  }

  render () {
    return (
      <DocsPage sideNav={this.state.sections} titleSection={this.state.titleSection} links={this.state.links} currentSection={this.state.currentSection}>
        <Row>
          <Col md={12}>
            { this.section('overview',
              <div>
                <p>Upgrading big ActionHero projects to a new major might require some effort. Every ActionHero version has it's own specific project files which you generate using <code>actionhero generate</code> command. One of the ways to upgrade your project is to generate a new project using the latest ActionHero framework (<code>npm install actionhero &amp;&amp; ./node_modules/.bin/actionhero generate</code>). Using that as your starting point you can then carefully copy all your <code>configs</code>, <code>initializers</code>, <code>servers</code>, links and other custom code from your old project, making sure that you are at the same working state as before. It's a good practice to make tests for your actions (or any other component) before you plan to upgrade your ActionHero project.</p>
                <p>With good <a href='/docs/ops/testing'>test coverage</a> you can make sure that you have successfully upgraded your project.</p>
                <p>ActionHero follows <a href='http://semver.org/'>semantic versioning</a>.  This means that a minor change is a right-most number.  A new feature added is the middle number, and a breaking change is the left number.  You should expect something in your application to need to be changed if you upgrade a major version.</p>
              </div>
            )}

            { this.section('v17',
              <div>
                <p><strong>Full Release Notes: <a href='https://github.com/actionhero/actionhero/releases/tag/v17.0.0'>GitHub</a></strong></p>

                <p><strong>Breaking Changes and How to Overcome Them:</strong></p>

                <ul>
                  <li><strong>Localization (i18n)</strong></li>
                  <ul>
                    <li>In <code>./config/i18n.js</code> be sure to enable <code>objectNotation</code>, or else the new locale file will be gibberish to ActionHero</li>
                    <li>As of this release, ActionHero no longer localizes its log messages.  This is done to simplify and speed up the logger methods.  There is not mitigation path here without overwriting the <code>api.log()</code> method.</li>
                    <ul>
                      <li>Any use of <code>%</code> interpolation should be removed from your logger strings.  Favor native JS string templates.</li>
                    </ul>
                    <li>ActionHero now ships with locale files by default.</li>
                    <ul>
                      <li>You will need to acquire the <a href='https://github.com/actionhero/actionhero/blob/master/locales/en.json'>default locale file</a> and copy it into <code>./locales/en.json</code> within your project.</li>
                      <li>The error reporters have all been changed to use these new locale file and mustache-style syntax.  Update your from the <a href='https://github.com/actionhero/actionhero/blob/master/config/errors.js'>default errors file</a></li>
                      <li>The <code>welcomeMessage</code> and <code>goodbyeMessage</code> are removed from the config files and ActionHero now refrences the locale files for these strings.  Update yours accodingly.</li>
                    </ul>
                  </ul>
                  <li><strong>utils</strong></li>
                  <ul>
                    <li><code>api.utils.recursiveDirectoryGlob</code> has been removed in favor of the <a href='https://github.com/isaacs/node-glob'>glob package</a>.  Use this instead.</li>
                  </ul>
                </ul>
              </div>
            )}

            { this.section('v16',
              <div>
                <p><strong>Full Release Notes: <a href='https://github.com/actionhero/actionhero/releases/tag/v16.0.0'>GitHub</a></strong></p>
                <p><strong>Breaking Changes and How to Overcome Them:</strong></p>

                <p>The only breaking changes are related to the capilization of internal methods:</p>

                <ul>
                  <li><code>api.Connecton()</code> rather than <code>api.connection()</code></li>
                  <li><code>api.GenericServer()</code> rather than <code>api.genericServer()</code></li>
                  <li><code>api.ActionProcessor()</code> rather than <code>api.actionProcessor()</code></li>
                  <li><code>require('actionhero')</code> not <code>require('actionhero').actionheroPrototype</code> should you be using ActionHero programatically.</li>
                </ul>
              </div>
            )}

            { this.section('v15',
              <div>
                <p><strong>Full Release Notes: <a href='https://github.com/actionhero/actionhero/releases/tag/v15.0.0'>GitHub</a></strong></p>
                <p><strong>Breaking Changes and How to Overcome Them:</strong></p>
                <Code language='bash'>{v15}</Code>
                <ul>
                  <li>The ActionHero binary has had it's commands changed.
                    <ul>
                      <li>Any deployment or automation tools you use will need to be updated accordingly.</li>
                    </ul>
                  </li>
                  <li>Tasks now use middleware instead of plugins.
                    <ul>
                      <li>You will need to convert all uses of task plugins to task middleware.</li>
                    </ul>
                  </li>
                </ul>
              </div>
            )}

            { this.section('v14',
              <div>
                <p><strong>Full Release Notes: <a href='https://github.com/actionhero/actionhero/releases/tag/v14.0.0'>GitHub</a></strong></p>
                <p><strong>Breaking Changes and How to Overcome Them:</strong></p>
                <ul>
                  <li>Redis Client Configurations have changed drastically.  This allows for greater configuration, but at a complexity cost.
                    <ul>
                      <li>The easiest way to upgrade your <code>config/redis.js</code> is to take if from the <a href='https://github.com/actionhero/actionhero/blob/master/config/redis.js'>master branch</a> directly and re-apply your configuration.</li>
                      <li>Move <code>api.config.redis.channel</code> to <code>api.config.general.channel</code></li>
                      <li>Move <code>api.config.redis. rpcTimeout</code> to <code>api.config.general.rpcTimeout</code></li>
                      <li>Throughout the code, use <code>api.config.redis.client</code> rather than <code>api.redis.client</code></li>
                    </ul>
                  </li>
                </ul>
              </div>
            )}

            { this.section('v13',
              <div>
                <p><strong>Full Release Notes: <a href='https://github.com/actionhero/actionhero/releases/tag/v13.0.0'>GitHub</a></strong></p>
                <p><strong>Breaking Changes and How to Overcome Them:</strong></p>

                <ul>
                  <li>Pluggins
                    <ul>
                      <li><code>config/plugins.js</code> is removed.  Delete yours.</li>
                      <li>Use the new binary command, <code>actionhero link --name=NameOfPlugin</code> to link your plugins in the new method.</li>
                      <li>Linking plugins will likley create new config files you may need to customize.</li>
                    </ul>
                  </li>
                  <li>Locales
                    <ul>
                      <li>This release introduced Locales. You will need the new locale config file.  The easiest way to upgrade your <code>config/i18n.js</code> is to take if from the <a href='https://github.com/actionhero/actionhero/blob/master/config/i18n.js'>master branch</a>.</li>
                      <li>Ensure that <code>api.config.i18n.updateFiles</code> is <code>true</code> so that your locale files can be generated for the first time.</li>
                    </ul>
                  </li>
                  <li>Errors
                    <ul>
                      <li><code>config/errors.js</code> has been completely redone to take advantage of <code>connection.localize</code>.  The easiest way to upgrade your <code>config/errors.js</code> is to take if from the <a href='https://github.com/actionhero/actionhero/blob/master/config/errors.js'>master branch</a>.</li>
                    </ul>
                  </li>
                  <li>Grunt Removed
                    <ul>
                      <li>Grunt is removed from the project.  The old ActionHero grunt commands have been moved into the ActionHero binary.</li>
                    </ul>
                  </li>
                  <li>Redis configuration
                    <ul>
                      <li><code>package</code> is a reserved keyword in JavaScript.  We now use the key <code>pkg</code> in the redis config.</li>
                    </ul>
                  </li>
                </ul>
              </div>
            )}

            { this.section('v12',
              <div>
                <p><strong>Full Release Notes: <a href='https://github.com/actionhero/actionhero/releases/tag/v12.0.0'>GitHub</a></strong></p>
                <p><strong>Breaking Changes and How to Overcome Them:</strong></p>

                <ul>
                  <li>Redis configuration
                    <ul>
                      <li>Switch from using the <code>redis</code> npm pacakge to <code>ioredis</code>.  Change this in your package.json.</li>
                    </ul>
                  </li>
                  <li><code>ioredis</code> handles passwords slightly differently.  Read the <a href='https://github.com/luin/ioredis'>ioredis</a> documentation to learn more.</li>
                  <li>Stats Removed
                    <ul>
                      <li>The <code>api.stats</code> subsection has been removed from actionhero</li>
                      <li>If you need the stats subsection, you can get get it <a href='https://github.com/actionhero/ah-stats-plugin'>via plugin</a></li>
                    </ul>
                  </li>
                </ul>
              </div>
            )}

            { this.section('v11',
              <div>
                <p><strong>Full Release Notes: <a href='https://github.com/actionhero/actionhero/releases/tag/v11.0.0'>GitHub</a></strong></p>
                <p><strong>Breaking Changes and How to Overcome Them:</strong></p>

                <ul>
                  <li>Action Syntax changed
                    <ul>
                      <li><Code>{v11Action}</Code></li>
                      <li>Where data contains:</li>
                      <li><Code>{v11Data}</Code></li>
                      <li>You will need to change all of your actions to use <code>data.connection</code> rather than <code>connection</code> directly.</li>
                      <li>You will need to change all of your actions to use <code>data.response</code> rather than <code>connection.response</code> directly.</li>
                    </ul>
                  </li>
                  <li>Middleware syntax has changed to match action's <code>data</code> pattern.  You will need to change your middleware accordingly.</li>
                  <li>Removed <code>connection._originalConnection</code>.</li>
                  <li>Websockets:
                    <ul>
                      <li>The params of websocket connections should NOT be sticky. All actions will start with <code>connection.params = {}</code>.  If you rely on the old behavior, you will need to change your client code.</li>
                    </ul>
                  </li>
                  <li>Action Processor:
                    <ul>
                      <li>Removed duplicate callback prevention in ActionProcessor. This belongs on the user/implementer to handle.</li>
                    </ul>
                  </li>
                </ul>
              </div>
            )}
          </Col>
        </Row>
      </DocsPage>
    )
  }
}
