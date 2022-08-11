import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';

import { AppState } from '../../reducers';
import { AuthActions } from '../action-types';
import { User } from '../model/user.model';
import { login } from '../auth.actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: User;
}

export const initialAuthState: AuthState = {
  user: undefined,
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state, action) => {
    return {
      user: action.user,
    };
  })
);
