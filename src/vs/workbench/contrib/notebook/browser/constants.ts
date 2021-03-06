/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export const INSERT_CODE_CELL_ABOVE_COMMAND_ID = 'workbench.notebook.code.insertCellAbove';
export const INSERT_CODE_CELL_BELOW_COMMAND_ID = 'workbench.notebook.code.insertCellBelow';
export const INSERT_MARKDOWN_CELL_ABOVE_COMMAND_ID = 'workbench.notebook.markdown.insertCellAbove';
export const INSERT_MARKDOWN_CELL_BELOW_COMMAND_ID = 'workbench.notebook.markdown.insertCellBelow';

export const EDIT_CELL_COMMAND_ID = 'workbench.notebook.cell.edit';
export const SAVE_CELL_COMMAND_ID = 'workbench.notebook.cell.save';
export const DELETE_CELL_COMMAND_ID = 'workbench.notebook.cell.delete';

export const MOVE_CELL_UP_COMMAND_ID = 'workbench.notebook.cell.moveUp';
export const MOVE_CELL_DOWN_COMMAND_ID = 'workbench.notebook.cell.moveDown';
export const COPY_CELL_UP_COMMAND_ID = 'workbench.notebook.cell.copyUp';
export const COPY_CELL_DOWN_COMMAND_ID = 'workbench.notebook.cell.copyDown';

export const EXECUTE_CELL_COMMAND_ID = 'workbench.notebook.cell.execute';
export const EXECUTE_ACTIVE_CELL_COMMAND_ID = 'workbench.notebook.cell.executeActive';
export const CANCEL_CELL_COMMAND_ID = 'workbench.notebook.cell.cancelExecution';
export const EXECUTE_NOTEBOOK_COMMAND_ID = 'workbench.notebook.executeNotebook';
export const CANCEL_NOTEBOOK_COMMAND_ID = 'workbench.notebook.cancelExecution';

// Cell sizing related
export const CELL_MARGIN = 20;
export const CELL_RUN_GUTTER = 32; // TODO should be dynamic based on execution order width, and runnable enablement

export const EDITOR_TOOLBAR_HEIGHT = 20;
export const BOTTOM_CELL_TOOLBAR_HEIGHT = 32;

// Top margin of editor
export const EDITOR_TOP_MARGIN = 0;

// Top and bottom padding inside the monaco editor in a cell, which are included in `cell.editorHeight`
export const EDITOR_TOP_PADDING = 8;
export const EDITOR_BOTTOM_PADDING = 8;

// Cell context keys

export const NOTEBOOK_VIEW_TYPE = 'notebookViewType';
export const NOTEBOOK_CELL_TYPE_CONTEXT_KEY = 'notebookCellType'; // code, markdown
export const NOTEBOOK_CELL_EDITABLE_CONTEXT_KEY = 'notebookCellEditable'; // bool
export const NOTEBOOK_CELL_MARKDOWN_EDIT_MODE_CONTEXT_KEY = 'notebookCellMarkdownEditMode'; // bool
export const NOTEBOOK_CELL_RUN_STATE_CONTEXT_KEY = 'notebookCellRunState'; // idle, running

// Notebook context keys
export const NOTEBOOK_EDITABLE_CONTEXT_KEY = 'notebookEditable';
export const NOTEBOOK_EXECUTING_KEY = 'notebookExecuting';
