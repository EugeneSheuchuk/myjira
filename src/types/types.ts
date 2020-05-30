import React from 'react';

export type MenuItemProps = {
  url?: string;
  path?: string;
  imgURL: string;
  name: string;
  tabIndex: number;
  action?: Function;
};

export type DropDownItem = {
  actionName: string;
  action: (e: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>) => void;
};

export type DropDownProps = Array<DropDownItem>;

export type DeleteWarningdProps = {
  confirmAction: (e: React.MouseEvent<HTMLButtonElement>) => void;
  cancelAction: (e: React.MouseEvent<HTMLButtonElement> | KeyboardEvent) => void;
};

export type TaskCommentType = {
  commentDate: number;
  commentText: string;
  isCommentEdit: boolean;
};

export type EditTaskDataType = {
  taskText: string;
  taskDescription: string;
  createTime?: number;
  updateTime?: number;
  taskComments: Array<TaskCommentType>;
  boardId: string;
};

export type BoardData = {
  boardName: string;
  boardId: string;
};
