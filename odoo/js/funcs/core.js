// Copyright 2018-2020 Alexandre Díaz <dev@redneboa.es>
// License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

odoo.define("terminal.CoreFunctions", function(require) {
    "use strict";

    const Terminal = require("terminal.Terminal").terminal;

    Terminal.include({
        init: function() {
            this._super.apply(this, arguments);

            this.registerCommand("help", {
                definition: "Print this help or command detailed info",
                callback: this._printHelp,
                detail:
                    "Show commands and a quick definition.<br/>- " +
                    "<> ~> Required Parameter<br/>- [] ~> Optional Parameter",
                syntaxis: "[STRING: COMMAND]",
                args: "?s",
            });
            this.registerCommand("clear", {
                definition: "Clean terminal section (screen by default)",
                callback: this._clear,
                detail: "Available sections: screen (default), history.",
                syntaxis: "[STRING: SECTION]",
                args: "?s",
            });
            this.registerCommand("print", {
                definition: "Print a message",
                callback: this._printText,
                detail: "Eval parameters and print the result.",
                syntaxis: "<STRING: MSG>",
                args: "",
            });
            this.registerCommand("load", {
                definition: "Load external resource",
                callback: this._loadResource,
                detail: "Load external source (javascript & css)",
                syntaxis: "<STRING: URL>",
                args: "s",
            });
        },

        _printWelcomeMessage: function() {
            this._super.apply(this, arguments);
            this.print(
                "Type '<i class='o_terminal_click o_terminal_cmd' " +
                    "data-cmd='help'>help</i>' or '<i class='o_terminal_click " +
                    "o_terminal_cmd' data-cmd='help help'>help " +
                    "&lt;command&gt;</i>' to start."
            );
        },

        _printHelpSimple: function(cmd, cmdDef) {
            this.print(
                _.template(
                    "<strong class='o_terminal_click " +
                        "o_terminal_cmd' data-cmd='help <%= cmd %>'><%= cmd %>" +
                        "</strong> - <i><%= def %></i>"
                )({
                    cmd: cmd,
                    def: cmdDef.definition,
                })
            );
        },

        _printHelp: function(params) {
            return $.Deferred(d => {
                if (!params || params.length === 0) {
                    const sortedCmdKeys = _.keys(this._registeredCmds).sort();
                    for (const cmd of sortedCmdKeys) {
                        this._printHelpSimple(cmd, this._registeredCmds[cmd]);
                    }
                } else {
                    const cmd = params[0];
                    if (
                        Object.prototype.hasOwnProperty.call(
                            this._registeredCmds,
                            cmd
                        )
                    ) {
                        this._printHelpDetailed(cmd, this._registeredCmds[cmd]);
                    } else {
                        this.printError(`'${cmd}' command doesn't exists`);
                    }
                }

                d.resolve();
            });
        },

        _printHelpDetailed: function(cmd, cmdDef) {
            this.print(cmdDef.detail);
            this.print(" ");
            this.eprint(`Syntaxis: ${cmd} ${cmdDef.syntaxis}`);
        },

        _clear: function(params) {
            return $.Deferred(d => {
                if (params.length && params[0] === "history") {
                    this.cleanInputHistory();
                } else {
                    this.clean();
                }
                d.resolve();
            });
        },

        _printText: function(params) {
            return $.Deferred(d => {
                this.print(params.join(" "));
                d.resolve();
            });
        },

        _loadResource: function(params) {
            return $.Deferred(d => {
                try {
                    const inURL = new URL(params[0]);
                    const pathname = inURL.pathname.toLowerCase();
                    if (pathname.endsWith(".js")) {
                        $.getScript(inURL.href);
                    } else if (pathname.endsWith(".css")) {
                        $("<link>")
                            .appendTo("head")
                            .attr({
                                type: "text/css",
                                rel: "stylesheet",
                                href: inURL.href,
                            });
                    } else {
                        d.reject("Invalid file type");
                    }
                } catch (err) {
                    d.reject(err);
                } finally {
                    d.resolve();
                }
            });
        },
    });
});
