/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import nls = require('vs/nls');
import os = require('os');
import { Action, IAction } from 'vs/base/common/actions';
import { EndOfLinePreference } from 'vs/editor/common/editorCommon';
import { ICodeEditorService } from 'vs/editor/common/services/codeEditorService';
import { ITerminalService } from 'vs/workbench/parts/terminal/electron-browser/terminal';
import { SelectActionItem } from 'vs/base/browser/ui/actionbar/actionbar';
import { TPromise } from 'vs/base/common/winjs.base';

export class ToggleTerminalAction extends Action {

	public static ID = 'workbench.action.terminal.toggleTerminal';
	public static LABEL = nls.localize('workbench.action.terminal.toggleTerminal', "Toggle Integrated Terminal");

	constructor(
		id: string, label: string,
		@ITerminalService private terminalService: ITerminalService
	) {
		super(id, label);
	}

	public run(event?: any): TPromise<any> {
		return this.terminalService.togglePanel();
	}
}

export class KillTerminalAction extends Action {

	public static ID = 'workbench.action.terminal.kill';
	public static LABEL = nls.localize('workbench.action.terminal.kill', "Kill the Active Terminal Instance");
	public static PANEL_LABEL = nls.localize('workbench.action.terminal.kill.short', "Kill Terminal");

	constructor(
		id: string, label: string,
		@ITerminalService private terminalService: ITerminalService
	) {
		super(id, label);
		this.class = 'terminal-action kill';
	}

	public run(event?: any): TPromise<any> {
		let terminalInstance = this.terminalService.getActiveInstance();
		if (terminalInstance) {
			this.terminalService.getActiveInstance().dispose();
			if (this.terminalService.terminalInstances.length > 0) {
				this.terminalService.showPanel(true);
			}
		}
		return TPromise.as(void 0);
	}
}

/**
 * Copies the terminal selection. Note that since the command palette takes focus from the terminal,
 * this can only be triggered via a keybinding.
 */
export class CopyTerminalSelectionAction extends Action {

	public static ID = 'workbench.action.terminal.copySelection';
	public static LABEL = nls.localize('workbench.action.terminal.copySelection', "Copy Selection");

	constructor(
		id: string, label: string,
		@ITerminalService private terminalService: ITerminalService
	) {
		super(id, label);
	}

	public run(event?: any): TPromise<any> {
		let terminalInstance = this.terminalService.getActiveInstance();
		if (terminalInstance) {
			terminalInstance.copySelection();
		}
		return TPromise.as(void 0);
	}
}

export class CreateNewTerminalAction extends Action {

	public static ID = 'workbench.action.terminal.new';
	public static LABEL = nls.localize('workbench.action.terminal.new', "Create New Integrated Terminal");
	public static PANEL_LABEL = nls.localize('workbench.action.terminal.new.short', "New Terminal");

	constructor(
		id: string, label: string,
		@ITerminalService private terminalService: ITerminalService
	) {
		super(id, label);
		this.class = 'terminal-action new';
	}

	public run(event?: any): TPromise<any> {
		this.terminalService.setActiveInstance(this.terminalService.createInstance());
		return this.terminalService.showPanel(true);
	}
}

export class FocusTerminalAction extends Action {

	public static ID = 'workbench.action.terminal.focus';
	public static LABEL = nls.localize('workbench.action.terminal.focus', "Focus Terminal");

	constructor(
		id: string, label: string,
		@ITerminalService private terminalService: ITerminalService
	) {
		super(id, label);
	}

	public run(event?: any): TPromise<any> {
		let terminalInstance = this.terminalService.getActiveInstance();
		if (!terminalInstance) {
			terminalInstance = this.terminalService.createInstance();
		}
		this.terminalService.setActiveInstance(terminalInstance);
		return this.terminalService.showPanel(true);
	}
}

export class FocusNextTerminalAction extends Action {

	public static ID = 'workbench.action.terminal.focusNext';
	public static LABEL = nls.localize('workbench.action.terminal.focusNext', "Focus Next Terminal");

	constructor(
		id: string, label: string,
		@ITerminalService private terminalService: ITerminalService
	) {
		super(id, label);
	}

	public run(event?: any): TPromise<any> {
		this.terminalService.setActiveInstanceToNext();
		return this.terminalService.showPanel(true);
	}
}

export class FocusPreviousTerminalAction extends Action {

	public static ID = 'workbench.action.terminal.focusPrevious';
	public static LABEL = nls.localize('workbench.action.terminal.focusPrevious', "Focus Previous Terminal");

	constructor(
		id: string, label: string,
		@ITerminalService private terminalService: ITerminalService
	) {
		super(id, label);
	}

