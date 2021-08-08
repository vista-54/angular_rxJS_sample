import { Role, RoleType } from '@models/role.model';
import { createReducer, on } from '@ngrx/store';
import * as RoleActions from '../role/role.actions';

export interface RoleState {
  roles: Role[];
  selectedRole: Role;
  perPage: number;
  page: number;
  totalItemsCount: number;
  selectedRoleId: number;
  orderBy: string;
  orderDirection: string;
  query: string;
  isRefreshing: boolean;
  isLoading: boolean;
  type: RoleType;
  assignmentRuleCompilationError: string;
}

export const initialState: RoleState = {
  roles: null,
  selectedRole: null,
  perPage: 25,
  page: 0,
  orderBy: null,
  orderDirection: null,
  totalItemsCount: 0,
  selectedRoleId: null,
  query: null,
  isRefreshing: false,
  isLoading: false,
  type: null,
  assignmentRuleCompilationError: null
};

export const roleStateReducer = createReducer(
  initialState,
  on(
    RoleActions.resetToInitialState,
    () => ({
      ...initialState
    })
  ),
  on(
    RoleActions.resetPagination,
    (state, {}) => ({
      ...state,
      page: initialState.page,
    })
  ),
  on(
    RoleActions.resetRoles,
    (state, {}) => ({
      ...state,
      roles: initialState.roles,
    })
  ),
  on(
    RoleActions.resetSelectedRole,
    (state, {}) => ({
      ...state,
      selectedRole: initialState.selectedRole,
    })
  ),
  on(
    RoleActions.setRoles,
    (state, {roles}) => ({
        ...state,
        roles
      })
  ),
  on(
    RoleActions.setRoleType,
    (state, {roleType}) => ({
        ...state,
        type: roleType,
      })
  ),
  on(
    RoleActions.setRoleId,
    (state, {selectedRoleId}) => ({
        ...state,
        selectedRoleId
      })
  ),
  on(
    RoleActions.setTotalItemsCount,
    (state, {totalItemsCount}) => ({
        ...state,
        totalItemsCount
      })
  ),
  on(
    RoleActions.nextPage,
    (state, {perPage, page}) => ({
        ...state,
        perPage,
        page
      })
  ),
  on(
    RoleActions.orderByField,
    (state, {orderBy, orderDirection}) => ({
        ...state,
        orderBy,
        orderDirection
      })
  ),
  on(
    RoleActions.search,
    (state, {query}) => ({
        ...state,
        query
      })
  ),
  on(
    RoleActions.setRole,
    (state, {role}) => ({
        ...state,
        selectedRole: role
      })
  ),
  on(
    RoleActions.toggleRefresh,
    (state, {isRefreshing}) => ({
        ...state,
        isRefreshing
      })
  ),
  on(
    RoleActions.toggleLoading,
    (state, {isLoading}) => ({
        ...state,
        isLoading
      })
  ),
);
