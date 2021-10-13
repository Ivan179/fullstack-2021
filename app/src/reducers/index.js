import { combineReducers } from 'redux';
import { modal } from './modal';
import { posts } from './posts';
import { user } from './user';
import { comments } from './comments';

export const reducers = combineReducers({ modal, posts, user, comments });