	public run(event?: any): TPromise<any> {
		this.terminalService.setActiveInstanceToPrevious();
		return this.terminalService.showPanel(true);
	}
}
export class TerminalPasteAction extends Action {

	public static ID = 'workbench.action.terminal.paste';
	public static LABEL = nls.localize('workbench.action.terminal.paste', "Paste into Active Terminal");

	constructor(
		id: string, label: string,
		@ITerminalService private terminalService: ITerminalService
	) {
		super(id, label);
	}

	public run(event?: any): TPromise<any> {
		let terminalInstance = this.terminalService.getActiveInstance();
		if (!terminalInstance) {
			terminalInstance = this.terminalService.createInstance();
		}
		terminalInstance.paste();
		return TPromise.as(void 0);
	}
}

export class RunSelectedTextInTerminalAction extends Action {

	public static ID = 'workbench.action.terminal.runSelectedText';
	public static LABEL = nls.localize('workbench.action.terminal.runSelectedText', "Run Selected Text In Active Terminal");

	constructor(
		id: string, label: string,
		@ICodeEditorService private codeEditorService: ICodeEditorService,
		@ITerminalService private terminalService: ITerminalService
	) {
		super(id, label);
	}

	public run(event?: any): TPromise<any> {
		let terminalInstance = this.terminalService.getActiveInstance();
		if (!terminalInstance) {
			terminalInstance = this.terminalService.createInstance();
		}
		let editor = this.codeEditorService.getFocusedCodeEditor();
		let selection = editor.getSelection();
		let text: string;
		if (selection.isEmpty()) {
			text = editor.getValue();
		} else {
			let endOfLinePreference = os.EOL === '\n' ? EndOfLinePreference.LF : EndOfLinePreference.CRLF;
			text = editor.getModel().getValueInRange(selection, endOfLinePreference);
		}
		terminalInstance.sendText(text, true);
		return TPromise.as(void 0);
	}
}

export class SwitchTerminalInstanceAction extends Action {

	public static ID = 'workbench.action.terminal.switchTerminalInstance';
	public static LABEL = nls.localize('workbench.action.terminal.switchTerminalInstance', "Switch Terminal Instance");

	constructor(
		id: string, label: string,
		@ITerminalService private terminalService: ITerminalService
	) {
		super(SwitchTerminalInstanceAction.ID, SwitchTerminalInstanceAction.LABEL);
		this.class = 'terminal-action switch-terminal-instance';
	}

	public run(item?: string): TPromise<any> {
		let selectedTerminalIndex = parseInt(item.split(':')[0], 10) - 1;
		this.terminalService.setActiveInstanceByIndex(selectedTerminalIndex);
		return this.terminalService.showPanel(true);
	}
}

export class SwitchTerminalInstanceActionItem extends SelectActionItem {

	constructor(
		action: IAction,
		@ITerminalService private terminalService: ITerminalService
	) {
		super(null, action, terminalService.getInstanceLabels(), terminalService.activeTerminalInstanceIndex);
		this.toDispose.push(terminalService.onInstancesChanged(this._updateItems, this));
		this.toDispose.push(terminalService.onActiveInstanceChanged(this._updateItems, this));
		this.toDispose.push(terminalService.onInstanceTitleChanged(this._updateItems, this));
	}

	private _updateItems(): void {
		this.setOptions(this.terminalService.getInstanceLabels(), this.terminalService.activeTerminalInstanceIndex);
	}
}

export class ScrollDownTerminalAction extends Action {

	public static ID = 'workbench.action.terminal.scrollDown';
	public static LABEL = nls.localize('workbench.action.terminal.scrollDown', "Scroll Down");

	constructor(
		id: string, label: string,
		@ITerminalService private terminalService: ITerminalService
	) {
		super(id, label);
	}

	public run(event?: any): TPromise<any> {
		let terminalInstance = this.terminalService.getActiveInstance();
		if (terminalInstance) {
			terminalInstance.scrollDown();
		}
		return TPromise.as(void 0);
	}
}

export class ScrollUpTerminalAction extends Action {

	public static ID = 'workbench.action.terminal.scrollUp';
	public static LABEL = nls.localize('workbench.action.terminal.scrollUp', "Scroll Up");

	constructor(
		id: string, label: string,
		@ITerminalService private terminalService: ITerminalService
	) {
		super(id, label);
	}

	public run(event?: any): TPromise<any> {
		let terminalInstance = this.terminalService.getActiveInstance();
		if (terminalInstance) {
			terminalInstance.scrollUp();
		}
		return TPromise.as(void 0);
	}
}