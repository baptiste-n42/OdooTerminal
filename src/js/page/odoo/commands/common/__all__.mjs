// Copyright  Alexandre Díaz <dev@redneboa.es>
// License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

import cmdBarcode from './barcode';
import cmdCaf from './caf';
import cmdCall from './call';
import cmdCam from './cam';
import cmdCommit from './commit';
import cmdContext from './context';
import cmdCount from './count';
import cmdCreate from './create';
import cmdDBList from './dblist';
import cmdDebug from './debug';
import cmdDepends from './depends';
import cmdGen from './gen';
import cmdInstall from './install';
import cmdJson from './json';
import cmdJSTest from './jstest';
import cmdLastSeen from './lastseen';
import cmdLogin from './login';
import cmdLogout from './logout';
import cmdLongpolling from './longpolling';
import cmdMetadata from './metadata';
import cmdNow from './now';
import cmdPost from './post';
import cmdRead from './read';
import cmdRef from './ref';
import cmdReload from './reload';
import cmdRollback from './rollback';
import cmdRpc from './rpc';
import cmdSearch from './search';
import cmdTour from './tour';
import cmdUal from './ual';
import cmdUhg from './uhg';
import cmdUninstall from './uninstall';
import cmdUnlink from './unlink';
import cmdUpgrade from './upgrade';
import cmdVersion from './version';
import cmdWhoami from './whoami';
import cmdWrite from './write';
import cmdWS from './ws';

export default function (TerminalObj) {
  TerminalObj.registerCommand('gen', cmdGen);
  TerminalObj.registerCommand('create', cmdCreate);
  TerminalObj.registerCommand('unlink', cmdUnlink);
  TerminalObj.registerCommand('write', cmdWrite);
  TerminalObj.registerCommand('search', cmdSearch);
  TerminalObj.registerCommand('call', cmdCall);
  TerminalObj.registerCommand('upgrade', cmdUpgrade);
  TerminalObj.registerCommand('install', cmdInstall);
  TerminalObj.registerCommand('uninstall', cmdUninstall);
  TerminalObj.registerCommand('reload', cmdReload);
  TerminalObj.registerCommand('debug', cmdDebug);
  TerminalObj.registerCommand('post', cmdPost);
  TerminalObj.registerCommand('whoami', cmdWhoami);
  TerminalObj.registerCommand('caf', cmdCaf);
  TerminalObj.registerCommand('cam', cmdCam);
  TerminalObj.registerCommand('lastseen', cmdLastSeen);
  TerminalObj.registerCommand('read', cmdRead);
  TerminalObj.registerCommand('context', cmdContext);
  TerminalObj.registerCommand('version', cmdVersion);
  TerminalObj.registerCommand('longpolling', cmdLongpolling);
  TerminalObj.registerCommand('login', cmdLogin);
  TerminalObj.registerCommand('uhg', cmdUhg);
  TerminalObj.registerCommand('dblist', cmdDBList);
  TerminalObj.registerCommand('jstest', cmdJSTest);
  TerminalObj.registerCommand('tour', cmdTour);
  TerminalObj.registerCommand('json', cmdJson);
  TerminalObj.registerCommand('depends', cmdDepends);
  TerminalObj.registerCommand('ual', cmdUal);
  TerminalObj.registerCommand('logout', cmdLogout);
  TerminalObj.registerCommand('count', cmdCount);
  TerminalObj.registerCommand('ref', cmdRef);
  TerminalObj.registerCommand('rpc', cmdRpc);
  TerminalObj.registerCommand('metadata', cmdMetadata);
  TerminalObj.registerCommand('barcode', cmdBarcode);
  TerminalObj.registerCommand('ws', cmdWS);
  TerminalObj.registerCommand('commit', cmdCommit);
  TerminalObj.registerCommand('rollback', cmdRollback);
  TerminalObj.registerCommand('now', cmdNow);
}
