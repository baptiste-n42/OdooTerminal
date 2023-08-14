// Copyright  Alexandre Díaz <dev@redneboa.es>
// License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

import {default as OdooRoot, doCall} from "./root";
import {getOdooService, getOdooVersionMajor} from "./utils";

export default class Longpolling {
  #terminal = null;

  constructor(terminal) {
    this.#terminal = terminal;
    const OdooVer = getOdooVersionMajor();
    if (OdooVer <= 11) {
      this.#getBusService().on("notification", this, this.#onBusNotification);
    } else if (OdooVer >= 16) {
      this.#busServ(
        "addEventListener",
        "notification",
        this.#onBusNotification.bind(this)
      );
    } else {
      this.#busServ("onNotification", this, this.#onBusNotification);
    }
  }

  #getBusService() {
    return getOdooService("bus.bus")?.bus;
  }

  #busServ(method, ...params) {
    const OdooVer = getOdooVersionMajor();
    if (OdooVer >= 16) {
      const bus_serv = OdooRoot?.env?.services?.bus_service;
      if (!bus_serv) {
        throw new Error("bus service not available");
      }
      return bus_serv[method](...params);
    }
    return doCall("bus_service", method, ...params);
  }

  addChannel(name) {
    const OdooVer = getOdooVersionMajor();
    if (OdooVer <= 11) {
      return this.#getBusService().add_channel(name);
    }
    return this.#busServ("addChannel", name);
  }

  deleteChannel(name) {
    const OdooVer = getOdooVersionMajor();
    if (OdooVer <= 11) {
      return this.#getBusService().delete_channel(name);
    }
    return this.#busServ("deleteChannel", name);
  }

  startPoll() {
    const OdooVer = getOdooVersionMajor();
    if (OdooVer <= 11) {
      return this.#getBusService().start_polling();
    } else if (OdooVer >= 16) {
      return this.#busServ("forceUpdateChannels");
    }
    return this.#busServ("startPolling");
  }

  stopPoll() {
    const OdooVer = getOdooVersionMajor();
    if (OdooVer <= 11) {
      return this.#getBusService().stop_polling();
    } else if (OdooVer >= 16) {
      return this.#busServ("stop");
    }
    return this.#busServ("stopPolling");
  }

  setVerbose(status) {
    if (status) {
      this.#terminal.storageLocal.setItem(
        "terminal_longpolling_mode",
        "verbose",
        (err) => this.screen.printHTML(err)
      );
    } else {
      this.#terminal.storageLocal.removeItem("terminal_longpolling_mode");
    }
  }

  isVerbose() {
    return this.#terminal.storageLocal.getItem("terminal_longpolling_mode");
  }

  //
  #getNotificationsData(data) {
    const OdooVer = getOdooVersionMajor();
    if (OdooVer >= 16) {
      return data.detail;
    }
    return data;
  }
  #onBusNotification(data) {
    if (this.isVerbose()) {
      this.#terminal.onBusNotification(this.#getNotificationsData(data));
    }
  }
}
