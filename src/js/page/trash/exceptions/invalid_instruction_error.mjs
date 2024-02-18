// Copyright  Alexandre Díaz <dev@redneboa.es>
// License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

import i18n from 'i18next';

export default class extends Error {
  constructor(message) {
    super(
      message ||
        i18n.t(
          'trash.exception.invalidInstructionError',
          'Invalid instruction',
        ),
    );
    this.name = 'InvalidInstructionError';
  }
}
